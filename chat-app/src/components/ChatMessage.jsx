/**
 * Affiche un message individuel dans la conversation
 * Gère l'affichage différencié entre les messages utilisateur et IA
 * Supporte le markdown basique (gras, code inline) sans librairie externe
 */

/**
 * Analyse et formate le texte avec du markdown basique
 * Supporte : **gras**, `code inline`, et les sauts de ligne
 * @param {string} text - Texte brut à formater
 * @returns {Array} Tableau d'éléments React
 */
function parseBasicMarkdown(text) {
  if (!text) return [];

  // Découpage par lignes pour gérer les sauts de ligne
  const lines = text.split('\n');
  const result = [];

  lines.forEach((line, lineIndex) => {
    if (lineIndex > 0) {
      result.push(<br key={`br-${lineIndex}`} />);
    }

    // Analyse de la ligne pour détecter les patterns markdown
    const segments = [];
    let remaining = line;
    let segIndex = 0;

    while (remaining.length > 0) {
      // Détection du gras : **texte**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Détection du code inline : `code`
      const codeMatch = remaining.match(/`([^`]+)`/);

      // Détermine quel pattern apparaît en premier
      const boldPos = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
      const codePos = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity;

      if (boldPos === Infinity && codePos === Infinity) {
        // Aucun pattern trouvé, texte brut
        segments.push(<span key={`seg-${lineIndex}-${segIndex}`}>{remaining}</span>);
        break;
      }

      if (boldPos <= codePos && boldMatch) {
        // Texte avant le gras
        if (boldPos > 0) {
          segments.push(
            <span key={`seg-${lineIndex}-${segIndex}`}>{remaining.slice(0, boldPos)}</span>
          );
          segIndex++;
        }
        // Texte en gras
        segments.push(<strong key={`bold-${lineIndex}-${segIndex}`}>{boldMatch[1]}</strong>);
        segIndex++;
        remaining = remaining.slice(boldPos + boldMatch[0].length);
      } else if (codeMatch) {
        // Texte avant le code
        if (codePos > 0) {
          segments.push(
            <span key={`seg-${lineIndex}-${segIndex}`}>{remaining.slice(0, codePos)}</span>
          );
          segIndex++;
        }
        // Code inline
        segments.push(<code key={`code-${lineIndex}-${segIndex}`}>{codeMatch[1]}</code>);
        segIndex++;
        remaining = remaining.slice(codePos + codeMatch[0].length);
      }
    }

    result.push(...segments);
  });

  return result;
}

/**
 * Formate un timestamp en heure locale lisible
 * @param {Date} date - Date à formater
 * @returns {string} Heure formatée (ex: "14:32")
 */
function formatTime(date) {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * @param {Object} props
 * @param {Object} props.message - Message à afficher
 * @param {string} props.message.role - 'user' ou 'assistant'
 * @param {string} props.message.content - Contenu du message
 * @param {Date} props.message.timestamp - Horodatage du message
 */
function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message chat-message--${isUser ? 'user' : 'assistant'}`}>
      {/* Avatar */}
      <div className="chat-message__avatar" aria-hidden="true">
        {isUser ? '👤' : '🤖'}
      </div>

      {/* Contenu du message */}
      <div className="chat-message__content">
        <div className="chat-message__bubble">{parseBasicMarkdown(message.content)}</div>
        {/* Horodatage */}
        <time className="chat-message__time" dateTime={message.timestamp.toISOString()}>
          {formatTime(message.timestamp)}
        </time>
      </div>
    </div>
  );
}

export default ChatMessage;
