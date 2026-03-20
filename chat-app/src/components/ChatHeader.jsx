/**
 * En-tête de l'application de chat
 * Affiche le titre, le sous-titre, le bouton pour effacer la conversation
 * et le bouton pour configurer le token GitHub
 */

/**
 * @param {Object} props
 * @param {Function} props.onClear - Callback pour effacer la conversation
 * @param {Function} props.onOpenTokenModal - Callback pour ouvrir la modale de token
 * @param {boolean} props.isTokenMissing - Indique si le token est manquant
 */
function ChatHeader({ onClear, onOpenTokenModal, isTokenMissing }) {
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

      <div className="chat-header__actions">
        {/* Bouton de configuration du token */}
        <button
          className={`chat-header__token-btn${isTokenMissing ? ' chat-header__token-btn--missing' : ''}`}
          onClick={onOpenTokenModal}
          title={isTokenMissing ? 'Token GitHub non configuré — cliquez pour configurer' : 'Configurer le token GitHub'}
          aria-label="Configurer le token GitHub"
        >
          🔑 Token{isTokenMissing ? ' ⚠️' : ''}
        </button>

        {/* Bouton pour effacer la conversation */}
        <button
          className="chat-header__clear-btn"
          onClick={onClear}
          title="Effacer la conversation"
          aria-label="Effacer la conversation"
        >
          🗑️ Effacer
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;
