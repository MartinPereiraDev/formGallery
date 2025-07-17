"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import Image from "next/image"
import { useToast } from "../../hooks/use.toast"

export default function RegisterForm1() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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
      setError("Por favor complete todos los campos")
      return
    }
    setIsLoading(true)
    try {
      await fakeRegister({ name, email, contraseña: password })
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada correctamente"
      })
      setName("")
      setEmail("")
      setPassword("")
    } catch {
      setError("Verifica los datos ingresados")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl rounded-lg shadow-xl overflow-hidden relative backdrop-blur-lg">
      <div className="grid grid-cols-2 relative min-h-[450px] border border-gray-700 rounded-lg overflow-hidden">
        <div className="p-8 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-200 mb-1">¡Crea tu cuenta!</h2>
          <p className="text-lg text-gray-300 mb-8 hidden md:block">
            Regístrate para acceder al sistema de gestión y comenzar a disfrutar de todas las funcionalidades.
          </p>
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Label htmlFor="name" className="text-sm text-gray-300 font-medium">Nombre</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-100 border-gray-300 text-gray-900"
              placeholder="Tu nombre completo"
            />
            <Label htmlFor="email" className="text-sm text-gray-300 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border-gray-300 text-gray-900"
              placeholder="admin@gmail.com"
            />
            <Label htmlFor="password" className="text-sm text-gray-300 font-medium">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border-gray-300 text-gray-900 pr-10"
              placeholder="Crea una contraseña"
            />
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-full"
              disabled={isLoading}
            >
              {isLoading ? "REGISTRANDO..." : "REGISTRARME"}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <button
              type="button"
              className="text-sm text-purple-400 hover:text-purple-300 font-medium"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const event = new CustomEvent('switchToLogin')
                  window.dispatchEvent(event)
                }
              }}
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </button>
          </div>
        </div>
        {/* Imagen de fondo */}
        <div className="h-full w-full overflow-hidden object-cover transform -skew-x-12 translate-x-15 rounded-lg">
          <Image
            src="/login.jpg"
            alt="Ilustración de registro"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  )
} 