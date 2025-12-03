"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ProjectDashboard from "@/components/project-dashboard"
import LoginForm from "@/components/login-form"
import { useAuth } from "@/app/auth-context"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { isLoggedIn, username } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setIsLoading(false)
  }, [isLoggedIn, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-primary rounded-lg mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {!isLoggedIn ? <LoginForm /> : <ProjectDashboard username={username || ""} />}
    </main>
  )
}
