import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Code, 
  Maximize2, 
  Minimize2, 
  FileUp, 
  FileDown, 
  RotateCcw,
  Save,
  AlertCircle,
  CheckCircle2,
  Copy
} from 'lucide-react'
import Editor from '@monaco-editor/react'
import { useToast } from '@/hooks/use-toast'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  isValid: boolean
  saving: boolean
  lastSaved: Date | null
  onFormat: () => void
  onReset: () => void
}

export const CodeEditor = ({ 
  value, 
  onChange, 
  isValid, 
  saving, 
  lastSaved,
  onFormat,
  onReset
}: CodeEditorProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Validate JSON and update error state
  useEffect(() => {
    try {
      JSON.parse(value)
      setError(null)
    } catch (e: any) {
      setError(e.message)
    }
  }, [value])

  const handleEditorChange = (val: string | undefined) => {
    if (val !== undefined) {
      onChange(val)
    }
  }

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      try {
        // Validate JSON before setting
        JSON.parse(content)
        onChange(content)
        toast({
          title: "Archivo importado",
          description: "JSON cargado correctamente"
        })
      } catch (error) {
        toast({
          title: "Error de formato",
          description: "El archivo no contiene JSON válido",
          variant: "destructive"
        })
      }
    }
    reader.readAsText(file)
    
    // Reset input
    event.target.value = ''
  }

  const handleExport = () => {
    const blob = new Blob([value], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'n8n-workflow.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Archivo descargado",
      description: "Flujo de trabajo exportado como JSON"
    })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      toast({
        title: "Copiado",
        description: "Código copiado al portapapeles"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar al portapapeles",
        variant: "destructive"
      })
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineHeight: 20,
    folding: true,
    automaticLayout: true,
    wordWrap: 'on' as const,
    theme: 'vs-dark',
    formatOnPaste: true,
    formatOnType: true,
    suggest: {
      showKeywords: true,
      showSnippets: true
    }
  }

  const EditorComponent = (
    <div className={`relative ${isFullscreen ? 'h-screen' : 'h-96 lg:h-[500px]'}`}>
      <Editor
        language="json"
        value={value}
        onChange={handleEditorChange}
        options={editorOptions}
        className="border-0"
      />
    </div>
  )

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="h-full flex flex-col">
          {/* Fullscreen Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-surface/50">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">Editor de Código</span>
              <Badge variant={isValid ? "default" : "destructive"} className="ml-2">
                {isValid ? "JSON Válido" : "JSON Inválido"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onFormat}>
                Formatear
              </Button>
              <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                <Minimize2 className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
          
          {/* Fullscreen Editor */}
          <div className="flex-1">
            {EditorComponent}
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-destructive/10 border-t border-destructive/20">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Error de JSON:</span>
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden bg-surface/50 backdrop-blur-sm border-border">
        {/* Editor Header */}
        <div className="p-4 border-b border-border bg-background/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <span className="font-medium text-primary">Editor de Flujo n8n</span>
              </div>
              
              <Badge variant={isValid ? "default" : "destructive"}>
                {isValid ? (
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                ) : (
                  <AlertCircle className="w-3 h-3 mr-1" />
                )}
                {isValid ? "JSON Válido" : "JSON Inválido"}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4" />
              </Button>
              
              <Separator orientation="vertical" className="h-4" />
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                title="Importar archivo JSON"
              >
                <FileUp className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleExport}
                title="Exportar como JSON"
              >
                <FileDown className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onFormat}
                title="Formatear JSON (Ctrl+F)"
              >
                <Code className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onReset}
                title="Reiniciar código"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleFullscreen}
                title="Pantalla completa"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        {EditorComponent}

        {/* Editor Footer */}
        <div className="p-3 border-t border-border bg-background/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Save className="w-3 h-3" />
                {saving ? (
                  <span>Guardando...</span>
                ) : lastSaved ? (
                  <span>Guardado {lastSaved.toLocaleTimeString()}</span>
                ) : (
                  <span>Sin guardar</span>
                )}
              </div>
              
              <span>JSON • UTF-8</span>
              <span>{value.split('\n').length} líneas</span>
            </div>
            
            <div className="flex items-center gap-2">
              <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+Enter</kbd>
              <span>para enviar</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-destructive/10 border-t border-destructive/20">
            <div className="flex items-start gap-2 text-destructive">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <div>
                <span className="text-sm font-medium">Error de JSON:</span>
                <pre className="text-xs mt-1 font-mono whitespace-pre-wrap">{error}</pre>
              </div>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  )
}