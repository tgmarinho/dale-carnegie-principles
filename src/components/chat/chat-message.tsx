"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { PrincipleBadge } from "@/components/principles/principle-badge";
import { Bot, User } from "lucide-react";
import type { UIMessage } from "ai";
import type { ReactNode } from "react";

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function renderContentWithBadges(content: string): ReactNode[] {
  const regex = /\*\*Princ[ií]pio\s*#(\d{1,2})\s*[-–]\s*[^*]+\*\*/gi;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const tempRegex = new RegExp(regex.source, regex.flags);

  while ((match = tempRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <MarkdownBlock
          key={`text-${lastIndex}`}
          content={content.slice(lastIndex, match.index)}
        />
      );
    }

    const id = parseInt(match[1], 10);
    parts.push(<PrincipleBadge key={`badge-${match.index}`} id={id} />);

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push(
      <MarkdownBlock key={`text-${lastIndex}`} content={content.slice(lastIndex)} />
    );
  }

  return parts;
}

function MarkdownBlock({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        h3: ({ children }) => (
          <h3 className="text-base font-semibold mt-4 mb-2 text-primary">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-sm font-semibold mt-3 mb-1">{children}</h4>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>
        ),
        li: ({ children }) => <li className="text-sm">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-primary/50 pl-3 italic text-muted-foreground my-2">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const text = getMessageText(message);

  return (
    <div
      className={cn(
        "flex gap-3 py-4 px-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          "rounded-2xl px-4 py-3 max-w-[85%] text-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted rounded-bl-md"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <div className="prose-sm">{renderContentWithBadges(text)}</div>
        )}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
