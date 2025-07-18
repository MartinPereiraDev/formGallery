"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import LoginForm1 from "../login/loginForm1"
import LoginForm2 from "../login/loginForm2"
import LoginForm3 from "../login/loginForm3"
import LoginForm4 from "../login/loginForm4"
import LoginForm5 from "../login/loginForm5"
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
  // Estado para el índice actual del carrusel
  const [current, setCurrent] = useState(0)

  // Memoización de formularios para mejor rendimiento
  const currentForms = useMemo(() => FORM_CONFIGS[activeTab], [activeTab])
  const total = currentForms.length

  // Manejadores optimizados con useCallback
  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab)
    setCurrent(0) // Reiniciar a la primera tarjeta al cambiar de tab
  }, [])

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1))
  }, [total])

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1))
  }, [total])

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

  // Variables para swipe táctil
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleNext() // Swipe izquierda: siguiente
        } else {
          handlePrev() // Swipe derecha: anterior
        }
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div>
      <header className="text-center mb-6">
        <h1 className="mt-2 text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 drop-shadow-xl">
          Galería de Formularios
        </h1>
        <p className="text-zinc-200 mt-4 max-w-xl mx-auto">
          Explora diseños modernos y reutilizables para login y registro con React + Tailwind.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mb-16">
        <div className="bg-zinc-800/40 border border-zinc-700/60 rounded-full flex p-1 gap-1">
          {(["login", "register"] as const).map((tab) => (
            <button
              key={tab}
              className={`px-6 py-1.5 text-sm md:text-base font-medium rounded-full transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-500 text-white shadow-md"
                  : "text-zinc-400 hover:text-blue-300"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab === "login" ? "Login" : "Registro"}
            </button>
          ))}
        </div>
      </div>

      {/* Carrusel tipo Aceternity UI */}
      <div className="flex justify-center w-full">
        <div
          className="relative flex flex-row items-center justify-between max-w-[500px] w-full h-[500px] md:h-[600px] overflow-x-visible select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Botón anterior */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center bg-zinc-800 text-white rounded-full hover:bg-yellow-400 hover:text-black transition border-2 border-transparent focus:border-yellow-400 z-50"
            aria-label="Anterior"
            style={{ position: 'relative' }}
          >
            &#8592;
          </button>
          {/* Carrusel con tarjetas */}
          <div className="relative flex-1 flex justify-center items-center h-full">
            {currentForms.map((formConfig, index) => {
              const offset = index - current
              let style: React.CSSProperties = {}
              let zIndex = 0
              let visible = false
              if (offset === 0) {
                style = {
                  transform: "translateX(0) scale(1) rotateY(0deg)",
                  opacity: 1,
                  zIndex: 30,
                  marginTop: 0,
                }
                zIndex = 30
                visible = true
              } else if (offset === -1 || (current === 0 && index === total - 1)) {
                style = {
                  transform: "translateX(-60%) scale(0.85) rotateY(25deg)",
                  opacity: 0.5,
                  zIndex: 20,
                  filter: "blur(1px)",
                  marginTop: "60px",
                }
                zIndex = 20
                visible = true
              } else if (offset === 1 || (current === total - 1 && index === 0)) {
                style = {
                  transform: "translateX(60%) scale(0.85) rotateY(-25deg)",
                  opacity: 0.5,
                  zIndex: 20,
                  filter: "blur(1px)",
                  marginTop: "60px",
                }
                zIndex = 20
                visible = true
              } else {
                style = {
                  opacity: 0,
                  pointerEvents: "none",
                  zIndex: 0,
                }
                zIndex = 0
                visible = false
              }
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "min(95vw, 420px)",
                    minWidth: "350px",
                    maxWidth: "420px",
                    height: "min(90vw, 520px)",
                    minHeight: "400px",
                    maxHeight: "520px",
                    transform: `translate(-50%, -50%) ${style.transform || ''}`,
                    opacity: style.opacity,
                    zIndex: zIndex,
                    boxShadow: style.boxShadow,
                    filter: style.filter,
                    transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
                    pointerEvents: visible ? "auto" : "none",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {formConfig.component}
                  </div>
                </div>
              )
            })}
          </div>
          {/* Botón siguiente */}
          <button
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center bg-zinc-800 text-white rounded-full hover:bg-yellow-400 hover:text-black transition border-2 border-yellow-400 z-50"
            aria-label="Siguiente"
            style={{ position: 'relative' }}
          >
            &#8594;
          </button>
        </div>
      </div>

      <footer className="mt-12 mb-4 text-center text-zinc-500 text-sm">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <hr className="w-40 border-zinc-300" />
            <span className="mx-2 text-red-500 text-lg" aria-label="corazón" role="img">❤️</span>
            <hr className="w-40 border-zinc-300" />
          </div>
          <p>
            Bengelsdorff Angélica • Hecho con Next.js + TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  )
} 