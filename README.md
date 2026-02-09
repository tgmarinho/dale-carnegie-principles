# Dale Carnegie AI Trainer

A web app that acts as a Dale Carnegie–style coach: you describe a challenge or feeling, and the AI responds with a diagnosis, which principles to apply, and a practical action plan—all based on the 53 principles from the Dale Carnegie training (human relations, communication, and stress management).

## Features

- **Chat** – Describe a situation; get structured feedback (diagnosis, principles, action plan) with streaming responses.
- **Role-Play** – Type a phrase you plan to say; the AI evaluates it against the principles (especially “don’t criticize”) and suggests a better version.
- **Application Diary** – Record “Incident Reports”: situation, principles used, result, and reflection.
- **Principles Library** – Browse all 53 principles with explanation and example, filtered by category.

## Tech stack

- **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS 4**, **shadcn/ui**
- **Vercel AI SDK** for streaming chat (configurable provider, e.g. OpenAI, Groq)
- **localStorage** for diary and chat history (no auth or database)

## Getting started

1. **Clone and install**

   ```bash
   git clone <repo-url>
   cd DaleCassio
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and set your AI provider API key (e.g. `GROQ_API_KEY` or `OPENAI_API_KEY`). See `.env.example` for variable names.

3. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The app redirects to `/chat`.

## Scripts

| Command         | Description                |
|----------------|----------------------------|
| `npm run dev`  | Start dev server           |
| `npm run build`| Production build           |
| `npm run start`| Run production server      |
| `npm run lint` | Run ESLint                 |

## Project docs

- **AGENT.md** – Conventions and structure for the code agent (Cursor Agent).
- **CLAUDE.md** – High-level project context for AI assistants.
- **PLAN_PROJECT.md** – Implementation plan and phases.
- **CONTEXT.md** – Full reference for the 53 Dale Carnegie principles (explanations and examples).

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
