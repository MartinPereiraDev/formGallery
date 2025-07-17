"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useToast } from "../../hooks/use.toast"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function LoginForm6() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const fakeLogin = ({ email, contraseña }: { email: string; contraseña: string }) => {
    return new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@gmail.com" && contraseña === "admin123") {
          resolve({ token: "falso-token-simulado" })
        } else {
          reject(new Error("Credenciales inválidas"))
        }
      }, 400)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) {
      setError("Por favor ingresa email y contraseña")
      return
    }
    try {
      await fakeLogin({ email, contraseña: password })
      toast({
        title: "Inicio de sesión exitoso",
        description: "¡Bienvenido!",
      })
      setEmail("")
      setPassword("")
    } catch {
      toast({
        title: "Credenciales inválidas",
        description: "Verifica tu usuario y contraseña",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-indigo-50 via-white to-purple-100 rounded-3xl shadow-2xl p-8 border border-indigo-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-indigo-700 mb-1">Iniciar sesión</h2>
        <p className="text-gray-500">Accede a tu panel profesional</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email6" className="block text-sm font-medium text-indigo-700 mb-1">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              <Mail className="w-5 h-5" />
            </span>
            <Input
              id="email6"
              type="email"
              placeholder="admin@gmail.com"
              className="pl-10 h-12 bg-white/80 border border-indigo-200 rounded-xl focus:border-indigo-400 focus:ring-indigo-100"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password6" className="block text-sm font-medium text-indigo-700 mb-1">Contraseña</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
              <Lock className="w-5 h-5" />
            </span>
            <Input
              id="password6"
              type={showPassword ? "text" : "password"}
              placeholder="admin123"
              className="pl-10 pr-10 h-12 bg-white/80 border border-indigo-200 rounded-xl focus:border-indigo-400 focus:ring-indigo-100"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600"
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
          className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold shadow-md"
        >
          Entrar
        </Button>
        <div className="text-right mt-2">
          <a href="#" className="text-sm text-indigo-500 hover:underline">¿Olvidaste tu contraseña?</a>
        </div>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              className="text-indigo-500 hover:underline font-medium"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const event = new CustomEvent('switchToRegister')
                  window.dispatchEvent(event)
                }
              }}
            >
              Regístrate
            </button>
          </span>
        </div>
      </form>
    </div>
  )
}
