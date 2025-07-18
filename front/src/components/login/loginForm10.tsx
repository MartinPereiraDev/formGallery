"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "../../hooks/use.toast"

const gifs = {
  aburrido: "/gatito-aburrido.gif",
  apurado: "/gatito-apurado.gif",
  copiando: "/gatito-copiando.gif"
}

export default function LoginForm10() {
  const [userData, setUserData] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState({ username: "", password: "" })
  const [touched, setTouched] = useState({ username: false, password: false })
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  let estado: keyof typeof gifs = "aburrido"
  if (userData.username) estado = "apurado"
  if (userData.password) estado = "copiando"

  const validate = (data: typeof userData) => {
    const errs: typeof errors = { username: "", password: "" }
    if (!data.username) errs.username = "El usuario es requerido"
    if (!data.password) errs.password = "La contraseña es requerida"
    return errs
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newData = { ...userData, [name]: value }
    setUserData(newData)
    setErrors(validate(newData))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched({ ...touched, [name]: true })
    setErrors(validate(userData))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ username: true, password: true })
    const errs = validate(userData)
    setErrors(errs)
    if (!errs.username && !errs.password) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "¡Bienvenido!",
        variant: "default"
      })
      setUserData({ username: "", password: "" })
      setTouched({ username: false, password: false })
      setErrors({ username: "", password: "" })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-7 border-4 border-gray-200 flex flex-col items-center relative font-mono">
      <div className={`w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-blue-200 bg-gray-100 flex items-center justify-center`} style={{boxShadow: 'inset 0 4px 16px 0 #bcd0e6, 0 4px 24px 0 #bcd0e6'}}>
        <Image src={gifs[estado]} alt="Gatito animado" width={112} height={112} className="object-cover" />
      </div>
      <h2 className="text-3xl font-bold text-blue-600 mb-4 tracking-wide text-center font-mono" style={{letterSpacing: 1}}>
        Iniciar sesión
      </h2>
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username10" className="block text-base font-bold text-blue-700 mb-1 font-mono">Usuario</label>
          <Input
            id="username10"
            name="username"
            type="text"
            placeholder="Tu usuario"
            className="h-12 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-100 text-blue-700 font-mono text-lg px-4 shadow-sm"
            value={userData.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="username"
          />
          {touched.username && errors.username && <p className="text-blue-500 text-xs mt-1 font-mono">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password10" className="block text-base font-bold text-blue-700 mb-1 font-mono">Contraseña</label>
          <div className="relative">
            <Input
              id="password10"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Tu contraseña"
              className="h-12 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-100 pr-12 text-blue-700 font-mono text-lg px-4 shadow-sm"
              value={userData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {touched.password && errors.password && <p className="text-blue-500 text-xs mt-1 font-mono">{errors.password}</p>}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" id="remember10" className="w-5 h-5 accent-blue-400 border-2 border-blue-200 rounded" />
          <label htmlFor="remember10" className="text-base font-mono text-blue-700 font-bold select-none">Recuérdame siempre</label>
        </div>
        <Button
          type="submit"
          className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold shadow-md mt-2 text-lg font-mono tracking-wide border-2 border-blue-300"
        >
          Entrar
        </Button>
        <div className="text-center mt-4">
          <span className="text-base text-blue-600 font-mono">¿No tienes cuenta?{' '}
            <button
              type="button"
              className="text-blue-800 font-bold hover:underline"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const event = new CustomEvent('switchToRegister')
                  window.dispatchEvent(event)
                }
              }}
            >
              Regístrate
            </button>
          </span>
        </div>
      </form>
    </div>
  )
}
