"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "src/components/ui/checkbox"
import { useState } from "react"
import { useToast } from "../../hooks/use.toast"

export default function RegisterForm4() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
    <div className="w-full max-w-sm mx-auto">
      <div className="relative">
        {/* Nuevo fondo con gradiente más vibrante */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 backdrop-blur-lg rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl"></div>

        {/* Content */}
        <div className="relative p-3 lg:p-6 rounded-3xl border border-white/30 shadow-2xl">
          <div className="text-center mb-6 lg:mb-8">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-400/40 to-purple-400/40 backdrop-blur-sm rounded-2xl mx-auto mb-2 lg:mb-3 flex items-center justify-center border border-white/40">
              <span className="text-2xl">🔮</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">Registrarse</h2>
          </div>

          <form className="space-y-3 lg:space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name4" className="text-base lg:text-lg text-white font-semibold">
                Nombre
              </Label>
              <Input
                id="name4"
                type="text"
                placeholder="Tu nombre completo"
                className="mt-2 bg-white/80 backdrop-blur-sm border border-white/50 focus:bg-white focus:border-white rounded-2xl h-11 lg:h-12 text-gray-800 font-medium text-base lg:text-lg px-4 lg:px-5"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email4" className="text-base lg:text-lg text-white font-semibold">
                Email
              </Label>
              <Input
                id="email4"
                type="email"
                placeholder="admin@gmail.com"
                className="mt-2 bg-white/80 backdrop-blur-sm border border-white/50 focus:bg-white focus:border-white rounded-2xl h-11 lg:h-12 text-gray-800 font-medium text-base lg:text-lg px-4 lg:px-5"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password4" className="text-base lg:text-lg text-white font-semibold">
                Contraseña
              </Label>
              <Input
                id="password4"
                type="password"
                placeholder="Crea una contraseña"
                className="mt-2 bg-white/80 backdrop-blur-sm border border-white/50 focus:bg-white focus:border-white rounded-2xl h-11 lg:h-12 text-gray-800 font-medium text-base lg:text-lg px-4 lg:px-5"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <Checkbox id="terms4" required className="border-white/60 bg-white/20 w-5 h-5 lg:w-6 lg:h-6" />
              <Label htmlFor="terms4" className="text-base lg:text-lg text-white/90 font-medium">
                Acepto los términos y condiciones
              </Label>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 backdrop-blur-sm text-white font-bold h-11 lg:h-12 rounded-2xl border border-white/30 shadow-lg text-base lg:text-lg" type="submit">
              Registrarme
            </Button>
            {error && <div className="text-red-300 text-xs text-center mt-2 font-medium">{error}</div>}
            <p className="text-center text-base lg:text-lg text-white/90 pt-2">
              ¿Ya tienes cuenta?{" "}
              <a
                href="#"
                className="text-white font-bold hover:underline transition-colors"
                onClick={e => {
                  e.preventDefault()
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('switchToLogin')
                    window.dispatchEvent(event)
                  }
                }}
              >
                Inicia sesión
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
