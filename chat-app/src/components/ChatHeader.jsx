/**
 * En-tête de l'application de chat
 * Affiche le titre, le sous-titre et le bouton pour effacer la conversation
 */

/**
 * @param {Object} props
 * @param {Function} props.onClear - Callback pour effacer la conversation
 */
function ChatHeader({ onClear }) {
  return (
    <header className="chat-header">
      <div className="chat-header__info">
        {/* Icône et titre */}
        <div className="chat-header__title-row">
          <span className="chat-header__icon" aria-hidden="true">
            🤖
          </span>
          <h1 className="chat-header__title">BMAD Method AI Chat</h1>
        </div>
        {/* Sous-titre */}
        <p className="chat-header__subtitle">Powered by GitHub Models</p>
      </div>

      {/* Bouton pour effacer la conversation */}
      <button
        className="chat-header__clear-btn"
        onClick={onClear}
        title="Effacer la conversation"
        aria-label="Effacer la conversation"
      >
        🗑️ Effacer
      </button>
    </header>
  );
}

export default ChatHeader;
