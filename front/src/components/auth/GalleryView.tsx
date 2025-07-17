"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import LoginForm1 from "../login/loginForm1"
import LoginForm2 from "../login/loginForm2"
import { LoginForm3 } from "../login/loginForm3"
import { LoginForm4 } from "../login/loginForm4"
import { LoginForm5 } from "../login/loginForm5"
import LoginForm6 from "../login/loginForm6"
import LoginForm7 from "../login/loginForm7"
import LoginForm8 from "../login/loginForm8"
import LoginForm9 from "../login/loginForm9"
import LoginForm10 from "../login/loginForm10"
import LoginForm11 from "../login/loginForm11"
import LoginForm12 from "../login/loginForm12"
import RegisterForm1 from "../register/registerForm1"
import RegisterForm2 from "../register/registerForm2"
import RegisterForm3 from "../register/registerForm3"
import RegisterForm4 from "../register/registerForm4"
import RegisterForm5 from "../register/registerForm5"
import RegisterForm6 from "../register/registerForm6"
import RegisterForm7 from "../register/registerForm7"
import RegisterForm8 from "../register/registerForm8"
import RegisterForm9 from "../register/registerForm9"
import RegisterForm10 from "../register/registerForm10"
import RegisterForm11 from "../register/registerForm11"
import RegisterForm12 from "../register/registerForm12"

// Tipos TypeScript
type TabType = "login" | "register"

interface FormConfig {
  component: React.ReactElement
  title: string
}

// Configuración de formularios con metadatos
const FORM_CONFIGS: Record<TabType, FormConfig[]> = {
  login: [
    { component: <LoginForm1 key="login1" />, title: "Login 1" },
    { component: <LoginForm2 key="login2" />, title: "Login 2" },
    { component: <LoginForm3 key="login3" />, title: "Login 3" },
    { component: <LoginForm4 key="login4" />, title: "Login 4" },
    { component: <LoginForm5 key="login5" />, title: "Login 5" },
    { component: <LoginForm6 key="login6" />, title: "Login 6" },
    { component: <LoginForm7 key="login7" />, title: "Login 7" },
    { component: <LoginForm8 key="login8" />, title: "Login 8" },
    { component: <LoginForm9 key="login9" />, title: "Login 9" },
    { component: <LoginForm10 key="login10" />, title: "Login 10" },
    { component: <LoginForm11 key="login11" />, title: "Login 11" },
    { component: <LoginForm12 key="login12" />, title: "Login 12" },
  ],
  register: [
    { component: <RegisterForm1 key="register1" />, title: "Registro 1" },
    { component: <RegisterForm2 key="register2" />, title: "Registro 2" },
    { component: <RegisterForm3 key="register3" />, title: "Registro 3" },
    { component: <RegisterForm4 key="register4" />, title: "Registro 4" },
    { component: <RegisterForm5 key="register5" />, title: "Registro 5" },
    { component: <RegisterForm6 key="register6" />, title: "Registro 6" },
    { component: <RegisterForm7 key="register7" />, title: "Registro 7" },
    { component: <RegisterForm8 key="register8" />, title: "Registro 8" },
    { component: <RegisterForm9 key="register9" />, title: "Registro 9" },
    { component: <RegisterForm10 key="register10" />, title: "Registro 10" },
    { component: <RegisterForm11 key="register11" />, title: "Registro 11" },
    { component: <RegisterForm12 key="register12" />, title: "Registro 12" },
  ]
}

export default function GalleryView() {
  const [activeTab, setActiveTab] = useState<TabType>("login")

  // Memoización de formularios para mejor rendimiento
  const currentForms = useMemo(() => FORM_CONFIGS[activeTab], [activeTab])

  // Manejadores optimizados con useCallback
  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab)
  }, [])

  // Event listeners optimizados
  useEffect(() => {
    const handleRegister = () => handleTabChange("register")
    const handleLogin = () => handleTabChange("login")

    if (typeof window !== 'undefined') {
      window.addEventListener('switchToRegister', handleRegister)
      window.addEventListener('switchToLogin', handleLogin)
      
      return () => {
        window.removeEventListener('switchToRegister', handleRegister)
        window.removeEventListener('switchToLogin', handleLogin)
      }
    }
  }, [handleTabChange])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-black via-zinc-900 to-neutral-800 py-12 px-4">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-400 via-fuchsia-600 to-indigo-500 bg-clip-text text-transparent mb-4 font-serif tracking-tight drop-shadow-lg">
          Galería de Formulario
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
        Inspirate con esta galería de formularios modernos, responsivos y optimizados para proyectos con React y TailwindCSS.
        </p>
      </header>

      {/* Navegación */}
      <nav className="flex mb-12 rounded-xl overflow-hidden border border-zinc-800 shadow-lg bg-zinc-900/50 backdrop-blur-sm">
        {(["login", "register"] as const).map((tab) => (
          <button
            key={tab}
            className={`px-8 py-4 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-lg ${
              activeTab === tab
                ? "bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg transform scale-105"
                : "bg-transparent text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/50"
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab === "login" ? "Formularios de Login" : "Formularios de Registro"}
          </button>
        ))}
      </nav>

      {/* Contenido principal */}
      <main className="w-full max-w-7xl flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
          {currentForms.map((formConfig, index) => (
            <div
              key={index}
              className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 "
            >
              {/* Badge de tipo */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-full">
                  {activeTab === "login" ? "Login" : "Registro"}
                </span>
              </div>

              {/* Información del formulario */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-8 group-hover:text-amber-400 transition-colors">
                  {formConfig.title}
                </h3>               
              </div>

              {/* Contenedor del formulario */}
              <div className="flex items-center justify-center min-h-[400px]">
                {formConfig.component}
              </div>

            </div>
          ))}
        </div>
      </main>

      {/* Footer informativo */}
      <footer className="mt-16 text-center text-zinc-500 text-sm">
        <p>
          Bengelsdorff Angeélica | 
          Creado con ❤️ usando Next.js y Tailwind CSS
        </p>
      </footer>
    </div>
  )
} 