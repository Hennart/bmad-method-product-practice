---
title: "BMAD Dashboard - Implementation Roadmap"
date: 2026-03-06
phase: "Planning"
status: "Ready for Development"
---

# BMAD Dashboard: Implementation Roadmap

## Overview
This roadmap breaks down the MVP into actionable sprints with clear deliverables, dependencies, and exit criteria.

---

## Sprint Structure

### Sprint 1: Backend Foundation (Week 1-2)
**Goal:** Core backend infrastructure operational  
**Owner:** 1 Full-stack Developer  
**Deliverable:** Deployed Express server with working API

#### Task 1.1: Project Setup
- [ ] Create GitHub repo: `bmad-dashboard`
- [ ] Initialize Node.js project: `npm init`
- [ ] Install core deps: `express`, `typescript`, `dotenv`, `pg` (PostgreSQL driver)
- [ ] Set up TypeScript config (`tsconfig.json`)
- [ ] Create folder structure (see Architecture Philosophy doc)
- [ ] Configure `.env.example` with required vars
- **Exit Criteria:** `npm start` runs without errors

#### Task 1.2: Database Setup
- [ ] Create PostgreSQL schema:
  ```sql
  CREATE TABLE requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    type VARCHAR(20), -- bugfix, activation, support, initiative
    priority VARCHAR(20), -- critical, high, medium, low
    requester VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP,
    linked_workflow VARCHAR(100),
    status VARCHAR(20) DEFAULT 'new'
  );
  
  CREATE TABLE executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    command TEXT NOT NULL,
    output TEXT,
    status VARCHAR(20), -- success, error
    created_at TIMESTAMP DEFAULT NOW()
  );
  
  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [ ] Create migration script (`db/init.sql`)
- [ ] Test connection from Node.js
- **Exit Criteria:** Can query database from Node.js CLI

#### Task 1.3: BMAD CLI Integration
- [ ] Create `services/bmad.service.ts`:
  ```typescript
  import { execFile } from 'child_process';
  
  export const invokeBmadCommand = (cmd: string, projectPath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      execFile('bash', ['-c', `cd ${projectPath} && npx bmad-method ${cmd}`], 
        { timeout: 30000 },
        (error, stdout, stderr) => {
          if (error) reject(new Error(stderr || error.message));
          resolve(stdout);
        }
      );
    });
  };
  ```
- [ ] Test locally: `npx bmad-method --help`
- [ ] Test from Node.js: `invokeBmadCommand('--help', '/path/to/project')`
- **Exit Criteria:** Can execute BMAD commands from API

#### Task 1.4: Claude Integration (Request Classification)
- [ ] Install Anthropic SDK: `npm install @anthropic-ai/sdk`
- [ ] Create `services/classifier.ts`:
  ```typescript
  import Anthropic from '@anthropic-ai/sdk';
  
  export const classifyRequest = async (
    title: string,
    description: string
  ): Promise<{ type: string; confidence: number }> => {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: `Classify this request into ONE category: bugfix, activation, support, or initiative.
        
Title: ${title}
Description: ${description}

Respond with JSON: {"type": "...", "confidence": 0.0-1.0}`
      }]
    });
    const text = message.content[0].type === 'text' ? message.content[0].text : '{}';
    return JSON.parse(text);
  };
  ```
- [ ] Test with sample requests
- [ ] Handle Claude API errors gracefully
- **Exit Criteria:** Classify 5 test requests, accuracy >80%

#### Task 1.5: Basic API Routes
- [ ] Create `routes/commands.ts`:
  - `POST /api/commands/invoke` — Execute BMAD command
- [ ] Create `routes/workflows.ts`:
  - `GET /api/workflows` — Return hardcoded list of 19 workflows
- [ ] Create `routes/requests.ts`:
  - `GET /api/requests` — Query from DB
  - `POST /api/requests` — Create + auto-classify
- [ ] Create `middleware/errorHandler.ts` — Global error handler
- [ ] Test with Postman or curl
- **Exit Criteria:** All routes return 200 + valid JSON

#### Task 1.6: Deployment (Railway)
- [ ] Create Railway account
- [ ] Create PostgreSQL service
- [ ] Create Node.js service (connect to GitHub repo)
- [ ] Set environment variables
- [ ] Deploy `main` branch
- [ ] Test API from production URL
- **Exit Criteria:** `curl https://your-app.railway.app/api/workflows` returns 200

**Sprint 1 Estimated Time:** 8-10 working days (1 dev)

---

### Sprint 2: Frontend Build (Week 2-3)
**Goal:** Interactive Vue 3 dashboard  
**Owner:** 1 Full-stack Developer (parallel to Sprint 1)  
**Deliverable:** Deployed Vercel website with working UI

#### Task 2.1: Vue 3 Project Setup
- [ ] Create Vite project: `npm create vite@latest bmad-dashboard-ui -- --template vue-ts`
- [ ] Install TailwindCSS: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Initialize Tailwind: `npx tailwindcss init -p`
- [ ] Create folder structure
- [ ] Configure `.env.example` with `VITE_API_URL`
- **Exit Criteria:** `npm run dev` starts without errors

#### Task 2.2: API Client Service
- [ ] Create `src/services/api.ts`:
  ```typescript
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  
  export const api = {
    async invokeCommand(command: string) {
      return fetch(`${API_URL}/commands/invoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      }).then(r => r.json());
    },
    
    async getWorkflows() {
      return fetch(`${API_URL}/workflows`).then(r => r.json());
    },
    
    async getRequests() {
      return fetch(`${API_URL}/requests`).then(r => r.json());
    },
    
    async createRequest(title: string, description: string) {
      return fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      }).then(r => r.json());
    }
  };
  ```
- [ ] Test API calls locally
- **Exit Criteria:** API calls work with mock data

#### Task 2.3: Core Components
- [ ] Create `TextInput.vue`:
  - Input field for BMAD command
  - Send button
  - Voice button (implement in Task 2.5)
  
- [ ] Create `BmadResponse.vue`:
  - Display command output
  - Show next steps + suggested workflow
  
- [ ] Create `WorkflowBrowser.vue`:
  - List workflows by phase (Analysis, Planning, Solutioning, Implementation, Quick Flow, Context)
  - Each workflow has: Name, Description, Activate button
  - Hardcoded list for MVP
  
- [ ] Create `RequestInbox.vue`:
  - List requests with type badge (🐛 bugfix, ✅ activation, 🆘 support, 🚀 initiative)
  - Show requester, date, priority
  - "Process with BMAD" button
  
- [ ] Create `App.vue`:
  - Layout: Header + 3 main sections (Text Input, Workflows, Requests)
  - Basic CSS Grid layout (via Tailwind)
  
- **Exit Criteria:** All components render without API calls, basic styling applied

#### Task 2.4: State Management (Simple)
- [ ] Use Vue 3 `ref()` + `reactive()` for local state (no Vuex/Pinia needed for MVP)
- [ ] Create composables if needed (e.g. `useApi.ts`)
- [ ] Handle loading states + error states
- **Exit Criteria:** Components respond to user input

#### Task 2.5: Voice Input
- [ ] Add voice button to `TextInput.vue`
- [ ] Implement Web Speech API:
  ```typescript
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'fr-FR';
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    command.value = transcript;
    invokeCommand();
  };
  ```
- [ ] Add fallback for unsupported browsers
- [ ] Test on Chrome, Safari, Firefox
- **Exit Criteria:** Voice input works and populates text field

#### Task 2.6: Integration Tests (Basic)
- [ ] Test text input → API call → response display
- [ ] Test workflow list renders correctly
- [ ] Test request inbox displays requests with correct badges
- [ ] Test voice input → text population → API call
- **Exit Criteria:** All happy paths work end-to-end

#### Task 2.7: Deployment (Vercel)
- [ ] Create Vercel account (free tier)
- [ ] Link GitHub repo
- [ ] Configure environment variables (`VITE_API_URL`)
- [ ] Deploy `main` branch
- [ ] Test in production
- **Exit Criteria:** Frontend accessible at `https://your-app.vercel.app`

**Sprint 2 Estimated Time:** 8-10 working days (parallel to Sprint 1)

---

### Sprint 3: Integration & Polish (Week 3-4)
**Goal:** MVP ready for beta launch  
**Owner:** 1 Full-stack Developer + Product Manager (0.5)  
**Deliverable:** Working MVP deployed to production

#### Task 3.1: End-to-End Testing
- [ ] Test full flow: Text input → BMAD invocation → response display
- [ ] Test: New request created → auto-classified → displayed in inbox
- [ ] Test: "Process with BMAD" button → pre-fills text input
- [ ] Test: Click workflow → system behaves correctly
- [ ] Test error scenarios:
  - BMAD CLI not found
  - Claude API rate limit
  - Network timeout
  - Invalid request data

**Exit Criteria:** All flows work, errors handled gracefully

#### Task 3.2: Security & Auth (Basic)
- [ ] Add email/password signup to backend
- [ ] Add JWT token generation
- [ ] Add auth middleware to protected routes
- [ ] Add login form to frontend
- [ ] Add logout + session management
- [ ] Sanitize BMAD commands to prevent injection
- **Exit Criteria:** Users must login to use dashboard

#### Task 3.3: Logging & Monitoring
- [ ] Add request logging to backend (console → file → Railway logs)
- [ ] Add error tracking (Sentry):
  ```typescript
  import * as Sentry from "@sentry/node";
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  ```
- [ ] Add frontend analytics (simple: log page views + API calls)
- **Exit Criteria:** Can view logs in Railway + Sentry dashboard

#### Task 3.4: Performance Tuning
- [ ] Frontend: Check bundle size (`npm run build`)
  - Target: <150KB gzipped
  - If over: Remove unused Tailwind classes, lazy-load components
- [ ] Backend: Add rate limiting
  ```typescript
  import rateLimit from 'express-rate-limit';
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100 // requests per window
  });
  app.use('/api/', limiter);
  ```
- [ ] Test API response time: target <500ms
- **Exit Criteria:** Bundle <150KB, API responses <500ms

#### Task 3.5: Documentation
- [ ] Create user guide (1 page):
  - How to login
  - How to use text input
  - How to use voice input
  - How to browse workflows
  - How to view requests
  - FAQ
  
- [ ] Create developer guide (1 page):
  - How to set up locally
  - How to run tests
  - How to deploy
  - API endpoints reference
  
- [ ] Add comments to code where needed
- [ ] Create CHANGELOG.md
- **Exit Criteria:** New user can operate dashboard in <5 min

#### Task 3.6: Beta Launch
- [ ] Select 5 beta testers (PMs from different teams)
- [ ] Send them dashboard link + user guide
- [ ] Collect feedback (Slack channel + weekly sync)
- [ ] Log bugs in GitHub Issues
- [ ] Fix critical bugs (blockers) within 24h
- [ ] Defer non-critical bugs to Phase 2
- **Exit Criteria:** 5 PMs actively using dashboard, <3 critical bugs found

#### Task 3.7: Production Hardening
- [ ] Double-check environment variables are set correctly
- [ ] Verify HTTPS is enabled (should be automatic on Vercel + Railway)
- [ ] Test on mobile browsers (iOS Safari, Chrome Android)
- [ ] Set up automatic backups (Railway handles this)
- [ ] Create runbook for on-call support
- **Exit Criteria:** Dashboard is stable, documented, monitored

**Sprint 3 Estimated Time:** 6-8 working days

---

## Parallel Work (Can Happen Simultaneously)

```
Week 1: Sprint 1.1-1.2 (Backend setup) || Sprint 2.1-2.2 (Frontend setup)
Week 2: Sprint 1.3-1.5 (API routes) || Sprint 2.3-2.4 (Components)
Week 3: Sprint 1.6 (Deployment) + Sprint 2.5-2.6 (Voice + integration)
Week 4: Sprint 2.7 (Frontend deployment) || Sprint 3 (E2E + polish)
```

---

## Definition of Done (MVP)

- [ ] All code pushed to `main` branch
- [ ] All tests passing (integration tests at minimum)
- [ ] Deployed to staging environment
- [ ] Deployed to production
- [ ] Monitored for errors (Sentry + Railway logs)
- [ ] Documentation complete
- [ ] 5+ beta users actively using it
- [ ] Feedback collected + prioritized for Phase 2

---

## Risk Mitigation

| Risk | Likelihood | Mitigation |
|------|------------|-----------|
| BMAD CLI integration takes longer | Medium | Start Task 1.3 early; have fallback to mock commands |
| Claude API rate limits | Low | Implement simple queue (BullMQ) in Phase 2 |
| Voice input browser compatibility | Low | Fall back to text input; test on target browsers early |
| Deployment issues | Low | Test locally with Docker; use Railway's 1-click rollback |
| PM adoption slow | Medium | Involve beta testers early; iterate on feedback; measure NPS |

---

## Success Metrics (End of Week 4)

| Metric | Target | Measurement |
|--------|--------|-------------|
| MVP deployed | ✅ Yes | Production URL accessible |
| API uptime | >99% | Railway dashboard + Sentry |
| Response time | <500ms | Chrome DevTools + API logs |
| Beta users | 5 | Slack channel membership |
| Daily usage | 10+ commands | API logs + Vercel analytics |
| Bug severity | Critical bugs: 0 | GitHub Issues |
| User satisfaction | >4/5 | Post-launch survey |

---

## Next Steps (Action Items)

### Immediately (This Week)
- [ ] Review & approve PRD + Architecture Philosophy docs with stakeholder
- [ ] Create GitHub repo: `bmad-dashboard`
- [ ] Assign developer
- [ ] Create Railway + Vercel projects
- [ ] Send invites to 5 beta testers

### Week 1
- [ ] Kick off Sprint 1 & 2 in parallel
- [ ] Daily standups (15 min) to catch blockers

### Week 4
- [ ] BetaLaunch
- [ ] Collect feedback
- [ ] Plan Phase 2 based on feedback

---

**Document Status:** READY FOR DEVELOPMENT  
**Last Updated:** 2026-03-06  
**Owner:** Product Team
