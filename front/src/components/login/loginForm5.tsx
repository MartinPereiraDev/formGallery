import { Button } from "../ui/button"
import { Input } from "../ui/input" 
import { Label } from "../ui/label" 
import { Separator } from "src/components/ui/separator"
import { Chrome, Github } from "lucide-react"
import { useState } from "react"
import { useToast } from "../../hooks/use.toast"

export default function LoginForm5() {
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
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-lg">✨</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            ¡Hola de nuevo!
          </h2>
          <p className="text-gray-600 text-sm">Nos alegra verte por aquí</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email5" className="text-gray-700 font-medium">
              Tu Email
            </Label>
            <Input
              id="email5"
              type="email"
              placeholder="admin@gmail.com"
              className="mt-1 border-2 border-gray-200 focus:border-cyan-400 rounded-xl h-12"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password5" className="text-gray-700 font-medium">
              Contraseña
            </Label>
            <Input
              id="password5"
              type="password"
              placeholder="admin123"
              className="mt-1 border-2 border-gray-200 focus:border-cyan-400 rounded-xl h-12"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium h-12 rounded-xl" type="submit">
            Continuar
          </Button>

          {error && <div className="text-red-500 text-xs text-center mt-2">{error}</div>}

          <div className="relative">
            <Separator className="my-4" />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
              O continúa con
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 rounded-xl border-2 hover:bg-gray-50 bg-transparent">
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-2 hover:bg-gray-50 bg-transparent">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600 pt-2">
            ¿Primera vez aquí?{" "}
            <button
              type="button"
              className="text-cyan-600 hover:underline font-medium"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const event = new CustomEvent('switchToRegister')
                  window.dispatchEvent(event)
                }
              }}
            >
              Crear cuenta
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
