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

export default function RegisterForm1() {
  const [userData, setUserData] = useState({ username: "", password: "", confirm: "" })
  const [errors, setErrors] = useState({ username: "", password: "", confirm: "" })
  const [touched, setTouched] = useState({ username: false, password: false, confirm: false })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { toast } = useToast()

  let estado: keyof typeof gifs = "aburrido"
  if (userData.username) estado = "apurado"
  if (userData.password || userData.confirm) estado = "copiando"

  const validate = (data: typeof userData) => {
    const errs: typeof errors = { username: "", password: "", confirm: "" }
    if (!data.username) errs.username = "El usuario es requerido"
    if (!data.password) errs.password = "La contraseña es requerida"
    if (!data.confirm) errs.confirm = "Confirma tu contraseña"
    if (data.password && data.confirm && data.password !== data.confirm) errs.confirm = "Las contraseñas no coinciden"
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
    setTouched({ username: true, password: true, confirm: true })
    const errs = validate(userData)
    setErrors(errs)
    if (!errs.username && !errs.password && !errs.confirm) {
      toast({
        title: "¡Registro exitoso!",
        description: `¡Bienvenido, ${userData.username}!`,
      })
      setUserData({ username: "", password: "", confirm: "" })
      setTouched({ username: false, password: false, confirm: false })
      setErrors({ username: "", password: "", confirm: "" })
    }
  }

  return (
    <div
      className="w-full max-w-md mx-auto bg-gray-50 rounded-3xl p-3 lg:p-4 flex flex-col items-center relative font-mono shadow-[inset_6px_6px_12px_rgba(0,0,0,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.9)]"
    >
      <div className="w-24 h-24 lg:w-32 lg:h-32 mb-3 lg:mb-4 rounded-full overflow-hidden border-2 border-black bg-gray-100 flex items-center justify-center" style={{boxShadow: 'inset 0 4px 16px 0 #bbb, 0 4px 24px 0 #bbb'}}>
        <Image src={gifs[estado]} alt="Gatito animado" width={96} height={96} className="object-cover lg:w-[112px] lg:h-[112px]" />
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-black mb-3 lg:mb-4 tracking-wide text-center font-mono" style={{letterSpacing: 1}}>
        Crear cuenta
      </h2>
      <form className="w-full space-y-3 lg:space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username11r" className="block text-sm lg:text-base font-bold text-black mb-1 font-mono">Usuario</label>
          <Input
            id="username11r"
            name="username"
            type="text"
            placeholder="Elige un usuario"
            className="h-10 lg:h-12 bg-gray-50 rounded-xl text-black font-mono text-base lg:text-lg px-3 lg:px-4 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] focus:outline-none transition-all duration-200"
            value={userData.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="username"
          />
          {touched.username && errors.username && <p className="text-sm lg:text-base text-black mt-1 font-mono">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password11r" className="block text-sm lg:text-base font-bold text-black mb-1 font-mono">Contraseña</label>
          <div className="relative">
            <Input
              id="password11r"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Crea una contraseña"
              className="h-10 lg:h-12 bg-gray-50 rounded-xl pr-10 lg:pr-12 text-black font-mono text-base lg:text-lg px-3 lg:px-4 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] focus:outline-none transition-all duration-200"
              value={userData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-700"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5 lg:w-6 lg:h-6" /> : <Eye className="w-5 h-5 lg:w-6 lg:h-6" />}
            </button>
          </div>
          {touched.password && errors.password && <p className="text-sm lg:text-base text-black mt-1 font-mono">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirm11r" className="block text-sm lg:text-base font-bold text-black mb-1 font-mono">Confirmar contraseña</label>
          <div className="relative">
            <Input
              id="confirm11r"
              name="confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Repite tu contraseña"
              className="h-10 lg:h-12 bg-gray-50 rounded-xl pr-10 lg:pr-12 text-black font-mono text-base lg:text-lg px-3 lg:px-4 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] focus:outline-none transition-all duration-200"
              value={userData.confirm}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-700"
              onClick={() => setShowConfirm(v => !v)}
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="w-5 h-5 lg:w-6 lg:h-6" /> : <Eye className="w-5 h-5 lg:w-6 lg:h-6" />}
            </button>
          </div>
          {touched.confirm && errors.confirm && <p className="text-sm lg:text-base text-black mt-1 font-mono">{errors.confirm}</p>}
        </div>
        <div className="flex items-center gap-2 lg:gap-3 mt-2 lg:mt-3">
          <input type="checkbox" id="terms11" className="w-5 h-5 lg:w-6 lg:h-6 accent-black border-2 border-black rounded" />
          <label htmlFor="terms11" className="text-sm lg:text-base font-mono text-black font-bold select-none">Acepto los términos</label>
        </div>
        <Button
          type="submit"
          className="w-full h-10 lg:h-12 rounded-xl bg-gray-100 text-black font-bold mt-2 lg:mt-3 text-base lg:text-lg font-mono tracking-wide shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] hover:bg-gray-200 hover:shadow-lg active:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.7)] transition-all duration-500 ease-in-out"
        >
          Crear cuenta
        </Button>
        <div className="text-center mt-3 lg:mt-4">
          <span className="text-sm lg:text-base text-black font-mono">¿Ya tienes cuenta?{' '}
            <button
              type="button"
              className="text-black font-bold hover:underline"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const event = new CustomEvent('switchToLogin')
                  window.dispatchEvent(event)
                }
              }}
            >
              Inicia sesión
            </button>
          </span>
        </div>
      </form>
    </div>
  )
} 