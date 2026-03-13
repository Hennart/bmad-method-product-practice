# Epics and User Stories for BMAD Dashboard - JIRA Import

This document contains the Epics and User Stories derived from the Implementation Roadmap, organized by sprint, with relationships highlighted.

## Sprint 1: Backend Foundation

### Epic: Backend Infrastructure Setup
**Description:** Establish the core backend infrastructure for the BMAD Dashboard.

#### User Story: Project Setup
As a developer, I want to set up the Node.js project so that I can start building the backend.
- Acceptance Criteria: npm start runs without errors
- Tasks:
  - Create GitHub repo: bmad-dashboard
  - Initialize Node.js project: npm init
  - Install core deps: express, typescript, dotenv, pg
  - Set up TypeScript config (tsconfig.json)
  - Create folder structure
  - Configure .env.example

#### User Story: Database Setup
As a developer, I want to set up the PostgreSQL database so that data can be stored and retrieved.
- Acceptance Criteria: Can query database from Node.js CLI
- Tasks:
  - Create PostgreSQL schema for requests, executions, users tables
  - Create migration script (db/init.sql)
  - Test connection from Node.js
- Depends on: Project Setup

#### User Story: BMAD CLI Integration
As a developer, I want to integrate BMAD CLI so that commands can be invoked from the API.
- Acceptance Criteria: Can execute BMAD commands from API
- Tasks:
  - Create services/bmad.service.ts
  - Test locally: npx bmad-method --help
  - Test from Node.js
- Depends on: Project Setup

#### User Story: Claude Integration for Request Classification
As a developer, I want to classify requests using Claude AI so that requests are automatically categorized.
- Acceptance Criteria: Classify 5 test requests with >80% accuracy
- Tasks:
  - Install Anthropic SDK
  - Create services/classifier.ts
  - Test with sample requests
  - Handle API errors
- Depends on: Project Setup

#### User Story: Basic API Routes
As a developer, I want to create basic API routes so that the frontend can interact with the backend.
- Acceptance Criteria: All routes return 200 + valid JSON
- Tasks:
  - Create routes/commands.ts (POST /api/commands/invoke)
  - Create routes/workflows.ts (GET /api/workflows)
  - Create routes/requests.ts (GET/POST /api/requests)
  - Create middleware/errorHandler.ts
  - Test with Postman or curl
- Depends on: Database Setup, BMAD CLI Integration, Claude Integration

#### User Story: Deployment to Railway
As a developer, I want to deploy the backend to Railway so that it's accessible in production.
- Acceptance Criteria: API accessible at production URL
- Tasks:
  - Create Railway account
  - Create PostgreSQL and Node.js services
  - Set environment variables
  - Deploy main branch
  - Test API from production
- Depends on: All Sprint 1 User Stories

## Sprint 2: Frontend Build

### Epic: Frontend Development
**Description:** Build the interactive Vue 3 dashboard frontend.

#### User Story: Vue 3 Project Setup
As a developer, I want to set up the Vue 3 project so that I can start building the UI.
- Acceptance Criteria: npm run dev starts without errors
- Tasks:
  - Create Vite project with Vue 3 + TypeScript
  - Install and configure TailwindCSS
  - Create folder structure
  - Configure .env.example with VITE_API_URL

#### User Story: API Client Service
As a developer, I want to create an API client so that the frontend can communicate with the backend.
- Acceptance Criteria: API calls work with mock data
- Tasks:
  - Create src/services/api.ts
  - Implement invokeCommand, getWorkflows, getRequests, createRequest methods
  - Test API calls locally
- Depends on: Vue 3 Project Setup

#### User Story: Core Components Development
As a developer, I want to create core Vue components so that users can interact with the dashboard.
- Acceptance Criteria: All components render without API calls, basic styling applied
- Tasks:
  - Create TextInput.vue (input field, send button, voice button placeholder)
  - Create BmadResponse.vue (display output, next steps)
  - Create WorkflowBrowser.vue (list workflows by phase)
  - Create RequestInbox.vue (list requests with badges)
  - Create App.vue (layout with header and sections)
- Depends on: Vue 3 Project Setup

#### User Story: State Management
As a developer, I want to manage application state so that components respond to user input.
- Acceptance Criteria: Components respond to user input
- Tasks:
  - Use Vue 3 ref() and reactive() for state
  - Create composables if needed
  - Handle loading and error states
- Depends on: Core Components Development

#### User Story: Voice Input Feature
As a user, I want to use voice input so that I can dictate BMAD commands.
- Acceptance Criteria: Voice input works and populates text field
- Tasks:
  - Add voice button to TextInput.vue
  - Implement Web Speech API
  - Add fallback for unsupported browsers
  - Test on multiple browsers
- Depends on: Core Components Development

#### User Story: Integration Tests
As a developer, I want to test the frontend integration so that all happy paths work end-to-end.
- Acceptance Criteria: All happy paths work end-to-end
- Tasks:
  - Test text input → API call → response display
  - Test workflow list rendering
  - Test request inbox display
  - Test voice input → text population → API call
- Depends on: API Client Service, Core Components Development, State Management, Voice Input Feature

#### User Story: Deployment to Vercel
As a developer, I want to deploy the frontend to Vercel so that it's accessible in production.
- Acceptance Criteria: Frontend accessible at production URL
- Tasks:
  - Create Vercel account
  - Link GitHub repo
  - Configure environment variables
  - Deploy main branch
  - Test in production
- Depends on: All Sprint 2 User Stories

## Sprint 3: Integration & Polish

### Epic: MVP Integration and Enhancement
**Description:** Integrate frontend and backend, add polish for beta launch.

#### User Story: End-to-End Testing
As a developer, I want to test the full application flow so that everything works together.
- Acceptance Criteria: All flows work, errors handled gracefully
- Tasks:
  - Test full flow: Text input → BMAD invocation → response
  - Test request creation and classification
  - Test workflow activation
  - Test error scenarios (CLI not found, API limits, etc.)
- Depends on: Sprint 1 and Sprint 2 Deployments

#### User Story: Basic Authentication
As a user, I want to log in so that my data is secure.
- Acceptance Criteria: Users must login to use dashboard
- Tasks:
  - Add email/password signup to backend
  - Add JWT token generation
  - Add auth middleware
  - Add login form to frontend
  - Add logout and session management
  - Sanitize BMAD commands
- Depends on: End-to-End Testing

#### User Story: Logging and Monitoring
As a developer, I want to monitor the application so that I can track performance and errors.
- Acceptance Criteria: Can view logs in Railway and Sentry
- Tasks:
  - Add request logging to backend
  - Add error tracking with Sentry
  - Add frontend analytics
- Depends on: End-to-End Testing

#### User Story: Performance Tuning
As a user, I want the application to be fast so that I have a good experience.
- Acceptance Criteria: Bundle <150KB, API responses <500ms
- Tasks:
  - Check and optimize bundle size
  - Add rate limiting to backend
  - Test response times
- Depends on: End-to-End Testing

#### User Story: Documentation
As a user/developer, I want documentation so that I can understand and use the system.
- Acceptance Criteria: New user can operate dashboard in <5 min
- Tasks:
  - Create user guide
  - Create developer guide
  - Add code comments
  - Create CHANGELOG.md
- Depends on: All Sprint 3 User Stories

#### User Story: Beta Launch
As a product manager, I want to launch to beta users so that I can collect feedback.
- Acceptance Criteria: 5 PMs actively using dashboard, <3 critical bugs
- Tasks:
  - Select 5 beta testers
  - Send link and guide
  - Collect feedback
  - Log and fix bugs
- Depends on: Documentation, Authentication, Logging, Performance

#### User Story: Production Hardening
As a developer, I want to ensure production stability so that the MVP is reliable.
- Acceptance Criteria: Dashboard is stable, documented, monitored
- Tasks:
  - Verify environment variables
  - Test HTTPS and mobile browsers
  - Set up backups
  - Create runbook
- Depends on: Beta Launch

## Relationships Summary
- **Sequential Dependencies:** Tasks within sprints depend on previous tasks in the same sprint.
- **Sprint Dependencies:** Sprint 2 can start in parallel with Sprint 1, but Sprint 3 depends on both.
- **Cross-Dependencies:** Frontend tasks depend on backend API availability.
- **Epic Relationships:** Each Epic contains multiple User Stories that must be completed in order.

This structure can be imported into JIRA by creating Epics first, then User Stories linked to them, assigning to sprints, and noting dependencies in descriptions or using JIRA's linking features.