import type { UIMessage } from "ai";

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messages: UIMessage[];
  mode: "chat" | "roleplay";
}
