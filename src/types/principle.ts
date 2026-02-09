export type PrincipleCategory =
  | "friendly"
  | "persuasion"
  | "leadership"
  | "stress-fundamentals"
  | "stress-analysis"
  | "stress-habit"
  | "stress-attitude"
  | "stress-perfect"
  | "stress-energy";

export interface Principle {
  id: number;
  title: string;
  explanation: string;
  example: string;
  category: PrincipleCategory;
  categoryLabel: string;
}
