import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Clock, Star, Zap, Lock, Crown } from 'lucide-react'
import { TranslationBadge } from '@/components/ui/translation-badge'
import { useAutoTranslate } from '@/hooks/use-auto-translate'
import { useSubscription } from '@/hooks/use-subscription'
import { useState } from 'react'

interface ChallengeCardProps {
  id: string
  title: string
  description: string
  difficulty: string
  category: string
  points: number
  timeEstimate: number | null
  slug: string
  isDailyChallenge: boolean
  isLocked?: boolean
  isFake?: boolean
  onUpgradeClick?: () => void
  nextFreeText?: string
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'bg-green-500/10 text-green-600 border-green-500/20'
    case 'intermediate':
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
    case 'advanced':
      return 'bg-red-500/10 text-red-600 border-red-500/20'
    case 'expert':
      return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
  }
}

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'automation':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    case 'integration':
      return 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20'
    case 'data-processing':
      return 'bg-teal-500/10 text-teal-600 border-teal-500/20'
    case 'api':
      return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
  }
}

export const ChallengeCard = ({
  id,
  title,
  description,
  difficulty,
  category,
  points,
  timeEstimate,
  slug,
  isDailyChallenge,
  isLocked = false,
  isFake = false,
  onUpgradeClick,
  nextFreeText
}: ChallengeCardProps) => {
  const { translateText } = useAutoTranslate();
  const { isPro } = useSubscription();
  const [translatedTitle, setTranslatedTitle] = useState(title);
  const [translatedDescription, setTranslatedDescription] = useState(description);
  const [isTranslated, setIsTranslated] = useState(false);

  const handleTranslate = async () => {
    try {
      const newTitle = await translateText(title, { contentType: 'challenge', contentId: id });
      const newDescription = await translateText(description, { contentType: 'challenge', contentId: id });
      
      setTranslatedTitle(newTitle);
      setTranslatedDescription(newDescription);
      setIsTranslated(true);
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };
  
  const shouldShowProBadge = !isPro && (isLocked || isFake);
  
  return (
    <Card className={`group transition-all duration-300 border-border/50 ${
      isLocked || isFake 
        ? 'opacity-75 hover:opacity-90' 
        : 'hover:shadow-lg hover:border-primary/20'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isDailyChallenge && (
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                  <Zap className="w-3 h-3 mr-1" />
                  Reto Diario
                </Badge>
              )}
              {!isPro && (
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                  Gratis
                </Badge>
              )}
              {shouldShowProBadge && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  <Crown className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className={`text-lg transition-colors ${
                isLocked || isFake ? 'text-muted-foreground' : 'group-hover:text-primary'
              }`}>
                {isLocked || isFake ? (
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {translatedTitle}
                  </div>
                ) : (
                  translatedTitle
                )}
              </CardTitle>
              <TranslationBadge 
                onTranslate={handleTranslate}
                isTranslated={isTranslated}
                compact
              />
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <Star className="w-3 h-3" />
              <span>{points} pts</span>
            </div>
            {timeEstimate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{timeEstimate}m</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Badge 
            variant="outline" 
            className={getDifficultyColor(difficulty)}
          >
            {difficulty}
          </Badge>
          <Badge 
            variant="outline" 
            className={getCategoryColor(category)}
          >
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className={`text-sm mb-4 line-clamp-3 ${
          isLocked || isFake ? 'text-muted-foreground/60' : 'text-muted-foreground'
        }`}>
          {translatedDescription}
        </p>
        
        {isLocked || isFake ? (
          <div className="space-y-2">
            <Button 
              onClick={onUpgradeClick}
              variant="outline"
              className="w-full border-primary/50 text-primary hover:bg-primary/10"
            >
              <Crown className="w-4 h-4 mr-2" />
              Actualizar a Pro
            </Button>
            {/* Countdown for free users */}
            {!isPro && (
              <p className="text-xs text-muted-foreground text-center">
                {/** Show provided nextFreeText if any */}
                {/* eslint-disable-next-line react/prop-types */}
                {(() => {
                  try {
                    // @ts-ignore - nextFreeText is part of props
                    return (typeof nextFreeText !== 'undefined' && nextFreeText)
                      ? `Próximo reto gratis en ${nextFreeText}`
                      : ''
                  } catch {
                    return ''
                  }
                })()}
              </p>
            )}
          </div>
        ) : (
          <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
            <Link to={`/challenge/${slug}`}>
              Comenzar Reto
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}