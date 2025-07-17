import { Button } from "../ui/button" 
import { Input } from "../ui/input" 
import { Label } from "../ui/label" 
import { Checkbox } from "src/components/ui/checkbox"
import { useState } from "react"
import { useToast } from "../../hooks/use.toast"

export function LoginForm4() {
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
    } catch {
      toast({
        title: "Credenciales inválidas",
        description: "Verifica tu usuario y contraseña",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative">
        {/* Nuevo fondo con gradiente más vibrante */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 backdrop-blur-lg rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl"></div>

        {/* Content */}
        <div className="relative p-8 rounded-3xl border border-white/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400/40 to-purple-400/40 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/40">
              <span className="text-2xl">🔮</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Iniciar Sesión</h2>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email6" className="text-white font-semibold text-lg">
                Email
              </Label>
              <Input
                id="email6"
                type="email"
                placeholder="admin@gmail.com"
                className="mt-2 bg-white/80 backdrop-blur-sm border border-white/50 focus:bg-white focus:border-white rounded-2xl h-12 text-gray-800 font-medium"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password6" className="text-white font-semibold text-lg">
                Contraseña
              </Label>
              <Input
                id="password6"
                type="password"
                placeholder="admin123"
                className="mt-2 bg-white/80 backdrop-blur-sm border border-white/50 focus:bg-white focus:border-white rounded-2xl h-12 text-gray-800 font-medium"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember6" className="border-white/60 bg-white/20" />
                <Label htmlFor="remember6" className="text-sm text-white/90 font-medium">
                  Recordarme
                </Label>
              </div>
              <a href="#" className="text-sm text-white/90 hover:text-white font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 backdrop-blur-sm text-white font-bold h-12 rounded-2xl border border-white/30 shadow-lg" type="submit">
              Iniciar Sesión
            </Button>

            {error && <div className="text-red-300 text-xs text-center mt-2 font-medium">{error}</div>}

            <p className="text-center text-sm text-white/90 pt-2">
              ¿No tienes una cuenta?{" "}
              <button
                type="button"
                className="text-white font-bold hover:underline transition-colors"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('switchToRegister')
                    window.dispatchEvent(event)
                  }
                }}
              >
                Regístrate
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
