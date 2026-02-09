# AGENT.md – Dale Carnegie AI Trainer

This document guides the code agent (Cursor Agent) when working in this repository.

## Project overview

- **Name:** Dale Carnegie AI Trainer (dale-cassio)
- **Goal:** Web app for coaching based on the 53 Dale Carnegie principles. The user describes a challenge and the AI responds with diagnosis, applicable principles, and an action plan. Includes Role-Play (practice phrases), Application Diary, and Principles Library.
- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui (new-york style), Vercel AI SDK (streaming), localStorage (no auth/database).

## Folder structure

```
src/
├── app/                    # Routes and API
│   ├── layout.tsx          # Root layout + Sidebar
│   ├── page.tsx            # Redirect to /chat
│   ├── chat/page.tsx       # Main chat
│   ├── roleplay/page.tsx   # Role-Play mode
│   ├── diary/page.tsx      # Application Diary
│   ├── principles/page.tsx # 53 principles library
│   └── api/chat/route.ts   # Single endpoint: chat + roleplay (body: messages, mode)
├── components/
│   ├── layout/             # app-sidebar, header
│   ├── chat/               # container, messages, message, input, suggested-prompts
│   ├── principles/         # principle-card, principle-badge, principle-filter
│   ├── roleplay/           # roleplay-container, roleplay-evaluation
│   ├── diary/              # diary-list, diary-entry-card, diary-entry-form
│   └── ui/                 # shadcn components (do not edit by hand; use CLI)
├── data/
│   └── principles.ts       # List of 53 principles (id, title, explanation, example, category)
├── lib/
│   ├── utils.ts            # cn() (shadcn)
│   ├── system-prompt.ts    # Chat and roleplay prompts
│   └── principle-matcher.ts # Regex to detect "Princípio #N - Título" in text
├── hooks/
│   ├── use-local-storage.ts
│   ├── use-diary.ts
│   └── use-chat-history.ts
└── types/
    ├── principle.ts        # Principle, PrincipleCategory
    ├── diary.ts            # DiaryEntry
    └── chat.ts             # ChatSession (uses UIMessage from ai)
```

## Rules and conventions

1. **Language:** Code and comments in English; UI copy and user-facing prompts in **Brazilian Portuguese**.
2. **Aliases:** Use `@/components`, `@/lib`, `@/hooks`, `@/data`, `@/types` (tsconfig).
3. **UI components:** New UI components come from shadcn: `npx shadcn@latest add <component>` (do not create by hand in `components/ui/`).
4. **Principles in AI output:** The system prompt requires the AI to use exactly the format **Princípio #N - Título**. `principle-matcher.ts` uses the regex `/\*\*Princ[ií]pio\s*#(\d{1,2})\s*[-–]\s*([^*]+)\*\*/gi` to detect and turn them into clickable badges; if you change the format in the prompt, update the regex.
5. **User data:** Everything in localStorage (diary and chat history). Diary key: `dale-carnegie-diary`. No persistence backend or authentication.
6. **Chat API:** Single POST at `/api/chat` with `{ messages, mode }`. `mode === "roleplay"` uses the roleplay prompt; otherwise the chat prompt. Response is streamed (Vercel AI SDK).

## Where to make common changes

| Goal | Location |
|------|----------|
| Change AI behavior (chat or roleplay) | `src/lib/system-prompt.ts` |
| Add/edit a principle | `src/data/principles.ts` and `src/types/principle.ts` (categories) |
| Change principle detection in text | `src/lib/principle-matcher.ts` |
| Switch model or provider (OpenAI, Groq, etc.) | `src/app/api/chat/route.ts` |
| New page or route | `src/app/<route>/page.tsx` and link in `src/components/layout/app-sidebar.tsx` |
| New shadcn component | `npx shadcn@latest add <name>` |

## Environment and running

- **Environment variables:** See `.env.example`. AI provider API keys (e.g. Groq) in `.env.local` (do not commit).
- **Commands:** `npm run dev` (development), `npm run build` / `npm run start` (production), `npm run lint` (ESLint).

## Domain reference

- **53 principles:** Source of truth is `CONTEXT.md` and the listing in `src/data/principles.ts`. Categories: Human Relations (1–30) and Managing Stress (31–53); subcategories in `PrincipleCategory` in `src/types/principle.ts`.
- **Diary:** Entry = situation, principles applied, result, reflection; identified by `id` and `date`.
- **Chat:** Sessions with `messages` and `mode`; principles mentioned in the response are parsed and shown as badges that open the principle card.

## Checklist when implementing features

- [ ] New UI copy in Portuguese.
- [ ] If you change the principle format in the prompt, update `principle-matcher.ts`.
- [ ] If you add a principle or category, update `data/principles.ts` and `types/principle.ts`.
- [ ] New visual components: prefer shadcn; style with Tailwind and `cn()`.
