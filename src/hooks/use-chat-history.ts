"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";
import type { ChatSession } from "@/types/chat";
import type { UIMessage } from "ai";

const CHAT_HISTORY_KEY = "dale-carnegie-chat-history";

export function useChatHistory() {
  const [sessions, setSessions, isLoaded] = useLocalStorage<ChatSession[]>(
    CHAT_HISTORY_KEY,
    []
  );

  const createSession = useCallback(
    (mode: "chat" | "roleplay" = "chat") => {
      const session: ChatSession = {
        id: crypto.randomUUID(),
        title: mode === "chat" ? "Nova Conversa" : "Novo Role-Play",
        createdAt: new Date().toISOString(),
        messages: [],
        mode,
      };
      setSessions((prev) => [session, ...prev]);
      return session;
    },
    [setSessions]
  );

  const updateSession = useCallback(
    (id: string, messages: UIMessage[]) => {
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== id) return s;
          const firstUserMsg = messages.find((m) => m.role === "user");
          const textPart = firstUserMsg?.parts.find((p) => p.type === "text");
          const text = textPart && "text" in textPart ? textPart.text : "";
          const title = text
            ? text.slice(0, 50) + (text.length > 50 ? "..." : "")
            : s.title;
          return { ...s, messages, title };
        })
      );
    },
    [setSessions]
  );

  const deleteSession = useCallback(
    (id: string) => {
      setSessions((prev) => prev.filter((s) => s.id !== id));
    },
    [setSessions]
  );

  const getSession = useCallback(
    (id: string) => sessions.find((s) => s.id === id),
    [sessions]
  );

  return {
    sessions,
    isLoaded,
    createSession,
    updateSession,
    deleteSession,
    getSession,
  };
}
