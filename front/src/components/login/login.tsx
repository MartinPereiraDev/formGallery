"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Image from "next/image"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const fakeLogin = ({ email, contraseña }: { email: string; contraseña: string }) => {
    return new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        // Simulación: solo si email === admin y contraseña === admin123
        if (email === "admin" && contraseña === "admin123") {
          resolve({ token: "falso-token-simulado" })
        } else {
          reject(new Error("Credenciales inválidas"))
        }
      }, 1500)
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
      router.push("/admin")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Credenciales inválidas")
      } else {
        setError("Ocurrió un error inesperado")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden relative backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 relative min-h-[450px]">

          {/* Left - Login Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-white mb-1">¡Hola! 👋</h2>
            <p className="text-lg text-gray-300 mb-8">
              Bienvenido al sistema de gestión. Por favor iniciá sesión para comenzar.
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="username"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="admin"
              />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="**********"
              />
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-full"
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Iniciar sesión"}
              </Button>
            </form>
          </div>

          {/* Right - Image */}
          <div className="hidden md:block relative h-full w-full overflow-hidden object-cover transform -skew-x-12 translate-x-12">
            <Image
              src="/login.jpg"
              alt="Ilustración de bienvenida"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
