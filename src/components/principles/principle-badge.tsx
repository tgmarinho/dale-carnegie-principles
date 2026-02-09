"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { getPrincipleById } from "@/lib/principle-matcher";

interface PrincipleBadgeProps {
  id: number;
}

export function PrincipleBadge({ id }: PrincipleBadgeProps) {
  const [open, setOpen] = useState(false);
  const principle = getPrincipleById(id);

  if (!principle) return null;

  return (
    <>
      <Badge
        variant="secondary"
        className="cursor-pointer hover:bg-primary/20 text-primary border-primary/30 inline-flex mx-0.5"
        onClick={() => setOpen(true)}
      >
        #{principle.id} {principle.title}
      </Badge>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary">
              Princípio #{principle.id}
            </DialogTitle>
            <DialogDescription className="text-base font-medium text-foreground">
              {principle.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Explicação</h4>
              <p className="text-sm text-muted-foreground">
                {principle.explanation}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Exemplo</h4>
              <p className="text-sm text-muted-foreground italic">
                {principle.example}
              </p>
            </div>
            <div>
              <Badge variant="outline" className="text-xs">
                {principle.categoryLabel}
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
