import { Header } from "@/components/layout/header";
import { ChatContainer } from "@/components/chat/chat-container";

export default function ChatPage() {
  return (
    <>
      <Header title="Chat Coach" />
      <ChatContainer mode="chat" placeholder="Descreva seu desafio..." />
    </>
  );
}
