"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useToast } from "../../hooks/use.toast"
import { Smile, Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export default function RegisterForm7() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [shake, setShake] = useState(false)
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
      setError("¡Completa todos los campos!")
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    try {
      await fakeRegister({ name, email, contraseña: password })
      toast({
        title: "¡Registro exitoso!",
        description: `¡Bienvenido, ${name}! 😄`,
      })
      setName("")
      setEmail("")
      setPassword("")
    } catch {
      toast({
        title: "Datos incorrectos",
        description: "Vuelve a intentarlo",
        variant: "destructive"
      })
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`relative bg-gradient-to-br from-pink-200 via-yellow-100 to-cyan-200 rounded-3xl shadow-xl p-8 border-2 border-pink-300 overflow-hidden transition-all duration-500 ${shake ? 'animate-shake' : ''}`}>
        {/* Icono animado */}
        <div className="flex justify-center mb-6">
          <Smile className="w-16 h-16 text-pink-400 animate-bounce drop-shadow-lg" />
        </div>
        <h2 className="text-2xl font-extrabold text-pink-500 text-center mb-2 tracking-tight animate-fade-in">¡Registrate!</h2>
        <p className="text-center text-cyan-600 mb-6 animate-fade-in delay-100">Crea tu cuenta y disfruta de nuestros servicios</p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name7" className="block text-sm font-bold text-pink-500 mb-1">Nombre</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
                <User className="w-5 h-5 animate-spin-slow" />
              </span>
              <Input
                id="name7"
                type="text"
                placeholder="Tu nombre completo"
                className="pl-10 h-12 bg-white/80 border-2 border-cyan-200 rounded-xl focus:border-pink-400 focus:ring-pink-100 text-pink-700 font-semibold"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email7" className="block text-sm font-bold text-pink-500 mb-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
                <Mail className="w-5 h-5 animate-spin-slow" />
              </span>
              <Input
                id="email7"
                type="email"
                placeholder="admin@gmail.com"
                className="pl-10 h-12 bg-white/80 border-2 border-cyan-200 rounded-xl focus:border-pink-400 focus:ring-pink-100 text-pink-700 font-semibold"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password7" className="block text-sm font-bold text-pink-500 mb-1">Contraseña</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
                <Lock className="w-5 h-5 animate-wiggle" />
              </span>
              <Input
                id="password7"
                type={showPassword ? "text" : "password"}
                placeholder="Crea una contraseña"
                className="pl-10 pr-10 h-12 bg-white/80 border-2 border-cyan-200 rounded-xl focus:border-pink-400 focus:ring-pink-100 text-pink-700 font-semibold"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5 animate-fade-in" /> : <Eye className="w-5 h-5 animate-fade-in" />}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-xs text-center mt-2 animate-shake">{error}</div>}
          <Button
            type="submit"
            className="text-lg w-full h-12 rounded-xl bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400 hover:from-pink-500 hover:to-cyan-500 text-white font-extrabold shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in"
          >
            ¡Registrarme!
          </Button>
        </form>
        <div className="text-center mt-2">
          <button
            type="button"
            className="text-sm text-pink-500 hover:underline font-bold"
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
      </div>
      {/* Animaciones personalizadas Tailwind */}
      <style jsx global>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        .animate-wiggle {
          animation: wiggle 1s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2.5s linear infinite;
        }
      `}</style>
    </div>
  )
}
