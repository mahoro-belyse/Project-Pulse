"use client"

import { Edit2, Trash2, ChevronDown } from "lucide-react"
import { useState } from "react"

interface Project {
  id: string
  name: string
  description: string
  status: "Not Started" | "In Progress" | "Completed"
}

interface ProjectCardProps {
  project: Project
  onEdit: () => void
  onDelete: () => void
  onStatusChange: (status: "Not Started" | "In Progress" | "Completed") => void
}

export default function ProjectCard({ project, onEdit, onDelete, onStatusChange }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const statusColors = {
    "Not Started": "bg-muted text-muted-foreground",
    "In Progress": "bg-accent/20 text-accent",
    Completed: "bg-green-500/20 text-green-600 dark:text-green-400",
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 animate-fade-in group">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold mb-2 break-words">{project.name}</h3>
          <p className="text-muted-foreground mb-4 text-sm md:text-base line-clamp-2">
            {project.description || "No description"}
          </p>

          {/* Status Dropdown */}
          <div className="relative inline-block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:shadow-md ${statusColors[project.status]}`}
            >
              <span className="font-medium text-sm md:text-base">{project.status}</span>
              <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 min-w-max">
                {(["Not Started", "In Progress", "Completed"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      onStatusChange(status)
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg text-sm md:text-base"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions - Made responsive with flex-row wrap */}
        <div className="flex gap-2 self-start md:self-center">
          <button
            onClick={onEdit}
            className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-all hover:shadow-md active:scale-95 text-sm md:text-base"
            title="Edit project"
          >
            <Edit2 size={16} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg transition-all hover:shadow-md active:scale-95 text-sm md:text-base"
            title="Delete project"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
