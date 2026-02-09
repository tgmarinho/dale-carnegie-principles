# CLAUDE.md – Dale Carnegie AI Trainer

Project context for assistants (e.g. Claude). Use this file to understand what the app does and where the main concepts live.

## What the project is

**Dale Carnegie AI Trainer** is a web application that acts as a coach based on the 53 principles of Dale Carnegie training (human relations, communication, and stress management). The user describes a challenge or feeling; the AI responds with:

1. **Diagnosis** – where the user is “sawing sawdust” (neglecting principles)
2. **Principles to apply** – which principles to use (referenced by number and name)
3. **Action plan** – practical steps (immediate action, communication, attitude)

Besides the main chat, the app offers:

- **Role-Play:** The user types a phrase they plan to use (e.g. with their mother-in-law); the AI evaluates violations of the principles (especially Principle 1 – don’t criticize) and suggests an improved phrase.
- **Application Diary:** The user records “Incident Reports” (situation, principles used, result, reflection).
- **Principles Library:** Browse all 53 principles with explanation and example, with category filter.

## Architecture in one sentence

Next.js (App Router) plus a single streaming chat API; UI with shadcn/ui; user data only in localStorage; AI instructed to cite principles in the format **Princípio #N - Título** so the front end can turn them into clickable badges.

## Domain concepts

- **Golden Book / 53 principles:** Canonical list from the Dale Carnegie manual. Split into:
  - **Human Relations (1–30):** becoming friendly (1–9), winning people to your way of thinking (10–21), being a leader (22–30).
  - **Managing stress (31–53):** fundamentals, analyzing worry, breaking the habit, mental attitude, “perfect way,” energy/fatigue.
- **Principle #1:** “Don’t criticize, don’t condemn, don’t complain” – central to Role-Play mode.
- **Incident Report:** Diary entry = situation experienced + principles applied + result + reflection (mirrors the participant manual).

## Where things are

| Concept | Where in the codebase |
|---------|------------------------|
| List of 53 principles (title, explanation, example, category) | `src/data/principles.ts` |
| Principle types and categories | `src/types/principle.ts` |
| System prompts (chat and roleplay) | `src/lib/system-prompt.ts` |
| Detecting “Princípio #N - Título” in AI text | `src/lib/principle-matcher.ts` |
| Single chat endpoint (chat or roleplay mode) | `src/app/api/chat/route.ts` |
| Main pages | `src/app/chat`, `src/app/roleplay`, `src/app/diary`, `src/app/principles` |
| Diary model | `src/types/diary.ts` and hook `src/hooks/use-diary.ts` |
| Chat sessions | `src/types/chat.ts` and `src/hooks/use-chat-history.ts` |

## Source of truth for principles

The full content of the 53 principles (explanations and examples) is in **CONTEXT.md**. The app uses a structured version in `src/data/principles.ts`, aligned with the manual’s categories. Any expansion or change to principle text should stay consistent with CONTEXT.md.

## Tech stack (summary)

- **Front:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui (new-york), Vercel AI SDK (`useChat`, streaming).
- **Back:** Only `POST /api/chat` (Vercel AI SDK `streamText`; model configured in `route.ts`, e.g. Groq).
- **Persistence:** localStorage (diary and chat history); no auth or database.

## Implementation plan

The detailed plan (folder structure, phases, data models, verification) is in **PLAN_PROJECT.md**. **AGENT.md** describes code conventions and where to make common changes for the development agent.
