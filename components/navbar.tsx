"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, LogOut, Moon, Sun } from "lucide-react"
import { useAuth } from "@/app/auth-context"

export default function Navbar() {
  const auth = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  const isLoggedIn = auth.isLoggedIn
  const username = auth.username || ""
  const logout = auth.logout

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    const html = document.documentElement
    if (newTheme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }

  if (!mounted) return null

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Project Pulse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-foreground hover:text-primary transition-colors">
              Features
            </Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {isLoggedIn ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, <span className="font-semibold text-primary">{username}</span>
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <Link href="/" className="block py-2 text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/features" className="block py-2 text-foreground hover:text-primary transition-colors">
              Features
            </Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="block py-2 text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
            <div className="pt-4 border-t border-border mt-4 space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>

              {isLoggedIn ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Welcome, <span className="font-semibold text-primary">{username}</span>
                  </p>
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium text-center"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
