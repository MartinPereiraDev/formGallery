"use client"

import { Button } from "./ui/button"
import { Grid, Layout } from "lucide-react"

interface NavigationProps {
    onViewChange: (view: "dashboard" | "gallery" | "Demo gallery") => void
    currentView: "dashboard" | "gallery" | "Demo gallery"
}

export default function Navigation({ onViewChange, currentView }: NavigationProps) {
    return (
        <div className="fixed top-4 right-4 z-50">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-2">
                <div className="flex gap-2">
                    <Button
                        onClick={() => onViewChange("dashboard")}
                        variant={currentView === "dashboard" ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <Grid className="w-4 h-4" />
                        Dashboard
                    </Button>
                    <Button
                        onClick={() => onViewChange("gallery")}
                        variant={currentView === "gallery" ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <Layout className="w-4 h-4" />
                        Gallery
                    </Button>

                </div>
            </div>
        </div>
    )
} 