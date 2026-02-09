"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo } from "react";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { Badge } from "@/components/ui/badge";
import { Swords } from "lucide-react";

const contexts = [
  { label: "Chefe", emoji: "👔" },
  { label: "Cônjuge", emoji: "💑" },
  { label: "Colega", emoji: "🤝" },
  { label: "Cliente", emoji: "🏢" },
  { label: "Filho(a)", emoji: "👶" },
  { label: "Amigo(a)", emoji: "🫂" },
];

export function RoleplayContainer() {
  const transport = useMemo(
    () => new DefaultChatTransport({ body: { mode: "roleplay" } }),
    []
  );

  const { messages, sendMessage, status } = useChat({ transport });

  const isLoading = status === "streaming" || status === "submitted";

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return;
    sendMessage({ text });
  };

  const handleContextSelect = (context: string) => {
    sendMessage({
      text: `Contexto: estou falando com meu(minha) ${context.toLowerCase()}. Avalie a seguinte frase que quero usar:`,
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {messages.length === 0 ? (
        <>
          <div className="flex-1 overflow-auto">
            <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Swords className="h-8 w-8" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold">Modo Role-Play</h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  Digite uma frase que você quer usar em uma conversa difícil.
                  O coach vai avaliar e sugerir melhorias baseadas nos
                  princípios Dale Carnegie.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-center mb-3">
                  Com quem você vai conversar?
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {contexts.map((ctx) => (
                    <Badge
                      key={ctx.label}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 px-4 py-2 text-sm"
                      onClick={() => handleContextSelect(ctx.label)}
                    >
                      {ctx.emoji} {ctx.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center max-w-sm">
                Ou simplesmente digite sua frase abaixo e o coach avaliará
                automaticamente.
              </p>
            </div>
          </div>
          <ChatInput
            isLoading={isLoading}
            onSend={handleSend}
            placeholder="Digite a frase que quer treinar..."
          />
        </>
      ) : (
        <>
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput
            isLoading={isLoading}
            onSend={handleSend}
            placeholder="Digite outra frase para avaliar..."
          />
        </>
      )}
    </div>
  );
}
