import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Crown, Trophy, TrendingUp, Award, Star, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LeaderboardUser {
  user_id: string;
  current_difficulty: string;
  total_challenges_completed: number;
  average_score_last_7: number;
  total_points: number;
  rank_position: number;
  profile: {
    username: string;
    display_name: string;
    avatar_url: string;
  };
}

const difficultyConfig = {
  beginner: { label: 'Principiante', color: 'bg-green-500', icon: Target },
  intermediate: { label: 'Intermedio', color: 'bg-blue-500', icon: TrendingUp },
  advanced: { label: 'Avanzado', color: 'bg-purple-500', icon: Award },
  expert: { label: 'Experto', color: 'bg-red-500', icon: Crown }
};

const Leaderboard = () => {
  const [leaderboards, setLeaderboards] = useState<Record<string, LeaderboardUser[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('beginner');

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    try {
      setLoading(true);
      
      // Fetch leaderboard data for each difficulty
      const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
      const leaderboardData: Record<string, LeaderboardUser[]> = {};

      for (const difficulty of difficulties) {
        const { data, error } = await supabase
          .from('user_stats')
          .select(`
            *,
            profile:profiles!inner(username, display_name, avatar_url, is_public)
          `)
          .eq('current_difficulty', difficulty)
          .eq('profile.is_public', true)
          .order('total_points', { ascending: false })
          .limit(50);

        if (error) {
          console.error(`Error fetching ${difficulty} leaderboard:`, error);
          continue;
        }

        // Add rank positions
        const rankedData = (data || []).map((user, index) => ({
          ...user,
          rank_position: index + 1
        }));

        leaderboardData[difficulty] = rankedData;
      }

      setLeaderboards(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (position: number) => {
    if (position === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (position === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (position === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-bold text-muted-foreground">#{position}</span>;
  };

  const getTopPerformers = () => {
    const allUsers: LeaderboardUser[] = [];
    Object.values(leaderboards).forEach(users => allUsers.push(...users));
    return allUsers
      .sort((a, b) => b.total_points - a.total_points)
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Link>
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-primary">Ranking Global</h1>
            <p className="text-muted-foreground">
              Compite con otros desarrolladores de automatización
            </p>
          </div>
        </div>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Top Performers Global
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {getTopPerformers().map((user, index) => (
                <Card key={user.user_id} className={`${index === 0 ? 'ring-2 ring-yellow-500' : ''}`}>
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-2">
                      {getRankIcon(index + 1)}
                    </div>
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={user.profile.avatar_url} />
                      <AvatarFallback>
                        {user.profile.display_name?.slice(0, 2).toUpperCase() || 
                         user.profile.username?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">
                      {user.profile.display_name || user.profile.username}
                    </h3>
                    <Badge className={difficultyConfig[user.current_difficulty as keyof typeof difficultyConfig]?.color}>
                      {difficultyConfig[user.current_difficulty as keyof typeof difficultyConfig]?.label}
                    </Badge>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div>{user.total_points} puntos</div>
                      <div>{user.total_challenges_completed} retos</div>
                      <div>{user.average_score_last_7.toFixed(1)}% promedio</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboards by Difficulty */}
        <Card>
          <CardHeader>
            <CardTitle>Rankings por Nivel</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {Object.entries(difficultyConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  const count = leaderboards[key]?.length || 0;
                  return (
                    <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{config.label}</span>
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {count}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.entries(difficultyConfig).map(([difficulty, config]) => (
                <TabsContent key={difficulty} value={difficulty} className="mt-6">
                  <div className="space-y-4">
                    {leaderboards[difficulty]?.length > 0 ? (
                      leaderboards[difficulty].map((user, index) => (
                        <Card key={user.user_id} className={`transition-all hover:shadow-md ${index < 3 ? 'border-primary/20' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-8">
                                  {getRankIcon(user.rank_position)}
                                </div>
                                
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={user.profile.avatar_url} />
                                  <AvatarFallback>
                                    {user.profile.display_name?.slice(0, 2).toUpperCase() || 
                                     user.profile.username?.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                
                                <div>
                                  <h3 className="font-semibold">
                                    {user.profile.display_name || user.profile.username}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    @{user.profile.username}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-8 text-sm">
                                <div className="text-center">
                                  <div className="font-bold text-primary">{user.total_points}</div>
                                  <div className="text-muted-foreground">Puntos</div>
                                </div>
                                
                                <div className="text-center">
                                  <div className="font-bold">{user.total_challenges_completed}</div>
                                  <div className="text-muted-foreground">Retos</div>
                                </div>
                                
                                <div className="text-center min-w-24">
                                  <div className="font-bold">{user.average_score_last_7.toFixed(1)}%</div>
                                  <div className="text-muted-foreground">Promedio</div>
                                  <Progress 
                                    value={user.average_score_last_7} 
                                    className="w-16 h-2 mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <div className="text-muted-foreground">
                            <config.icon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No hay usuarios en el nivel {config.label} aún.</p>
                            <p className="text-sm mt-2">¡Sé el primero en aparecer aquí!</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;