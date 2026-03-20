const MODEL_NAME = import.meta.env.VITE_MODEL_NAME || 'gpt-4o';

export async function sendMessage(messages, token, onChunk, onDone, onError) {
  try {
    // Dummy implementation: replace with real streaming logic if needed
    onDone();
  } catch (error) {
    onError(error.message);
  }
}