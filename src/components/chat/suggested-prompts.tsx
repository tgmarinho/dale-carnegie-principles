"use client";

import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  Brain,
  HeartHandshake,
} from "lucide-react";

const suggestions = [
  {
    icon: Users,
    title: "Colega difícil",
    prompt:
      "Tenho um colega de trabalho que sempre critica minhas ideias em reuniões. Como posso lidar com essa situação?",
  },
  {
    icon: HeartHandshake,
    title: "Negociar aumento",
    prompt:
      "Quero pedir um aumento ao meu chefe, mas tenho medo de ser negado. Como posso abordar essa conversa?",
  },
  {
    icon: Brain,
    title: "Ansiedade no trabalho",
    prompt:
      "Estou muito ansioso com uma apresentação importante na próxima semana. Como posso controlar essa preocupação?",
  },
  {
    icon: MessageSquare,
    title: "Feedback para equipe",
    prompt:
      "Preciso dar um feedback negativo para um membro da minha equipe que está com baixo desempenho. Como fazer isso sem causar ressentimento?",
  },
];

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <MessageSquare className="h-8 w-8" />
          </div>
        </div>
        <h2 className="text-xl font-semibold">Dale Carnegie AI Coach</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Descreva um desafio interpessoal, de liderança ou estresse e receba
          orientação baseada nos 53 princípios Dale Carnegie.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.title}
            variant="outline"
            className="h-auto p-4 flex flex-col items-start gap-2 text-left whitespace-normal"
            onClick={() => onSelect(suggestion.prompt)}
          >
            <div className="flex items-center gap-2 text-primary">
              <suggestion.icon className="h-4 w-4 shrink-0" />
              <span className="font-medium text-sm">{suggestion.title}</span>
            </div>
            <span className="text-xs text-muted-foreground line-clamp-2">
              {suggestion.prompt}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
