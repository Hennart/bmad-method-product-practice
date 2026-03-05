# Architecture Summary - ADEO Product Studio MVP

**Date:** 5 Mars 2026  
**Version:** 1.0  
**Status:** ✅ Ready for Implementation  
**Document Complet:** [architecture-adeo-product-studio-2026-03-05.md](./architecture-adeo-product-studio-2026-03-05.md) (4807 lignes)

---

## 🎯 Objectif du Projet

**Réduire le temps de création de PRD de 2 semaines à <1 heure (gain de 90%)** pour 78 Product Managers ADEO via une plateforme collaborative assistée par IA.

**Périmètre MVP (6 mois)** : 7 fonctionnalités core (Gate 0, Agents IA, Living Spec, Constraints as Code, Prototypes Mozaic, Export JIRA, Dashboard double usage)

---

## 🏗️ Architecture Retenue

### **Pattern Architectural**
**Event-Driven Microservices** (8 services NestJS + 1 API Gateway + Frontend Vue 3 SPA)

**Justification :**
- ✅ Scalabilité horizontale (78 PMs MVP → 200+ Phase 2)
- ✅ Isolation des domaines métier (Gate 0, Agents, Living Spec indépendants)
- ✅ Résilience (panne d'un service n'affecte pas les autres)
- ✅ Déploiements indépendants (CI/CD par service)

### **Stack Technique**

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| **Frontend** | Vue 3.5+ + TypeScript 5.x + Vite | Écosystème mature, Mozaic Vue natif, TypeScript = type safety |
| **Backend** | NestJS v10+ + TypeScript 5.x | Architecture microservices native, grande communauté, scalable |
| **Databases** | MongoDB Atlas M10→M30 (unified) | Document store flexible, schéma évolutif, Atlas managed |
| | InfluxDB Cloud (time-series) | Métriques dashboard optimisées, agrégations temporelles |
| | Redis Memorystore GCP (cache) | Cache hiérarchique, sessions, TTL policies |
| **Event Streaming** | Confluent Cloud Kafka (9 topics) | Event-driven robuste, exactly-once semantics, managed GCP |
| **Cloud Platform** | GCP europe-west1 | Conformité RGPD, latence optimale France, services managés |
| **Orchestration** | GKE (Kubernetes 1.28+) | Autoscaling HPA, multi-zone HA, rolling updates |
| **CI/CD** | GitHub Actions → GCP Artifact Registry | Pipelines automatisés, déploiements <10min |
| **Monitoring** | Datadog (logs + metrics + APM) | Distributed tracing, alerting proactif, dashboards |
| **Authentication** | Azure AD SSO (OAuth2/OIDC) | Standard enterprise ADEO, MFA, RBAC 3 rôles |
| **Infrastructure** | Terraform 1.6+ | Infrastructure as Code, modules réutilisables, versioning |

### **8 Microservices NestJS**

1. **api-gateway** (port 3000) : Auth Azure AD, JWT rotation, rate limiting, routing vers services
2. **gate0-service** (port 3001) : 4 engines scoring (Valuable, Viable, Usable, Feasible), <10s target
3. **agents-service** (port 3002) : Winston Architect + Émilie UX Designer, LLM integration, context management
4. **livingspec-service** (port 3003) : Graph Stories→Features→Epics, versioning, DFS/BFS traversal
5. **constraints-service** (port 3004) : Validation Business Terms (247 termes ADEO), fuzzy matching, suggestions
6. **prototypes-service** (port 3005) : Génération code Vue 3 + Mozaic, templates (form/list/detail)
7. **jira-service** (port 3006) : Export JIRA Cloud API v3, mappers Epics→Stories, acceptance criteria
8. **dashboard-service** (port 3007) : Collectors InfluxDB, métriques personal + management, analytics

### **9 Kafka Topics (Event-Driven Communication)**

1. `gate0.scoring.completed` → Living Spec + Dashboard
2. `agents.conversation.started` → Dashboard
3. `livingspec.node.created`, `livingspec.node.updated`, `livingspec.node.deleted` → Agents + Dashboard
4. `constraints.validation.failed` → Agents
5. `prototypes.generation.completed` → Dashboard
6. `jira.export.completed` → Dashboard
7. `audit.logs` → Dashboard (traçabilité 100%)

---

## 📊 Non-Functional Requirements (NFRs)

| NFR | Target | Approche Architecturale |
|-----|--------|-------------------------|
| **Performance** | Gate 0 <10s, LLM <15s, UI <3s | Redis cache hierarchical + HPA autoscaling + CDN assets + MongoDB indexes |
| **Security** | Azure AD SSO + RBAC | JWT Access 15min + Refresh 7 days with rotation + RBAC 3 rôles (PM/Manager/Admin) + GCP Secret Manager + Helmet.js + Rate limiting 100 req/min |
| **Scalability** | 78→200→500+ PMs | GKE 3-10 nodes autoscaling + HPA per service (2-5 replicas) + MongoDB Atlas M10→M30 + Kafka 3-5 partitions + Stateless services |
| **Availability** | 99.5% SLA (~3.6h/mois) | GKE multi-zone (a,b,c) + MongoDB replica sets (3 nodes, failover <30s) + Redis standard tier (auto-failover) + Health checks + Circuit breaker + Automated backups |
| **Usability** | WCAG 2.1 AA | Mozaic Vue Design System (conformité automatique) + aria-labels + keyboard navigation + responsive + i18n Vue I18n (MVP français) + error messages RFC 7807 |

---

## 🚀 Plan d'Implémentation (6 mois)

### **Sprint 0 (Semaines 1-2) : Infrastructure Setup**
- Terraform : GKE cluster + MongoDB Atlas M10 + Redis Memorystore + Confluent Cloud Kafka + GCP Secret Manager
- Starter templates : create-vue + 8 services NestJS + shared types monorepo
- CI/CD : GitHub Actions workflows (ci-backend.yml, ci-frontend.yml, deploy-staging.yml)
- Docker Compose : Environnement local avec tous les services

**Livrables :** Infrastructure GCP opérationnelle, repos GitHub setup, pipelines CI/CD testés

---

### **Sprint 1-2 (Semaines 3-6) : Core Services**
- **API Gateway** : Azure AD OAuth2 + JWT strategy + rate limiting @nestjs/throttler + proxy routes
- **Gate0 Service** : 4 engines avec NLP basique + MongoDB schemas + Kafka producer + Redis cache OKRs
- **Living Spec Service** : Graph nodes/relationships MongoDB + CRUD API + Kafka events + basic traversal

**Livrables :** 3 services déployés sur GKE dev, endpoints API testés avec Bruno, Kafka events validés

---

### **Sprint 3-4 (Semaines 7-12) : Secondary Services**
- **Agents Service** : Winston + Émilie agents + LLM integration (OpenAI/Claude/Gemini) + context service + conversations MongoDB
- **Constraints Service** : Business Terms CSV loader + validation engine + fuzzy matcher Levenshtein + suggestion engine
- **Prototypes Service** : Vue component generator + Mozaic integration + templates (form/list/detail) + storage MongoDB
- **JIRA Service** : JIRA Cloud API v3 client + mappers (epic/story/acceptance-criteria) + export job tracking
- **Dashboard Service** : InfluxDB collectors + metrics aggregation + analytics service + Kafka consumers ALL topics

**Livrables :** 8 services complets déployés, intégrations externes validées (Azure AD, JIRA, LLM, Business Terms CSV)

---

### **Sprint 5-8 (Semaines 13-20) : Frontend + Integration**
- **Frontend Vue 3** : 7 views (Gate0, Agents, LivingSpec, Constraints, Prototypes, JIRA, Dashboard) + components by-feature + Pinia stores + Axios services + Vee-Validate forms
- **Bruno E2E Collections** : Tests API complets pour tous les endpoints (auth/, gate0/, agents/, etc.)
- **Vitest Unit Tests** : Components + stores + composables (target 80% coverage)
- **Integration Testing** : End-to-end flows (Gate 0 submission → Living Spec creation → Agents notification → Dashboard metrics → JIRA export)

**Livrables :** Frontend SPA déployé sur GKE, tests E2E passants, intégration complète backend↔frontend validée

---

### **Sprint 9-10 (Semaines 21-26) : Performance + UAT + Production**
- **Performance Tuning** : Optimisation cache Redis (TTL policies affinées), MongoDB indexes sur requêtes fréquentes, load testing k6/Artillery, monitoring Datadog APM tuning
- **Security Hardening** : Penetration testing, security scan dependencies, secrets rotation validation, RBAC enforcement tests
- **UAT (User Acceptance Testing)** : 10 PMs pilotes, feedback sessions, bug fixes prioritaires, training utilisateurs
- **Documentation** : API Swagger auto-gen, README services, guides déploiement, onboarding developers, architecture diagrams (draw.io/Mermaid)
- **Production Deployment** : Migration staging → production, smoke tests, monitoring alerting setup, post-deployment validation

**Livrables :** MVP production-ready, 78 PMs onboardés, documentation complète, monitoring opérationnel

---

## ✅ Validation Architecture (Status Actuel)

### **Coherence ✅**
- Toutes les technologies compatibles (Vue 3.5+ + NestJS v10+ + TypeScript 5.x + MongoDB + Kafka + Redis + GKE)
- 68 implementation patterns définis avec conventions TypeScript/NestJS/Vue industry standards
- Structure ~4500 fichiers alignée avec architecture Event-Driven Microservices

### **Coverage ✅**
- **100% des 7 FRs** couvertes (chaque FR mappée à service dédié + endpoints API + composants frontend)
- **100% des 5 NFRs** adressées (Performance Redis+HPA, Security Azure AD+JWT+RBAC, Scalability GKE, Availability multi-zone, Usability Mozaic WCAG 2.1 AA)

### **Readiness ✅**
- Décisions complètes : Versions + commandes + exemples de code TypeScript/YAML/HCL
- Structure complète : ~4500 fichiers définis spécifiquement (pas de placeholders)
- Patterns complets : 68/68 conflict points résolus avec exemples ✅ + anti-patterns ❌

### **Gap Analysis**
- **Critical Gaps : 0** (aucun bloquant)
- **Important Gaps : 5** (non-bloquants) → LLM provider choice, Terraform secrets scripts, Datadog dashboards, DB migrations, Bruno collections détaillées
- **Nice-to-Have Gaps : 5** (post-MVP) → CI/CD templates réutilisables, scripts dev local, Swagger auto-gen, performance benchmarks, observability advanced

**Résultat Global :** 🎯 **READY FOR IMPLEMENTATION** (Confidence Level: HIGH)

---

## 🎨 68 Implementation Patterns (Highlights)

Pour garantir cohérence du code entre équipes/agents IA, **68 patterns définis** dans 5 catégories :

### **Naming Patterns (23 points)**
- MongoDB : Collections `lowercase_snake_case`, fields `camelCase`
- API : Endpoints `/api/v1/resources` (plural, lowercase, versioned)
- TypeScript : Classes `PascalCase`, variables `camelCase`, constants `SCREAMING_SNAKE_CASE`
- Files : Backend `kebab-case.ts`, Vue components `PascalCase.vue`

### **Structure Patterns (15 points)**
- NestJS : Modules by-feature, tests co-located (*.spec.ts next to source)
- Vue 3 : Components by-feature (components/gate0/, components/agents/), composables, stores Pinia
- Shared : Monorepo `/shared/types/` avec import `@shared/types/user.types`

### **Format Patterns (12 points)**
- API responses : `{success: true, data: {...}, meta: {timestamp, traceId}}` wrapper
- Errors : RFC 7807 Problem Details `{type, title, status, detail, instance, traceId}`
- Dates : ISO 8601 strings `"2026-03-05T10:30:00.000Z"`
- JSON : camelCase fields

### **Communication Patterns (8 points)**
- Kafka topics : `domain.entity.action` (dot.notation) ex: `gate0.scoring.completed`
- Event payloads : Standard structure `{eventId, eventType, eventVersion, timestamp, source, traceId, data, metadata}`
- Pinia state : Immutable updates `this.users = [...this.users, newUser]`

### **Process Patterns (10 points)**
- Error handling : Global exception filters (NestJS) + Axios interceptors (Vue)
- Loading states : `isLoading*` prefix convention
- Retry logic : Exponential backoff with jitter (1s→2s→4s)

**Enforcement :** ESLint + Prettier + Husky pre-commit hooks, @typescript-eslint/naming-convention rules, CI/CD linting checks

---

## 💰 Risques & Mitigations

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| **LLM latency >15s** | Moyen | Moyenne | Streaming responses + cache Redis contexte + fallback provider (OpenAI→Claude→Gemini) |
| **Kafka consumer lag** | Élevé | Faible | Monitoring lag Datadog + alerting >1000 msgs + HPA consumers + partition scaling 3→5 |
| **MongoDB Atlas cost overrun** | Moyen | Moyenne | Tiered storage (hot/cold), TTL policies (logs 30j), cost alerts GCP, budget monitoring |
| **Mozaic Vue breaking changes** | Faible | Faible | Version pinning package.json, upgrade strategy planifiée Phase 2, tests regression |
| **Azure AD integration failures** | Élevé | Faible | Retry logic exponential backoff, fallback JWT manual, health checks /auth/status, circuit breaker |
| **GKE autoscaling late** | Moyen | Moyenne | Pre-scaling rules (schedule-based), monitoring queue depth, node pool warm standby |
| **Security vulnerabilities** | Élevé | Moyenne | Dependabot alerts, security scan CI/CD, penetration testing, secrets rotation 90j |

---

## 📈 Success Metrics (KPIs)

### **Performance**
- ✅ Gate 0 scoring : <10s (P95), monitoring Datadog APM
- ✅ LLM response : <15s (P95), streaming UX si >10s
- ✅ UI load time : <3s (P95), Cloud CDN + Vite code splitting

### **Scalability**
- ✅ Support 78 PMs MVP → 200 Phase 2 (validated avec GKE autoscaling 3-10 nodes)
- ✅ Concurrent users : 50 simultanés MVP, 150 Phase 2 (load testing k6)

### **Availability**
- ✅ 99.5% uptime SLA (~3.6h downtime/mois max)
- ✅ Health checks : /health endpoint tous services, liveness/readiness probes K8s
- ✅ Failover : <30s MongoDB Atlas, Redis Memorystore auto-failover

### **Code Quality**
- ✅ Test coverage : 80% minimum (Vitest + Jest)
- ✅ ESLint errors : 0 critical, CI/CD block si violations
- ✅ TypeScript strict mode : Activé sur tous les projets

### **Developer Experience**
- ✅ Onboarding : <1 jour (Docker Compose local + scripts/setup-local.sh)
- ✅ CI/CD deployment : <10min (GitHub Actions optimized)
- ✅ Documentation : API Swagger auto-gen, README par service

### **Business**
- ✅ Temps création PRD : 2 semaines → <1 heure (90% gain)
- ✅ Adoption utilisateurs : 78 PMs (100% target MVP)
- ✅ Satisfaction : NPS >40 (surveys post-UAT)

---

## 🎯 Next Steps Immédiats

### **1. Setup Infrastructure (Sprint 0 Week 1)**
```bash
cd infrastructure/environments/dev
terraform init
terraform apply
# Créer: GKE cluster + MongoDB Atlas M10 + Redis + Kafka topics + Secret Manager
```

### **2. Starter Templates (Sprint 0 Week 1)**
```bash
# Frontend
npm create vue@latest frontend -- --typescript --router --pinia --vitest
cd frontend && npm install @mozaic-ds/vue axios vue-i18n vee-validate yup

# Backend (8 services)
nest new api-gateway && cd api-gateway && npm install @nestjs/passport passport-azure-ad
nest new gate0-service && cd gate0-service && npm install @nestjs/mongoose kafkajs
# ... (6 autres services)
```

### **3. Shared Types Monorepo (Sprint 0 Week 2)**
```bash
cd shared && npm init -y
# Créer types/user.types.ts, types/gate0.types.ts, etc.
npm run build
```

### **4. CI/CD Pipelines (Sprint 0 Week 2)**
```bash
# Configurer .github/workflows/ci-backend.yml, ci-frontend.yml
git push origin main
# Valider auto-deploy vers GKE dev environment
```

### **5. Start Development (Sprint 1+)**
Implémenter services en suivant patterns documentés (référence : [architecture-adeo-product-studio-2026-03-05.md](./architecture-adeo-product-studio-2026-03-05.md))

---

## 📚 Ressources

- **Document Architecture Complet** : [architecture-adeo-product-studio-2026-03-05.md](./architecture-adeo-product-studio-2026-03-05.md) (4807 lignes)
- **Product Brief** : [product-brief-adeo-product-studio-2026-03-05.md](./product-brief-adeo-product-studio-2026-03-05.md) (1015 lignes)
- **PRD MVP** : [prd-adeo-product-studio-mvp-2026-03-05.md](./prd-adeo-product-studio-mvp-2026-03-05.md) (1500+ lignes)

**Contact Architecture :** Winston (Architect Agent)  
**Date Finalisation :** 5 Mars 2026  
**Status :** ✅ Ready for Implementation

---

_Ce document est un résumé exécutif. Pour détails techniques complets (schemas MongoDB, K8s manifests, CI/CD workflows, Terraform configs, code examples), référez-vous au document d'architecture complet (4807 lignes)._
