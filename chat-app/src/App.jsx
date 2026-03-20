/**
 * Composant principal de l'application de chat BMAD Method
 * Gère l'état global : liste des messages, chargement, erreurs
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import ChatHeader from './components/ChatHeader.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import ChatInput from './components/ChatInput.jsx';
import TokenModal from './components/TokenModal.jsx';
import { sendMessage } from './services/githubModelsService.js';

// Clé de stockage du token dans localStorage
const TOKEN_STORAGE_KEY = 'bmad_github_token';

function App() {
  // Liste des messages de la conversation
  const [messages, setMessages] = useState([]);

  // Indique si l'IA est en train de générer une réponse
  const [isLoading, setIsLoading] = useState(false);

  // Message d'erreur éventuel
  const [error, setError] = useState(null);

  // Référence vers le bas de la fenêtre de chat pour l'auto-scroll
  const bottomRef = useRef(null);

  // Token GitHub stocké dans localStorage
  const [githubToken, setGithubToken] = useState(
    () => localStorage.getItem(TOKEN_STORAGE_KEY) || ''
  );

  // Affichage de la modale de configuration du token
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  // Vérification de la présence du token au démarrage
  const isTokenMissing = !githubToken || !githubToken.trim();

  /**
   * Auto-scroll vers le bas à chaque nouveau message ou mise à jour
   */
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  /**
   * Génère un identifiant unique pour les messages via l'API Web Crypto
   * @returns {string} UUID unique
   */
  const generateId = () => crypto.randomUUID();

  /**
   * Efface tous les messages de la conversation
   */
  const handleClear = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  /**
   * Sauvegarde le token et ferme la modale
   * @param {string} token - Token GitHub saisi par l'utilisateur
   */
  const handleSaveToken = useCallback((token) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setGithubToken(token);
    setIsTokenModalOpen(false);
    setError(null);
  }, []);

  /**
   * Envoie un message et gère la réponse en streaming
   * @param {string} text - Texte du message à envoyer
   */
  const handleSend = useCallback(
    async (text) => {
      if (!text.trim() || isLoading) return;

      // Effacer l'erreur précédente
      setError(null);

      // Ajouter le message de l'utilisateur
      const userMessage = {
        id: generateId(),
        role: 'user',
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Préparer le message de l'assistant (vide au départ, rempli par streaming)
      const assistantMessageId = generateId();
      const assistantMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      // Construire l'historique des messages pour l'API (sans le message assistant vide)
      const apiMessages = [...messages, userMessage].map(({ role, content }) => ({
        role,
        content,
      }));

      // Envoi du message à l'API GitHub Models avec streaming
      await sendMessage(
        apiMessages,
        githubToken,
        // onChunk : appelé à chaque token reçu
        (chunk) => {
          setIsLoading(false);
          setMessages((prev) => {
            // Chercher si le message assistant existe déjà
            const existingIndex = prev.findIndex((m) => m.id === assistantMessageId);

            if (existingIndex === -1) {
              // Premier chunk : ajouter le message assistant
              return [...prev, { ...assistantMessage, content: chunk }];
            } else {
              // Chunks suivants : mettre à jour le contenu
              const updated = [...prev];
              updated[existingIndex] = {
                ...updated[existingIndex],
                content: updated[existingIndex].content + chunk,
              };
              return updated;
            }
          });
        },
        // onDone : appelé quand la réponse est complète
        () => {
          setIsLoading(false);
          setMessages((prev) => {
            const exists = prev.some((m) => m.id === assistantMessageId);
            if (!exists) {
              return [...prev, { ...assistantMessage, content: '(Réponse vide)' }];
            }
            return prev;
          });
        },
        // onError : appelé en cas d'erreur
        (errorMessage) => {
          setIsLoading(false);
          setError(errorMessage);
        }
      );
    },
    [messages, isLoading, githubToken]
  );

  return (
    <div className="app">
      {/* En-tête */}
      <ChatHeader
        onClear={handleClear}
        onOpenTokenModal={() => setIsTokenModalOpen(true)}
        isTokenMissing={isTokenMissing}
      />

      {/* Bannière d'erreur token manquant */}
      {isTokenMissing && (
        <div className="app__error-banner" role="alert">
          <strong>⚠️ Token GitHub non configuré</strong>
          <p>
            Pour utiliser cette application, vous devez configurer votre token GitHub.
          </p>
          <button
            className="app__error-action-btn"
            onClick={() => setIsTokenModalOpen(true)}
          >
            🔑 Configurer le token
          </button>
        </div>
      )}

      {/* Bannière d'erreur API */}
      {error && !isTokenMissing && (
        <div className="app__error-banner app__error-banner--api" role="alert">
          <strong>❌ Erreur</strong>
          <p>{error}</p>
          <button className="app__error-dismiss" onClick={() => setError(null)}>
            ✕ Fermer
          </button>
        </div>
      )}

      {/* Fenêtre de conversation */}
      <ChatWindow messages={messages} isLoading={isLoading} bottomRef={bottomRef} />

      {/* Zone de saisie */}
      <ChatInput onSend={handleSend} isLoading={isLoading} />

      {/* Modale de configuration du token */}
      {isTokenModalOpen && (
        <TokenModal
          isOpen={isTokenModalOpen}
          currentToken={githubToken}
          onSave={handleSaveToken}
          onClose={() => setIsTokenModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;