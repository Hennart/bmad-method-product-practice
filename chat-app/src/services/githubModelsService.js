/**
 * Service de communication avec l'API GitHub Models
 * Utilise le streaming SSE pour afficher les réponses token par token
 */

import { fetchEventSource } from '@microsoft/fetch-event-source';

// Valeur par défaut du token dans le fichier .env.example (token non configuré)
const DEFAULT_TOKEN_PLACEHOLDER = 'your_github_token_here';
// URL de l'endpoint GitHub Models (compatible OpenAI)
const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com/chat/completions';

// Récupération des variables d'environnement Vite
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const MODEL_NAME = import.meta.env.VITE_MODEL_NAME || 'gpt-4o-mini';

/**
 * Système prompt contextualisé sur la BMAD Method et le repository
 * Donne à l'IA les connaissances nécessaires pour répondre aux questions
 */
const SYSTEM_PROMPT = `Tu es un assistant expert en BMAD Method (Breakthrough Method of Agile AI-driven Development), 
une méthodologie agile moderne conçue pour maximiser la collaboration entre les équipes de développement et les outils d'IA.

Tu travailles dans le contexte du repository "bmad-method-product-practice" (Hennart/bmad-method-product-practice), 
qui est une pratique produit ADEO basée sur la BMAD Method.

Tes domaines d'expertise incluent :
- La BMAD Method : ses principes, workflows, agents et artefacts
- Le modèle opérationnel produit ADEO (7 dimensions : Strategy, Discovery, Delivery, Launch, Product Life, Sunset)
- Les gates de validation (#1 à #5) du cycle de vie produit
- La hiérarchie JIRA (Initiative → Package → Epic → Story)
- Les dimensions produit (Valuable, Viable, Usable, Feasible)
- La construction et priorisation du backlog
- La planification des roadmaps
- Le framework Global Ready et les standards techniques

Réponds toujours en français sauf si l'utilisateur parle une autre langue.
Sois précis, structuré et pratique dans tes réponses.
Utilise des exemples concrets liés au contexte ADEO/BMAD quand c'est pertinent.`;

/**
 * Envoie un message et streame la réponse token par token
 * @param {Array<{role: string, content: string}>} messages - Historique de la conversation
 * @param {Function} onChunk - Appelé à chaque token reçu avec le texte partiel
 * @param {Function} onDone - Appelé quand la réponse est complète
 * @param {Function} onError - Appelé en cas d'erreur avec le message d'erreur
 */
export async function sendMessage(messages, onChunk, onDone, onError) {
  // Vérification de la présence du token GitHub
  if (!GITHUB_TOKEN || GITHUB_TOKEN === DEFAULT_TOKEN_PLACEHOLDER) {
    onError(
      'Token GitHub non configuré. Veuillez créer un fichier .env avec votre VITE_GITHUB_TOKEN.'
    );
    return;
  }

  // Construction de la liste des messages avec le système prompt en tête
  const messagesWithSystem = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];

  // Indicateur pour éviter de signaler deux fois la même erreur
  let errorAlreadyReported = false;

  try {
    // Utilisation de fetchEventSource pour le streaming SSE
    await fetchEventSource(GITHUB_MODELS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: messagesWithSystem,
        stream: true,
        temperature: 0.7,
        max_tokens: 2048,
      }),

      // Gestion des données reçues en streaming
      onmessage(event) {
        // Signal de fin de stream
        if (event.data === '[DONE]') {
          onDone();
          return;
        }

        try {
          const parsed = JSON.parse(event.data);
          const content = parsed.choices?.[0]?.delta?.content;

          // Appel du callback avec le token reçu
          if (content) {
            onChunk(content);
          }

          // Vérification de la raison d'arrêt
          if (parsed.choices?.[0]?.finish_reason === 'stop') {
            onDone();
          }
        } catch {
          // Ignorer les événements non-JSON (keep-alive, etc.)
        }
      },

      // Gestion des erreurs de connexion
      onerror(error) {
        errorAlreadyReported = true;
        onError(`Erreur de connexion : ${error.message || 'Connexion interrompue'}`);
        throw error; // Stopper les tentatives de reconnexion automatiques
      },

      // Gestion de l'ouverture de la connexion
      async onopen(response) {
        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage = `Erreur API (${response.status})`;

          if (response.status === 401) {
            errorMessage = 'Token GitHub invalide ou expiré. Vérifiez votre VITE_GITHUB_TOKEN.';
          } else if (response.status === 429) {
            errorMessage = 'Limite de requêtes atteinte. Veuillez patienter avant de réessayer.';
          } else if (response.status === 404) {
            errorMessage = `Modèle "${MODEL_NAME}" non trouvé. Vérifiez votre VITE_MODEL_NAME.`;
          } else if (errorText) {
            try {
              const parsed = JSON.parse(errorText);
              errorMessage = parsed.error?.message || errorMessage;
            } catch {
              errorMessage = `${errorMessage}: ${errorText}`;
            }
          }

          errorAlreadyReported = true;
          onError(errorMessage);
          throw new Error(errorMessage);
        }
      },

      // Désactiver la reconnexion automatique
      openWhenHidden: true,
    });
  } catch (error) {
    // Signaler uniquement les erreurs non encore rapportées par onerror/onopen
    if (!errorAlreadyReported) {
      onError(`Erreur inattendue : ${error.message}`);
    }
  }
}
