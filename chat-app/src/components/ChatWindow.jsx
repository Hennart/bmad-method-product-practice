/**
 * Fenêtre principale affichant la liste des messages
 * Gère le scroll automatique vers le bas et l'indicateur de frappe
 */

import ChatMessage from './ChatMessage.jsx';

/**
 * @param {Object} props
 * @param {Array} props.messages - Liste des messages à afficher
 * @param {boolean} props.isLoading - Indique si l'IA est en train de générer une réponse
 * @param {Object} props.bottomRef - Référence vers l'élément de fin pour l'auto-scroll
 */
function ChatWindow({ messages, isLoading, bottomRef }) {
  return (
    <div className="chat-window" role="log" aria-live="polite" aria-label="Conversation">
      {/* Message de bienvenue si la conversation est vide */}
      {messages.length === 0 && (
        <div className="chat-window__welcome">
          <span className="chat-window__welcome-icon" aria-hidden="true">
            🚀
          </span>
          <h2 className="chat-window__welcome-title">Bienvenue dans BMAD Method AI Chat</h2>
          <p className="chat-window__welcome-text">
            Posez vos questions sur la BMAD Method, le modèle opérationnel produit ADEO, les gates
            de validation, le framework Global Ready, et bien plus encore.
          </p>
        </div>
      )}

      {/* Liste des messages */}
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {/* Indicateur de frappe (typing indicator) */}
      {isLoading && (
        <div className="chat-message chat-message--assistant" aria-label="L'IA génère une réponse">
          <div className="chat-message__avatar" aria-hidden="true">
            🤖
          </div>
          <div className="chat-message__content">
            <div className="chat-message__bubble typing-indicator">
              <span className="typing-dot" aria-hidden="true"></span>
              <span className="typing-dot" aria-hidden="true"></span>
              <span className="typing-dot" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      )}

      {/* Élément ancre pour l'auto-scroll */}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}

export default ChatWindow;
