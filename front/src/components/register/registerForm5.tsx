"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "src/components/ui/separator"
import { Chrome, Github } from "lucide-react"
import { useState } from "react"
import { useToast } from "../../hooks/use.toast"

export default function RegisterForm5() {
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
      <div className="bg-white p-3 lg:p-6 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl mx-auto mb-3 lg:mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-lg">✨</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            ¡Bienvenido!
          </h2>
          <p className="text-base lg:text-lg text-gray-600">Crea tu cuenta para comenzar</p>
        </div>

        <form className="space-y-3 lg:space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name5" className="text-base lg:text-lg text-gray-700 font-medium">
              Tu Nombre
            </Label>
            <Input
              id="name5"
              type="text"
              placeholder="Tu nombre completo"
              className="mt-1 border-2 border-gray-200 focus:border-cyan-400 rounded-xl h-11 lg:h-12 text-base lg:text-lg px-4 lg:px-5"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email5" className="text-base lg:text-lg text-gray-700 font-medium">
              Tu Email
            </Label>
            <Input
              id="email5"
              type="email"
              placeholder="admin@gmail.com"
              className="mt-1 border-2 border-gray-200 focus:border-cyan-400 rounded-xl h-11 lg:h-12 text-base lg:text-lg px-4 lg:px-5"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password5" className="text-base lg:text-lg text-gray-700 font-medium">
              Contraseña
            </Label>
            <Input
              id="password5"
              type="password"
              placeholder="Crea una contraseña"
              className="mt-1 border-2 border-gray-200 focus:border-cyan-400 rounded-xl h-11 lg:h-12 text-base lg:text-lg px-4 lg:px-5"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium h-11 lg:h-12 rounded-xl text-base lg:text-lg" type="submit">
            Registrarme
          </Button>
          {error && <div className="text-red-500 text-xs text-center mt-2">{error}</div>}
          <div className="relative">
            <Separator className="my-4" />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
              O regístrate con
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 lg:h-12 rounded-xl border-2 hover:bg-gray-50 bg-transparent text-base lg:text-lg">
              <Chrome className="w-5 h-5 mr-2 lg:w-6 lg:h-6" />
              Google
            </Button>
            <Button variant="outline" className="h-11 lg:h-12 rounded-xl border-2 hover:bg-gray-50 bg-transparent text-base lg:text-lg">
              <Github className="w-5 h-5 mr-2 lg:w-6 lg:h-6" />
              GitHub
            </Button>
          </div>
          <p className="text-center text-base lg:text-lg text-gray-600 pt-2">
            ¿Ya tienes cuenta?{" "}
            <a
              href="#"
              className="text-cyan-600 hover:underline font-medium"
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
  )
}
