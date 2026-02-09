"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiaryEntryCard } from "./diary-entry-card";
import { DiaryEntryForm } from "./diary-entry-form";
import { useDiary } from "@/hooks/use-diary";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, BookOpen } from "lucide-react";
import type { DiaryEntry } from "@/types/diary";

export function DiaryList() {
  const { entries, isLoaded, addEntry, updateEntry, deleteEntry } = useDiary();
  const [formOpen, setFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | undefined>();

  const handleCreate = (data: Omit<DiaryEntry, "id" | "createdAt">) => {
    addEntry(data);
  };

  const handleEdit = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setFormOpen(true);
  };

  const handleUpdate = (data: Omit<DiaryEntry, "id" | "createdAt">) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, data);
      setEditingEntry(undefined);
    }
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
  };

  const handleOpenNew = () => {
    setEditingEntry(undefined);
    setFormOpen(true);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="flex items-center justify-between p-4 border-b">
        <p className="text-sm text-muted-foreground">
          {entries.length} {entries.length === 1 ? "registro" : "registros"}
        </p>
        <Button onClick={handleOpenNew} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Novo Registro
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-medium">Nenhum registro ainda</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Comece registrando situações em que você aplicou os princípios
                Dale Carnegie no dia a dia.
              </p>
            </div>
            <Button onClick={handleOpenNew} variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Criar Primeiro Registro
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-3 max-w-3xl mx-auto">
            {entries.map((entry) => (
              <DiaryEntryCard
                key={entry.id}
                entry={entry}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      <DiaryEntryForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingEntry(undefined);
        }}
        onSubmit={editingEntry ? handleUpdate : handleCreate}
        initialData={editingEntry}
      />
    </div>
  );
}
