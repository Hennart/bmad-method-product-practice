/**
 * Modal de saisie du token GitHub
 * Permet à l'utilisateur d'entrer son token pour accéder à GitHub Models
 */

import { useState } from 'react';

/**
 * @param {Object} props
 * @param {boolean} props.isOpen - Afficher ou masquer le modal
 * @param {string} props.currentToken - Token actuel (pour pré-remplir)
 * @param {Function} props.onSave - Callback appelé avec le token saisi
 */
function TokenModal({ isOpen, currentToken, onSave }) {
  const [tokenInput, setTokenInput] = useState(currentToken || '');
  const [showToken, setShowToken] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      onSave(tokenInput.trim());
    }
  };

  return (
    <div className="token-modal__overlay" role="dialog" aria-modal="true" aria-labelledby="token-modal-title">
      <div className="token-modal__container">
        <h2 id="token-modal-title" className="token-modal__title">
          🔑 Configurer votre token GitHub
        </h2>

        <p className="token-modal__description">
          Pour utiliser le chat IA, vous avez besoin d'un token GitHub personnel.
          Il sera stocké uniquement dans votre navigateur (localStorage).
        </p>

        <form onSubmit={handleSubmit} className="token-modal__form">
          <div className="token-modal__input-wrapper">
            <input
              type={showToken ? 'text' : 'password'}
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="ghp_votre_token_ici"
              className="token-modal__input"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="button"
              className="token-modal__toggle-visibility"
              onClick={() => setShowToken(!showToken)}
              aria-label={showToken ? 'Masquer le token' : 'Afficher le token'}
            >
              {showToken ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            className="token-modal__save-btn"
            disabled={!tokenInput.trim()}
          >
            ✅ Enregistrer et commencer
          </button>
        </form>

        <div className="token-modal__help">
          <p>Comment obtenir un token :</p>
          <ol>
            <li>
              Allez sur{' '}
              <a
                href="https://github.com/settings/tokens/new"
                target="_blank"
                rel="noopener noreferrer"
                className="token-modal__link"
              >
                github.com/settings/tokens
              </a>
            </li>
            <li>Cliquez sur <strong>Generate new token (classic)</strong></li>
            <li>Donnez un nom (ex: <code>bmad-chat</code>)</li>
            <li>Aucune permission spéciale requise — cliquez <strong>Generate token</strong></li>
            <li>Copiez et collez le token ci-dessus</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default TokenModal;