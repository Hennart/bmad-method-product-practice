---
project_name: adeo-product-studio
document_type: prd
prd_type: focalisé-mvp
version: 1.0
date: 2026-03-05
author: John (Product Manager)
status: draft
stepsCompleted: [1, 2, 3]
inputDocuments:
  - project-artifacts/planning/product-brief-adeo-product-studio-2026-03-05.md
---

# PRD - ADEO Product Studio MVP
## Product Requirements Document (Focalisé MVP)

**Document Type:** PRD Focalisé MVP  
**Version:** 1.0  
**Date:** 5 mars 2026  
**Auteur:** John (Product Manager)  
**Statut:** Draft

---

## 📋 Vue d'Ensemble

### Contexte

Le **ADEO Product Studio** est une plateforme révolutionnaire destinée aux 78 Product Managers d'ADEO pour transformer la création de PRD d'un processus de 2 semaines à moins d'1 heure (gain de 90%).

### Objectif du Document

Ce PRD Focalisé MVP définit les spécifications fonctionnelles et techniques des **7 fonctionnalités core** pour le MVP 6 mois, en alignement avec le Product Brief.

### Référence au Product Brief

Ce document s'appuie sur :
- **Product Brief ADEO Product Studio** (5 mars 2026)
- **7 Core MVP Features** définies dans le Product Brief
- **3 Personas** : Claire (Mid PM), Marc (Senior PM), Léa (Junior PM)

---

## 🎯 Périmètre MVP (6 mois)

### Fonctionnalités Core

1. **Gate 0** - Validation précoce en 10 secondes
2. **2 Agents MVP** - John (PM) + Pierre (ADEO Delivery Manager)
3. **Living Specification** - Base de connaissances structurée avec traçabilité complète
4. **Constraints as Code** - Validation temps réel des Business Terms ADEO
5. **Prototypes Mozaic Vue** - Génération automatique de prototypes interactifs
6. **JIRA Export** - Export automatique vers hiérarchie 4 niveaux
7. **Dashboard Double Usage** - Suivi pour PMs + Management

---

## 📝 Exigences Fonctionnelles (Functional Requirements)

### FR1 : Gate 0 - Validation Précoce

**Objectif :** Permettre aux PMs d'obtenir un scoring de faisabilité en 10 secondes pour valider leur idée avant d'investir du temps.

**Spécifications :**

**Input :**
- **Format :** Texte libre (textarea, 200-1000 caractères recommandés)
- **Contenu minimum :** Description de l'idée produit
- **Optionnel :** Contexte stratégique, contraintes connues

**OKRs (Objectifs et Key Results) :**
- **Statut MVP :** Définis par configuration mais **non accessibles en saisie utilisateur**
- **Rationale :** Simplification MVP - les OKRs existent dans la configuration ADEO mais ne sont pas exposés dans l'interface de saisie
- **Évolution future :** Phase 2 permettra la sélection explicite des OKRs

**Algorithme de Scoring :**
1. **Analyse sémantique** de l'idée (NLP)
2. **Validation automatique** des 4 dimensions :
   - **Valuable** (Valeur utilisateur) - 0-10
   - **Viable** (Viabilité business) - 0-10
   - **Usable** (Utilisabilité) - 0-10
   - **Feasible** (Faisabilité technique) - 0-10
3. **Score composite** : moyenne pondérée → 0-10
4. **Seuil de passage Gate 0** : ≥ 6/10

**Output détaillé :**
```
GATE 0 - RÉSULTAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Score Global : 7.5/10 ✅ VALIDÉ

Détail par Dimension :
┌─────────────┬───────┬────────────────────────────────────┐
│ Dimension   │ Score │ Commentaire                        │
├─────────────┼───────┼────────────────────────────────────┤
│ Valuable    │ 8/10  │ ✅ Fort alignement OKR "Customer   │
│             │       │    Experience"                      │
├─────────────┼───────┼────────────────────────────────────┤
│ Viable      │ 7/10  │ ⚠️  Budget estimé 200K€ - à         │
│             │       │    valider avec Finance             │
├─────────────┼───────┼────────────────────────────────────┤
│ Usable      │ 8/10  │ ✅ Mozaic Vue compatible           │
├─────────────┼───────┼────────────────────────────────────┤
│ Feasible    │ 7/10  │ ⚠️  Intégration JIRA complexe      │
└─────────────┴───────┴────────────────────────────────────┘

Alignement Stratégique :
• OKR Q1 2026 "Améliorer NPS PMs" : 85% match ✅
• OKR Q2 2026 "Réduire time-to-market" : 70% match ✅

Recommandations :
1. ✅ Continuer vers PRD - potentiel fort
2. ⚠️  Valider budget avec Finance (Dimension Viable)
3. ⚠️  Prévoir POC intégration JIRA (Dimension Feasible)

Prochaine Étape Suggérée :
→ Lancer conversation avec John (PM Agent) pour créer PRD
```

**Critères d'Acceptance :**
- ✅ Scoring retourné en ≤ 10 secondes (P95)
- ✅ Output détaillé pour chaque dimension (0-10 + commentaire)
- ✅ Recommandations actionnables générées
- ✅ Seuil Gate 0 paramétrable (défaut : 6/10)
- ✅ Alignement OKRs calculé automatiquement
- ✅ Historique des Gates 0 sauvegardé

**Dépendances :**
- Base OKRs ADEO (configuration)
- Algorithme NLP pour analyse sémantique
- Base de connaissances des contraintes ADEO

---

### FR2 : 2 Agents MVP - John + Pierre

**Objectif :** Fournir 2 agents conversationnels experts pour accompagner les PMs dans la création de PRD et la validation delivery.

#### Agent 1 : John (Product Manager)

**Rôle :** Expert Product Management, création PRD, discovery utilisateur

**Capacités :**
- **[CP] Create PRD** : Workflow guidé de création PRD
- **[VP] Validate PRD** : Validation complétude et qualité
- **[EP] Edit PRD** : Modifications collaboratives
- **[CE] Create Epics and Stories** : Décomposition en tickets JIRA
- **[IR] Implementation Readiness** : Validation pré-développement
- **[BT] Business Terms** : Accès glossaire ADEO

**Persona :**
- Ton : Collaboratif, pédagogue, challengeant
- Style : Questions ouvertes, reformulation, validation
- Spécialité : Découverte besoins, priorisation, métriques

#### Agent 2 : Pierre (ADEO Delivery Manager)

**Rôle :** Expert delivery ADEO, validation conformité, complexité estimation

**Capacités :**
- **[VD] Validate Delivery** : Validation faisabilité et conformité ADEO
- **[EC] Estimate Complexity** : Estimation charge (Story Points, Jours/Homme)
- **[CR] Check Risks** : Analyse risques techniques/organisationnels
- **[AJ] ADEO JIRA** : Validation hiérarchie 4 niveaux
- **[BT] Business Terms** : Accès glossaire ADEO

**Persona :**
- Ton : Pragmatique, focus delivery, réaliste
- Style : Questionnement technique, identification blockers
- Spécialité : Conformité ADEO, estimation, risques

**Interface Conversationnelle :**
```
┌────────────────────────────────────────────────────┐
│ 💬 Conversation avec John (PM)                    │
├────────────────────────────────────────────────────┤
│ Vous: Je veux créer un portail pour les PMs       │
│                                                    │
│ John: Super idée ! Pour bien comprendre,          │
│       posons-nous quelques questions :            │
│       1. Quel est le problème principal que tu    │
│          veux résoudre ?                          │
│       2. Pour combien de PMs ?                    │
│       3. Qu'est-ce qui existe aujourd'hui ?       │
│                                                    │
│ [Répondre...                                  ]   │
│                                                    │
│ 🎯 Contexte détecté :                             │
│ • Type: Nouveau produit                           │
│ • Phase: Discovery                                │
│ • Gate 0: ✅ Validé (7.5/10)                      │
└────────────────────────────────────────────────────┘
```

**Critères d'Acceptance :**
- ✅ 2 agents distincts avec personas différenciés
- ✅ Menu d'actions contextuelles pour chaque agent
- ✅ Switch entre agents fluide (< 2 secondes)
- ✅ Historique conversationnel persisté
- ✅ Détection automatique du contexte (phase, gate, documents)
- ✅ Recommandations proactives selon l'état du projet

**Dépendances :**
- LLM backend (ex: GPT-4, Claude, ou autre)
- Base de connaissances ADEO (Business Terms, processus, templates)
- Système de gestion de sessions conversationnelles

---

### FR3 : Living Specification - Base de Connaissances Structurée

**Objectif :** Remplacer le PRD statique (document) par une base de connaissances structurée, évolutive, avec traçabilité complète.

**Architecture Conceptuelle :**

```
Living Specification = Graph de Connaissances
├── Nodes (Entités)
│   ├── User Story
│   ├── Feature
│   ├── Epic
│   ├── Requirement (FR/NFR)
│   ├── Persona
│   ├── Metric
│   ├── Risk
│   └── Decision (ADR)
└── Relationships (Liens)
    ├── "dérive de" (Story → Epic)
    ├── "implémente" (Epic → Feature)
    ├── "répond à" (Feature → Requirement)
    ├── "mesure par" (Feature → Metric)
    ├── "risque associé" (Feature → Risk)
    └── "modifié par" (toute entité → historique)
```

**Fonctionnalités :**

1. **Traçabilité Complète (100%)**
   - Chaque élément tracé depuis l'idée initiale
   - Historique des modifications (qui, quand, pourquoi)
   - Liens bidirectionnels entre entités
   
2. **Évolution Continue**
   - Modification sans "versionning" lourd
   - Propagation automatique des changements
   - Notifications sur impacts des modifications

3. **Vues Multi-Dimensionnelles**
   - Vue PM : Features → Stories
   - Vue Tech : Architecture → Composants
   - Vue Business : OKRs → Features
   - Vue Timeline : Roadmap → Sprints

4. **Export Contextuel**
   - Export PRD "classique" à la demande
   - Export pour stakeholders (exécutif summary)
   - Export technique (pour dev team)

**Exemple d'Interface :**

```
┌──────────────────────────────────────────────────────┐
│ 📊 Living Specification - ADEO Product Studio        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Feature: Gate 0 - Validation Précoce               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                      │
│  📈 Métriques liées:                                 │
│  • Temps moyen Gate 0: 8.2s (target: <10s) ✅       │
│  • Taux validation: 72% (target: >60%) ✅           │
│                                                      │
│  🔗 Implémenté par:                                  │
│  • Epic-001: Gate 0 Algorithm                       │
│  • Epic-002: Gate 0 UI                              │
│                                                      │
│  👤 Personas impactées:                              │
│  • Claire (Mid PM): usage quotidien                 │
│  • Léa (Junior PM): usage découverte                │
│                                                      │
│  ⚠️ Risques associés:                                │
│  • R-001: Performance NLP (MOYEN) - mitigé          │
│                                                      │
│  📝 Historique (3 dernières modifications):          │
│  • 2026-03-01: Seuil abaissé 7→6 (Marc)             │
│  • 2026-02-28: Ajout dimension "Viable" (John)      │
│  • 2026-02-25: Création initiale (Claire)           │
│                                                      │
│  [Modifier] [Voir Graphe] [Exporter]                │
└──────────────────────────────────────────────────────┘
```

**Critères d'Acceptance :**
- ✅ 100% traçabilité : toute information remonte à sa source
- ✅ Modification en temps réel avec propagation automatique
- ✅ Export PRD classique en 1 clic
- ✅ Graphe de dépendances visualisable
- ✅ Recherche sémantique dans la base (<2s)
- ✅ Versionning implicite via historique des modifications

**Dépendances :**
- Base de données graph (ex: Neo4j) OU document DB (ex: MongoDB avec références)
- Moteur de recherche sémantique
- Système de notifications/webhooks
- UI de visualisation de graphe

---

### FR4 : Constraints as Code - Validation Business Terms ADEO

**Objectif :** Valider en temps réel que toutes les spécifications respectent le glossaire canonique ADEO (Business Terms), avec blocage si non-conforme.

**Source de Vérité :**
- **Fichier :** `src/bmm/data/adeo-business-terms.csv`
- **Structure :** Term, Definition, Synonyms, Category, Status
- **Maintenance :** Centralisée, mise à jour par Product Ops ADEO

**Mécanisme de Validation :**

1. **Validation Temps Réel (pendant saisie)**
   ```
   PM écrit: "On va créer un dashbord pour les vendeurs"
                                  ^^^^^^^^
   ⚠️ Terme non-conforme détecté !
   
   Suggestion automatique :
   "dashbord" → "dashboard" (terme ADEO validé)
   "vendeurs" → "Collaborateurs Magasin" (terme ADEO validé)
   
   [Accepter] [Ignorer] [En savoir plus]
   ```

2. **Validation Blocante (à la fin de section)**
   ```
   ❌ Impossible de continuer - 3 termes non-conformes :
   
   1. "dashbord" → utilisez "dashboard"
   2. "vendeurs" → utilisez "Collaborateurs Magasin"
   3. "back-office" → utilisez "Système de Gestion"
   
   Raison : Les Business Terms ADEO garantissent la cohérence
            entre tous les produits et équipes.
   
   [Corriger automatiquement] [Corriger manuellement]
   ```

3. **Validation Permissive (suggestions non-blocantes)**
   ```
   💡 Suggestions d'amélioration (optionnelles) :
   
   • "utilisateur" pourrait être précisé :
     - "PM" (Product Manager)
     - "Collaborateur Magasin"
     - "Client Final"
   
   [Appliquer] [Ignorer]
   ```

**Configuration de Sévérité :**

| Catégorie Term | Niveau Validation | Action si Non-Conforme |
|----------------|-------------------|------------------------|
| Core Business  | BLOCANT          | Empêche la sauvegarde  |
| Technical      | AVERTISSEMENT    | Affiche warning        |
| Domain-Specific| SUGGESTION       | Propose alternative    |

**Interface de Gestion :**

```
┌─────────────────────────────────────────────────────┐
│ ⚙️ Constraints as Code - Configuration              │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📋 Business Terms ADEO : 247 termes chargés       │
│ 🔄 Dernière sync : 2026-03-05 09:30               │
│                                                     │
│ Niveau de Validation :                             │
│ ◉ Strict (blocage immédiat)                       │
│ ○ Modéré (avertissement)                           │
│ ○ Permissif (suggestion uniquement)               │
│                                                     │
│ Statistiques PRD actuel :                          │
│ • ✅ Termes conformes : 156                        │
│ • ⚠️  Termes à valider : 3                          │
│ • ❌ Termes non-conformes : 0                      │
│                                                     │
│ [Valider tout] [Voir détails] [Exporter rapport]  │
└─────────────────────────────────────────────────────┘
```

**Critères d'Acceptance :**
- ✅ Validation temps réel pendant la saisie (<500ms latence)
- ✅ Blocage effectif si termes non-conformes (niveau BLOCANT)
- ✅ Suggestions intelligentes basées sur similarité sémantique
- ✅ Rapport de conformité exportable
- ✅ Synchronisation automatique avec src/bmm/data/adeo-business-terms.csv
- ✅ 100% des PRDs générés conformes aux Business Terms ADEO

**Dépendances :**
- Parser CSV pour Business Terms
- Algorithme de matching (fuzzy + sémantique)
- Moteur de règles pour niveaux de validation
- Intégration éditeur temps réel (type Monaco/CodeMirror)

---

### FR5 : Prototypes Mozaic Vue - Génération Automatique

**Objectif :** Générer automatiquement des prototypes interactifs basés sur le Design System ADEO Mozaic Vue, directement depuis les spécifications du PRD.

**Design System ADEO :**
- **Nom :** Mozaic Vue
- **URL :** https://adeo.github.io/mozaic-vue/
- **Composants :** 50+ composants UI (buttons, forms, tables, cards, etc.)
- **Thème ADEO :** Couleurs, typographie, espacements officiels

**Processus de Génération :**

1. **Analyse Automatique du PRD**
   - Extraction des User Stories
   - Identification des écrans nécessaires
   - Détection des interactions (formulaires, tableaux, graphiques)

2. **Mapping Automatique vers Mozaic Vue**
   ```
   User Story: "En tant que PM, je veux saisir une idée en texte libre"
   
   → Génère :
   <template>
     <MTextarea
       label="Décrivez votre idée produit"
       placeholder="Ex: Créer un portail pour..."
       :rows="6"
       v-model="ideaText"
       :max-length="1000"
     />
     <MButton
       variant="primary"
       @click="submitGate0"
     >
       Valider avec Gate 0
     </MButton>
   </template>
   ```

3. **Génération du Prototype Complet**
   - Code Vue.js généré automatiquement
   - Données mockées réalistes
   - Navigation inter-écrans fonctionnelle
   - Interactions de base (formulaires, clics, validations)

4. **Preview Instantané**
   ```
   ┌────────────────────────────────────────────────┐
   │ 🎨 Prototype - ADEO Product Studio             │
   ├────────────────────────────────────────────────┤
   │                                                │
   │  [Écran 1: Gate 0] [Écran 2: PRD] [Écran 3: …] │
   │                                                │
   │  ┌──────────────────────────────────────────┐ │
   │  │  Gate 0 - Validez votre idée             │ │
   │  │                                          │ │
   │  │  Décrivez votre idée produit :           │ │
   │  │  ┌────────────────────────────────────┐  │ │
   │  │  │ Créer un portail pour aider les    │  │ │
   │  │  │ PMs à générer des PRD...           │  │ │
   │  │  │                                    │  │ │
   │  │  └────────────────────────────────────┘  │ │
   │  │                                          │ │
   │  │  [ Valider avec Gate 0 ]                 │ │
   │  └──────────────────────────────────────────┘ │
   │                                                │
   │  💾 [Télécharger Code] 🔗 [Partager URL]      │
   └────────────────────────────────────────────────┘
   ```

**Fonctionnalités du Prototype :**
- ✅ **Interactif** : Formulaires fonctionnels, navigation entre écrans
- ✅ **Données mockées** : Exemples réalistes générés automatiquement
- ✅ **Responsive** : Adapté desktop/tablet/mobile (Mozaic Vue natif)
- ✅ **Partageable** : URL unique pour partager avec stakeholders
- ✅ **Téléchargeable** : Code source Vue.js exportable (.zip)

**Exemple de Génération Automatique :**

```javascript
// Analysé depuis PRD FR1 (Gate 0)
// Généré automatiquement :

<template>
  <div class="gate0-screen">
    <MHeading level="1">Gate 0 - Validez votre idée</MHeading>
    
    <MTextarea
      label="Décrivez votre idée produit"
      placeholder="Ex: Créer un portail qui aide les PMs..."
      v-model="ideaDescription"
      :rows="8"
      :max-length="1000"
      :helper-text="`${ideaDescription.length}/1000 caractères`"
    />
    
    <MButton
      variant="primary"
      size="large"
      @click="submitGate0"
      :loading="isLoading"
    >
      Valider avec Gate 0
    </MButton>
    
    <!-- Résultat Gate 0 (affiché après soumission) -->
    <MCard v-if="gate0Result" class="result-card">
      <MHeading level="2">Résultat Gate 0</MHeading>
      <MGauge :value="gate0Result.score" :max="10" />
      <MText>Score Global : {{ gate0Result.score }}/10</MText>
      <!-- ... suite du résultat ... -->
    </MCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MTextarea, MButton, MCard, MHeading, MText, MGauge } from '@mozaic-ds/vue';

const ideaDescription = ref('');
const isLoading = ref(false);
const gate0Result = ref(null);

const submitGate0 = async () => {
  isLoading.value = true;
  // Mock API call (prototype)
  setTimeout(() => {
    gate0Result.value = {
      score: 7.5,
      dimensions: { /* ... */ }
    };
    isLoading.value = false;
  }, 2000); // Simule 2s de calcul
};
</script>
```

**Critères d'Acceptance :**
- ✅ Prototype généré en <5 minutes après finalisation PRD
- ✅ 100% composants Mozaic Vue (conformité Design System ADEO)
- ✅ Minimum 5 écrans principaux générés pour MVP
- ✅ Interactions de base fonctionnelles (formulaires, navigation)
- ✅ URL de partage générée automatiquement (persistance 30 jours)
- ✅ Code source téléchargeable et modifiable

**Dépendances :**
- Mozaic Vue Design System (npm package)
- Générateur de code Vue.js (template engine)
- Environnement de preview (Vite/Webpack dev server)
- Service d'hébergement prototypes (S3 + CloudFront ou équivalent)

---

### FR6 : JIRA Export - Hiérarchie 4 Niveaux

**Objectif :** Exporter automatiquement les spécifications du PRD vers JIRA en respectant la hiérarchie officielle ADEO à 4 niveaux.

**Hiérarchie ADEO JIRA (rappel) :**

```
Level 1: INITIATIVE (Stratégique)
   ↓
Level 2: PACKAGE (Tactique)
   ↓
Level 3: EPIC (Fonctionnel)
   ↓
Level 4: STORY (Opérationnel)
```

**Règles de Validation :**

| Niveau      | Durée          | Nb Enfants       | Validation        |
|-------------|----------------|------------------|-------------------|
| Initiative  | Multi-années   | 1-5 Packages     | 4D (VVUF) requis |
| Package     | Plusieurs trim | 3-10 Epics       | 4D (VVUF) requis |
| Epic        | 2-6 sprints    | 5-15 Stories     | Tech review      |
| Story       | <1 sprint      | 0 (atomique)     | Story points     |

**Processus d'Export :**

1. **Analyse PRD & Découpage Automatique**
   ```
   PRD: ADEO Product Studio MVP
   
   → Génère automatiquement :
   
   INITIATIVE-001: "Plateforme Product Studio"
   ├── PACKAGE-001: "MVP Core Features"
   │   ├── EPIC-001: "Gate 0 - Validation Précoce"
   │   │   ├── STORY-001: "UI Textarea input Gate 0"
   │   │   ├── STORY-002: "Algorithme scoring 4 dimensions"
   │   │   ├── STORY-003: "Affichage résultat détaillé"
   │   │   └── ...
   │   ├── EPIC-002: "Agents Conversationnels"
   │   │   ├── STORY-010: "Backend LLM integration"
   │   │   ├── STORY-011: "UI Chat interface"
   │   │   └── ...
   │   └── ...
   └── PACKAGE-002: "Infrastructure & Security"
       └── ...
   ```

2. **Validation Pré-Export**
   ```
   ✅ Validation Hiérarchie ADEO
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   
   ✅ Initiative-001 : 4D validés (V:8 V:7 U:8 F:7)
   ✅ Package-001 : 4D validés (V:8 V:7 U:8 F:7)
   ✅ Epic-001 : Tech review OK (Pierre validé)
   ✅ Epic-002 : Tech review OK (Pierre validé)
   ...
   ✅ 47 Stories : Story points estimés
   
   🎯 Prêt pour export JIRA !
   
   [Exporter vers JIRA] [Modifier] [Annuler]
   ```

3. **Export vers JIRA (API)**
   - Création automatique via JIRA REST API
   - Respect des custom fields ADEO
   - Assignation automatique (si configuré)
   - Liens de parenté (Initiative → Package → Epic → Story)

4. **Confirmation & Traçabilité**
   ```
   ✅ Export JIRA Réussi !
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   
   📊 Créé dans JIRA :
   • 1 Initiative : PROD-1234
   • 2 Packages : PROD-1235, PROD-1236
   • 7 Epics : PROD-1237 → PROD-1243
   • 47 Stories : PROD-1244 → PROD-1290
   
   🔗 Liens :
   • Initiative : https://jira.adeo.com/browse/PROD-1234
   • Board Sprint : https://jira.adeo.com/board/123
   
   📋 Traçabilité :
   • Lien PRD → JIRA sauvegardé dans Living Specification
   • Synchronisation bidirectionnelle activée
   
   [Ouvrir dans JIRA] [Voir Dashboard] [OK]
   ```

**Synchronisation Bidirectionnelle (Future - hors MVP) :**
- Changements JIRA → mis à jour dans Living Specification
- Changements PRD → propagés vers JIRA
- Détection conflits et résolution manuelle

**Critères d'Acceptance :**
- ✅ Export complet PRD → JIRA en 1 clic
- ✅ 100% respect hiérarchie 4 niveaux ADEO
- ✅ Validation automatique 4D (Valuable, Viable, Usable, Feasible) avant export
- ✅ Génération automatique Initiative + Packages + Epics + Stories
- ✅ Lien bidirectionnel PRD ↔ JIRA tickets (traçabilité)
- ✅ Export réussi en <2 minutes pour 50 tickets

**Dépendances :**
- JIRA REST API (authentification SSO ADEO)
- Mapping custom fields ADEO JIRA
- Algorithme de découpage PRD → hiérarchie 4 niveaux
- Pierre (Agent) pour validation delivery

---

### FR7 : Dashboard Double Usage - PMs + Management

**Objectif :** Fournir un dashboard unique avec 2 modes (PM individuel + Management vue globale) pour suivre l'usage, la qualité, et l'impact du Product Studio.

#### Mode 1 : Dashboard PM (Vue Individuelle)

**Audience :** Claire, Marc, Léa (chaque PM individuellement)

**Métriques Affichées :**

```
┌──────────────────────────────────────────────────────┐
│ 📊 Mon Tableau de Bord - Claire (PM)                 │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Mes PRDs en Cours                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  🟢 PRD-2024-03-01 : ADEO Product Studio (95%)      │
│  🟡 PRD-2024-02-28 : Mobile App Refonte (60%)       │
│  🔴 PRD-2024-02-20 : CRM v2 (30% - bloqué)          │
│                                                      │
│  Gains de Temps                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Ce mois : 32h économisées (4 jours !) 🎉           │
│  ┌────────────────────────────────────────────────┐ │
│  │ ████████████████░░░░ 80% vs méthode classique  │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  Qualité de mes PRDs                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Score moyen : 8.5/10 ✅                             │
│  • Complétude : 9/10                                │
│  • Clarté : 8/10                                    │
│  • Conformité ADEO : 10/10 (Business Terms OK)      │
│                                                      │
│  Gate 0 - Mes Idées                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Validées : 12 | Refusées : 3 | En cours : 1        │
│  Taux succès : 80% (moyenne ADEO: 72%) 🏆           │
│                                                      │
│  [Créer nouveau PRD] [Voir historique]              │
└──────────────────────────────────────────────────────┘
```

**Actions Disponibles :**
- Créer nouveau PRD
- Reprendre PRD en cours
- Voir historique complet
- Comparer avec moyenne ADEO

#### Mode 2 : Dashboard Management (Vue Globale)

**Audience :** Marc (Senior PM/Manager), Leadership ADEO

**Métriques Affichées :**

```
┌──────────────────────────────────────────────────────┐
│ 📊 Dashboard Management - Vue Globale ADEO           │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Adoption Product Studio                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  PMs actifs : 68/78 (87% - target: 100%)            │
│  ┌────────────────────────────────────────────────┐ │
│  │ Semaine 1: ████░░░░░░  20%                     │ │
│  │ Semaine 2: ████████░░  40%                     │ │
│  │ Semaine 3: ████████████ 60%                    │ │
│  │ Semaine 4: ████████████████ 87% ← Actuel      │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  Gain de Productivité Global                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Temps moyen PRD :                                   │
│  • Avant : 2 semaines (80h)                         │
│  • Maintenant : 1.2h (98.5% de gain !) 🚀           │
│                                                      │
│  Économie totale : 1 360h/mois = 8.5 ETP            │
│                                                      │
│  Qualité Globale                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Score moyen PRDs : 8.2/10 (↑ vs 6.8 avant)         │
│  Conformité Business Terms : 100% ✅                │
│  Passage Gate 1 premier coup : 85% (↑ vs 40%)      │
│                                                      │
│  Alignement Stratégique                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  PRDs alignés OKRs Q1 2026 : 92%                    │
│  Top OKR : "Améliorer NPS PMs" (32 PRDs)            │
│                                                      │
│  NPS Product Studio : +58 (🎯 target: >50) 🏆       │
│                                                      │
│  [Exporter rapport] [Drill-down par équipe]         │
└──────────────────────────────────────────────────────┘
```

**Métriques Détaillées Management :**

1. **User Success Metrics**
   - Adoption rate (PMs actifs / total)
   - Usage quotidien (DAU/MAU)
   - Temps moyen de création PRD
   - NPS Product Studio

2. **Business Impact Metrics**
   - Gain de productivité (% + heures économisées)
   - Taux de passage Gate 1 premier coup
   - Nombre de PRDs générés vs avant
   - Alignement OKRs stratégiques

3. **Platform Quality Metrics**
   - Score qualité moyen PRDs
   - Taux de conformité Business Terms
   - Uptime plateforme (SLA: 99.5%)
   - Performance Gate 0 (<10s P95)

4. **Strategic Alignment Metrics**
   - % PRDs alignés avec OKRs
   - Distribution par initiative stratégique
   - Coverage des 4 dimensions (VVUF)

**Filtres & Drill-Down :**
- Par équipe / BU
- Par période (semaine, mois, trimestre)
- Par PM individuel
- Par type de projet

**Critères d'Acceptance :**
- ✅ 2 modes distincts : PM (individuel) + Management (global)
- ✅ Temps réel : métriques rafraîchies toutes les 5 minutes
- ✅ Export rapport PDF/Excel pour Management
- ✅ Drill-down sur chaque métrique (détails derrière agrégats)
- ✅ Visualisations claires (graphiques, jauges, tendances)
- ✅ Accessibilité : responsive desktop/tablet

**Dépendances :**
- Collecte événements usage (analytics)
- Agrégation métriques (pipeline ETL)
- Base de données métriques (time-series DB type InfluxDB)
- Framework visualisation (ex: Chart.js, D3.js)

---

## 🎯 Exigences Non-Fonctionnelles (Non-Functional Requirements)

### NFR1 : Performance

| Métrique                    | Target        | Criticité |
|-----------------------------|---------------|-----------|
| Gate 0 scoring              | <10s (P95)    | CRITIQUE  |
| Living Spec search          | <2s           | HAUTE     |
| Prototype génération        | <5min         | MOYENNE   |
| JIRA export (50 tickets)    | <2min         | MOYENNE   |
| Dashboard load time         | <3s           | HAUTE     |
| Agent response (chat)       | <2s (P95)     | CRITIQUE  |

**Rationale :**
- Gate 0 et Agent doivent être instantanés pour ne pas casser l'expérience conversationnelle
- Génération prototype peut être async (afficher progress bar)

### NFR2 : Sécurité & Confidentialité

**Authentification :**
- ✅ SSO ADEO obligatoire (Azure AD)
- ✅ Pas de comptes locaux

**Autorisation :**
- ✅ RBAC (Role-Based Access Control) :
  - **PM** : CRUD sur ses propres PRDs, lecture des PRDs publics
  - **Manager** : lecture de tous les PRDs de son équipe
  - **Admin** : accès complet

**Protection Données :**
- ✅ Chiffrement au repos (AES-256)
- ✅ Chiffrement en transit (TLS 1.3)
- ✅ Pas de données sensibles en logs
- ✅ RGPD : droit à l'oubli, export données

**Audit Trail :**
- ✅ Toutes modifications tracées (qui, quoi, quand)
- ✅ Logs conservés 2 ans minimum

### NFR3 : Scalabilité

**Dimensionnement MVP :**
- 78 PMs utilisateurs
- 100 PRDs actifs simultanés
- 500 conversations agent/jour
- 50 Gates 0/jour

**Dimensionnement Phase 2 (objectif 1 an) :**
- 200 PMs (expansion ADEO)
- 500 PRDs actifs simultanés
- 2000 conversations agent/jour
- 200 Gates 0/jour

**Architecture Scalable :**
- ✅ Backend stateless (horizontal scaling)
- ✅ Base de données shardée si >10k PRDs
- ✅ Cache distribué (Redis) pour perfs
- ✅ CDN pour prototypes (assets statiques)

### NFR4 : Disponibilité & Résilience

**SLA :**
- ✅ Uptime : 99.5% (= 3.6h downtime/mois max)
- ✅ Maintenance planifiée : hors heures ouvrées (21h-6h)

**Backup & Recovery :**
- ✅ Backup quotidien automatique (Living Specification DB)
- ✅ RPO (Recovery Point Objective) : 24h max
- ✅ RTO (Recovery Time Objective) : 4h max

**Monitoring & Alerting :**
- ✅ Monitoring 24/7 (métriques infrastructure + applicatives)
- ✅ Alertes automatiques si :
  - Uptime <99.5%
  - Latence Gate 0 >15s
  - Erreur rate >5%

### NFR5 : Utilisabilité & Accessibilité

**UX Design :**
- ✅ 100% composants Mozaic Vue (cohérence Design System ADEO)
- ✅ Responsive : desktop (priorité) + tablet
- ✅ Navigation intuitive : max 3 clics pour toute action

**Accessibilité (A11y) :**
- ✅ WCAG 2.1 Level AA minimum
- ✅ Support lecteurs d'écran
- ✅ Contrastes suffisants (ratio 4.5:1)
- ✅ Navigation clavier complète

**Internationalisation (i18n) :**
- ✅ MVP : Français uniquement
- ✅ Phase 2 : Anglais (ADEO international)
- ✅ Architecture i18n-ready dès MVP

---

## ⚠️ Risques & Mitigation

### Risque 1 : Performance Gate 0 (<10s non tenu)

**Probabilité :** MOYENNE  
**Impact :** ÉLEVÉ (expérience utilisateur dégradée)

**Causes potentielles :**
- Algorithme NLP trop complexe
- Base OKRs trop volumineuse
- Latence LLM backend

**Mitigation :**
- ✅ POC Gate 0 dès Sprint 1 (validation technique)
- ✅ Cache des OKRs en mémoire (pas de DB query)
- ✅ Algorithme NLP léger (BERT small, pas GPT-4)
- ✅ Fallback : scoring simplifié si timeout

**Plan de Contingence :**
- Si <10s impossible : relaxer à <15s + afficher progress

---

### Risque 2 : Intégration JIRA API Complexe

**Probabilité :** ÉLEVÉE  
**Impact :** MOYEN (feature FR6 retardée)

**Causes potentielles :**
- API JIRA custom fields ADEO non documentée
- Authentification SSO complexe
- Rate limiting JIRA API
- Mapping hiérarchie 4 niveaux ambigu

**Mitigation :**
- ✅ POC JIRA API dès Sprint 2
- ✅ Collaboration étroite avec équipe IT ADEO (JIRA admins)
- ✅ Documentation custom fields ADEO complète
- ✅ Tests end-to-end sur instance JIRA staging

**Plan de Contingence :**
- Si blocage : export CSV structuré en attendant API

---

### Risque 3 : Adoption Utilisateurs <100% en 6 mois

**Probabilité :** MOYENNE  
**Impact :** ÉLEVÉ (échec objectif business)

**Causes potentielles :**
- Résistance au changement (habitudes PRD classiques)
- Courbe d'apprentissage trop raide
- Agents pas assez "intelligents" (frustration)
- Bugs/indisponibilités fréquents

**Mitigation :**
- ✅ Programme d'onboarding structuré (formation 2h/PM)
- ✅ Champions Program : 10 PMs early adopters (ambassadeurs)
- ✅ Support dédié : Slack channel + hotline (réponse <2h)
- ✅ Iterations rapides : feedback hebdo + releases bi-weekly
- ✅ Incentives : badge "Power User", success stories

**Plan de Contingence :**
- Si adoption <70% à M+3 : audit UX + interviews utilisateurs

---

### Risque 4 : Dérive de Scope (Features hors MVP)

**Probabilité :** ÉLEVÉE  
**Impact :** MOYEN (délai 6 mois non tenu)

**Causes potentielles :**
- Demandes stakeholders additionnelles
- PMs demandent features Phase 2 pendant MVP
- Complexité sous-estimée

**Mitigation :**
- ✅ Product Brief clair avec "Out of Scope MVP" explicite
- ✅ Gouvernance : revue bi-weekly avec sponsor (go/no-go features)
- ✅ Backlog Phase 2 visible mais frozen pour MVP
- ✅ Priorisation stricte : 7 features core non négociables

**Plan de Contingence :**
- Si scope creep : descoper FR5 (Prototypes) vers Phase 2

---

### Risque 5 : Dépendance LLM Backend (coût + performance)

**Probabilité :** MOYENNE  
**Impact :** ÉLEVÉ (coûts opérationnels ou performance)

**Causes potentielles :**
- Coût API GPT-4/Claude trop élevé (500 conv/jour × 30 jours)
- Latence API externe (>2s)
- Indisponibilité provider (OpenAI down)

**Mitigation :**
- ✅ Évaluation multi-providers (GPT-4, Claude, Mistral, LLama)
- ✅ Architecture vendor-agnostic (abstraction layer)
- ✅ Cache conversations fréquentes
- ✅ Fallback : dégradation gracieuse (réponses templates si LLM down)

**Plan de Contingence :**
- Si coûts explosent : switch vers modèle open-source (Mistral/LLama fine-tuné)

---

## 📅 Timeline & Dépendances

### Timeline MVP (6 mois)

**Sprint 0 (Setup) - 2 semaines**
- Setup infrastructure (CI/CD, envs, monitoring)
- POCs techniques (Gate 0 perf, JIRA API)

**Sprints 1-4 (Features Core 1-3) - 8 semaines**
- FR1: Gate 0
- FR2: 2 Agents
- FR3: Living Specification (base)

**Sprints 5-8 (Features Core 4-6) - 8 semaines**
- FR4: Constraints as Code
- FR5: Prototypes Mozaic Vue
- FR6: JIRA Export

**Sprints 9-10 (Dashboard & Stabilisation) - 4 semaines**
- FR7: Dashboard Double Usage
- Bugs fixes
- Tests end-to-end

**Sprints 11-12 (Beta & Rollout) - 4 semaines**
- Beta avec 10 PMs champions
- Rollout progressif 78 PMs
- Formation & support

### Équipe Requise

**Core Team (temps plein 6 mois) :**
- 1 Product Manager (John - nous !)
- 1 Architect/Tech Lead
- 3 Développeurs Full-Stack (Vue.js + Backend)
- 1 UX Designer (Mozaic Vue expert)
- 1 QA Engineer

**Support Team (temps partiel) :**
- 1 ADEO Delivery Manager (Pierre - validation)
- 1 IT ADEO (JIRA API support)
- 1 Product Ops (Business Terms maintenance)

### Dépendances Externes

**Techniques :**
- ✅ Accès JIRA API ADEO (IT team)
- ✅ Accès SSO Azure AD ADEO
- ✅ Infrastructure cloud (AWS/Azure/GCP)
- ✅ LLM backend (OpenAI/Claude API ou équivalent)

**Business :**
- ✅ Budget validé (~300K€ pour 6 mois)
- ✅ Sponsor exec confirmé
- ✅ Accès 10 PMs champions (beta testers)

---

## ✅ Critères de Succès MVP

**Mesurés à M+6 (fin MVP) :**

1. **Adoption :**
   - ✅ 100% PMs (78/78) ont créé au moins 1 PRD
   - ✅ 60% PMs utilisent quotidiennement (DAU/MAU >60%)

2. **Performance :**
   - ✅ Temps moyen création PRD : <2h (vs 80h avant = 97.5% gain)
   - ✅ Gate 0 : <10s (P95)

3. **Qualité :**
   - ✅ 100% PRDs conformes Business Terms ADEO
   - ✅ Score qualité moyen PRDs : >8/10
   - ✅ Taux passage Gate 1 premier coup : >70% (vs 40% avant)

4. **Satisfaction :**
   - ✅ NPS Product Studio : >50
   - ✅ 0 bugs critiques en production

5. **Business Impact :**
   - ✅ ROI : économie 1200h/mois = 7.5 ETP (vs coût 1.5 ETP équipe)

---

## 🔮 Évolution Post-MVP (Phases 2 & 3)

**Phase 2 (M+7 à M+12) :**
- Agents additionnels (Designer, Architect, QA)
- Synchronisation bidirectionnelle JIRA
- Prototypes avancés (animations, workflows)
- Multi-langue (Anglais)

**Phase 3 (M+13 à M+18) :**
- AI Assistant proactif (suggestions automatiques)
- Intégration analytics produit (Mixpanel/Amplitude)
- Templates PRD par domaine (e-commerce, mobile, data, etc.)
- API publique (intégration outils tiers)

---

## 📚 Références

1. **Product Brief ADEO Product Studio** (5 mars 2026)
2. **ADEO Product Operating Model** (7 dimensions)
3. **ADEO Product Lifecycle** (6 phases, 5 Gates)
4. **ADEO Business Terms Glossary** (src/bmm/data/adeo-business-terms.csv)
5. **Mozaic Vue Design System** (https://adeo.github.io/mozaic-vue/)
6. **JIRA Hierarchy ADEO** (4 niveaux : Initiative→Package→Epic→Story)

---

## ✍️ Signatures & Validation

**Créé par :** John (Product Manager Agent)  
**Date :** 5 mars 2026  
**Version :** 1.0 (Draft)

**Prochaines Étapes :**
1. ✅ **Sauvegarder ce PRD** (fait)
2. 🔄 **Créer Architecture Technique** (Winston - en cours)
3. ⏳ Créer Epics & Stories (décomposition JIRA)
4. ⏳ Validation stakeholders (sponsor exec)
5. ⏳ Kick-off développement (Sprint 0)

---

*Document généré avec ADEO Product Studio (dogfooding !) 🚀*
