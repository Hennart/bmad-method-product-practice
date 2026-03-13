---
title: "BMAD Dashboard - Architecture & Design Philosophy"
date: 2026-03-06
status: "Working Document"
---

# BMAD Dashboard: Architecture & Design Philosophy

## Core Principle: **Pragmatism Over Perfection**

This project is designed to solve **one problem well** without building infrastructure for problems that don't exist yet.

---

## What We're Building (The Essentials)

### 1. Frontend: Simple Vue 3 SPA
**Size:** ~15KB gzipped (excluding deps)  
**Complexity:** Low (3-4 components)

```
App.vue
├── TextInput.vue          (command input + voice)
├── WorkflowBrowser.vue    (display workflows by phase)
├── RequestInbox.vue       (show requests with auto-categorization)
└── BmadResponse.vue       (display BMAD output)
```

**Pattern:** Stateful component tree, fetch from backend API on demand

### 2. Backend: Express + Node.js Minimal Server
**Size:** ~200 lines of code (MVP)  
**Routes:**
- `POST /api/commands/invoke` — Execute BMAD command
- `GET /api/workflows` — List available workflows
- `GET /api/requests` — Fetch requests
- `POST /api/requests/classify` — Classify via Claude
- `POST /api/requests` — Create new request

**Pattern:** Thin request handlers → business logic → DB/CLI calls

### 3. Database: Simple PostgreSQL Schema
**Tables:**
- `requests` — (id, title, description, type, priority, requester, created_at)
- `executions` — (id, command, output, status, created_at)
- `users` — (id, email, password_hash, created_at)

**That's it.** No complex relationships, no soft deletes, no audit tables yet.

---

## What We're NOT Building (The Traps to Avoid)

### ❌ Trap 1: Full Ticketing System
**Why it's tempting:** "What if we need comments, attachments, approvals?"  
**Why we skip it:** Jira exists. If you need ticketing, use Jira. This is a BMAD interface, not a new ticket tracking system.  
**Cost of adding:** +500 LOC, +2 weeks, +DB complexity  
**Benefit:** Minimal. Stakeholders already have email/Slack.

### ❌ Trap 2: Real-time Collaboration
**Why it's tempting:** "PMs want to see live workflow status"  
**Why we skip it:** BMAD workflows run in your Claude IDE. Users just need to check back after. Not a synchronous tool.  
**Cost of adding:** WebSocket server, client-side state sync, error handling  
**Benefit:** Nice-to-have (Phase 2)

### ❌ Trap 3: Advanced Analytics & KPIs
**Why it's tempting:** "We need to measure adoption and ROI"  
**Why we skip it:** Count logins and API calls. That's enough for MVP.  
**Cost of adding:** Analytics pipeline, dashboarding, retention policies  
**Benefit:** Can add later when you have 20 PMs using it

### ❌ Trap 4: Microservices
**Why it's tempting:** "Let's separate concerns: API, CLI wrapper, classifier"  
**Why we skip it:** One Node.js server does fine. Deployment complexity adds 0 value at this scale.  
**Cost of adding:** Docker orchestration, inter-service communication, debugging  
**Benefit:** None until you have 10M requests/month

### ❌ Trap 5: Custom Workflow Engine
**Why it's tempting:** "We could automate request → workflow selection"  
**Why we skip it:** BMAD Agent already does this via `/bmad-help`. Let the human PM decide. We just show the options.  
**Cost of adding:** Rules engine, testing, edge cases  
**Benefit:** Marginal (PM review is already fast)

### ❌ Trap 6: Fancy UI Framework / Design System
**Why it's tempting:** "We should use Vuetify/Material/ADEO Mozaic"  
**Why we skip it:** TailwindCSS + vanilla HTML buttons. Gets you 90% of the way with 0 dependencies.  
**Cost of adding:** Bundle size, theming complexity, upgrade burden  
**Benefit:** Marginal. Functionality > aesthetics in MVP

---

## Architectural Decisions & Rationale

### Decision 1: Single Express Server (Not Microservices)

```
┌─────────────────┐
│   Vue 3 SPA     │
└────────┬────────┘
         │ HTTP
         │
    ┌────▼─────────────────┐
    │   Express Server      │
    ├───────────────────────┤
    │ • Routes              │
    │ • BMAD CLI wrapper    │
    │ • Claude integration  │
    │ • DB queries          │
    └────┬────────┬─────────┘
         │        │
    ┌────▼───┐ ┌──▼────────────┐
    │ PgSQL  │ │ Child Process  │
    │        │ │ → BMAD CLI     │
    └────────┘ └────────────────┘
```

**Why:** Monolith is faster to deploy and debug at this scale. We can split later if needed.

---

### Decision 2: Request Classification (Manual First, Assisted Later)

PMs must be able to file a request without thinking about where to put it; the dashboard will accept entries regardless of source. For MVP we rely on **manual classification** during intake: the submitter or intake team picks one of four types (bugfix, activation, support, initiative) via a simple dropdown.

**Why manual first:**
- No dependency on external services
- Simplest UX across varying levels of PM maturity
- Training ensures accuracy rather than ML guesswork

**Assisted classification (Phase 2)**
If beta testers ask for help, we can layer an AI suggestion engine. Example snippet:

```typescript
const message = await client.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 100,
  messages: [
    {
      role: "user",
      content: `Classify this request into one category: bugfix, activation, support, or initiative.

Title: ${title}
Description: ${description}

Respond with JSON: {"type": "...", "confidence": 0.0-1.0}`
    }
  ]
});
```

AI suggestions are optional and can be overridden manually.

**Decision:** Build manual classification in MVP; expose an API hook for future automation.

---

### Decision 3: Store Requests in PostgreSQL (Not Spreadsheet)

**Why:**
- Query requests by type/priority (free filtering)
- Audit trail (who, when, what)
- Integration hooks for future Slack/email notifications
- Simple to scale if requests grow

**Schema:**
```sql
CREATE TABLE requests (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type VARCHAR(20),                -- bugfix|activation|support|initiative
  priority VARCHAR(20),             -- critical|high|medium|low
  requester VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP,           -- when PM actioned it
  linked_workflow VARCHAR(100),     -- suggested workflow
  status VARCHAR(20)                -- new|in-progress|resolved
);

CREATE INDEX idx_type ON requests(type);
CREATE INDEX idx_created_at ON requests(created_at DESC);
```

---

### Decision 4: Voice Input via Web Speech API (Optional Later)

Voice will **not be part of the MVP**. PMs can type commands and the team can revisit voice support once the core experience is stable and adoption is proven.

**Why defer:**
- Adds UI complexity and additional testing requirements
- Not requested by users in initial interviews
- Can be slotted in Phase 2 if demand arises

**When to implement:**
Add the Web Speech API snippet shown below when voice becomes a confirmed need. Until then, the text input remains the only command entry point.

```typescript
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'fr-FR';
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  bmadCommand.value = transcript;
  invokeBmad();
};
recognition.start();
```

**Fallback:** Text input for browsers without Web Speech API

---

### Decision 5: Deploy on Vercel (Frontend) + Railway (Backend)

**Why Vercel?**
- Zero-config for Vue apps
- Auto-deploys from GitHub
- Built-in HTTPS, CDN, analytics
- Free tier covers 50+ PMs easily

**Why Railway?**
- One-click PostgreSQL setup
- Simple Node.js deployment
- $5-10/month covers MVP
- Easy environment variables

**Alternatives & Why Not:**
- **AWS:** Overkill, too many buttons, DevOps overhead
- **Docker:** Fine, but Railway handles this for you
- **Self-hosted:** Not worth the ops burden for MVP

---

## What Happens When You Need More (Phase 2+)

### "We need WebSocket for real-time updates"
Add `ws` npm package, nothing else changes. ~1 day of work.

### "We need Slack notifications"
PostgreSQL trigger + simple webhook. ~1 day.

### "We need to track workflow execution status"
Add `executions` table, log BMAD output. ~2 days.

### "We need to restrict PMs by portfolio"
Add `portfolio_id` to users & requests. Add simple RBAC middleware. ~1 day.

### "We need SSO (Okta/Azure AD)"
Swap email/password for OAuth2 library (`passport-okta`). ~2 days.

**Key point:** None of these require rearchitecting the system.

---

## Performance & Scalability

### Current Scale (MVP)
- 50 PMs
- 10 requests/week
- 20 workflows invocations/month
- Single Node.js process handles this easily

### Growing (Year 1)
- 200 PMs
- 100 requests/week
- 400 workflows/month
- Single server still handles this

### When You Need to Scale
- Add caching layer (Redis) for workflows list
- Add queue (BullMQ) for Claude classifications
- Add replicas for the Express server (Railway handles this with a button)
- Instrument with APM (Sentry, DataDog)

**No need to architect for this today.**

---

## Security (Pragmatic Approach)

### What We Do
- ✅ Hash passwords with bcrypt
- ✅ HTTPS only (Vercel + Railway enforce this)
- ✅ Environment variables for secrets (no hardcoding)
- ✅ Sanitize CLI commands (avoid injection attacks)
- ✅ Rate limit API endpoints (express-rate-limit)

### What We Don't Do (Not Needed Yet)
- ❌ Two-factor auth (add in Phase 2)
- ❌ Request encryption at rest (PostgreSQL on Railway is managed)
- ❌ Advanced RBAC (simple email-based privileges are enough)
- ❌ SOC 2 / FedRAMP compliance (not required for internal tool)

---

## Testing Strategy (Minimal but Effective)

### Unit Tests (30% coverage, high-value tests only)
```typescript
// test/classifier.spec.ts
describe('Request Classification', () => {
  it('classifies "fix login bug" as bugfix', async () => {
    const result = await classifyRequest('Fix login bug', '...');
    expect(result.type).toBe('bugfix');
  });
});
```

### Integration Tests (happy path)
```typescript
// test/api.spec.ts
describe('POST /api/commands/invoke', () => {
  it('invokes /bmad-help and returns response', async () => {
    const res = await request(app)
      .post('/api/commands/invoke')
      .send({ command: '/bmad-help' });
    expect(res.status).toBe(200);
    expect(res.body.result).toBeDefined();
  });
});
```

### Manual Testing (80% of bugs caught here)
- Test on Chrome, Safari, Firefox (10 min)
- Test voice input in quiet + noisy environment (10 min)
- Test on mobile browser (10 min)
- Ask 2 beta PMs to use it and report bugs (30 min)

**Don't build E2E selenium tests for MVP.** Playwright when you have 10 features.

---

## Error Handling (Simple but Resilient)

### User-Facing Errors
```typescript
try {
  const result = await invokeBmadCommand(cmd);
  return { status: 'success', message: result };
} catch (error) {
  if (error.code === 'UNABLE_TO_SPAWN_PROCESS') {
    return { status: 'error', message: 'BMAD CLI not found. Check installation.' };
  }
  if (error.response?.status === 429) {
    return { status: 'error', message: 'Too many requests. Try again in 1 minute.' };
  }
  return { status: 'error', message: 'Something went wrong. Try again.' };
}
```

### Logging
```typescript
// Use console.log to file in production (Railway captures stdout)
console.log(`[${new Date().toISOString()}] ${level}: ${message}`);
```

**Don't use:** Winston, Bunyan, or other logging frameworks for MVP. You don't need them.

---

## Code Organization

```
backend/
├── src/
│   ├── routes/
│   │   ├── commands.ts       (BMAD invocation)
│   │   ├── workflows.ts      (list workflows)
│   │   ├── requests.ts       (CRUD requests)
│   │   └── auth.ts           (login/signup)
│   ├── services/
│   │   ├── bmad.service.ts   (CLI wrapper)
│   │   ├── classifier.ts     (Claude integration)
│   │   └── db.ts             (pg queries)
│   ├── middleware/
│   │   ├── auth.ts           (JWT middleware)
│   │   └── errorHandler.ts   (global error handler)
│   └── server.ts             (main app setup)
├── test/
├── package.json
└── .env.example

frontend/
├── src/
│   ├── components/
│   │   ├── TextInput.vue
│   │   ├── WorkflowBrowser.vue
│   │   ├── RequestInbox.vue
│   │   └── BmadResponse.vue
│   ├── services/
│   │   └── api.ts            (fetch wrapper)
│   ├── App.vue
│   └── main.ts
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

**Philosophy:** Flat hierarchy, clear naming, minimal nesting.

---

## Feature Flags (Minimal Use)

For MVP, we don't need feature flags. Just use Git branches.

**When to add flags (Phase 2):**
- Testing A/B variations
- Gradual rollout to PMs
- Quick disable of buggy feature

**Simple implementation:**
```typescript
const FEATURES = {
  REQUEST_TEMPLATES: process.env.FEATURE_REQUEST_TEMPLATES === 'true',
  SLACK_NOTIFICATIONS: process.env.FEATURE_SLACK_NOTIFICATIONS === 'true',
};

if (FEATURES.REQUEST_TEMPLATES) {
  // Show templates in UI
}
```

---

## Deployment Checklist (Simple)

- [ ] Create GitHub repo (public or private)
- [ ] Set up Vercel project (link GitHub)
- [ ] Set up Railway project (PostgreSQL + Node.js services)
- [ ] Configure environment variables (.env in Railway)
- [ ] Run `npm run build` locally and test
- [ ] Create `staging` branch for pre-production testing
- [ ] Deploy `main` branch → production
- [ ] Test in browser: login → create request → invoke workflow

**Estimated setup time:** 2 hours

---

## Common Questions

### Q: Should we use TypeScript?
**A:** Yes, but only for backend. Frontend can be plain JS if you prefer.

### Q: Do we need GraphQL?
**A:** No. REST API is simpler and sufficient for MVP.

### Q: Should we use a UI component library?
**A:** No. TailwindCSS + vanilla HTML is faster and leaner.

### Q: Do we need Docker?
**A:** Railway handles containerization for you. Skip Docker for MVP.

### Q: What about caching (Redis)?
**A:** Skip it. PostgreSQL is fast enough. Add Redis in Phase 2 if needed.

### Q: Should we implement request templates?
**A:** Not for MVP. Add if PMs ask for it.

### Q: What about analytics tracking?
**A:** Count API calls and unique users. Use Railway logs. That's enough.

### Q: Do we need monitoring (Sentry)?
**A:** Use Sentry free tier to catch backend errors. Worth the 5-min setup.

---

## Measuring Success (Not Overkill)

**Dashboard metrics (free, from Railway logs & Vercel):**
- Unique daily active users
- Requests created per week
- Commands invoked per week
- Workflow activations by type
- Error rates

**Qualitative feedback:**
- Monthly 1:1s with 3-5 PMs: "What's working? What's missing?"
- Slack channel for feedback
- NPS survey (monthly)

**Decision threshold:** If 3+ PMs ask for a feature, prioritize it.

---

## Timeline (Realistic, with Contingency)

| Week | Task | Owner | Status |
|------|------|-------|--------|
| W1   | Backend scaffold, DB schema, BMAD CLI wrapper | 1 Dev | Design docs review |
| W2   | Frontend scaffold, API client, text/voice input | 1 Dev | Parallel to W1 |
| W3   | Integration: request classification, inbox display | 1 Dev | Depends on W1-W2 |
| W4   | E2E testing, deployment, beta launch | 1 Dev + PM | Buffer for bugs |

**Realistic contingencies:**
- BMAD CLI integration takes longer than expected → shift to W5
- Claude API rate limits → implement queue
- Voice input quirks → fallback to text-only

**Not realistic:**
- All done by end of W2 (overconfidence)
- 2 developers are faster (communication overhead)

---

## Decision: What to Build First

### Priority 1 (MUST DO)
1. Text input + BMAD CLI integration
2. List workflows
3. Request classification + inbox

### Priority 2 (SHOULD DO)
4. Voice input
5. Basic auth (email/password)

### Priority 3 (NICE TO HAVE)
6. Request templates
7. Execution history view

**Launch with Priority 1 & 2. Add Priority 3 based on feedback.**

---

## Final Checklist: "Is This Over-Engineered?"

Ask yourself:

- [ ] Do we need this feature for MVP? (not "someday")
- [ ] Is the implementation < 1 day of work?
- [ ] Will removing it break the core use case?
- [ ] Do 3+ PMs ask for it?

If yes to all → build it. Otherwise → defer to Phase 2.

---

**Document Status:** WORKING DOCUMENT  
**Last Updated:** 2026-03-06  
**Author:** Product Team

---
