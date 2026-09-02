/* ---------------------------------------------------------------------------
   The Chat tab is written against this interface, not against any one backend.
   Today it resolves to the staff Q&A queue. When the Copilot/Azure OpenAI
   assistant is ready, implement `LlmChatProvider` to call a Supabase edge
   function that holds the API key server-side, and swap the export below.
   No screen code changes.
--------------------------------------------------------------------------- */
import type { Lang } from '@/i18n/strings'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'staff'
  text: string
  createdAt: string
  /** Present on assistant replies so answers can be traced to curriculum. */
  sourceItemIds?: string[]
}

export interface ChatProvider {
  readonly kind: 'staff-queue' | 'llm'
  list(): Promise<ChatMessage[]>
  send(text: string, lang: Lang): Promise<ChatMessage[]>
}

/** Phase 1: questions go to a queue a LA CASA staff member answers. */
export const staffQueueProvider: ChatProvider = {
  kind: 'staff-queue',
  async list() {
    return []
  },
  async send(text) {
    return [
      {
        id: crypto.randomUUID(),
        role: 'user',
        text,
        createdAt: new Date().toISOString(),
      },
    ]
  },
}

/* Phase 2 sketch — the shape the edge function should expose:
 *
 *   export const llmProvider: ChatProvider = {
 *     kind: 'llm',
 *     async list() { ...read thread from Supabase... },
 *     async send(text, lang) {
 *       const { data } = await supabase!.functions.invoke('lacasa-assistant', {
 *         body: { text, lang },   // key + system prompt stay server-side
 *       })
 *       return data.messages
 *     },
 *   }
 *
 * The assistant must be grounded in src/content only, must answer in the
 * user's chosen language, and must refuse individual medical advice and
 * redirect to the LA CASA team. That guardrail lives in the edge function's
 * system prompt, never in the client.
 */

export const chatProvider: ChatProvider = staffQueueProvider
