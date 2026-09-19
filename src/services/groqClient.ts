// groqClient.ts — Bihar Explorer AI Service
// Follows the exact same pattern as destya-fitness-app/src/services/ai/groqClient.ts

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

// 4-tier model fallback chain using valid Groq models
const GROQ_MODELS = [
  'llama-3.1-70b-versatile',
  'llama-3.1-8b-instant',
  'mixtral-8x7b-32768',
  'gemma2-9b-it',
];

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Chat-style Groq API with 5-tier model fallback.
 */
export async function callGroqChatAPI(
  messages: GroqMessage[],
  apiKey: string
): Promise<string> {
  if (!apiKey) throw new Error('Groq API key is missing.');

  let lastError: any = null;

  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 400,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        let parsed: any;
        try { parsed = JSON.parse(errText); } catch { parsed = null; }
        const msg = parsed?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(msg);
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (!reply) throw new Error('Empty response from model: ' + model);
      return reply;
    } catch (error: any) {
      console.warn(`[Groq] Model "${model}" failed:`, error.message || error);
      lastError = error;
    }
  }

  throw new Error(`All Groq fallbacks failed. Last error: ${lastError?.message || 'Unknown'}`);
}
