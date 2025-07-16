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
    } catch (err) {
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
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-lg rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl"></div>

        {/* Content */}
        <div className="relative p-8 rounded-3xl border border-white/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400/30 to-pink-400/30 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/30">
              <span className="text-2xl">🔮</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Glass Register</h2>
            <p className="text-gray-600 text-sm">Diseño con efecto cristal</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name4" className="text-gray-700 font-medium">
                Nombre
              </Label>
              <Input
                id="name4"
                type="text"
                placeholder="Tu nombre completo"
                className="mt-2 bg-white/50 backdrop-blur-sm border border-white/30 focus:bg-white/70 rounded-2xl h-12"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email4" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email4"
                type="email"
                placeholder="admin@gmail.com"
                className="mt-2 bg-white/50 backdrop-blur-sm border border-white/30 focus:bg-white/70 rounded-2xl h-12"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password4" className="text-gray-700 font-medium">
                Contraseña
              </Label>
              <Input
                id="password4"
                type="password"
                placeholder="Crea una contraseña"
                className="mt-2 bg-white/50 backdrop-blur-sm border border-white/30 focus:bg-white/70 rounded-2xl h-12"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms4" required className="border-gray-400" />
              <Label htmlFor="terms4" className="text-sm text-gray-600">
                Acepto los términos y condiciones
              </Label>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-600/80 hover:to-pink-600/80 backdrop-blur-sm text-white font-medium h-12 rounded-2xl border border-white/20" type="submit">
              Registrarme
            </Button>
            {error && <div className="text-red-500 text-xs text-center mt-2">{error}</div>}
            <p className="text-center text-sm text-gray-600 pt-2">
              ¿Ya tienes cuenta?{" "}
              <a
                href="#"
                className="text-purple-600 hover:underline font-medium"
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
