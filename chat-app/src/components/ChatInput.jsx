/**
 * Zone de saisie du message avec textarea auto-redimensionnable
 * Gère l'envoi avec Entrée et le saut de ligne avec Shift+Entrée
 */

import { useState, useRef, useEffect } from 'react';

/**
 * @param {Object} props
 * @param {Function} props.onSend - Callback appelé avec le texte du message lors de l'envoi
 * @param {boolean} props.isLoading - Désactive la saisie pendant la génération IA
 */
function ChatInput({ onSend, isLoading }) {
  // État local du texte saisi
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize du textarea selon le contenu
  useEffect(() => {
    if (textareaRef.current) {
      // Réinitialise la hauteur pour recalculer
      textareaRef.current.style.height = 'auto';
      // Applique la hauteur selon le contenu (max 200px)
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [inputValue]);

  /**
   * Envoie le message si le contenu n'est pas vide
   */
  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    onSend(trimmed);
    setInputValue('');
  };

  /**
   * Gestion des touches clavier
   * Entrée → envoyer, Shift+Entrée → saut de ligne
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  // Détermine si le bouton d'envoi doit être désactivé
  const isSendDisabled = !inputValue.trim() || isLoading;

  return (
    <div className="chat-input">
      <div className="chat-input__container">
        {/* Zone de saisie */}
        <textarea
          ref={textareaRef}
          className="chat-input__textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Posez votre question sur la BMAD Method..."
          disabled={isLoading}
          rows={1}
          aria-label="Saisir un message"
          aria-multiline="true"
        />

        {/* Bouton d'envoi */}
        <button
          className={`chat-input__send-btn ${isSendDisabled ? 'chat-input__send-btn--disabled' : ''}`}
          onClick={handleSend}
          disabled={isSendDisabled}
          title={isLoading ? "L'IA génère une réponse..." : 'Envoyer le message'}
          aria-label="Envoyer le message"
        >
          {isLoading ? (
            <span className="chat-input__spinner" aria-hidden="true">⏳</span>
          ) : (
            <span aria-hidden="true">➤</span>
          )}
        </button>
      </div>

      {/* Indication du raccourci clavier */}
      <p className="chat-input__hint">
        <kbd>Entrée</kbd> pour envoyer · <kbd>Shift</kbd>+<kbd>Entrée</kbd> pour un saut de ligne
      </p>
    </div>
  );
}

export default ChatInput;
