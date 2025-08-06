import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Redirect component for handling 301 redirects
export const RedirectPage = ({ to }: { to: string }) => {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate(to, { replace: true })
  }, [navigate, to])
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirigiendo...</p>
      </div>
    </div>
  )
}