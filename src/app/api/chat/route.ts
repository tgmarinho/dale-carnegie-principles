import { groq } from "@ai-sdk/groq";
import {
  streamText,
  createUIMessageStream,
  createUIMessageStreamResponse,
  convertToModelMessages,
  generateId,
} from "ai";
import { chatSystemPrompt, roleplaySystemPrompt } from "@/lib/system-prompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, mode } = await req.json();

  const systemPrompt =
    mode === "roleplay" ? roleplaySystemPrompt : chatSystemPrompt;

  const modelMessages = await convertToModelMessages(messages);

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = streamText({
        model: groq("llama-3.3-70b-versatile"),
        system: systemPrompt,
        messages: modelMessages,
      });

      const messageId = generateId();
      const partId = generateId();

      writer.write({ type: "start", messageId });
      writer.write({ type: "text-start", id: partId });

      for await (const delta of result.textStream) {
        writer.write({ type: "text-delta", id: partId, delta });
      }

      writer.write({ type: "text-end", id: partId });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}
