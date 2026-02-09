"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { principles } from "@/data/principles";
import type { DiaryEntry } from "@/types/diary";
import { format } from "date-fns";

interface DiaryEntryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (entry: Omit<DiaryEntry, "id" | "createdAt">) => void;
  initialData?: DiaryEntry;
}

export function DiaryEntryForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: DiaryEntryFormProps) {
  const [date, setDate] = useState(
    initialData?.date || format(new Date(), "yyyy-MM-dd")
  );
  const [selectedPrinciples, setSelectedPrinciples] = useState<number[]>(
    initialData?.principleIds || []
  );
  const [situation, setSituation] = useState(initialData?.situation || "");
  const [result, setResult] = useState(initialData?.result || "");
  const [reflection, setReflection] = useState(initialData?.reflection || "");

  const togglePrinciple = (id: number) => {
    setSelectedPrinciples((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      principleIds: selectedPrinciples,
      situation,
      result,
      reflection,
    });
    onOpenChange(false);
    if (!initialData) {
      setDate(format(new Date(), "yyyy-MM-dd"));
      setSelectedPrinciples([]);
      setSituation("");
      setResult("");
      setReflection("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Registro" : "Novo Registro"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 pb-4">
              <div>
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Princípios Aplicados</Label>
                <div className="flex flex-wrap gap-1.5 mt-2 max-h-32 overflow-auto">
                  {principles.map((p) => (
                    <Badge
                      key={p.id}
                      variant={
                        selectedPrinciples.includes(p.id)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer text-xs"
                      onClick={() => togglePrinciple(p.id)}
                    >
                      #{p.id}
                    </Badge>
                  ))}
                </div>
                {selectedPrinciples.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedPrinciples
                      .sort((a, b) => a - b)
                      .map((id) => `#${id}`)
                      .join(", ")}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="situation">Situação</Label>
                <Textarea
                  id="situation"
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="Descreva a situação em que aplicou o(s) princípio(s)..."
                  required
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="result">Resultado</Label>
                <Textarea
                  id="result"
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="O que aconteceu depois de aplicar o princípio?"
                  required
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="reflection">Reflexão</Label>
                <Textarea
                  id="reflection"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="O que você aprendeu? O que faria diferente?"
                  rows={3}
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!situation || !result}>
              {initialData ? "Salvar" : "Criar Registro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
