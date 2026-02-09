"use client";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Principle } from "@/types/principle";

interface PrincipleCardProps {
  principle: Principle;
}

export function PrincipleCard({ principle }: PrincipleCardProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`principle-${principle.id}`} className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-3 text-left">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
              {principle.id}
            </span>
            <span className="text-sm font-medium">{principle.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pl-11">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Explicação
              </h4>
              <p className="text-sm">{principle.explanation}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Exemplo
              </h4>
              <p className="text-sm italic text-muted-foreground">
                {principle.example}
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              {principle.categoryLabel}
            </Badge>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
