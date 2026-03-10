# Product Vision - Data Compliance
## Leroy Merlin France

---

## 📋 Document Information

- **Produit** : Data Compliance - Référentiel des Consentements & Gestion RGPD
- **Date de création** : 9 mars 2026
- **Version** : 1.0 - Draft
- **Statut** : En construction
- **Durée de la vision** : 18-24 mois

---

## 🎯 Vision Statement

> **"Data Compliance devient la plateforme centrale de confiance qui permet à Leroy Merlin de maximiser la collecte de données client en toute légalité, tout en respectant scrupuleusement les choix de chacun."**
> 
> _Notre ambition : transformer la conformité RGPD d'une contrainte légale en avantage concurrentiel, en devenant le leader de la transparence et du respect du client dans le retail._

---

## 📊 Contexte Actuel

### Situation
- **Produit en production** : Référentiel central des consentements pour tous les clients identifiés
- Gère les finalités de traitement RGPD (marketing, personnalisation, avis clients, etc.)
- Gère les droits RGPD : droit à l'oubli, purge pour inactivité, droit d'accès
- **Gap critique** : Gestion des cookies web insuffisante (lanceur de bannières existant mais non intégré)
- **Besoin identifié** : Clarifier la vision et étendre le périmètre (cookies, multi-BU)

### Périmètre fonctionnel actuel
- ✅ Référentiel des consentements clients identifiés
- ✅ Gestion des finalités de traitement (marketing, personnalisation, avis, etc.)
- ✅ Droit à l'oubli (RGPD)
- ✅ Purge pour inactivité
- ✅ Droit d'accès (export données personnelles)
- ⚠️ Gestion cookies web : **partiellement couvert** (lanceur de bannières isolé)
- ❌ Bannière cookies unifiée multi-BU : **non couvert**

### Utilisateurs & Parties Prenantes
- **Clients finaux** : Particuliers et Pro Leroy Merlin (contrôle de leurs données)
- **Équipes Marketing** : Utilisation des consentements pour campagnes
- **Équipes Data/Analytics** : Utilisation légale des données client
- **Équipes Legal/DPO** : Conformité RGPD, audits, preuve légale
- **Équipes IT/Produit** : Intégration des consentements dans les systèmes
- **BU ADEO** : Besoin d'une solution cookies mutualisée

---

## 📈 Enjeux & Objectifs Business

### Objectif Business Principal
**Maximiser la quantité de données client collectées EN TOUTE LÉGALITÉ** pour :
- 🎯 Personnaliser l'expérience client
- 🎯 Optimiser les campagnes marketing (ciblage précis)
- 🎯 Améliorer la connaissance client (analytics, IA)
- 🎯 Générer plus de valeur business (conversion, fidélisation)

### Enjeu Stratégique : De la Contrainte à l'Avantage
**Aujourd'hui** : Conformité RGPD = contrainte légale, frein à l'exploitation des données  
**Demain** : Conformité RGPD = avantage concurrentiel, levier de confiance client

### KPIs Clés

| Métrique | Baseline | Objectif | Impact Business |
|----------|----------|----------|-----------------|
| **Taux d'opt-in marketing** | [À mesurer] | +20-30% | Plus de clients contactables |
| **Taux d'opt-in personnalisation** | [À mesurer] | +25-35% | Données exploitables pour IA |
| **Couverture cookies (% pages)** | Partiel | 100% | Conformité totale + tracking légal |
| **Taux d'acceptation cookies** | [À mesurer] | 50-60% | Max de données analytics |
| **Requêtes RGPD traitées** | [Manuel] | Automatisé <24h | Réduction charge, conformité |
| **BU utilisant la plateforme cookies** | 1 (LM FR) | Toutes BU ADEO | Mutualisation, économies |

---

## 🌍 Contexte Externe & Opportunités

### Menaces / Contraintes
- 🔴 **Réglementation de plus en plus stricte** : RGPD évolue, sanctions alourdies
- 🔴 **Contrôles CNIL** : Risque d'audit, amendes potentielles
- 🔴 **Attentes clients** : Transparence absolue, contrôle total sur leurs données
- 🔴 **Évolution cookies tiers** : Disparition progressive (Chrome, Safari)
- 🔴 **Complexité multi-BU** : Chaque BU ADEO gère ses cookies différemment = risque

### Opportunités
- 🟢 **Confiance client = différenciation** : Transparence radicale comme avantage concurrentiel
- 🟢 **Données first-party** : Fin des cookies tiers = valorisation des données propres
- 🟢 **Mutualisation ADEO** : Plateforme unique = économies + cohérence groupe
- 🟢 **IA & Personnalisation** : Plus de consentements = plus de valeur exploitable
- 🟢 **Conformité proactive** : Anticiper les règles = éviter sanctions + bonne image

---

## 🎯 Vision Produit (18-24 mois)

### Pour...
**Les clients Leroy Merlin ET les équipes internes (Marketing, Data, Legal)**

### Qui...
**Veulent respecter et exploiter les données personnelles de manière transparente, légale et efficace**

### Le produit Data Compliance...
**Est la plateforme centrale de gestion des consentements et de la conformité RGPD**

### Qui...
**Maximise la collecte et l'exploitation légale des données client, tout en garantissant transparence totale et contrôle absolu au client sur ses données personnelles**

### Contrairement à...
**Les solutions fragmentées (cookies séparés, consentements dispersés, gestion manuelle RGPD) qui créent des risques légaux et limitent l'exploitation des données**

### Notre produit...
**Unifie consentements + cookies + droits RGPD dans une plateforme unique, transparente pour le client et puissante pour le business, déployable à l'échelle du groupe ADEO**

---

## 🚀 Piliers Stratégiques

### 1. 🍪 Gestion Cookies Unifiée & Multi-BU
**Objectif** : Devenir LA plateforme cookies de référence pour toutes les BU ADEO

**Périmètre** :
- Intégration complète du lanceur de bannières existant dans Data Compliance
- Gestion centralisée de TOUTES les bannières cookies (web, mobile web)
- Configuration par BU : chaque BU peut personnaliser sa bannière (branding, langues)
- Conformité totale : respect RGPD, ePrivacy, lois locales
- Analytics : mesure taux d'acceptation, optimisation continue

**Fonctionnalités clés** :
- Bannière cookies contextuelle et non intrusive
- Granularité des choix (cookies strictement nécessaires / analytics / marketing / personnalisation)
- Mémorisation des choix client
- Recueil de consentement progressif (pas tout d'un coup)
- API pour bloquer/autoriser les trackers en temps réel

**Résultat attendu** : 
- 100% des pages web couvertes
- Mutualisation = économies pour le groupe
- Taux d'acceptation optimisé (50-60%)
- Conformité légale garantie

---

### 2. 📊 Maximisation du Consentement Légal
**Objectif** : Augmenter drastiquement le nombre de clients ayant consenti à l'utilisation de leurs données

**Approche** :
- **UX/UI optimisée** : Bannières et formulaires de consentement clairs, rassurants, non intrusifs
- **Moment optimal** : Demander le consentement au bon moment du parcours client (pas tout de suite)
- **Valeur échangée** : Expliquer clairement le bénéfice pour le client (personnalisation, offres exclusives)
- **Consentement progressif** : Ne pas tout demander d'un coup, par étape
- **Preuve sociale** : "85% de nos clients choisissent de personnaliser leur expérience"
- **Révocabilité facile** : Le client peut changer d'avis facilement = confiance

**A/B Testing systématique** :
- Tester différentes formulations
- Tester différents moments de demande
- Tester différents niveaux de granularité
- Mesurer impact sur taux d'opt-in ET satisfaction client

**Résultat attendu** :
- +20-30% de taux d'opt-in marketing
- +25-35% de taux d'opt-in personnalisation
- Clients informés et en contrôle = confiance renforcée

---

### 3. 🛡️ Conformité RGPD Automatisée & Proactive
**Objectif** : Garantir conformité totale et anticiper les évolutions réglementaires

**Fonctionnalités** :
- **Droit à l'oubli automatisé** : Traitement <24h, propagation dans tous les systèmes
- **Droit d'accès automatisé** : Export complet des données client <24h
- **Purge intelligente** : Détection automatique inactivité + purge selon règles métier
- **Audit trail complet** : Traçabilité de tous les consentements, modifications, suppressions
- **Dashboard conformité** : Visibilité temps réel pour Legal/DPO
- **Alertes proactives** : Notification si risque de non-conformité détecté

**Anticipation réglementaire** :
- Veille juridique continue
- Adaptation automatique aux nouvelles réglementations
- Tests de conformité automatisés
- Documentation à jour en continu

**Résultat attendu** :
- Risque d'amende CNIL réduit à zéro
- Charge manuelle Legal/IT divisée par 10
- Confiance client maximale (transparence totale)
- Data Compliance comme preuve de conformité lors d'audits

---

### 4. 🔗 Intégration & Activation Data
**Objectif** : Rendre les consentements exploitables par tous les systèmes en temps réel

**Architecture** :
- **API temps réel** : Tout système peut interroger Data Compliance avant d'utiliser une donnée
- **Propagation événementielle** : Changement de consentement → notification automatique de tous les systèmes abonnés
- **Segments activables** : "Tous les clients ayant consenti à la personnalisation" disponible pour Marketing/Data
- **Intégration native** : Connecteurs prêts à l'emploi (CRM, ESP, CDP, Analytics, etc.)

**Cas d'usage** :
- Marketing lance une campagne email → Data Compliance filtre automatiquement les non-consentants
- Analytics collecte une donnée → Data Compliance vérifie le consentement avant stockage
- IA personnalise l'expérience → Data Compliance autorise uniquement pour les clients consentants

**Résultat attendu** :
- Zéro utilisation de données sans consentement
- Activation data simplifiée pour les métiers
- Conformité by design dans tous les systèmes

---

## 💡 Cas d'Usage Futurs (Exemples)

### Scénario 1 : Le client transparent
_"Sophie veut comprendre et contrôler l'utilisation de ses données"_
- Visite son espace "Mes données personnelles" sur leroymerlin.fr
- Voit clairement : quelles données sont collectées, pourquoi, qui y accède
- Peut activer/désactiver chaque finalité en un clic
- Reçoit une confirmation immédiate : "Vos choix sont pris en compte instantanément"
- **Résultat** : Sophie fait confiance à Leroy Merlin et consent à la personnalisation

---

### Scénario 2 : La bannière cookies optimisée
_"Marc visite leroymerlin.fr pour la première fois"_
- Bannière cookies apparaît, claire et concise : "Nous utilisons des cookies pour améliorer votre expérience"
- 3 options visibles : "Tout accepter" / "Personnaliser" / "Refuser"
- Marc clique "Personnaliser" → interface simple : Nécessaires (toujours actifs) / Analytics / Marketing / Personnalisation
- Marc accepte Analytics + Personnalisation, refuse Marketing
- Choix mémorisés, Marc ne sera plus jamais sollicité
- **Résultat** : 60% d'acceptation au lieu de 30% avec bannière intrusive

---

### Scénario 3 : Le droit à l'oubli automatisé
_"Claire souhaite supprimer toutes ses données Leroy Merlin"_
- Claire clique "Supprimer mes données" dans son compte
- Confirmation explicite demandée (prévention erreur)
- Data Compliance lance automatiquement la purge dans TOUS les systèmes (CRM, analytics, ESP, etc.)
- Claire reçoit une confirmation sous 24h : "Vos données ont été supprimées"
- Traçabilité complète conservée pour preuve légale (anonymisée)
- **Résultat** : Conformité RGPD garantie, zéro intervention manuelle, client satisfait

---

### Scénario 4 : Le Marketing légal et performant
_"L'équipe Marketing veut lancer une campagne d'offres personnalisées"_
- Marketing définit la cible : "Clients ayant acheté des outils électriques + consentement marketing"
- Data Compliance filtre automatiquement : 150K clients consentants identifiés
- Campagne lancée uniquement sur cette audience
- Résultat : +40% de taux d'ouverture (clients attendent ces communications)
- Zéro plainte, zéro risque RGPD
- **Résultat** : Marketing efficace ET légal

---

## 🎨 Principes de Conception

1. **Privacy by Design** - La protection des données est intégrée dès la conception, pas ajoutée après
2. **Transparency First** - Le client doit TOUJOURS savoir ce qui est fait de ses données
3. **Control to User** - Le client doit pouvoir modifier ses choix en 2 clics maximum
4. **Legal by Default** - L'utilisation d'une donnée sans consentement doit être techniquement impossible
5. **Activation Simple** - Les équipes métier doivent pouvoir exploiter les consentements sans friction
6. **Multi-BU Ready** - Architecture pensée pour le groupe ADEO, pas juste Leroy Merlin France

---

## 🚧 Anti-Patterns à Éviter

❌ **Dark Patterns** : Rendre difficile le refus de consentement (boutons trompeurs, etc.)
❌ **Tout ou rien** : Forcer le client à tout accepter ou ne rien avoir
❌ **Opacité** : Ne pas expliquer clairement l'utilisation des données
❌ **Conformité façade** : Avoir une bannière mais ne pas respecter les choix derrière
❌ **Silos cookies** : Chaque BU gère ses cookies différemment = risque + inefficacité
❌ **RGPD = frein** : Voir la conformité comme une contrainte et non un levier

---

## 📅 Roadmap de Vision (Grandes Étapes)

### Phase 1 (T1-T2 2026) : Cookies & Fondations
- Intégration complète lanceur de bannières dans Data Compliance
- Déploiement bannière cookies optimisée sur leroymerlin.fr (100% pages)
- A/B testing bannières pour maximiser taux d'acceptation
- Dashboard analytics cookies (taux acceptation, par type, par page)

### Phase 2 (T3-T4 2026) : Optimisation & Multi-BU
- Optimisation UX consentements (centre de préférences client)
- Déploiement plateforme cookies pour 2-3 autres BU ADEO (pilote)
- Automatisation complète droits RGPD (oubli, accès, purge <24h)
- API temps réel pour intégration dans tous les systèmes

### Phase 3 (T1-T2 2027) : Excellence & Groupe
- Déploiement généralisé toutes BU ADEO
- Personnalisation avancée (IA pour recommander le bon moment de demande consentement)
- Data Compliance comme référence RGPD du retail
- Certification externe (preuve conformité pour clients/régulateurs)

---

## 🤝 Parties Prenantes

### Équipes Internes
- **Product Team Data Compliance** : Porteur de la vision
- **Legal / DPO** : Conformité RGPD, validation juridique
- **Marketing** : Utilisation des consentements, campagnes
- **Data / Analytics** : Exploitation légale des données client
- **Engineering** : Implémentation technique, intégrations
- **UX/UI** : Conception bannières, centre de préférences
- **Sécurité** : Protection des données de consentement

### Utilisateurs Finaux
- Clients Particuliers et Pro Leroy Merlin
- Visiteurs anonymes (avant authentification)

### BU ADEO
- Leroy Merlin France (déjà en production)
- Autres BU ADEO (déploiement futur plateforme cookies)

### Dépendances Techniques
- Équipes CRM (synchronisation consentements)
- Équipes ESP (Email Service Provider)
- Équipes CDP (Customer Data Platform)
- Équipes Analytics / BI
- Équipes plateforme e-commerce

---

## ✅ Critères de Succès (18-24 mois)

### Métriques Quantitatives
- [ ] Taux d'opt-in marketing : +20-30%
- [ ] Taux d'opt-in personnalisation : +25-35%
- [ ] Couverture cookies : 100% des pages web
- [ ] Taux d'acceptation cookies : 50-60%
- [ ] Traitement droit à l'oubli : <24h (vs plusieurs jours aujourd'hui)
- [ ] BU ADEO utilisant la plateforme : 5+ BU
- [ ] Zéro amende CNIL / incident RGPD

### Métriques Qualitatives
- [ ] Legal/DPO : "Data Compliance est notre assurance conformité"
- [ ] Marketing : "On peut exploiter beaucoup plus de données, en toute légalité"
- [ ] Clients : NPS > 8/10 sur la transparence données
- [ ] Groupe ADEO : Data Compliance reconnu comme référence groupe

---

## 🚀 Quick Wins (3 premiers mois)

### Priorité #1 : Déploiement bannière cookies 100% pages
**Objectif** : Conformité totale + collecte données analytics/marketing légale

**Actions** :
- Audit : identifier toutes les pages sans bannière
- Intégration technique du lanceur dans Data Compliance
- Déploiement progressif par section du site
- Monitoring taux d'acceptation par type de page

**Impact attendu** : Conformité légale garantie + base de données analytics légitime

---

### Priorité #2 : Optimisation UX bannière cookies
**Objectif** : Maximiser le taux d'acceptation

**Actions** :
- A/B testing : 3-4 variantes de bannières (formulation, design, moment)
- Simplification : 1 clic pour accepter, 2 clics pour personnaliser
- Valeur échangée : expliquer le bénéfice client (personnalisation, offres)
- Analytics détaillé : mesure par variante, par page, par device

**Impact attendu** : +20-30% de taux d'acceptation cookies analytics/marketing

---

### Priorité #3 : Dashboard Legal/DPO
**Objectif** : Visibilité temps réel sur la conformité

**Actions** :
- Dashboard avec KPIs clés : nb consentements, taux opt-in, requêtes RGPD, risques
- Alertes automatiques si anomalie détectée
- Export pour audits CNIL
- Documentation à jour automatiquement

**Impact attendu** : Legal/DPO autonomes, réduction charge support, preuve conformité

---

## ⚠️ Risques & Plans de Mitigation

### Risque #1 : Baisse du taux d'opt-in (peur de demander trop)
**Description** : En étant plus transparent et en demandant explicitement les consentements, on risque de perdre des clients qui acceptaient "passivement" avant.

**Plan de mitigation** :
- **A/B Testing rigoureux** : Mesurer l'impact réel, ne pas supposer
- **UX optimisée** : Bannière non intrusive, claire, rassurante
- **Valeur échangée** : Expliquer le bénéfice concret pour le client
- **Progressivité** : Ne pas tout demander d'un coup
- **Benchmark** : S'inspirer des meilleures pratiques du marché
- **Accompagnement** : Former les équipes à la "demande de consentement positive"

**Indicateur** : Taux d'opt-in mesuré en continu, ajustement rapide si baisse

---

### Risque #2 : Complexité technique Multi-BU
**Description** : Déployer la plateforme cookies pour toutes les BU ADEO = environnements techniques différents, contraintes locales, langues multiples.

**Plan de mitigation** :
- **Architecture modulaire** : Configuration par BU (branding, langues, règles)
- **API standardisée** : Intégration simple quel que soit le stack technique
- **POC sur 2-3 BU pilotes** avant généralisation
- **Documentation exhaustive** : Guides d'intégration, FAQ, support dédié
- **Équipe support Multi-BU** : Accompagnement au déploiement
- **Gouvernance claire** : Qui décide quoi, qui valide les configs

**Indicateur** : Délai de déploiement par BU, satisfaction BU pilotes

---

### Risque #3 : Évolution réglementaire (nouvelles lois RGPD/ePrivacy)
**Description** : Le cadre légal évolue constamment. Risque de non-conformité si Data Compliance ne s'adapte pas rapidement.

**Plan de mitigation** :
- **Veille juridique continue** : Partenariat avec Legal, abonnement veilles spécialisées
- **Architecture flexible** : Possibilité d'ajouter de nouvelles règles sans refonte
- **Tests de conformité automatisés** : Détection proactive des écarts
- **Communication proactive** : Alerter Legal/DPO dès qu'une évolution est détectée
- **Budget dédié** : Réserve pour adaptations réglementaires urgentes

**Indicateur** : Délai d'adaptation aux nouvelles réglementations (cible : <1 mois)

---

## 🎯 Priorisation Stratégique (6 premiers mois)

### Pilier Principal : 🍪 **Gestion Cookies Unifiée**

**Pourquoi ce choix ?**
- C'est le gap critique identifié (cookies insuffisamment gérés)
- Impact immédiat sur la conformité légale (risque CNIL)
- Fondation pour maximiser la collecte de données légales
- Opportunité de mutualisation groupe ADEO

**Approche : "Conformité + Optimisation" en parallèle**
⚠️ **Principe fondamental** : Conformité d'abord, puis optimisation du taux d'acceptation
- Ne JAMAIS sacrifier la conformité pour augmenter l'opt-in
- Transparence totale avec le client
- Mesurer l'impact de chaque changement UX

**Roadmap des 6 premiers mois :**

#### Mois 1-2 : Intégration & Déploiement
- ✅ Intégration technique lanceur bannières dans Data Compliance
- ✅ Audit complet pages web (identification pages sans bannière)
- ✅ Déploiement progressif bannière cookies (100% pages)
- 📊 Mise en place analytics cookies (taux acceptation baseline)

#### Mois 3-4 : Optimisation & A/B Testing
- 🧪 A/B Testing : 3-4 variantes de bannières
- 🎨 UX optimisée : simplification, valeur échangée, progressivité
- 📈 Mesure impact sur taux d'acceptation
- 🔒 Validation conformité Legal/DPO sur chaque variante

#### Mois 5-6 : Dashboard & Préparation Multi-BU
- 📊 Dashboard Legal/DPO (visibilité conformité temps réel)
- 🏗️ Architecture Multi-BU : configuration par BU, API standardisée
- 🧪 POC 1ère BU pilote (hors Leroy Merlin France)
- 📚 Documentation intégration pour les BU

**KPIs de Succès (6 mois) :**
- Couverture cookies : 100% des pages leroymerlin.fr
- Taux d'acceptation cookies : 50%+ (vs baseline)
- Dashboard Legal opérationnel et utilisé quotidiennement
- 1 BU pilote déployée avec succès
- Zéro incident RGPD lié aux cookies

---

## 🔄 Prochaines Étapes (Actions Immédiates)

### Semaine 1-2 : Alignement & Validation
1. **Présenter cette vision** aux stakeholders (Product, Legal, Marketing, Data, IT)
2. **Valider les Quick Wins** et obtenir le feu vert
3. **Constituer l'équipe dédiée** : Product, Dev, Legal, UX
4. **Audit technique** : état des lieux précis de l'existant (lanceur bannières, intégrations)

### Semaine 3-4 : Lancement Quick Win #1
5. **Démarrer l'intégration** lanceur bannières dans Data Compliance
6. **Audit complet** : lister toutes les pages à couvrir
7. **Plan de déploiement** : priorisation des pages (criticité, trafic)
8. **Mise en place analytics** : tracking taux d'acceptation

### Mois 2 : Déploiement & Mesure
9. **Déploiement progressif** bannière sur 100% pages
10. **Monitoring continu** : taux acceptation, par type de page, par device
11. **Préparation A/B Testing** : définition des variantes à tester
12. **Communication interne** : partager les premiers résultats

---

## 📝 Notes & Questions Ouvertes

### Questions à résoudre
- Quel est le budget alloué pour cette vision ?
- Quelle est la roadmap du lanceur de bannières actuel ?
- Quelles BU ADEO sont intéressées par la plateforme cookies mutualisée ?
- Quels sont les connecteurs prioritaires à développer (CRM, ESP, CDP) ?

### Hypothèses à valider
- Les clients sont prêts à voir une bannière cookies bien conçue (non intrusive)
- Les équipes Marketing accepteront de perdre potentiellement des opt-in au profit de la conformité
- Les BU ADEO sont prêtes à abandonner leurs solutions cookies actuelles pour Data Compliance

---

## 📚 Ressources & Références

- [ADEO Product Operating Model](../ADEO-PRODUCT-OPERATING-MODEL.md)
- [BMAD Method - Product Practice](../README.md)
- Réglementation RGPD / ePrivacy
- Guidelines CNIL sur les cookies
- Standards IAB Europe (Transparency & Consent Framework)

---

**Document vivant** : Cette vision sera enrichie et ajustée au fil des apprentissages et des évolutions réglementaires.

