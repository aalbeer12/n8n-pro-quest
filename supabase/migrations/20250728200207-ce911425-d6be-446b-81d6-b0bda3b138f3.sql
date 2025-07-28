-- Add missing RLS policies for streak_freezes table
CREATE POLICY "Users can view own streak freezes" ON public.streak_freezes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own streak freezes" ON public.streak_freezes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add missing RLS policies for submission_comments table  
CREATE POLICY "Users can view comments on submissions they can see" ON public.submission_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.submissions 
      WHERE submissions.id = submission_comments.submission_id
      AND (
        submissions.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.profiles 
          WHERE profiles.id = submissions.user_id 
          AND profiles.is_public = true
        )
      )
    )
  );

CREATE POLICY "Users can create comments on public submissions" ON public.submission_comments
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.submissions 
      WHERE submissions.id = submission_comments.submission_id
      AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = submissions.user_id 
        AND profiles.is_public = true
      )
    )
  );

CREATE POLICY "Users can update own comments" ON public.submission_comments
  FOR UPDATE USING (auth.uid() = user_id);