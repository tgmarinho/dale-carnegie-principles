import { principles } from "@/data/principles";

export interface PrincipleMatch {
  id: number;
  title: string;
  fullMatch: string;
  index: number;
}

export function findPrincipleMatches(text: string): PrincipleMatch[] {
  const regex = /\*\*Princ[ií]pio\s*#(\d{1,2})\s*[-–]\s*([^*]+)\*\*/gi;
  const matches: PrincipleMatch[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const id = parseInt(match[1], 10);
    const principle = principles.find((p) => p.id === id);
    if (principle) {
      matches.push({
        id,
        title: principle.title,
        fullMatch: match[0],
        index: match.index,
      });
    }
  }

  return matches;
}

export function getPrincipleById(id: number) {
  return principles.find((p) => p.id === id);
}
