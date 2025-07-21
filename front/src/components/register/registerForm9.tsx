"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
//import { Checkbox } from "../ui/checkbox"
import { useToast } from "../../hooks/use.toast"

export default function RegisterForm9() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptNewsletter: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular proceso de registro
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "¡Registro exitoso!",
        description: `¡Bienvenido, ${formData.firstName} ${formData.lastName}!`,
      })
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
        acceptNewsletter: false
      })
    }, 2000)
  }

  return (
    <div className="w-full max-w-md">
      {/* Tarjeta principal */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl shadow-2xl border border-white/20 p-3 lg:p-5 relative overflow-hidden">
        
        {/* Contenido del formulario */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="w-18 h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-base lg:text-3xl font-bold text-white mb-1 lg:mb-2">¡Únete a nosotros!</h1>
            <p className="text-base lg:text-lg text-gray-300">Crea tu cuenta y comienza tu aventura</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-5">
            {/* Nombres */}
            <div className="grid grid-cols-2 gap-3 lg:gap-5">
              <div className="space-y-1 lg:space-y-2">
                <Label htmlFor="firstName" className="text-base lg:text-lg text-white font-medium">
                  Nombre
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("firstName", e.target.value)}
                    placeholder="Tu nombre"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl h-11 lg:h-12 px-4 lg:px-5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 lg:pr-3 flex items-center">
                    <svg className="w-6 h-6 lg:w-7 lg:h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1 lg:space-y-2">
                <Label htmlFor="lastName" className="text-base lg:text-lg text-white font-medium">
                  Apellido
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("lastName", e.target.value)}
                    placeholder="Tu apellido"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl h-11 lg:h-12 px-4 lg:px-5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 lg:pr-3 flex items-center">
                    <svg className="w-6 h-6 lg:w-7 lg:h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Campo Email */}
            <div className="space-y-1 lg:space-y-2">
              <Label htmlFor="email" className="text-base lg:text-lg text-white font-medium">
                Correo electrónico
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
                  placeholder="tu@email.com"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl h-11 lg:h-12 px-4 lg:px-5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-2 lg:pr-3 flex items-center">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-1 lg:space-y-2">
              <Label htmlFor="password" className="text-base lg:text-lg text-white font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl h-11 lg:h-12 px-4 lg:px-5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-2 lg:pr-3 flex items-center">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Campo Confirmar Contraseña */}
            <div className="space-y-1 lg:space-y-2">
              <Label htmlFor="confirmPassword" className="text-base lg:text-lg text-white font-medium">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("confirmPassword", e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl h-11 lg:h-12 px-4 lg:px-5 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-2 lg:pr-3 flex items-center">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Opciones adicionales */}
            {/*<div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked: boolean | "indeterminate") => handleChange("acceptTerms", checked as boolean)}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label htmlFor="acceptTerms" className="text-white text-sm">
                  Acepto los{" "}
                  <button type="button" className="text-green-300 hover:text-green-200 underline">
                    términos y condiciones
                  </button>
                </Label>
              </div>        
            </div>*/}

            {/* Botón de envío */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2.5 lg:py-3.5 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creando cuenta...</span>
                </div>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>      

          {/* Enlace de login */}
          <div className="text-center mt-4 lg:mt-6">
            <p className="text-base lg:text-lg text-gray-300">
              ¿Ya tienes una cuenta?{" "}
              <button 
                type="button"
                className="text-green-300 hover:text-green-200 font-medium transition-colors duration-200"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('switchToLogin')
                    window.dispatchEvent(event)
                  }
                }}
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
