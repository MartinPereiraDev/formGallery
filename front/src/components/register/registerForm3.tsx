"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "@radix-ui/react-checkbox"
import { useState } from "react"
import { useToast } from "../../hooks/use.toast"

export default function RegisterForm3() {
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
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Crear Cuenta</h2>
          <p className="text-gray-600 text-sm">Regístrate para comenzar</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name3" className="text-gray-700">
              Nombre
            </Label>
            <Input
              id="name3"
              type="text"
              placeholder="Tu nombre completo"
              className="mt-1 bg-white/80 border-0 focus:bg-white"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email3" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email3"
              type="email"
              placeholder="admin@gmail.com"
              className="mt-1 bg-white/80 border-0 focus:bg-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password3" className="text-gray-700">
              Contraseña
            </Label>
            <Input
              id="password3"
              type="password"
              placeholder="Crea una contraseña"
              className="mt-1 bg-white/80 border-0 focus:bg-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms3" required />
            <Label htmlFor="terms3" className="text-sm text-gray-600">
              Acepto los términos y condiciones
            </Label>
          </div>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" type="submit">
            Registrarme
          </Button>
          {error && <div className="text-red-500 text-xs text-center mt-2">{error}</div>}
          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a
              href="#"
              className="text-blue-600 hover:underline"
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
