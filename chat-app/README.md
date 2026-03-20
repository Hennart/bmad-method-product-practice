# BMAD Method AI Chat 🤖

Une interface de chat IA moderne connectée à la **BMAD Method** (Breakthrough Method of Agile AI-driven Development) via **GitHub Models**.

---

## Prérequis

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- Un **token GitHub** avec accès aux GitHub Models

---

## Installation

```bash
# Depuis le dossier chat-app/
npm install
```

---

## Déploiement sur GitHub Pages

L'application est automatiquement déployée sur **GitHub Pages** à chaque push sur `main` affectant le dossier `chat-app/`.

### URL de l'application déployée

👉 **https://hennart.github.io/bmad-method-product-practice/**

### Prérequis avant le premier déploiement

1. **Activer GitHub Pages** dans les paramètres du repository :
   - Allez dans **Settings** → **Pages**
   - Source : sélectionnez **"GitHub Actions"**

2. **Ajouter les secrets** dans **Settings** → **Secrets and variables** → **Actions** :
   - `VITE_GITHUB_TOKEN` : votre token GitHub avec accès aux GitHub Models
   - `VITE_MODEL_NAME` : le nom du modèle (ex: `gpt-4o-mini`)

> **Note** : Si les secrets ne sont pas définis, l'application s'affichera quand même avec une bannière d'erreur de configuration.

---

## Configuration

1. Copiez le fichier `.env.example` en `.env` :

```bash
cp .env.example .env
```

2. Éditez le fichier `.env` et ajoutez votre token GitHub :

```env
VITE_GITHUB_TOKEN=ghp_votre_token_ici
VITE_MODEL_NAME=gpt-4o-mini
```

---

## Démarrage

```bash
npm run dev
```

L'application s'ouvre automatiquement sur [http://localhost:5173](http://localhost:5173).

---

## Comment obtenir un token GitHub avec les permissions GitHub Models

1. Connectez-vous sur [github.com](https://github.com)
2. Allez dans **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. Cliquez sur **Generate new token (classic)**
4. Donnez un nom au token (ex: `bmad-chat-app`)
5. Sélectionnez la durée d'expiration souhaitée
6. Aucune permission spéciale n'est requise pour GitHub Models — le token de base suffit
7. Cliquez sur **Generate token** et copiez la valeur

> **Note** : GitHub Models est disponible pour tous les utilisateurs GitHub. Consultez la [documentation officielle](https://docs.github.com/en/github-models) pour plus d'informations.

---

## Modèles disponibles

| Modèle | Description |
|--------|-------------|
| `gpt-4o-mini` | Rapide et économique, recommandé pour la plupart des usages ✅ |
| `gpt-4o` | Plus puissant, meilleure compréhension du contexte |
| `meta-llama-3.1-70b-instruct` | Modèle open-source Llama 3.1 |
| `mistral-large-2407` | Modèle Mistral large |
| `phi-3-medium-128k-instruct` | Modèle Phi-3 de Microsoft |

> Modifiez la variable `VITE_MODEL_NAME` dans votre `.env` pour changer de modèle.

---

## Fonctionnalités

- 💬 **Chat en temps réel** avec streaming des réponses token par token
- 🧠 **Contexte BMAD Method** intégré dans le système prompt
- 📜 **Historique de conversation** multi-turns conservé en mémoire
- 🌙 **Interface dark mode** moderne inspirée de GitHub
- 📱 **Responsive** (mobile et desktop)
- ⌨️ **Raccourcis clavier** : `Entrée` pour envoyer, `Shift+Entrée` pour un saut de ligne

---

## Structure du projet

```
chat-app/
├── package.json
├── vite.config.js
├── index.html
├── .env.example
├── README.md
└── src/
    ├── main.jsx              # Point d'entrée React
    ├── App.jsx               # Composant principal
    ├── App.css               # Styles globaux (dark mode)
    ├── components/
    │   ├── ChatHeader.jsx    # En-tête avec titre et bouton reset
    │   ├── ChatWindow.jsx    # Fenêtre scrollable des messages
    │   ├── ChatMessage.jsx   # Bulle de message individuelle
    │   └── ChatInput.jsx     # Zone de saisie avec auto-resize
    └── services/
        └── githubModelsService.js  # Service API GitHub Models
```

---

## Build de production

```bash
npm run build
npm run preview
```

Les fichiers de production sont générés dans le dossier `dist/`.
