"use client"

import { BarChart3, Settings, Zap, Share2, Shield, Clock } from "lucide-react"
import { useState, useEffect } from "react"

export default function FeaturesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      title: "Project Overview",
      description:
        "Get a comprehensive view of all your projects at a glance with real-time statistics and progress tracking.",
    },
    {
      icon: <Settings className="w-12 h-12 text-primary" />,
      title: "Project Management",
      description: "Create, edit, and delete projects with ease. Manage project details and keep everything organized.",
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Status Updates",
      description:
        "Update project status on the fly with simple dropdowns. Track progress from Not Started to Completed.",
    },
    {
      icon: <Share2 className="w-12 h-12 text-primary" />,
      title: "Data Persistence",
      description: "All your projects and login information are saved locally, so your data persists across sessions.",
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Secure Login",
      description: "Simple, secure login system that keeps your workspace protected and personalized.",
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: "Real-time Updates",
      description: "See all changes instantly. Add, edit, or delete projects with immediate visual feedback.",
    },
  ]

  if (!mounted) return null

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Everything you need to manage your team's projects efficiently and effectively.
          </p>
        </div>
      </section>

      {/* Features Grid - Made responsive with mobile-first approach */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 md:p-8 bg-card rounded-lg border border-border hover:shadow-lg hover:border-primary/50 transition-all duration-300 animate-fade-in group hover:scale-105"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
