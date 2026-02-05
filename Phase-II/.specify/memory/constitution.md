<!-- SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles: 
- Core Philosophy - completely revised
- Non-Negotiable Rules - added detailed rules
- Agentic Development Workflow - defined workflow
- Phase Governance - added all 5 phases
- Spec-Kit Governance - added governance rules
- AI Behavior & Tooling Rules - added AI rules
- Quality & Evaluation Criteria - added evaluation criteria
- Long-Term Vision - added vision
Added sections: All sections were added as this is a new constitution
Removed sections: None
Templates requiring updates: 
- .specify/templates/plan-template.md ✅ updated
- .specify/templates/spec-template.md ✅ updated  
- .specify/templates/tasks-template.md ✅ updated
- .specify/templates/commands/*.md ⚠ pending review
Follow-up TODOs: 
- RATIFICATION_DATE still needs to be determined
-->

# Hackathon II – The Evolution of Todo Constitution
# Panaversity / PIAIC / GIAIC Spec-Driven Development Constitution
# Version: 1.1 – Optimized for Phases I–V (Jan 2026)

## 1. Foundational Principles (Non-Negotiable)

1.1 Spec-Driven Development is mandatory — vibe-coding / freestyle implementation is strictly prohibited.

1.2 Single Source of Truth hierarchy (must NEVER be violated):
   1. This file → constitution.md          (principles & hard rules)
   2. spec.md / specs/features/*.md       (WHAT: requirements, user stories, acceptance criteria)
   3. plan.md / specs/architecture.md     (HOW: architecture, components, decisions)
   4. tasks.md / specs/tasks/*.md         (atomic, approved work units)
   5. Already committed code                (lowest priority — can be refactored to match above)

1.3 Every code generation / change MUST reference:
   - Task ID (T-001, T-002, ...)
   - Source spec section (@specs/features/task-crud.md §2.1)
   - Plan section if architectural

1.4 When underspecified / ambiguous → agent MUST:
   - STOP code generation
   - Explicitly request human to update spec or plan
   - NEVER assume, guess or creatively fill gaps

1.5 Goal orientation:
   - Build teachable, reusable, production-learnable artifacts
   - Maximize score on: spec quality, reusability, cloud-native maturity, agentic patterns
   - Bonus priorities: Reusable Intelligence (+200), Cloud-Native Blueprints (+200) > Urdu support > Voice

## 2. Technology & Stack Constitution (Locked unless amended)

2.1 Phase I – Console
   - Python 3.12+ / 3.13 (uv managed)
   - In-memory storage only (list/dict)
   - No external libraries except typer/click for CLI (optional)
   - Claude Code + Spec-Kit Plus only — zero manual coding

2.2 Phase II – Full-Stack Web
   - Frontend: Next.js 15+ App Router, TypeScript, Tailwind
   - Backend: FastAPI, SQLModel, Pydantic v2
   - Database: Neon Serverless PostgreSQL (DATABASE_URL env)
   - Auth: Better Auth (JWT issuance & verification)
   - Monorepo structure: /frontend, /backend, /specs
   - JWT secret shared via env (BETTER_AUTH_SECRET)

2.3 Phase III – AI Chatbot
   - Frontend: OpenAI ChatKit (domain allowlisted)
   - Backend: FastAPI + OpenAI Agents SDK + Official MCP SDK
   - Tools: Stateless MCP tools (add_task, list_tasks, complete_task, update_task, delete_task)
   - All tools MUST re-validate user ownership via JWT/user_id
   - Conversation state → database (conversations + messages tables)

2.4 Phase IV – Local K8s
   - Containerization: Docker (Gordon AI if available)
   - Local cluster: Minikube
   - Packaging: Helm charts
   - AIOps: kubectl-ai, kagent for generation & debugging
   - Stateless pods preferred

2.5 Phase V – Advanced Cloud + Event-Driven
   - Cluster: DigitalOcean Kubernetes (DOKS) preferred (or AKS/GKE/OKE free tier)
   - Sidecar runtime: Dapr (full: pubsub, state, bindings/jobs, service-invocation, secrets)
   - Messaging: Redpanda Cloud serverless / Strimzi Kafka in-cluster
   - Topics at minimum: task-events, reminders, task-updates
   - Advanced features mandatory for full points:
     - Priorities, Tags, Search/Filter/Sort
     - Recurring Tasks
     - Due Dates + Reminders (Dapr Jobs API strongly preferred)

2.6 Cross-phase invariants
   - Multi-user from Phase II onwards
   - User data isolation enforced at every layer
   - Stateless services wherever possible
   - Observability: structured logging (user_id, request_id, trace_id)

## 3. Code, Security & Quality Rules

3.1 File header template (every .py, .ts, .tsx file):

   ```python
   # Task:          T-XXX
   # From Spec:     @specs/features/....md §X.Y
   # From Plan:     @speckit.plan §Z.W
   # Constitution:  constitution.md §3.X
   ```

3.2 Security defaults

JWT → Authorization: Bearer on EVERY protected endpoint/tool
Input → Pydantic / Zod strict validation
Output → NEVER expose raw DB models; use response schemas
Errors → HTTPException + user-friendly message; no stack traces

3.3 MCP Tool Design Rules

Stateless
Always require & validate user_id
Return: {"status": "success"|"error", "data"?: ..., "message"?: ...}
No side-effects outside DB (use events for Phase V+)

3.4 Event Schema minimum (Phase V)
```json
{
  "event_type": "created|updated|completed|deleted|reminder_due",
  "task_id": number,
  "user_id": string,
  "timestamp": "ISO string",
  "trace_id": "uuid",
  "task_data"?: {...}
}
```

3.5 Testing expectation

pytest for backend tools + business logic
Critical paths: task ownership, tool chaining, event publishing

## 4. Workflow & Agent Behavior Constitution

4.1 Allowed sequence ONLY:

Update/Review spec → WHAT
Generate/Update plan    → HOW
Break into tasks        → atomic units
Implement ONLY approved tasks
Review → amend spec/plan if needed → repeat

4.2 Bonus features order of priority:

Reusable Intelligence (Claude subagents + skills)
Cloud-Native Blueprints (spec → Helm/K8s manifests)
Urdu language support in ChatKit responses
Voice commands (if time permits)

4.3 When proposing ANY change:

Architecture → update plan first
Requirements → update spec first
Principles → propose amendment to this constitution

## 5. Final Commandments

Specification is law.
Plan is contract.
Tasks are the only permission to write code.
Code is proof of obedience — not creativity.
Judges read specs + constitution + commit history — make them clean and traceable.

## Governance
**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE): Original adoption date unknown | **Last Amended**: 2026-01-26