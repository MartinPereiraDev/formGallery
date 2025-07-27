"use client"

import { useState } from "react"
import Dashboard from "src/components/Dashboard"
import GalleryView from "src/components/GalleryView"
import Navigation from "src/components/Navigation"

export default function Home() {
  const [currentView, setCurrentView] = useState<"dashboard" | "gallery">("dashboard")

  return (
    <>
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      {currentView === "dashboard" ? <Dashboard /> : <GalleryView />}
    </>
  )
}
