"use client"

import type React from "react"
import { useState } from "react"
import { LogIn } from "lucide-react"
import { useAuth } from "@/app/auth-context"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username.trim()) {
      setError("Please enter a username")
      return
    }

    if (username.trim().length < 2) {
      setError("Username must be at least 2 characters")
      return
    }

    login(username.trim())
    setUsername("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-secondary to-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-border p-8 shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">P</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-center text-muted-foreground mb-8">to Project Pulse</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all"
            >
              <LogIn size={20} />
              Login to Dashboard
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">This is a simulated login for demo purposes.</p>
        </div>
      </div>
    </div>
  )
}
