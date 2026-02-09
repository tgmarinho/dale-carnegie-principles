"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2, Calendar } from "lucide-react";
import type { DiaryEntry } from "@/types/diary";
import { principles } from "@/data/principles";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (id: string) => void;
}

export function DiaryEntryCard({
  entry,
  onEdit,
  onDelete,
}: DiaryEntryCardProps) {
  const appliedPrinciples = entry.principleIds
    .map((id) => principles.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              {format(parseISO(entry.date), "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </CardTitle>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(entry)}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(entry.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {appliedPrinciples.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {appliedPrinciples.map(
              (p) =>
                p && (
                  <Badge
                    key={p.id}
                    variant="secondary"
                    className="text-xs"
                  >
                    #{p.id} {p.title.length > 25 ? p.title.slice(0, 25) + "..." : p.title}
                  </Badge>
                )
            )}
          </div>
        )}

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Situação
          </h4>
          <p className="text-sm">{entry.situation}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Resultado
          </h4>
          <p className="text-sm">{entry.result}</p>
        </div>

        {entry.reflection && (
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Reflexão
            </h4>
            <p className="text-sm text-muted-foreground italic">
              {entry.reflection}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
