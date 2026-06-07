# Dale Carnegie AI Trainer

A web app that acts as a Dale Carnegie style coach. Describe a challenge or a feeling, and the AI replies with a diagnosis, the principles to apply, and a practical action plan, all based on the 53 principles from the Dale Carnegie training (human relations, communication, and stress management).

**Live demo:** https://dale-carnegie-principles.vercel.app

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)
![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-000000?logo=vercel&logoColor=white)

## Features

- **Chat** — describe a situation and get structured feedback (diagnosis, principles, action plan) with streaming responses.
- **Role-Play** — type a phrase you plan to say; the AI checks it against the principles (especially "don't criticize") and suggests a better version.
- **Application Diary** — record incident reports: situation, principles used, result, and reflection.
- **Principles Library** — browse all 53 principles with an explanation and an example, filtered by category.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui
- Vercel AI SDK for streaming chat (configurable provider, for example OpenAI or Groq)
- localStorage for the diary and chat history (no auth, no database)

## Getting started

1. **Clone and install**

   ```bash
   git clone https://github.com/tgmarinho/dale-carnegie-principles.git
   cd dale-carnegie-principles
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and set your AI provider API key (for example `GROQ_API_KEY` or `OPENAI_API_KEY`). See `.env.example` for the variable names.

3. **Run**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000. The app redirects to `/chat`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## Project docs

- **AGENT.md** — conventions and structure for the code agent (Cursor Agent).
- **CLAUDE.md** — high-level project context for AI assistants.
- **PLAN_PROJECT.md** — implementation plan and phases.
- **CONTEXT.md** — full reference for the 53 Dale Carnegie principles.
