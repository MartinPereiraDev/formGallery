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

export default function LoginForm11() {
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
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border-4 border-black flex flex-col items-center relative font-mono">
      <div className={`w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-black bg-gray-100 flex items-center justify-center`} style={{boxShadow: 'inset 0 4px 16px 0 #bbb, 0 4px 24px 0 #bbb'}}>
        <Image src={gifs[estado]} alt="Gatito animado" width={112} height={112} className="object-cover" />
      </div>
      <h2 className="text-3xl font-bold text-black mb-4 tracking-wide text-center font-mono" style={{letterSpacing: 1}}>
        Iniciar sesión
      </h2>
      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username11" className="block text-base font-bold text-black mb-1 font-mono">Usuario</label>
          <Input
            id="username11"
            name="username"
            type="text"
            placeholder="Tu usuario"
            className="h-12 bg-white border-2 border-black rounded-xl focus:border-black focus:ring-black text-black font-mono text-lg px-4 shadow-sm"
            value={userData.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="username"
          />
          {touched.username && errors.username && <p className="text-black text-xs mt-1 font-mono">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password11" className="block text-base font-bold text-black mb-1 font-mono">Contraseña</label>
          <div className="relative">
            <Input
              id="password11"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Tu contraseña"
              className="h-12 bg-white border-2 border-black rounded-xl focus:border-black focus:ring-black pr-12 text-black font-mono text-lg px-4 shadow-sm"
              value={userData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-700"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {touched.password && errors.password && <p className="text-black text-xs mt-1 font-mono">{errors.password}</p>}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" id="remember11" className="w-5 h-5 accent-black border-2 border-black rounded" />
          <label htmlFor="remember11" className="text-base font-mono text-black font-bold select-none">Recuérdame siempre</label>
        </div>
        <Button
          type="submit"
          className="w-full h-12 rounded-xl bg-black hover:bg-gray-800 text-white font-bold shadow-md mt-2 text-lg font-mono tracking-wide border-2 border-black"
        >
          Entrar
        </Button>
        <div className="text-center mt-4">
          <span className="text-base text-black font-mono">¿No tienes cuenta?{' '}
            <button
              type="button"
              className="text-black font-bold hover:underline"
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
