"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Eye, EyeOff } from "lucide-react"

export default function LoginForm9() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Por favor ingresa tu correo y contraseña")
      return
    }
    setError("")
    // Aquí iría la lógica real de login
  }

  return (
    <div className="w-full min-h-[420px] max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center bg-[#101613] rounded-3xl shadow-2xl p-0 overflow-hidden border border-yellow-700">
      {/* Formulario */}
      <div className="flex-1 px-8 py-10 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-yellow-400 mb-1 tracking-wide">¡BIENVENIDO DE NUEVO!</h2>
        <p className="text-gray-300 mb-8 text-sm">
          ¿No tienes cuenta?{' '}
          <button type="button" className="text-yellow-400 font-semibold cursor-pointer hover:underline" onClick={() => {
            if (typeof window !== 'undefined') {
              const event = new CustomEvent('switchToRegister')
              window.dispatchEvent(event)
            }
          }}>Regístrate</button>
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email9" className="block text-sm font-semibold text-gray-200 mb-1">Correo electrónico</label>
            <Input
              id="email9"
              type="email"
              placeholder="ejemplo@gmail.com"
              className="h-11 rounded-full bg-transparent border-2 border-yellow-400 text-yellow-200 placeholder-yellow-200 focus:border-yellow-500 focus:ring-yellow-200 px-5"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password9" className="block text-sm font-semibold text-gray-200 mb-1">Contraseña</label>
            <div className="relative">
              <Input
                id="password9"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-11 rounded-full bg-transparent border-2 border-yellow-400 text-yellow-200 placeholder-yellow-200 focus:border-yellow-500 focus:ring-yellow-200 px-5 pr-12"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-300"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>         
          {error && <div className="text-red-500 text-xs text-center mt-2">{error}</div>}
          <Button
            type="submit"
            className="w-full h-11 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg mt-2 shadow-md"
          >
            Iniciar sesión
          </Button>
        </form>
      </div>
      {/* Avatar Panda */}
      <div className="flex-1 flex items-center justify-center bg-transparent py-10 px-6">
        <div className="w-60 h-60 rounded-full bg-yellow-400 flex items-center justify-center overflow-hidden border-4 border-yellow-600 shadow-xl">
          <img src="/panda-avatar.png" alt="Panda Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}
