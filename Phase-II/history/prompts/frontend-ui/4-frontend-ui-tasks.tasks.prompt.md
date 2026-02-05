---
id: 4
title: Frontend UI Tasks
stage: tasks
date: 2026-01-17
surface: agent
model: Qwen
feature: frontend-ui
branch: 1-frontend-ui
user: user
command: /sp.tasks
labels: [frontend,ui,tasks,todo-app,hackathon]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/1-frontend-ui/tasks.md
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
   

/sp.tasks Using the approved SP.CONSTITUTION and the completed FRONTEND SP.PLAN, generate SP.TASKS focused ONLY on the FRONTEND UI for Hackathon Phase-II.

Scope:
- Frontend implementation tasks only
- Next.js (App Router), TypeScript, Tailwind CSS
- UI pages, layouts, and components
- Frontend authentication flow (Better Auth UI only)
- API usage tasks at interface level only

Explicitly Exclude:
- Backend implementation tasks
- Database or schema work
- API implementation tasks
- Server-side authentication tasks
- Phase-III features

Task Requirements:
- Break frontend work into specific, actionable tasks
- Organize tasks by user story (P1, P2, P3, etc.)
- Include setup, foundational, and implementation tasks
- Include auth UI tasks (login, signup, redirects)
- Include task UI tasks (list, create, edit, complete)
- Include responsive and accessibility tasks
- Ensure visual consistency and reusable components

Rules:
- Tasks must follow the checklist format (- [ ] T### [US#] Description with file path)
- Tasks must be specific enough for AI implementation
- Tasks must follow the approved plan and specification
- No new features or UI flows may be invented
- No backend implementation details

Output:
- A comprehensive, ordered list of frontend implementation tasks
- Organized by phase and user story
- Ready for AI-assisted implementation

## Response snapshot

I'll generate the tasks.md file for the frontend UI of the Hackathon Phase-II "Evolution of Todo" project based on the available design artifacts. Let me first check the available documents:

...

## Outcome

- ✅ Impact: Created comprehensive frontend implementation tasks for the Evolution of Todo Phase-II project
- 🧪 Tests: none
- 📁 Files: specs/1-frontend-ui/tasks.md
- 🔁 Next prompts: Analyze For Consistency, Implement Project
- 🧠 Reflection: Successfully created detailed implementation tasks organized by user story with proper dependencies and parallel execution opportunities.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A