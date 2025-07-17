"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Image from "next/image"
import { useToast } from "../../hooks/use.toast"
import { Label } from "../ui/label"

export default function LoginForm1() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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
      setError("Por favor ingrese usuario y contraseña")
      return
    }

    setIsLoading(true)

    try {
      const response = await fakeLogin({ email, contraseña: password })
      localStorage.setItem("token", response.token)
      toast({
        title: "Inicio de sesión exitoso",
        description: "¡Bienvenido!",
        variant: "default"
      })
      setEmail("")
      setPassword("")
    } catch (err) {
      if (err instanceof Error) {
        // Mostrar error de credenciales como toast destructivo
        toast({
          title: "Credenciales inválidas",
          description: "Verifica tu usuario y contraseña",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Ocurrió un error inesperado",
          variant: "destructive"
        })
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
      <div className="w-full max-w-3xl rounded-lg shadow-xl overflow-hidden relative backdrop-blur-lg">
        <div className="grid grid-cols-2 relative min-h-[450px] border border-gray-700 rounded-lg overflow-hidden">
          <div className="p-8 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-200 mb-8 md:mb-1">¡Hola! ��</h2>
            <p className="text-lg text-gray-300 mb-8 hidden md:block">
              Bienvenido al sistema de gestión. Por favor iniciá sesión para comenzar.
            </p>

            {/* Error de campos vacíos */}
            {error && (
              <div className="text-red-500 text-sm mb-2">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Label htmlFor="username" className="text-sm text-gray-300 font-medium">Email</Label>
              <Input
                id="username"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 border-gray-300 text-gray-900"
                placeholder="admin@gmail.com"
              />
              <Label htmlFor="password" className="text-sm text-gray-300 font-medium">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 border-gray-300 text-gray-900 pr-10"
                  placeholder="**********"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                </button>
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-full"
                disabled={isLoading}
              >
                {isLoading ? "LOGGING IN..." : "LOGIN"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sm text-purple-400 hover:text-purple-300 font-medium"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('switchToRegister')
                    window.dispatchEvent(event)
                  }
                }}
              >
                ¿No tienes una cuenta? Regístrate
              </button>
            </div>
          </div>

          {/* Imagen de fondo */}
          <div className="h-full w-full overflow-hidden object-cover transform -skew-x-12 translate-x-15 rounded-lg">
            <Image
              src="/login.jpg"
              alt="Ilustración de bienvenida"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
  )
}
