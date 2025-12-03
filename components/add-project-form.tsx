"use client"

import type React from "react"

import { useState } from "react"
import { Save, X } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "Not Started" | "In Progress" | "Completed"
}

interface AddProjectFormProps {
  project?: Project
  onSubmit: (projectData: Omit<Project, "id">) => void
  onCancel: () => void
  isEditing?: boolean
}

export default function AddProjectForm({ project, onSubmit, onCancel, isEditing }: AddProjectFormProps) {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    status: project?.status || ("Not Started" as const),
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      name: formData.name,
      description: formData.description,
      status: formData.status,
    })

    setFormData({ name: "", description: "", status: "Not Started" })
    setErrors({})
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-8 mb-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold mb-6">{isEditing ? "Edit Project" : "Add New Project"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Project Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Website Redesign"
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
          />
          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add project details..."
            rows={4}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:shadow-lg active:scale-95"
          >
            <Save size={18} />
            {isEditing ? "Update Project" : "Add Project"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-all hover:shadow-lg active:scale-95"
          >
            <X size={18} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
