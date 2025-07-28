import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ChallengeFiltersProps {
  selectedDifficulty: string
  selectedCategory: string
  onDifficultyChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onClearFilters: () => void
}

export const ChallengeFilters = ({
  selectedDifficulty,
  selectedCategory,
  onDifficultyChange,
  onCategoryChange,
  onClearFilters
}: ChallengeFiltersProps) => {
  const hasActiveFilters = selectedDifficulty !== 'all' || selectedCategory !== 'all'

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex flex-col sm:flex-row gap-3 flex-1">
        <div className="min-w-[160px]">
          <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Dificultad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las dificultades</SelectItem>
              <SelectItem value="beginner">Principiante</SelectItem>
              <SelectItem value="intermediate">Intermedio</SelectItem>
              <SelectItem value="advanced">Avanzado</SelectItem>
              <SelectItem value="expert">Experto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[160px]">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="automation">Automatización</SelectItem>
              <SelectItem value="integration">Integración</SelectItem>
              <SelectItem value="data-processing">Procesamiento de Datos</SelectItem>
              <SelectItem value="api">APIs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <Button 
          variant="outline" 
          onClick={onClearFilters}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )
}