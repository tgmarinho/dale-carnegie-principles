"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo } from "react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { SuggestedPrompts } from "./suggested-prompts";

interface ChatContainerProps {
  mode?: "chat" | "roleplay";
  placeholder?: string;
}

export function ChatContainer({
  mode = "chat",
  placeholder,
}: ChatContainerProps) {
  const transport = useMemo(
    () => new DefaultChatTransport({ body: { mode } }),
    [mode]
  );

  const { messages, sendMessage, status } = useChat({ transport });

  const isLoading = status === "streaming" || status === "submitted";

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return;
    sendMessage({ text });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {messages.length === 0 ? (
        <>
          <div className="flex-1 overflow-auto">
            <SuggestedPrompts onSelect={handleSend} />
          </div>
          <ChatInput
            isLoading={isLoading}
            onSend={handleSend}
            placeholder={placeholder}
          />
        </>
      ) : (
        <>
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput
            isLoading={isLoading}
            onSend={handleSend}
            placeholder={placeholder}
          />
        </>
      )}
    </div>
  );
}
