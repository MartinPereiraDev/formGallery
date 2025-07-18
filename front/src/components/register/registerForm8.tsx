"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useToast } from "../../hooks/use.toast"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export default function RegisterForm8() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const fakeRegister = ({ name, email, contraseña }: { name: string; email: string; contraseña: string }) => {
    return new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        if (email && contraseña && name) {
          resolve({ token: "falso-token-simulado" })
        } else {
          reject(new Error("Datos inválidos"))
        }
      }, 400)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!name || !email || !password) {
      setError("Por favor completa todos los campos")
      return
    }
    try {
      await fakeRegister({ name, email, contraseña: password })
      toast({
        title: "Registro exitoso",
        description: `¡Bienvenido, ${name}!`,
      })
      setName("")
      setEmail("")
      setPassword("")
    } catch {
      toast({
        title: "Datos inválidos",
        description: "Verifica los datos ingresados",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-black via-zinc-900 to-neutral-800 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-6 border border-zinc-800 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-fuchsia-600/20 to-indigo-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-amber-400/10 to-fuchsia-600/20 rounded-full blur-2xl" />
      </div>
      <div className="relative z-10 text-center mb-10">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center mb-2 shadow-lg border border-zinc-700">
          <User className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2 font-serif">Registrarse</h2>
        <p className="text-zinc-400 text-lg font-light">Registro para miembros premium</p>
      </div>
      <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name8" className="block text-sm font-medium text-zinc-200 mb-1">Nombre</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400">
              <User className="w-5 h-5" />
            </span>
            <Input
              id="name8"
              type="text"
              placeholder="Tu nombre completo"
              className="pl-10 h-12 bg-zinc-900/80 border border-zinc-700 rounded-xl focus:border-amber-400 focus:ring-amber-100 text-white placeholder-zinc-500"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email8" className="block text-sm font-medium text-zinc-200 mb-1">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400">
              <Mail className="w-5 h-5" />
            </span>
            <Input
              id="email8"
              type="email"
              placeholder="admin@gmail.com"
              className="pl-10 h-12 bg-zinc-900/80 border border-zinc-700 rounded-xl focus:border-amber-400 focus:ring-amber-100 text-white placeholder-zinc-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password8" className="block text-sm font-medium text-zinc-200 mb-1">Contraseña</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400">
              <Lock className="w-5 h-5" />
            </span>
            <Input
              id="password8"
              type={showPassword ? "text" : "password"}
              placeholder="Crea una contraseña"
              className="pl-10 pr-10 h-12 bg-zinc-900/80 border border-zinc-700 rounded-xl focus:border-amber-400 focus:ring-amber-100 text-white placeholder-zinc-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {error && <div className="text-amber-400 text-xs text-center mt-2">{error}</div>}
        <Button
          type="submit"
          className="w-full h-12 rounded-xl bg-gradient-to-r from-zinc-800 via-zinc-900 to-black hover:from-amber-400 hover:to-fuchsia-600 text-white font-semibold shadow-lg border border-zinc-700 transition-all duration-200 text-lg tracking-wide"
        >
          Registrarme
        </Button>
        <div className="text-center mt-2">
          <button
            type="button"
            className="text-sm text-zinc-400 hover:text-amber-400 hover:underline transition"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const event = new CustomEvent('switchToLogin')
                window.dispatchEvent(event)
              }
            }}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>
      </form>
    </div>
  )
}
