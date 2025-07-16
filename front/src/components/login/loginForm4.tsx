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
      <div className="relative">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-lg rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl"></div>

        {/* Content */}
        <div className="relative p-8 rounded-3xl border border-white/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400/30 to-pink-400/30 backdrop-blur-sm rounded-2xl mx-auto mb-4 flex items-center justify-center border border-white/30">
              <span className="text-2xl">🔮</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Glass Login</h2>
            <p className="text-gray-600 text-sm">Diseño con efecto cristal</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email6" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email6"
                type="email"
                placeholder="admin@gmail.com"
                className="mt-2 bg-white/50 backdrop-blur-sm border border-white/30 focus:bg-white/70 rounded-2xl h-12"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password6" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                id="password6"
                type="password"
                placeholder="admin123"
                className="mt-2 bg-white/50 backdrop-blur-sm border border-white/30 focus:bg-white/70 rounded-2xl h-12"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember6" className="border-gray-400" />
                <Label htmlFor="remember6" className="text-sm text-gray-600">
                  Recordarme
                </Label>
              </div>
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Olvidaste tu contraseña?
              </a>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-600/80 hover:to-pink-600/80 backdrop-blur-sm text-white font-medium h-12 rounded-2xl border border-white/20" type="submit">
              Sign In
            </Button>

            {error && <div className="text-red-500 text-xs text-center mt-2">{error}</div>}

            <p className="text-center text-sm text-gray-600 pt-2">
              No tienes una cuenta?{" "}
              <a href="#" className="text-purple-600 hover:underline font-medium">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
