-- ===========================================================================
-- LA CASA App — initial schema
--
-- Design notes:
--   * Curriculum content ships in the app bundle (src/content), not here.
--     That keeps the app fully usable offline and makes content review a
--     code review. These tables hold only what belongs to a person.
--   * Every table is protected by row-level security. A family can read and
--     write only its own rows; LA CASA staff can read aggregates and answer
--     questions. There is no path by which one family sees another's data.
--   * `profiles.role` replaces the empty Role column in the Glide prototype.
-- ===========================================================================

create type public.user_role as enum ('family', 'staff', 'admin');

-- ── Profiles ───────────────────────────────────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  display_name text,
  role        public.user_role not null default 'family',
  language    text not null default 'es' check (language in ('en', 'es')),
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    -- A user may change their name and language but never their own role.
    and role = (select role from public.profiles where id = auth.uid())
  );

-- Helper used by staff policies. security definer so it can read the row
-- the caller's own RLS would otherwise hide inside a policy expression.
create function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('staff', 'admin')
  );
$$;

create policy "staff read all profiles"
  on public.profiles for select
  using (public.is_staff());

-- New auth users get a profile automatically.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Lesson progress ────────────────────────────────────────────────────────
-- item_id is a content key from src/content/items.ts, not a foreign key —
-- curriculum lives in the bundle so the app works with no network.
create table public.progress (
  user_id   uuid not null references public.profiles on delete cascade,
  item_id   text not null,
  read_at   timestamptz not null default now(),
  primary key (user_id, item_id)
);

alter table public.progress enable row level security;

create policy "own progress"
  on public.progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── Goals ──────────────────────────────────────────────────────────────────
create table public.goals (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references public.profiles on delete cascade,
  goal_id   text not null,
  added_at  timestamptz not null default now(),
  archived  boolean not null default false,
  unique (user_id, goal_id)
);

create table public.goal_check_ins (
  goal_row_id uuid not null references public.goals on delete cascade,
  user_id     uuid not null references public.profiles on delete cascade,
  on_date     date not null,
  primary key (goal_row_id, on_date)
);

alter table public.goals enable row level security;
alter table public.goal_check_ins enable row level security;

create policy "own goals"
  on public.goals for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own check ins"
  on public.goal_check_ins for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Quiz attempts ──────────────────────────────────────────────────────────
create table public.quiz_attempts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles on delete cascade,
  module_id   text not null,
  correct     smallint not null,
  total       smallint not null,
  taken_at    timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;

create policy "own attempts"
  on public.quiz_attempts for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "staff read attempts"
  on public.quiz_attempts for select
  using (public.is_staff());

-- ── Questions to the LA CASA team ──────────────────────────────────────────
-- Phase 1 this is the staff answer queue. Phase 2 the assistant writes the
-- answer and a staff member approves it, so the table shape does not change.
create table public.questions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles on delete cascade,
  body          text not null check (char_length(body) between 1 and 2000),
  language      text not null default 'es' check (language in ('en', 'es')),
  answer        text,
  answered_by   uuid references public.profiles,
  answered_at   timestamptz,
  -- 'draft' = written by the assistant, awaiting staff approval.
  status        text not null default 'open'
                check (status in ('open', 'draft', 'answered', 'hidden')),
  is_public     boolean not null default false,
  created_at    timestamptz not null default now()
);

alter table public.questions enable row level security;

create policy "ask a question"
  on public.questions for insert
  with check (auth.uid() = user_id);

create policy "read own or published questions"
  on public.questions for select
  using (
    auth.uid() = user_id
    or (is_public and status = 'answered')
    or public.is_staff()
  );

create policy "staff answer questions"
  on public.questions for update
  using (public.is_staff())
  with check (public.is_staff());

create index questions_open_idx on public.questions (created_at desc)
  where status in ('open', 'draft');
