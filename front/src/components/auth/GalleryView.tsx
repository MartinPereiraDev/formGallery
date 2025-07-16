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
  description?: string
}

// Configuración de formularios con metadatos
const FORM_CONFIGS: Record<TabType, FormConfig[]> = {
  login: [
    { component: <LoginForm1 key="login1" />, title: "Login Clásico", description: "Diseño tradicional con validación" },
    { component: <LoginForm2 key="login2" />, title: "Login Moderno", description: "Interfaz contemporánea" },
    { component: <LoginForm3 key="login3" />, title: "Login Minimalista", description: "Diseño limpio y simple" },
    { component: <LoginForm4 key="login4" />, title: "Login Elegante", description: "Estilo sofisticado" },
    { component: <LoginForm5 key="login5" />, title: "Login Creativo", description: "Diseño innovador" },
    { component: <LoginForm6 key="login6" />, title: "Login Profesional", description: "Para aplicaciones empresariales" },
    { component: <LoginForm7 key="login7" />, title: "Login Artístico", description: "Diseño con elementos visuales" },
    { component: <LoginForm8 key="login8" />, title: "Login Tecnológico", description: "Estilo futurista" },
    { component: <LoginForm9 key="login9" />, title: "Login Premium", description: "Experiencia de lujo" },
    { component: <LoginForm12 key="login12" />, title: "Login Avanzado", description: "Funcionalidades avanzadas" },
    { component: <LoginForm10 key="login10" />, title: "Login Responsivo", description: "Adaptable a todos los dispositivos" },
    { component: <LoginForm11 key="login11" />, title: "Login Última Generación", description: "Lo más reciente en UX" },
  ],
  register: [
    { component: <RegisterForm1 key="register1" />, title: "Registro Básico", description: "Formulario simple y directo" },
    { component: <RegisterForm2 key="register2" />, title: "Registro Moderno", description: "Diseño contemporáneo" },
    { component: <RegisterForm3 key="register3" />, title: "Registro Elegante", description: "Estilo sofisticado" },
    { component: <RegisterForm4 key="register4" />, title: "Registro Creativo", description: "Diseño innovador" },
    { component: <RegisterForm5 key="register5" />, title: "Registro Profesional", description: "Para aplicaciones empresariales" },
    { component: <RegisterForm6 key="register6" />, title: "Registro Artístico", description: "Diseño con elementos visuales" },
    { component: <RegisterForm7 key="register7" />, title: "Registro Tecnológico", description: "Estilo futurista" },
    { component: <RegisterForm8 key="register8" />, title: "Registro Premium", description: "Experiencia de lujo" },
    { component: <RegisterForm9 key="register9" />, title: "Registro Avanzado", description: "Funcionalidades avanzadas" },
    { component: <RegisterForm12 key="register12" />, title: "Registro Responsivo", description: "Adaptable a todos los dispositivos" },
    { component: <RegisterForm10 key="register10" />, title: "Registro Última Generación", description: "Lo más reciente en UX" },
    { component: <RegisterForm11 key="register11" />, title: "Registro Completo", description: "Con todas las funcionalidades" },
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
      {/* Header mejorado */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-400 via-fuchsia-600 to-indigo-500 bg-clip-text text-transparent mb-4 font-serif tracking-tight drop-shadow-lg">
          Galería de Formulario
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
        Inspirate con esta galería de formularios modernos, responsivos y optimizados para proyectos con React y TailwindCSS.
        </p>
      </header>

      {/* Navegación mejorada */}
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
              className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/10 hover:-translate-y-1"
            >
              {/* Badge de tipo */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-full">
                  {activeTab === "login" ? "Login" : "Registro"}
                </span>
              </div>

              {/* Información del formulario */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {formConfig.title}
                </h3>
                {formConfig.description && (
                  <p className="text-zinc-400 text-sm">
                    {formConfig.description}
                  </p>
                )}
              </div>

              {/* Contenedor del formulario centrado */}
              <div className="flex items-center justify-center min-h-[400px]">
                {formConfig.component}
              </div>

              {/* Overlay de hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>
      </main>

      {/* Footer informativo */}
      <footer className="mt-16 text-center text-zinc-500 text-sm">
        <p>
          Total de formularios: {currentForms.length} | 
          Creado con ❤️ usando Next.js y Tailwind CSS
        </p>
      </footer>
    </div>
  )
} 