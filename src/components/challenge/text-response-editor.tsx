import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TextResponseEditorProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    story_context: string;
    difficulty: string;
    time_estimate_minutes?: number;
    requirements: any;
  };
  onSubmit: (response: string) => void;
  isSubmitting?: boolean;
}

export function TextResponseEditor({ challenge, onSubmit, isSubmitting }: TextResponseEditorProps) {
  const [response, setResponse] = useState("");
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (response.trim()) {
      onSubmit(response);
    }
  };

  const wordCount = response.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minWords = challenge.requirements?.min_words || 50;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Contexto del reto */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {challenge.title}
              </CardTitle>
              <Badge variant="outline">{challenge.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">📖 Contexto</h4>
              <p className="text-muted-foreground">{challenge.story_context}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🎯 Descripción</h4>
              <p className="text-muted-foreground">{challenge.description}</p>
            </div>

            {challenge.requirements && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Requisitos
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {challenge.requirements.points?.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                {minWords && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Mínimo {minWords} palabras requeridas
                  </p>
                )}
              </div>
            )}

            {challenge.time_estimate_minutes && (
              <div className="text-sm text-muted-foreground">
                ⏱️ Tiempo estimado: {challenge.time_estimate_minutes} minutos
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Editor de respuesta */}
      <div className="space-y-4">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Tu Respuesta</CardTitle>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Palabras: {wordCount}</span>
              <span className={wordCount >= minWords ? "text-green-600" : "text-orange-600"}>
                Mínimo: {minWords} palabras
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 h-full">
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Describe tu enfoque de automatización, el flujo de trabajo que crearías, las herramientas que usarías, y cómo resolverías los desafíos específicos mencionados..."
              className="min-h-[300px] resize-none"
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || wordCount < minWords}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Enviando..." : "Enviar Respuesta"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}