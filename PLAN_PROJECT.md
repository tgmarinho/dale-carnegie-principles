 Ready to code?

 Here is Claude's plan:
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
 Dale Carnegie AI Trainer - Plano de Implementação

 Contexto

 Criar um app web de coaching baseado nos 53 princípios Dale Carnegie. O usuário descreve um
 desafio e a IA responde com diagnóstico, princípios aplicáveis e plano de ação prático. Inclui
 também modo Role-Play (treinar frases), Diário de Aplicação e Biblioteca de Princípios.

 Stack

 - Next.js 15 (App Router) + TypeScript
 - shadcn/ui + Tailwind CSS (tema amber/gold)
 - Vercel AI SDK (ai, @ai-sdk/react, @ai-sdk/openai)
 - LocalStorage (sem auth, sem banco)
 - react-markdown + remark-gfm para renderizar respostas

 Estrutura do Projeto

 src/
 ├── app/
 │   ├── layout.tsx              # Root layout com Sidebar
 │   ├── page.tsx                # Redirect para /chat
 │   ├── globals.css             # Tema amber/gold
 │   ├── chat/page.tsx           # Chat principal
 │   ├── roleplay/page.tsx       # Modo Role-Play
 │   ├── diary/page.tsx          # Diário de Aplicação
 │   ├── principles/page.tsx     # Biblioteca de Princípios
 │   └── api/chat/route.ts       # Endpoint AI (chat + roleplay via campo mode)
 ├── components/
 │   ├── layout/
 │   │   ├── app-sidebar.tsx     # Sidebar navegação
 │   │   └── header.tsx          # Header com SidebarTrigger
 │   ├── chat/
 │   │   ├── chat-container.tsx  # Layout completo do chat
 │   │   ├── chat-messages.tsx   # Lista de mensagens
 │   │   ├── chat-message.tsx    # Bubble individual (com principle badges)
 │   │   ├── chat-input.tsx      # Input + botão enviar
 │   │   └── suggested-prompts.tsx # Sugestões no estado vazio
 │   ├── principles/
 │   │   ├── principle-card.tsx  # Card expansível de princípio
 │   │   ├── principle-badge.tsx # Badge inline "#5 Sorria"
 │   │   └── principle-filter.tsx # Filtro por categoria
 │   ├── roleplay/
 │   │   ├── roleplay-container.tsx
 │   │   └── roleplay-evaluation.tsx
 │   ├── diary/
 │   │   ├── diary-list.tsx
 │   │   ├── diary-entry-card.tsx
 │   │   └── diary-entry-form.tsx
 │   └── ui/                     # shadcn components
 ├── data/
 │   └── principles.ts           # 53 princípios (id, título, explicação, exemplo, categoria)
 ├── lib/
 │   ├── utils.ts                # cn() do shadcn
 │   ├── system-prompt.ts        # System prompts (chat + roleplay)
 │   └── principle-matcher.ts    # Regex para detectar princípios no texto AI
 ├── hooks/
 │   ├── use-local-storage.ts    # Hook genérico localStorage (SSR-safe)
 │   ├── use-diary.ts            # CRUD diário
 │   └── use-chat-history.ts     # Persistir sessões de chat
 └── types/
     ├── principle.ts
     ├── diary.ts
     └── chat.ts

 Fases de Implementação

 Fase 1: Setup do projeto

 1. npx create-next-app@latest com TypeScript, Tailwind, App Router, src/
 2. npx shadcn@latest init - configurar shadcn/ui
 3. Instalar deps: ai @ai-sdk/react @ai-sdk/openai react-markdown remark-gfm date-fns
 4. Configurar tema amber/gold em globals.css (CSS variables)
 5. Criar layout raiz com SidebarProvider do shadcn
 6. Criar app-sidebar.tsx com 4 links: Chat, Role-Play, Diário, Princípios
 7. Criar header.tsx com SidebarTrigger
 8. Criar páginas stub para as 4 rotas

 Fase 2: Dados dos princípios

 1. Criar types/principle.ts com interface Principle
 2. Criar data/principles.ts com os 53 princípios extraídos do CONTEXT.md
 3. Criar principle-card.tsx, principle-badge.tsx
 4. Criar página /principles com filtro por categoria e busca

 Fase 3: Chat com IA (feature principal)

 1. Criar lib/system-prompt.ts com o system prompt completo (inclui instrução de formatação:
 **Princípio #N - Título**)
 2. Criar api/chat/route.ts usando streamText do Vercel AI SDK
 3. Criar componentes de chat: container, messages, message, input
 4. Integrar useChat do @ai-sdk/react
 5. Criar suggested-prompts.tsx para estado vazio
 6. Criar lib/principle-matcher.ts (regex para detectar Princípio #N)
 7. Integrar badges clicáveis nos textos do AI → abrem card do princípio

 Fase 4: Role-Play

 1. Criar variante do system prompt para avaliação de frases
 2. Criar roleplay-container.tsx com seletor de contexto (chefe, cônjuge, etc.)
 3. Criar roleplay-evaluation.tsx para exibir violações e frase melhorada
 4. Reutilizar /api/chat com campo mode: "roleplay"

 Fase 5: Diário de Aplicação

 1. Criar types/diary.ts (DiaryEntry: id, date, principleIds, situation, result, reflection)
 2. Criar hooks/use-local-storage.ts (SSR-safe)
 3. Criar hooks/use-diary.ts (CRUD)
 4. Criar formulário, lista e cards do diário
 5. localStorage key: "dale-carnegie-diary"

 Fase 6: Persistência de chat + polish

 1. Criar hooks/use-chat-history.ts para salvar/restaurar sessões
 2. Adicionar lista de sessões no sidebar
 3. Responsividade mobile (bottom tabs em telas pequenas)
 4. Loading states e tratamento de erros

 API Route (/api/chat/route.ts)

 - Endpoint único para chat e roleplay
 - Recebe { messages, mode } no body
 - Seleciona system prompt baseado no mode
 - Usa streamText() → toDataStreamResponse()
 - maxDuration = 30

 Detecção de Princípios

 - System prompt instrui IA a formatar: **Princípio #N - Título**
 - principle-matcher.ts usa regex: /Princ[ií]pio\s*#?(\d{1,2})/gi
 - Chat message renderiza PrincipleBadge inline nos matches
 - Click no badge abre card com explicação completa

 Modelos de Dados (localStorage)

 // DiaryEntry
 { id: string, createdAt: string, date: string, principleIds: number[],
   situation: string, result: string, reflection: string }

 // ChatSession
 { id: string, title: string, createdAt: string,
   messages: SerializedMessage[], mode: "chat" | "roleplay" }

 Verificação

 1. npm run dev → app roda sem erros
 2. Navegar entre as 4 páginas via sidebar
 3. Chat: enviar mensagem → receber resposta estruturada com streaming
 4. Princípios referenciados aparecem como badges clicáveis
 5. Role-Play: digitar frase → receber avaliação com violações
 6. Diário: criar, editar, deletar entradas (persistem após refresh)
 7. Princípios: navegar e filtrar todos os 53 princípios
 8. Testar em mobile (responsive)
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌