"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"

const gifs = {
  aburrido: "/gatito-aburrido.gif",
  apurado: "/gatito-apurado.gif",
  copiando: "/gatito-copiando.gif"
}

export default function RegisterForm10() {
  const [userData, setUserData] = useState({ username: "", password: "", confirm: "" })
  const [errors, setErrors] = useState({ username: "", password: "", confirm: "" })
  const [touched, setTouched] = useState({ username: false, password: false, confirm: false })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

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
      alert("¡Registro exitoso!")
      setUserData({ username: "", password: "", confirm: "" })
      setTouched({ username: false, password: false, confirm: false })
      setErrors({ username: "", password: "", confirm: "" })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border-4 border-gray-200 flex flex-col items-center relative font-mono">
      <div className={`w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-blue-200 bg-gray-100 flex items-center justify-center shadow-[0_4px_24px_0_rgba(0,0,0,0.10)] shadow-inner`} style={{boxShadow: 'inset 0 4px 16px 0 #bcd0e6, 0 4px 24px 0 #bcd0e6'}}>
        <Image src={gifs[estado]} alt="Gatito animado" width={112} height={112} className="object-cover" />
      </div>
      <h2 className="text-3xl font-bold text-blue-600 mb-4 tracking-wide text-center font-mono" style={{letterSpacing: 1}}>
        Crear cuenta
      </h2>
      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username10r" className="block text-base font-bold text-blue-700 mb-1 font-mono">Usuario</label>
          <Input
            id="username10r"
            name="username"
            type="text"
            placeholder="Elige un usuario"
            className="h-12 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-100 text-blue-700 font-mono text-lg px-4 shadow-sm"
            value={userData.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="username"
          />
          {touched.username && errors.username && <p className="text-blue-500 text-xs mt-1 font-mono">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password10r" className="block text-base font-bold text-blue-700 mb-1 font-mono">Contraseña</label>
          <div className="relative">
            <Input
              id="password10r"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Crea una contraseña"
              className="h-12 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-100 pr-12 text-blue-700 font-mono text-lg px-4 shadow-sm"
              value={userData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="new-password"
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
        <div>
          <label htmlFor="confirm10r" className="block text-base font-bold text-blue-700 mb-1 font-mono">Confirmar contraseña</label>
          <div className="relative">
            <Input
              id="confirm10r"
              name="confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Repite tu contraseña"
              className="h-12 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-100 pr-12 text-blue-700 font-mono text-lg px-4 shadow-sm"
              value={userData.confirm}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
              onClick={() => setShowConfirm(v => !v)}
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {touched.confirm && errors.confirm && <p className="text-blue-500 text-xs mt-1 font-mono">{errors.confirm}</p>}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" id="terms10" className="w-5 h-5 accent-blue-400 border-2 border-blue-200 rounded" />
          <label htmlFor="terms10" className="text-base font-mono text-blue-700 font-bold select-none">Acepto los términos</label>
        </div>
        <Button
          type="submit"
          className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold shadow-md mt-2 text-lg font-mono tracking-wide border-2 border-blue-300"
        >
          Crear cuenta
        </Button>
        <div className="text-center mt-4">
          <span className="text-base text-blue-600 font-mono">¿Ya tienes cuenta?{' '}
            <button
              type="button"
              className="text-blue-800 font-bold hover:underline"
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