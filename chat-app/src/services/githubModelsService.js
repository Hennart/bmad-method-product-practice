/**
 * GitHub Models API service for the BMAD Method chat.
 * Calls the /api/chat serverless proxy which forwards to the GitHub Models API.
 */

import { routeToAgent } from './agentRouter.js';

const API_ENDPOINT = '/api/chat';
const MODEL_NAME = import.meta.env.VITE_MODEL_NAME || 'openai/gpt-4o';

/**
 * Sends a message through the /api/chat proxy and streams the response.
 *
 * @param {Array<{role: string, content: string}>} messages - Conversation history
 * @param {(chunk: string) => void} onChunk - Called with each text chunk as it arrives
 * @param {() => void} onDone - Called when the stream is complete
 * @param {(error: string) => void} onError - Called with an error message on failure
 */
export async function sendMessage(messages, onChunk, onDone, onError) {
  // Determine which agent/system prompt to use based on the latest user message
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  const { systemPrompt } = routeToAgent(lastUserMessage?.content || '');

  const requestMessages = [{ role: 'system', content: systemPrompt }, ...messages];

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: requestMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Erreur API (${response.status})`;

      if (response.status === 429) {
        errorMessage = 'Limite de requêtes atteinte. Veuillez patienter avant de réessayer.';
      } else if (errorText) {
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error?.message || errorMessage;
        } catch {
          // Keep generic error message
        }
      }

      onError(errorMessage);
      return;
    }

    // Read the SSE stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');

      // Keep the last (potentially incomplete) line in the buffer
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed || trimmed === 'data: [DONE]') {
          continue;
        }

        if (trimmed.startsWith('data: ')) {
          const jsonStr = trimmed.slice('data: '.length);
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              onChunk(content);
            }
          } catch {
            // Ignore malformed JSON chunks
          }
        }
      }
    }

    onDone();
  } catch (error) {
    if (error.name === 'AbortError') {
      onDone();
    } else {
      onError(
        error.message ||
          'Une erreur inattendue est survenue lors de la connexion à GitHub Models.'
      );
    }
  }
}
