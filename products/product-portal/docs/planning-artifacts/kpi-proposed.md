# Guide de Définition des KPI pour BMAD Dashboard

## Étapes pour Définir vos KPI

### Étape 1: Aligner sur les Objectifs Stratégiques
- **Revue du PRD** : Analysez la vision, les goals et success metrics existants
- **North Star Metric** : Identifiez la métrique ultime qui représente le succès du produit
- **Priorisation** : Focus sur 3-5 KPI principaux, pas plus

### Étape 2: Identifier les Métriques Clés
- **Catégories** : Adoption, Engagement, Satisfaction, Performance, Impact Business
- **SMART** : Spécifiques, Mesurables, Atteignables, Réalistes, Temporels
- **Sources de données** : Analytics (Google Analytics, Mixpanel), logs backend, surveys

### Étape 3: Définir les Cibles et Seuils
- **Baselines** : Mesurez l'état actuel (si applicable)
- **Cibles ambitieuses** : Pour MVP, puis croissance
- **Seuils d'alerte** : Quand agir (ex: adoption < X%)

### Étape 4: Mettre en Place le Tracking
- **Outils** : Intégrez analytics dans le code (Sprint 2-3)
- **Fréquence** : Quotidienne/semaine/mensuelle
- **Dashboard** : Créez un tableau de bord pour visualisation

### Étape 5: Analyser et Ajuster
- **Revue régulière** : Mensuelle/trimestrielle
- **Corrélation** : Analysez les liens entre KPI
- **Itération** : Ajustez les cibles ou métriques selon les insights

---

## KPI Proposés pour BMAD Dashboard

### North Star Metric
**Temps économisé par PM par semaine** (mesuré via survey + analytics)
- **Cible MVP** : 2h/semaine économisées
- **Cible Croissance** : 5h/semaine
- **Tracking** : Survey post-utilisation + calcul basé sur workflows utilisés

### KPI Adoption
1. **Taux d'Adoption** : % de PMs actifs (DAU/MAU)
   - **Cible** : 70% des PMs utilisent le dashboard au moins 1x/semaine
   - **Tracking** : Sessions utilisateur

2. **Couverture des Requêtes** : % de requêtes traitées via dashboard vs autres canaux
   - **Cible** : 80% des nouvelles requêtes passent par le dashboard
   - **Tracking** : Logs des requêtes créées

### KPI Engagement
3. **Utilisation des Workflows** : Nombre moyen de workflows invoqués par session
   - **Cible** : 2.5 workflows/session
   - **Tracking** : Events analytics

4. **Temps de Session** : Durée moyenne par session
   - **Cible** : 5-10 min/session
   - **Tracking** : Session duration

### KPI Satisfaction
5. **NPS (Net Promoter Score)** : Satisfaction utilisateur
   - **Cible** : >7/10
   - **Tracking** : Survey in-app ou email

6. **Taux de Complétion** : % de tâches initiées qui aboutissent
   - **Cible** : >85%
   - **Tracking** : Funnel analytics (input → response → action)

### KPI Performance
7. **Temps de Réponse** : Latence API BMAD
   - **Cible** : <2 sec pour 95% des requêtes
   - **Tracking** : APM monitoring

8. **Disponibilité** : Uptime du dashboard
   - **Cible** : 99.5%
   - **Tracking** : Railway/Vercel monitoring

### KPI Impact Business
9. **Réduction des Outils** : Nombre d'outils remplacés
   - **Cible** : Remplacement de 3+ outils par PM
   - **Tracking** : Survey qualitative

10. **ROI** : Coût développement vs valeur créée
    - **Cible** : ROI >3x en 6 mois
    - **Tracking** : Calcul basé sur temps économisé × salaire moyen

---

## Plan d'Implémentation

### Semaine 1 (Maintenant)
- Finaliser les KPI ci-dessus avec votre équipe
- Intégrer analytics basique (Google Analytics 4) dans Sprint 2

### Mois 1-3 (MVP)
- Tracker adoption + engagement
- Surveys post-beta pour satisfaction

### Mois 3-6 (Post-MVP)
- Analyser corrélation avec impact business
- Ajuster cibles selon données réelles

---

## Outils Recommandés
- **Analytics** : Google Analytics 4 (gratuit) ou Mixpanel
- **Surveys** : Typeform ou in-app prompts
- **Monitoring** : Sentry pour erreurs, Railway pour uptime
- **Dashboard** : Google Data Studio ou Tableau

Voulez-vous que je crée un document plus détaillé ou que j'ajoute des exemples de tracking code ?</content>
<parameter name="filePath">/Users/20015972/Desktop/BMAD-METHOD-PP/bmad-method-product-practice/planning-artifacts/kpi-definition-guide.md