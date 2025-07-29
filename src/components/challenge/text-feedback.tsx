import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, Lightbulb, Trophy } from "lucide-react";

interface TextFeedbackProps {
  feedback: {
    score: number;
    detailed_feedback: string;
    strengths: string[];
    improvements: string[];
    score_breakdown: {
      understanding: number;
      technical_accuracy: number;
      completeness: number;
      clarity: number;
    };
  };
  pointsEarned: number;
}

export function TextFeedback({ feedback, pointsEarned }: TextFeedbackProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      {/* Puntuación general */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6" />
            Resultado de tu Respuesta
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <div className={`text-4xl font-bold ${getScoreColor(feedback.score)}`}>
              {feedback.score}/100
            </div>
            <Badge variant={getScoreBadgeVariant(feedback.score)} className="text-lg px-4 py-1">
              {pointsEarned} XP ganados
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Desglose de puntuación */}
      <Card>
        <CardHeader>
          <CardTitle>Desglose de Puntuación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Comprensión del problema</span>
                <span className="text-sm">{feedback.score_breakdown.understanding}/25</span>
              </div>
              <Progress value={(feedback.score_breakdown.understanding / 25) * 100} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Precisión técnica</span>
                <span className="text-sm">{feedback.score_breakdown.technical_accuracy}/25</span>
              </div>
              <Progress value={(feedback.score_breakdown.technical_accuracy / 25) * 100} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Completitud de la solución</span>
                <span className="text-sm">{feedback.score_breakdown.completeness}/25</span>
              </div>
              <Progress value={(feedback.score_breakdown.completeness / 25) * 100} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Claridad y estructura</span>
                <span className="text-sm">{feedback.score_breakdown.clarity}/25</span>
              </div>
              <Progress value={(feedback.score_breakdown.clarity / 25) * 100} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback detallado */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback Detallado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">{feedback.detailed_feedback}</p>
        </CardContent>
      </Card>

      {/* Fortalezas */}
      {feedback.strengths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Fortalezas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Áreas de mejora */}
      {feedback.improvements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Lightbulb className="h-5 w-5" />
              Áreas de Mejora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}