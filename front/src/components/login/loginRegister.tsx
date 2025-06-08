"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { Button } from "../ui/button" 
import { Input } from "../ui/input" 
import { Label } from "../ui/label" 
import { useToast } from "../../hooks/use.toast" 
import Link from "next/link"
import { cn } from "../lib/utils" 

interface LoginFormProps {
  onSuccess?: () => void
  className?: string
}

export default function LoginRegister({ onSuccess, className }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true)
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
  const { toast } = useToast()

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: "",
      email: "",
      password: "",
    }

    // Validar nombre solo si estamos en modo registro
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
      isValid = false
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
      isValid = false
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
      isValid = false
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = isLogin
  ? { email: formData.email, contraseña: formData.password }
  : { email: formData.email, contraseña: formData.password, nombre: formData.name };

    if (validateForm()) {
      try {
        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
        const response = await fetch(`http://localhost:3001${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      
        const data = await response.json();
      
        if (!response.ok) {
          throw new Error(data.message || "Ocurrió un error");
        }
      
        toast({
          title: isLogin ? "Inicio de sesión exitoso" : "Registro exitoso",
          description: isLogin
            ? "Bienvenido de nuevo a SB-Barbershop"
            : `Bienvenido a SB-Barbershop, ${formData.name}`,
        });
      
        // Guardar token en localStorage (opcional)
        localStorage.setItem("token", data.token);
      
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Ocurrió un error inesperado",
            variant: "destructive",
          });
        }
      }

      if (onSuccess) {
        onSuccess()
      }
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    // Limpiar errores al cambiar de modo
    setErrors({
      name: "",
      email: "",
      password: "",
    })
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-lg p-8 max-w-md w-full mx-auto mt-40",
        className,
      )}
    >
      {/* Efectos de fondo */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mb-4">
            <User className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>
          <p className="text-zinc-400 mt-2">
            {isLogin
              ? "Accede a tu cuenta para gestionar tus reservas"
              : "Regístrate para una experiencia personalizada"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
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
                    "pl-10 bg-zinc-900/50 border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20",
                    errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  )}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
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
                  "pl-10 bg-zinc-900/50 border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20",
                  errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              {isLogin && (
                <Link href="#" className="text-xs text-amber-500 hover:text-amber-400 transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-500" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={isLogin ? "Tu contraseña" : "Crea una contraseña"}
                value={formData.password}
                onChange={handleChange}
                className={cn(
                  "pl-10 pr-10 bg-zinc-900/50 border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20",
                  errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <Button
            type="submit"
            className="w-full relative overflow-hidden group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</span>
          </Button>
        </form>

        <div className="relative flex items-center justify-center mt-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700"></div>
          </div>
          <div className="relative px-4 bg-zinc-900/50 text-xs text-zinc-400">O</div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-400">
            {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-1 text-amber-500 hover:text-amber-400 transition-colors"
            >
              {isLogin ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
