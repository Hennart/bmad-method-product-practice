---
title: "BMAD Digital Product Portfolio Dashboard"
subtitle: "Centralized Interface for Product Managers"
date: 2026-03-06
phase: "Analysis"
status: "Product Brief (DRAFT)"
---

# BMAD Digital Product Portfolio Dashboard
## Product Brief

### Problem Statement

**Current Situation:**
- PMs juggle heavy coordination, reporting and support workloads while using a variety of disconnected tools for different needs.
- Each PM has a different maturity level and working style, making a one-size-fits-all approach difficult.
- There is no dedicated product management tool; workflows are not their goal—they want concrete ways to analyze, prioritize, and solve problems.
- Stakeholder requests arrive via Slack (direct or channels), meetings, quarterly platform plans, or ServiceNow tickets.
- Requests are categorized by teams, but requesters are unsure where to file them (portal vs Slack vs ServiceNow), causing confusion.
- No single source of truth for portfolio needs; PMs waste time hunting for guidance or next steps.
- Requires IDE installation to use BMAD (barrier for non-technical PMs)

**Impact:**
- Slow time-to-value for BMAD adoption
- Lost requests and miscommunications
- Duplicate effort in understanding what needs to be done next
- No visibility into portfolio health or workflow usage

---

## Vision

**Enable Product Managers to manage their digital product portfolio through a single, web-accessible interface that:**
- Invokes BMAD workflows via text
- Displays and activates available workflows when they are relevant to solving a specific problem, while still allowing experienced PMs to directly invoke any workflow (e.g. Create PRD, Create Vision)
- Centralizes stakeholder needs regardless of origin (Slack, meetings, ServiceNow, quarterly plans)
- Provides guidance on next steps and helps analyse/prioritize requests
- Requires zero IDE installation

### Further Analysis Insights
- PMs are burdened by coordination, reporting and support activities and lack a dedicated tool for product management; their calendars are so blocked they struggle to make headway on any work.
- They use multiple disjointed platforms according to their maturity and personal habits; no one wants to "look for a workflow"—they seek concrete help with problem-solving. Agent assistance may help surface guidance when time is scarce.
- Requests come from Slack channels, direct messages, meetings, quarterly platform plans, and ServiceNow tickets.
- Most requests are tracked in the originating Slack channel, causing a lot of shadow tracking and repeated follow‑ups. In an ideal world they would all result in Jira tickets as the single source of truth.
- Support requests land in Slack but the requester often doesn't know which team or product channel to use, creating delay.
- Bug reports are logged in ServiceNow or other systems but don't always result in a Jira ticket, breaking traceability.
- Initiative proposals require buy-in from multiple teams, domains and platforms; prioritization and coordination suffers when colleagues are overloaded with meetings.
- Initiative requests surface during quarterly planning, often via domain or platform leaders.
- Requesters are unsure which system to use; the dashboard must offer a single clear entry point and relieve them of the decision.
- PMs’ calendars are so full that finding time to make progress on any topic—big or small—is extremely hard; this is one reason agent assistance could deliver value.
- Classification should be simple for the intake team; automatic categorization is helpful but not mandatory for MVP.
- Voice is a non‑priority and can be added later if user demand justifies it.

---

## Goals (30-90 days)

| Goal | Success Metric |
|------|-----------------|
| **Accessibility** | PMs can access dashboard from any browser without IDE install | ✅ Web-only interface |
| **Problem Solving** | PMs can capture and analyze needs without juggling tools | ✅ Single UI for requests and BMAD guidance |
| **Workflow Awareness** | PMs can discover workflows when relevant to solving a specific problem | ✅ Organized by phase, searchable |
| **Request Management** | Centralize incoming requests regardless of origin | ✅ Single inbox for all request types |
| **Time-to-Action** | Reduce time from request → getting guidance | ✅ <2 min to see BMAD suggestions |
| **Adoption** | Broad team adoption with varied maturity levels | ✅ Measure via usage analytics |

---

## User Personas

### Primary: Digital Product Manager
- **Needs:** Quick access to BMAD workflows, clear guidance on next steps
- **Pain Points:** Juggling multiple tools, searching documentation
- **Success:** "I can invoke `/bmad-help` from dashboard without opening terminal"

### Secondary: Product Operations Lead
- **Needs:** Visibility into request backlog, workflow usage, team adoption
- **Pain Points:** Can't see overall portfolio health
- **Success:** "I can see which teams are using which workflows"

### Tertiary: Stakeholder (via Portal)
- **Needs:** Easy way to submit requests
- **Pain Points:** Doesn't know what type of request to submit
- **Success:** "I submitted a request and got a response in 24h"

---

## Core Features (MVP)

### Feature 1: Text Input Command
**"As a PM, I want to invoke BMAD by typing a command in the dashboard"**

- Text input field → triggers BMAD command
- Response panel shows BMAD guidance + next steps
- **Scope:** Support `/bmad-help` and workflow triggers only
- **Out of Scope:** Voice input (postponed—can be added later if demand arises)

### Feature 2: Workflow Browser
"As a PM, I want to see all available workflows organized by phase—so I can either explore recommended paths or jump straight to a known workflow."

- List all 19 BMAD workflows grouped by phase (Analysis, Planning, Solutioning, Implementation, Quick Flow, Context)
- One-click activation → launches workflow with project context
- Brief description for each workflow
- Allow expert users to directly navigate to a specific workflow (e.g. Create PRD, Create Vision)
- **Scope:** Read-only view + activation button
- **Out of Scope:** Workflow creation, custom workflows, drag-drop

### Feature 3: Request Inbox
**"As a PM, I want to centralize stakeholder requests in one place"**

- Receive requests from stakeholders (email, Slack, manual submission)
- Auto-categorize: 🐛 Bugfix, ✅ Activation, 🆘 Support, 🚀 Initiative
- Display priority + requester
- "Process with BMAD" button → auto-generates `/bmad-help` command
- **Scope:** Display + categorization + basic filtering; manual classification acceptable initially
- **Out of Scope:** Full ticketing system, SLA tracking, approval workflows; automatic classification can be deferred or optional

### Feature 4: BMAD Integration
**"As a PM, I want guidance on which workflow to use"**

- Text input accepts any `/bmad-*` command
- Response shows BMAD output + suggested next workflow
- Link to relevant documentation
- **Scope:** Pass-through to BMAD CLI
- **Out of Scope:** Workflow execution, artifact generation

---

## Non-Functional Requirements

| Requirement | Target | Rationale |
|-------------|--------|-----------|
| **Availability** | Web-accessible, no installation | Browser-based Vue 3 app |
| **Latency** | <2s response for BMAD commands | CLI execution timeout |
| **Uptime** | 99% during business hours | Not production-critical (advisory tool) |
| **Scalability** | Support 50+ PMs | Stateless backend, simple DB |
| **Storage** | 30 days request history | PostgreSQL, auto-purge old records |
| **Auth** | Basic (email + password / OAuth) | MVP: Username/password, Phase 2: SSO |

---

## Tech Stack (Pragmatic Choices)

### Frontend
- **Vue 3** + **TypeScript** — Framework already used in BMAD ecosystem
- **Vite** — Fast dev + production builds
- **TailwindCSS** — Utility-first CSS, minimal overhead
- **Web Speech API** — Native browser voice (no SDK)

### Backend
- **Node.js + Express** — Familiar to BMAD team
- **PostgreSQL** — Simple schema, reliable
- **WebSocket** — Real-time updates (optional Phase 2)
- **Child Process** — Execute BMAD CLI directly

### Deployment
- **Frontend:** Vercel or Netlify (static SPA)
- **Backend:** Railway or Heroku (simple PaaS)
- **Database:** PostgreSQL (managed, e.g., Vercel Postgres)

**Why this stack?**
- No exotic dependencies
- Leverages existing BMAD team skills
- Quick to deploy
- Easy to maintain

---

## Scope & Out-of-Scope

### ✅ IN SCOPE (MVP)
- Text input for BMAD commands
- Voice input (browser Web Speech API)
- Workflow discovery + one-click activation
- Request inbox with auto-categorization (via Claude AI)
- Basic request filtering (by type/priority)
- `/bmad-help` integration
- Single sign-on (email/password)

### ❌ OUT OF SCOPE (MVP)
- Full ticketing system (use Jira for that)
- Workflow execution tracking (BMAD handles this)
- Advanced analytics / KPIs
- Slack/Teams bot integration
- File uploads / attachments
- Comments / threaded discussions
- Approval workflows
- Custom workflows
- Mobile app

---

## Minimal Viable Product (MVP) Definition

**Launch in 4 weeks with one developer:**

```
Week 1-2: Backend Setup
├─ Node.js/Express skeleton
├─ PostgreSQL schema (requests, executions)
├─ BMAD CLI integration (child_process)
└─ Request classification (Claude SDK)

Week 2-3: Frontend
├─ Vue 3 app scaffold
├─ Text + voice input components
├─ Workflow browser
├─ Request inbox
└─ Integration with backend API

Week 3-4: Polish + Deploy
├─ Error handling, logging
├─ Basic auth (email/password)
├─ Deploy frontend to Vercel
├─ Deploy backend to Railway
├─ Documentation + user guide
└─ Soft launch with 5 beta PMs
```

**Team:**
- 1 Full-stack dev (Node.js + Vue)
- 0.5 PM (you) for guidance
- 0 DevOps engineer (use managed services)

---

## User Workflows

### Workflow 1: PM Requests BMAD Help
```
PM: "Fix login bug on iOS"
  ↓
Dashboard: Sends to backend
  ↓
Backend: Invokes `/bmad-help fix login bug`
  ↓
BMAD Agent: Returns guidance
  ↓
Dashboard: Shows response + suggests "quick-dev" workflow
  ↓
PM: Clicks "Activate quick-dev" → BMAD guide launches
```

### Workflow 2: Stakeholder Submits Request
```
Stakeholder: Submits "Add dark mode" via request form
  ↓
Backend: Classifies as "activation" (via Claude)
  ↓
Dashboard: Shows in inbox with ✅ badge
  ↓
PM: Reviews, clicks "Process with BMAD"
  ↓
Dashboard: Auto-fills "/bmad-help enable dark mode"
  ↓
PM: Sees BMAD guidance and next steps
```

### Workflow 3: Browsing Workflows
```
PM: Clicks "Implementation" phase
  ↓
Dashboard: Shows 7 implementation workflows
  ↓
PM: Selects "Create Story"
  ↓
Dashboard: Shows description + "Activate" button
  ↓
PM: Clicks → workflow launches in BMAD Agent
```

---

## Success Metrics (Month 1)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Active Users** | 5+ PMs | Google Analytics, login records |
| **Daily Usage** | 10+ commands/day | API logs |
| **Adoption Rate** | 50% of PM team | Signup tracking |
| **Request Volume** | 5-10 requests/week | Database count |
| **BMAD Invocations** | 20+ workflows/month | Execution history |
| **User Satisfaction** | >4/5 rating | Post-launch survey |

---

## Roadmap (Beyond MVP)

### Phase 2 (Month 2)
- ✅ WebSocket for real-time workflow updates
- ✅ Request SLA tracking (target response times)
- ✅ Basic analytics dashboard (usage by workflow/team)
- ✅ Request templates (quick submission for common types)

### Phase 3 (Month 3)
- ✅ SSO integration (Okta, Azure AD)
- ✅ Slack notifications for new requests
- ✅ Bulk request import (CSV)
- ✅ Advanced filtering + saved searches
- ✅ Export history (PDF, CSV)

### Phase 4 (Quarter 2)
- ✅ Workflow execution tracking (status, artifacts)
- ✅ AI-powered request suggestions
- ✅ Portfolio health scorecard
- ✅ Stakeholder portal (self-serve request submission)

**Philosophy:** Add features only when PM team requests them or when data shows bottleneck.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **BMAD CLI changes break integration** | High | Pin BMAD version; follow changelog |
| **Claude API rate limits** | Medium | Cache request classifications; implement queue |
| **Adoption by PM team** | High | Early beta feedback; in-person training; measure satisfaction |
| **Data privacy (requests)** | High | Encrypt DB; audit logs; GDPR compliance |
| **Browser support (Web Speech API)** | Low | Provide text-only fallback for unsupported browsers |

---

## Acceptance Criteria

The MVP is successful when:

- [ ] PMs can invoke `/bmad-help` from dashboard without terminal
- [ ] Voice input works in Chrome/Safari/Firefox
- [ ] All 19 workflows visible and activatable
- [ ] New requests auto-categorized with >85% accuracy
- [ ] Dashboard accessible from any modern browser
- [ ] Zero IDE installation required
- [ ] <2s response time for BMAD commands
- [ ] 5+ PMs actively using dashboard daily

---

## Next Steps

1. **Review & Align** (1 day)
   - Stakeholder review of this brief
   - Confirm scope, adjust if needed
   - Prioritize Phase 2 features

2. **Design & Architecture** (3-5 days)
   - Wireframes for dashboard (Figma)
   - Backend API spec (OpenAPI schema)
   - Database schema (ERD)

3. **Development Setup** (2-3 days)
   - Create GitHub repo structure
   - Set up CI/CD pipeline (GitHub Actions)
   - Configure staging environment

4. **Sprint 1: Backend** (Week 1-2)
   - Express server + routes
   - PostgreSQL integration
   - BMAD CLI wrapper
   - Claude classification endpoint

5. **Sprint 2: Frontend** (Week 2-3)
   - Vue 3 components
   - API client integration
   - Voice input
   - Workflow browser

6. **Sprint 3: Integration & Polish** (Week 3-4)
   - End-to-end testing
   - Performance optimization
   - Deployment
   - Beta launch

---

## Decision Log

| Decision | Rationale | Alternative Considered |
|----------|-----------|------------------------|
| **Use Claude for classification** | Reliable, no training needed | Rule-based (too fragile) |
| **Web-only, no mobile app** | MVP scope, can add later | Native app (over-engineering) |
| **PostgreSQL** | Simple relational schema | MongoDB (overkill for MVP) |
| **Vercel + Railway** | No infra overhead | Self-hosted (ops burden) |
| **No approval workflows** | Not needed for MVP | Could add later if needed |

---

## Questions for Refinement

1. **User Authentication:** Email/password or integrate with existing SSO?
2. **Request Source:** How will stakeholders submit requests (manual form, email, integration)?
3. **Organization:** Multi-portfolio or single portfolio?
4. **Team Size:** How many PMs, how many stakeholders?
5. **Integration:** Does this need to connect to Jira, Linear, or other ticketing?
6. **Timeline:** 4 weeks acceptable or compressed/extended?

---

**Document Status:** DRAFT (awaiting stakeholder alignment)  
**Last Updated:** 2026-03-06  
**Owner:** Product Team
