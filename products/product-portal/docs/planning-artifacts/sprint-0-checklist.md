# Sprint 0 Pre-Flight Checklist
## BMAD Dashboard - De-Risk Phase

**Duration:** 3-5 calendar days (14-20 person-hours total)  
**Start Date:** [Monday, 2026-03-11]  
**Target Completion:** [Wednesday, 2026-03-13]  
**Sprint 1 Kickoff:** [Thursday 2026-03-14 OR Monday 2026-03-17]

---

## STATUS TRACKING

| Status | Symbol | Meaning |
|--------|--------|---------|
| Not Done | ❌ | Not started or blocked |
| In Progress | ⏳ | Currently being worked on |
| Done | ✅ | Complete, documented, reviewed |
| Blocked | 🚫 | Waiting for external input |

---

## DAY 1 (MONDAY) — DISCOVERY & DECISIONS

### Morning (9 AM - 12 PM) — 3 hours

#### Task 1.1: GDPR & Data Governance Assessment
- **Owner:** [Product Manager + Legal/Compliance Specialist]
- **Duration:** 2 hours
- **What:** Review what data dashboard stores and for how long
- **Checklist:**
  - [ ] Identify all data fields: user email, request title, request description, requester name
  - [ ] Confirm retention policy: 30 days auto-purge (already in roadmap ✓)
  - [ ] Document user consent flow: Submitting request = consent to store 30 days
  - [ ] Check if GDPR DPA needed (Railway, Vercel have DPAs ✓)
  - [ ] List any regulatory requirements: GDPR only (internal EU tool)
  - [ ] Write 1-page Data Governance Document
- **Output:** `docs/GDPR-Data-Governance.md` (1 page)
- **Status:** [ ]
  ```
  Approval: [ ] Legal signed off
```

---

#### Task 1.2: Security Framework & Specification
- **Owner:** [Security Lead + Backend Developer]
- **Duration:** 2 hours (concurrent with 1.1)
- **What:** Define security requirements for the app
- **Checklist:**
  - [ ] HTTPS enforcement: Yes (Vercel/Railway auto-provide)
  - [ ] Authentication: JWT tokens (expire 24h)
  - [ ] Password hashing: bcrypt with cost 12
  - [ ] Rate limiting: 100 requests/15 minutes per user/IP
  - [ ] Input validation: 
    - [ ] Email validation (regex or email-validator library)
    - [ ] Request title max 500 chars
    - [ ] Request description max 2000 chars
    - [ ] BMAD command sanitization (verify execFile safe)
  - [ ] CORS policy: Only dashboard.adeo.com origin
  - [ ] SQL injection prevention: Use parameterized queries (pg npm handles this)
  - [ ] XSS prevention: Vue 3 escapes by default ✓
  - [ ] OWASP Top 10 checklist (link to framework)
  - [ ] No API keys in code (use `.env`)
- **Output:** `docs/SECURITY-SPECIFICATION.md` (2-3 pages)
- **Status:** [ ]
  ```
Approval: [ ] Security Lead signed off
```

---

#### Task 1.3: Testing Framework & Coverage Requirements
- **Owner:** [Tech Lead]
- **Duration:** 1 hour
- **What:** Decide on testing tooling and coverage standards
- **Checklist:**
  - [ ] Unit tests: Vitest (recommended for Vue 3)
  - [ ] Integration tests: Supertest for API routes
  - [ ] E2E tests: Playwright (simulates real user)
  - [ ] Coverage targets:
    - [ ] Backend unit: 70% (gate in CI/CD)
    - [ ] Frontend unit: 60%
    - [ ] E2E: Happy path only (5-10 scenarios)
  - [ ] CI/CD gate: PR cannot merge if <70% coverage
  - [ ] Test categories documented:
    - [ ] Unit tests: Individual functions/components
    - [ ] Integration: API routes + DB
    - [ ] E2E: Full user flows (input → response)
- **Output:** `docs/TESTING-STRATEGY.md` + GitHub Actions workflow
- **Status:** [ ]
  ```
Approval: [ ] Tech Lead confirmed choices
```

---

### Afternoon (1 PM - 6 PM) — 5 hours

#### Task 1.4: Team Kick-off & Working Agreement
- **Owner:** [Product Manager + Team Leads]
- **Duration:** 1 hour
- **What:** Orient team on assessment findings + get commitments
- **Meeting Agenda:**
  - [ ] Review this checklist (10 min)
  - [ ] Explain critical gaps (10 min)
  - [ ] Walk through Day 1-3 timeline (10 min)
  - [ ] Q&A (10 min)
  - [ ] Confirm owner assignments (5 min)
- **Decisions Made:**
  - [ ] Testing framework choice: Vitest ✓
  - [ ] Security owner: [Name]
  - [ ] Compliance owner: [Name]
  - [ ] DevOps owner: [Name]
- **Output:** Slack summary + calendar blocks for Days 2-3
- **Status:** [ ]

---

#### Task 1.5: Documentation Structure Setup
- **Owner:** [Tech Lead]
- **Duration:** 1 hour
- **What:** Create folders and templates for deliverables
- **Checklist:**
  - [ ] Create `/docs/security/` folder
  - [ ] Create `/docs/compliance/` folder
  - [ ] Create `/docs/testing/` folder
  - [ ] Create GitHub issue template for bugs (includes testing checkbox)
  - [ ] Create PR template (includes test coverage, security checklist)
- **Output:** Directory structure + template files
- **Status:** [ ]

---

#### Task 1.6: Infrastructure Baseline Assessment
- **Owner:** [DevOps]
- **Duration:** 2 hours
- **What:** Plan monitoring/visibility setup for tomorrow
- **Checklist:**
  - [ ] Railway account exists
  - [ ] Vercel account ready
  - [ ] Sentry.io account: Create free tier
  - [ ] GitHub Actions: Enabled in repo
  - [ ] PostgreSQL service: Plan Railway setup
  - [ ] Domain/HTTPS: Confirmed (auto via Railway + Vercel)
  - [ ] Monitoring checklist by service:
    - [ ] API uptime + error rate
    - [ ] Response time p50, p95, p99
    - [ ] PostgreSQL query duration
    - [ ] Frontend bundle size
- **Output:** Monitoring architecture diagram + setup checklist
- **Status:** [ ]

---

### END OF DAY 1
- **Deliverables Checklist:**
  - [ ] GDPR Document (draft)
  - [ ] Security Specification (draft)
  - [ ] Testing Strategy (final)
  - [ ] Team working agreement documented
  - [ ] Day 2 owners assigned

- **Decisions Recorded:**
  - [ ] Vitest + Playwright confirm
  - [ ] JWT auth strategy finalized
  - [ ] 70% coverage gate in place

---

## DAY 2 (TUESDAY) — IMPLEMENTATION SETUP

### Morning (9 AM - 12 PM) — 3 hours

#### Task 2.1: GitHub Actions CI/CD Setup
- **Owner:** [Tech Lead]
- **Duration:** 2 hours
- **What:** Configure automated testing + linting
- **Checklist:**
  - [ ] Create `.github/workflows/ci.yml`
  - [ ] Actions included:
    - [ ] npm install
    - [ ] Linting (ESLint): No errors allowed
    - [ ] TypeScript check: Strict mode
    - [ ] Unit tests: Vitest with coverage report
    - [ ] Coverage gate: Fail if <70%
  - [ ] PR status checks required:
    - [ ] All tests pass
    - [ ] Coverage ≥70%
    - [ ] No linting errors
  - [ ] Branch protection rules: main branch requires PR approval + tests pass
  - [ ] Test badge in README.md
- **Output:** Working CI/CD pipeline on GitHub
- **Status:** [ ]
  ```
Verification: [ ] Test PR passes all checks
```

---

#### Task 2.2: Sentry Error Tracking Setup
- **Owner:** [DevOps]
- **Duration:** 1 hour
- **What:** Configure production error monitoring
- **Checklist:**
  - [ ] Sentry.io account created (free tier)
  - [ ] Backend DSN: Added to `.env.example` + `.env` (dev mode)
  - [ ] Frontend DSN: Added to Vite env
  - [ ] Error capture enabled for:
    - [ ] Uncaught JS exceptions
    - [ ] API errors (5xx, 4xx)
    - [ ] BMAD CLI timeouts
    - [ ] Database query errors
  - [ ] Release tracking: Configure for deployments
  - [ ] Alerts: Email on critical errors
- **Output:** Sentry dashboard configured + DSN in code
- **Status:** [ ]
  ```
Verification: [ ] Test error is captured in Sentry
```

---

#### Task 2.3: Railway & Vercel Projects Created
- **Owner:** [DevOps]
- **Duration:** 1 hour (concurrent with 2.2)
- **What:** Prepare deployment infrastructure preview
- **Checklist:**
  - [ ] Railway: New project created (free tier)
  - [ ] Railway PostgreSQL: Service created + connection string
  - [ ] Vercel: GitHub repo connected
  - [ ] Environment variables template: Documented
    - [ ] Database URL
    - [ ] JWT_SECRET
    - [ ] Claude API key (if using)
    - [ ] Sentry DSN
    - [ ] CORS origin
  - [ ] Deployment docs: 1-pager on how to deploy
- **Output:** `.env.example` + deployment guide
- **Status:** [ ]

---

### Afternoon (1 PM - 6 PM) — 5 hours

#### Task 2.4: Team Training Session (Optional)
- **Owner:** [Product Manager]
- **Duration:** 1 hour (optional if time tight)
- **What:** Train team on ADEO Product Operating Model + compliance requirements
- **Agenda:**
  - [ ] POM overview (10 min)
  - [ ] Product Lifecycle phases (10 min)
  - [ ] Why compliance matters (10 min)
  - [ ] Security mindset in agile (10 min)
  - [ ] Q&A (10 min)
- **Output:** Recording/deck for async review
- **Status:** [ ]

---

#### Task 2.5: Finalize Day 2 Deliverables
- **Owner:** [Tech Lead + DevOps]
- **Duration:** 3 hours
- **Checklist:**
  - [ ] Review & refine GDPR doc → Final
  - [ ] Review & refine Security spec → Final
  - [ ] GitHub Actions pipeline: Test with real PR
  - [ ] Sentry: Verify error capture works
  - [ ] Railway/Vercel: Document connection steps
  - [ ] Update Sprint 0 checklist status
- **Output:** All documents finalized + ready for Day 3 Gate approval

---

### END OF DAY 2
- **Deliverables Status:**
  - [ ] ✅ GitHub Actions configured & tested
  - [ ] ✅ Sentry integration live
  - [ ] ✅ GDPR Document finalized
  - [ ] ✅ Security Specification finalized
  - [ ] ✅ Deployment infrastructure ready

---

## DAY 3 (WEDNESDAY) — GATE APPROVAL & SPRINT 1 PREP

### Morning (9 AM - 12 PM) — 3 hours

#### Task 3.1: Test Framework Boilerplate
- **Owner:** [Tech Lead]
- **Duration:** 1 hour
- **What:** Create first unit test as template
- **Checklist:**
  - [ ] Create `src/services/__tests__/api.test.ts`
  - [ ] Example test: API client authentication
  - [ ] Run: `npm run test` → Passes
  - [ ] Coverage report: Confirm working
  - [ ] Template: Document in CONTRIBUTING.md how to write tests
- **Output:** Working test suite + documentation
- **Status:** [ ]

---

#### Task 3.2: Security Checklist Integration
- **Owner:** [Backend Developer]
- **Duration:** 1 hour
- **What:** Add security checklist to PR template
- **Checklist:**
  - [ ] Create `.github/SECURITY_CHECKLIST.md`
  - [ ] Add items:
    - [ ] No secrets in code?
    - [ ] Input validated?
    - [ ] SQL injection risk checked?
    - [ ] CORS configured?
    - [ ] Rate limiting needed?
    - [ ] Error messages not leaking info?
    - [ ] Dependencies scanned (npm audit)?
  - [ ] Link to PR template
  - [ ] Train team on checklist usage
- **Output:** Security checklist in PR process
- **Status:** [ ]

---

#### Task 3.3: Gate #2 Leadership Approval Meeting
- **Owner:** [Product Manager]
- **Duration:** 1 hour
- **What:** Present assessment + get approval to proceed
- **Attendees:** [ ] PM, [ ] Tech Lead, [ ] Product Leadership, [ ] Optional: Security Lead
- **Agenda:**
  - [ ] Assessment summary (5 min)
  - [ ] 5 critical gaps identified + Sprint 0 fixes (10 min)
  - [ ] Timeline impact: +0 days (same 4 weeks) (5 min)
  - [ ] Risk mitigation: What we fixed (5 min)
  - [ ] Sprint 1 readiness: What we'll implement (5 min)
  - [ ] Decision: Proceed Yes/No/Conditional (5 min)
- **Deliverable:** Gate #2 approval signed (email or form)
- **Status:** [ ]
  ```
Gate Decision: [ ] APPROVED | [ ] CONDITIONAL | [ ] HOLD
Approval: [ ] [Leadership Name] Signed
```

---

### Afternoon (1 PM - 6 PM) — 3 hours

#### Task 3.4: Accessibility Baseline Checklist
- **Owner:** [UX Designer]
- **Duration:** 1 hour
- **What:** Create WCAG checklist for Sprint 1
- **Checklist:**
  - [ ] Create `docs/ACCESSIBILITY-CHECKLIST.md`
  - [ ] WCAG 2.1 AA items:
    - [ ] Color contrast ≥4.5:1
    - [ ] Keyboard navigation (Tab, Enter, Escape)
    - [ ] ARIA labels for icons
    - [ ] Alt text for images
    - [ ] Focus visible on interactive elements
    - [ ] Semantic HTML (button, link, form)
  - [ ] Automated: axe-core npm package added to CI/CD
  - [ ] Manual testing: Screen reader (NVDA or JAWS) checklist
- **Output:** Accessibility guidelines + CI integration
- **Status:** [ ]

---

#### Task 3.5: Sprint 1 Preparation (Final)
- **Owner:** [Tech Lead]
- **Duration:** 1 hour
- **What:** Set up sprint board + confirm sprint mechanics
- **Checklist:**
  - [ ] JIRA board created (if using)
  - [ ] Epics + User Stories imported from planning
  - [ ] Sprint 1 backlog: Prioritized list
  - [ ] Each story has acceptance criteria
  - [ ] Tech tasks added: Security, monitoring, accessibility
  - [ ] Sprint goal defined: "Backend foundation + security framework active"
  - [ ] Daily standup scheduled: 15 min, 9:15 AM daily
  - [ ] Sprint planning: 2 hours, [Thursday/Monday morning]
  - [ ] Sprint retro: 1 hour, [end of Sprint 1]
- **Output:** Sprint board ready, ceremonies scheduled
- **Status:** [ ]

---

#### Task 3.6: Final Status Review & Sign-Off
- **Owner:** [Product Manager]
- **Duration:** 1 hour
- **What:** Confirm all Sprint 0 items complete
- **Checklist:**
  - [ ] Review this entire checklist
  - [ ] Mark complete items ✅
  - [ ] Note any incomplete items + owners
  - [ ] Update team in Slack
  - [ ] Confirm Sprint 1 kickoff date/time
  - [ ] Share sprint schedule: 4 weeks → [Target Date]
- **Output:** Sprint 0 sign-off + readiness confirmation
- **Status:** [ ]

---

### END OF DAY 3 (Wednesday EOD)

**Sprint 1 Kickoff:** 🚀 **[Thursday 2 PM OR Monday 9 AM]**

---

## SPRINT 0 COMPLETION CHECKLIST

### All Documents Finalized ✅
- [ ] GDPR & Data Governance (signed by Legal)
- [ ] Security Specification (signed by Security)
- [ ] Testing Strategy (confirmed by Tech Lead)
- [ ] Accessibility Checklist (created by UX)

### All Infrastructure Ready ✅
- [ ] GitHub Actions CI/CD working
- [ ] Sentry error tracking live
- [ ] Railway + Vercel projects ready to deploy
- [ ] Test framework boilerplate working
- [ ] PR templates + checklists in place

### All Team Agreements Confirmed ✅
- [ ] Gate #2 approval obtained
- [ ] Team trained on processes
- [ ] Daily standup scheduled
- [ ] Sprint 1 board ready

### GO/NO-GO DECISION

Proceed to Sprint 1? 
- [ ] **YES** — All checklist items complete, team ready
- [ ] **NO** — Items incomplete, needs extension to [Date]

**Sign-Off:**
- PM: _________________ Date: _______
- Tech Lead: _________________ Date: _______
- Product Leadership: _________________ Date: _______

---

## TRACKING DASHBOARD (Update Daily)

Print this and update on physical board during Sprint 0:

```
Day 1 (Mon)    ░░░░░░░░░░ 0%
Day 2 (Tue)    ████░░░░░░ 40%
Day 3 (Wed)    ████████░░ 80%
Completion     ██████████ 100% ✅
```

### Status by Owner
- GDPR/Legal: [ ]
- Security: [ ]
- Tech Lead: [ ]
- DevOps: [ ]
- UX: [ ]
- Product: [ ]

**Slack Daily Update Format:**
```
Day 1 ✅ GDPR doc done | Security spec 50% | Testing framework decided
Day 2 ✅ CI/CD live | Sentry working | Infrastructure ready
Day 3 ✅ Gate approval obtained | Sprint 1 ready to start 🚀
```

---

## COMMON SHORTCUTS

If any task takes longer than estimated, escalate to PM immediately:
- **Task Blocked?** → Ping PM for decision
- **Need Help?** → Ask in #bmad-dashboard Slack channel
- **Waiting on External?** → Update deadline tracker, continue next item

---

**Sprint 0 Owner (Responsible for Tracking):** [Tech Lead Name]  
**Contact:** Slack @techleadname or Calendar/Email

**Questions? Read:** `bmad-dashboard-excellence-assessment.md` (full details)