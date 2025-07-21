"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useToast } from "../../hooks/use.toast"
import { cn } from "../lib/utils"

export default function RegisterForm2({ className }: { className?: string }) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const validateForm = () => {
    let isValid = true
    const newErrors = { name: "", email: "", password: "" }
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
      isValid = false
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
      isValid = false
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

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
    if (validateForm()) {
      setIsLoading(true)
      try {
        await fakeRegister({ name: formData.name, email: formData.email, contraseña: formData.password })
        toast({
          title: "Registro exitoso",
          description: `¡Bienvenido, ${formData.name}!`,
        })
        setFormData({ name: "", email: "", password: "" })
      } catch {
        toast({
          title: "Datos inválidos",
          description: "Verifica los datos ingresados",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto flex items-center justify-center bg-white rounded-xl py-6 px-4",
        className,
      )}
      style={{ marginTop: 0 }}
    >
      <div className="relative z-10 flex flex-col justify-center h-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mb-4">
            <User className="h-7 w-7 text-black" />
          </div>
          <h2 className="text-2xl text-amber-500 font-bold tracking-tight">Crear Cuenta</h2>
          <p className="text-zinc-400 mt-2">
            Regístrate para una experiencia personalizada
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-zinc-500 font-medium">
              Nombre
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-zinc-500" />
              </div>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={handleChange}
                className={cn(
                  "pl-10 bg-zinc-100 border-zinc-300 focus:border-amber-500 focus:ring-amber-500/20",
                  errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-zinc-500">
              Email
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-500" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  "pl-10 bg-zinc-100 border-zinc-300 focus:border-amber-500 focus:ring-amber-500/20",
                  errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-zinc-500">
              Contraseña
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-500" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Crea una contraseña"
                value={formData.password}
                onChange={handleChange}
                className={cn(
                  "pl-10 pr-10 bg-zinc-100 border-zinc-300 focus:border-amber-500 focus:ring-amber-500/20",
                  errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrarme"}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-sm text-amber-600 hover:text-amber-500 font-medium"
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
    </div>
  )
}
