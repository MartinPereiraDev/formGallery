import { Button } from "../ui/button"
import { Input } from "../ui/input" 
import { Label } from "../ui/label"
import { Checkbox } from "@radix-ui/react-checkbox" 
import { useState } from "react"
import { useToast } from "../../hooks/use.toast"

export function LoginForm3() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
      setError("Por favor ingresa email y contraseña")
      return
    }
    try {
      await fakeLogin({ email, contraseña: password })
      toast({
        title: "Inicio de sesión exitoso",
        description: "¡Bienvenido!",
      })
      setEmail("")
      setPassword("")
    } catch (err) {
      toast({
        title: "Credenciales inválidas",
        description: "Verifica tu usuario y contraseña",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
          <p className="text-gray-600 text-sm">Inicia sesión en tu cuenta</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email1" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email1"
              type="email"
              placeholder="admin@gmail.com"
              className="mt-1 bg-white/80 border-0 focus:bg-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password1" className="text-gray-700">
              Contraseña
            </Label>
            <Input
              id="password1"
              type="password"
              placeholder="admin123"
              className="mt-1 bg-white/80 border-0 focus:bg-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember1" />
              <Label htmlFor="remember1" className="text-sm text-gray-600">
                Recordarme
              </Label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" type="submit">
            Iniciar Sesión
          </Button>

          {error && <div className="text-red-500 text-xs text-center mt-2">{error}</div>}

          <p className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
