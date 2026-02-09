"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";
import type { DiaryEntry } from "@/types/diary";

const DIARY_KEY = "dale-carnegie-diary";

export function useDiary() {
  const [entries, setEntries, isLoaded] = useLocalStorage<DiaryEntry[]>(
    DIARY_KEY,
    []
  );

  const addEntry = useCallback(
    (entry: Omit<DiaryEntry, "id" | "createdAt">) => {
      const newEntry: DiaryEntry = {
        ...entry,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setEntries((prev) => [newEntry, ...prev]);
      return newEntry;
    },
    [setEntries]
  );

  const updateEntry = useCallback(
    (id: string, updates: Partial<Omit<DiaryEntry, "id" | "createdAt">>) => {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, ...updates } : entry
        )
      );
    },
    [setEntries]
  );

  const deleteEntry = useCallback(
    (id: string) => {
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    },
    [setEntries]
  );

  const getEntry = useCallback(
    (id: string) => entries.find((entry) => entry.id === id),
    [entries]
  );

  return {
    entries,
    isLoaded,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntry,
  };
}
