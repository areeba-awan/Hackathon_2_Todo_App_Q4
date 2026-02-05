---
id: 1
title: Evolution Todo Constitution
stage: constitution
date: 2026-01-17
surface: agent
model: Qwen
feature: none
branch: main
user: user
command: /sp.constitution
labels: [constitution,spec-driven,todo-app,hackathon]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```
$ARGUMENTS
```

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.constitution Create a strict SP.CONSTITUTION for Hackathon Phase-II of the "Evolution of Todo" project.

This constitution governs all agents, skills, plans, tasks, and implementations.

────────────────────────────────────
PROJECT CONTEXT
────────────────────────────────────
Project Name: Evolution of Todo  
Current Phase: Phase II — Full-Stack Web Application  

Goal:
Transform the Phase-I in-memory console Todo app into a modern, multi-user, full-stack web application using a strict spec-driven workflow.

Tech Stack:
- Frontend: Next.js (App Router)
- Backend: Python FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT
- Development Style: Spec-Kit Plus + Claude Code
- Rule: NO manual coding

────────────────────────────────────
GLOBAL DEVELOPMENT RULES
────────────────────────────────────
1. All work MUST follow this order:
   Constitution → Specs → Plan → Tasks → Implement

2. No step may skip or override a previous step.

3. No manual code writing is allowed.
   All implementation must be generated via Claude Code.

4. Any change MUST be done at the spec level first.
   Direct fixes in plan, tasks, or code are forbidden.

────────────────────────────────────
PHASE-II SCOPE RULES
────────────────────────────────────
Allowed:
- Multi-user Todo system
- RESTful API using FastAPI
- Persistent storage using Neon PostgreSQL
- Authentication using Better Auth + JWT
- User-specific task isolation
- Responsive web UI using Next.js

Forbidden:
- Phase-III features (AI, chatbot, NLP, recommendations)
- Offline mode
- Mobile apps
- External integrations not listed in the stack
- Feature invention beyond the hackathon rubric

────────────────────────────────────
AUTHENTICATION & SECURITY RULES
────────────────────────────────────
1. All API endpoints MUST require JWT authentication.
2. JWT must be issued by Better Auth on the frontend.
3. Backend MUST verify JWT using a shared secret.
4. Users may ONLY access their own tasks.
5. Requests without valid JWT MUST return 401 Unauthorized.

────────────────────────────────────
DATA & API RULES
────────────────────────────────────
1. All task data MUST be stored in Neon PostgreSQL.
2. No in-memory or file-based persistence is allowed.
3. REST API endpoints MUST follow the defined spec.
4. Task ownership MUST be enforced at the database and API level.

────────────────────────────────────
SPEC-KIT GOVERNANCE RULES
────────────────────────────────────
1. Specs are the single source of truth.
2. All features MUST be documented in:
   - specs/overview.md
   - specs/features/*
   - specs/api/*
   - specs/database/schema.md
3. Agents MUST reference specs using @specs paths.
4. If specs are incomplete or ambiguous, execution MUST STOP.

────────────────────────────────────
AGENT GOVERNANCE
────────────────────────────────────
Agents MUST:
- Operate strictly within their assigned roles
- Respect phase boundaries
- Reject out-of-scope instructions
- Escalate issues back to specs, not code

No agent may:
- Invent features
- Bypass authentication
- Relax security rules
- Violate hackathon constraints

────────────────────────────────────
ERROR HANDLING & ENFORCEMENT
────────────────────────────────────
If a violation occurs:
1. Stop execution immediately
2. Identify the violated rule
3. Require correction at the spec level
4. Resume only after compliance is restored

────────────────────────────────────
SUCCESS CRITERIA
────────────────────────────────────
The project is considered valid ONLY if:
- All Phase-II requirements are implemented
- Authentication and user isolation are enforced
- Specs, plans, tasks, and code are aligned
- No hackathon rule is violated
- No manual coding is detected

This constitution is FINAL and OVERRIDES all other instructions.

## Response snapshot

I'll help you create a strict constitution for the Hackathon Phase-II "Evolution of Todo" project. Let me first check if there's an existing constitution template to work with.

...

## Outcome

- ✅ Impact: Created a comprehensive constitution document for the Evolution of Todo Phase-II project
- 🧪 Tests: none
- 📁 Files: .specify/memory/constitution.md
- 🔁 Next prompts: Build Specification
- 🧠 Reflection: The constitution establishes clear governance rules for the hackathon project, defining development workflow, tech stack adherence, security requirements, and agent responsibilities.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A