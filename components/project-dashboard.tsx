"use client"

import { useState, useEffect } from "react"
import { Plus, AlertCircle, CheckSquare } from "lucide-react"
import ProjectCard from "./project-card"
import AddProjectForm from "./add-project-form"

interface Project {
  id: string
  name: string
  description: string
  status: "Not Started" | "In Progress" | "Completed"
}

interface ProjectDashboardProps {
  username: string
  onLogout: () => void
}

export default function ProjectDashboard({ username, onLogout }: ProjectDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [notification, setNotification] = useState("")
  const [notificationType, setNotificationType] = useState<"success" | "info">("success")

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  // Save projects to localStorage
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])

  const showNotification = (message: string, type: "success" | "info" = "success") => {
    setNotificationType(type)
    setNotification(message)
    setTimeout(() => setNotification(""), 3000)
  }

  const handleAddProject = (projectData: Omit<Project, "id">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    }
    setProjects([...projects, newProject])
    setShowAddForm(false)
    setEditingProject(null)
    showNotification(`✓ Project "${newProject.name}" added successfully!`)
  }

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
    setEditingProject(null)
    showNotification(`✓ Project updated successfully!`)
  }

  const handleDeleteProject = (id: string) => {
    const projectToDelete = projects.find((p) => p.id === id)
    if (confirm(`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`)) {
      setProjects(projects.filter((p) => p.id !== id))
      showNotification(`✓ Project deleted successfully!`)
    }
  }

  const handleStatusChange = (id: string, newStatus: "Not Started" | "In Progress" | "Completed") => {
    const project = projects.find((p) => p.id === id)
    setProjects(projects.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
    showNotification(`✓ Status updated to "${newStatus}"`, "info")
  }

  const stats = {
    total: projects.length,
    completed: projects.filter((p) => p.status === "Completed").length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome, <span className="text-primary">{username}</span>!
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">Manage your team's projects efficiently</p>
        </div>

        {/* Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg border animate-fade-in ${
              notificationType === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
                : "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400"
            }`}
          >
            {notification}
          </div>
        )}

        {/* Stats Grid - Made responsive with grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="p-4 md:p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-sm md:text-base">Total Projects</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">{stats.total}</p>
              </div>
              <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground/30 flex-shrink-0" />
            </div>
          </div>

          <div className="p-4 md:p-6 bg-card rounded-lg border border-border hover:border-accent/50 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-sm md:text-base">In Progress</p>
                <p className="text-2xl md:text-3xl font-bold text-accent">{stats.inProgress}</p>
              </div>
              <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground/30 flex-shrink-0" />
            </div>
          </div>

          <div className="p-4 md:p-6 bg-card rounded-lg border border-border hover:border-green-500/50 transition-colors sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-sm md:text-base">Completed</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
              </div>
              <CheckSquare className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground/30 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Add Project Button */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => {
              setShowAddForm(!showAddForm)
              setEditingProject(null)
            }}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:shadow-lg active:scale-95"
          >
            <Plus size={20} />
            {showAddForm ? "Cancel" : "Add New Project"}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <AddProjectForm
            onSubmit={handleAddProject}
            onCancel={() => {
              setShowAddForm(false)
              setEditingProject(null)
            }}
          />
        )}

        {editingProject && (
          <AddProjectForm
            project={editingProject}
            onSubmit={(data) => {
              handleUpdateProject({ ...editingProject, ...data })
              setEditingProject(null)
            }}
            onCancel={() => setEditingProject(null)}
            isEditing
          />
        )}

        {/* Projects List */}
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg border border-border">
              <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg mb-4">No projects yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-6 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
              >
                <Plus size={18} />
                Create Your First Project
              </button>
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => setEditingProject(project)}
                onDelete={() => handleDeleteProject(project.id)}
                onStatusChange={(status) => handleStatusChange(project.id, status)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
