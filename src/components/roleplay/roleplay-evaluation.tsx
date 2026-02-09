"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";

interface RoleplayEvaluationProps {
  violations: { principleId: number; title: string; reason: string }[];
  positives: { principleId: number; title: string; reason: string }[];
  improvedPhrase: string;
}

export function RoleplayEvaluation({
  violations,
  positives,
  improvedPhrase,
}: RoleplayEvaluationProps) {
  return (
    <div className="space-y-4 p-4 max-w-3xl mx-auto">
      {violations.length > 0 && (
        <Card className="border-destructive/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Violações Identificadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {violations.map((v) => (
              <div key={v.principleId} className="text-sm">
                <Badge variant="destructive" className="text-xs mb-1">
                  #{v.principleId} {v.title}
                </Badge>
                <p className="text-muted-foreground">{v.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {positives.length > 0 && (
        <Card className="border-green-500/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              Pontos Positivos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {positives.map((p) => (
              <div key={p.principleId} className="text-sm">
                <Badge
                  variant="outline"
                  className="text-xs mb-1 border-green-500 text-green-600"
                >
                  #{p.principleId} {p.title}
                </Badge>
                <p className="text-muted-foreground">{p.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {improvedPhrase && (
        <Card className="border-primary/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-primary">
              <Lightbulb className="h-4 w-4" />
              Frase Melhorada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm italic">&ldquo;{improvedPhrase}&rdquo;</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
