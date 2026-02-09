"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { PrincipleCard } from "@/components/principles/principle-card";
import { PrincipleFilter } from "@/components/principles/principle-filter";
import { principles, categoryGroups } from "@/data/principles";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrinciplesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return principles.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.explanation.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toString() === search;
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const grouped = useMemo(() => {
    return categoryGroups.map((group) => ({
      ...group,
      principles: filtered.filter((p) =>
        group.categories.includes(p.category)
      ),
    }));
  }, [filtered]);

  return (
    <>
      <Header title="Biblioteca de Princípios" />
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="p-4 border-b">
          <PrincipleFilter
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
          />
          <p className="text-xs text-muted-foreground mt-2">
            {filtered.length} de 53 princípios
          </p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-8 max-w-3xl mx-auto">
            {grouped.map(
              (group) =>
                group.principles.length > 0 && (
                  <div key={group.group}>
                    <h2 className="text-lg font-semibold mb-4 text-primary">
                      {group.group}
                    </h2>
                    <div className="space-y-2">
                      {group.principles.map((principle) => (
                        <PrincipleCard
                          key={principle.id}
                          principle={principle}
                        />
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
