"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Eye, X, Copy, Check } from "lucide-react"
import { Button } from "./ui/button"
import { useToast } from "../hooks/use.toast"

// Importar todos los formularios
import LoginForm1 from "./login/loginForm1"
import LoginForm2 from "./login/loginForm2"
import LoginForm3 from "./login/loginForm3"
import LoginForm4 from "./login/loginForm4"
import LoginForm5 from "./login/loginForm5"
import LoginForm6 from "./login/loginForm6"
import LoginForm7 from "./login/loginForm7"
import LoginForm8 from "./login/loginForm8"
import LoginForm9 from "./login/loginForm9"
import LoginForm10 from "./login/loginForm10"
import LoginForm11 from "./login/loginForm11"
import LoginForm12 from "./login/loginForm12"
import RegisterForm1 from "./register/registerForm1"
import RegisterForm2 from "./register/registerForm2"
import RegisterForm3 from "./register/registerForm3"
import RegisterForm4 from "./register/registerForm4"
import RegisterForm5 from "./register/registerForm5"
import RegisterForm6 from "./register/registerForm6"
import RegisterForm7 from "./register/registerForm7"
import RegisterForm8 from "./register/registerForm8"
import RegisterForm9 from "./register/registerForm9"
import RegisterForm10 from "./register/registerForm10"
import RegisterForm11 from "./register/registerForm11"
import RegisterForm12 from "./register/registerForm12"

type TabType = "login" | "register"

interface FormConfig {
    component: React.ReactElement
    title: string
    description: string
    category: string
    fileName: string
    code?: string
}

// Configuración de formularios con metadatos
const FORM_CONFIGS: Record<TabType, FormConfig[]> = {
    login: [
        {
            component: <LoginForm1 key="login1" />,
            title: "Login Minimalista",
            description: "Diseño limpio con animaciones de gatito",
            category: "Minimalista",
            fileName: "loginForm1.tsx"
        },
        {
            component: <LoginForm2 key="login2" />,
            title: "Login Glassmorphism",
            description: "Efecto de cristal con gradientes",
            category: "Glassmorphism",
            fileName: "loginForm2.tsx"
        },
        {
            component: <LoginForm3 key="login3" />,
            title: "Login Neumorphism",
            description: "Diseño suave con sombras",
            category: "Neumorphism",
            fileName: "loginForm3.tsx"
        },
        {
            component: <LoginForm4 key="login4" />,
            title: "Login Moderno",
            description: "Interfaz moderna con iconos",
            category: "Moderno",
            fileName: "loginForm4.tsx"
        },
        {
            component: <LoginForm5 key="login5" />,
            title: "Login Elegante",
            description: "Diseño elegante con tipografía",
            category: "Elegante",
            fileName: "loginForm5.tsx"
        },
        {
            component: <LoginForm6 key="login6" />,
            title: "Login Colorido",
            description: "Paleta de colores vibrante",
            category: "Colorido",
            fileName: "loginForm6.tsx"
        },
        {
            component: <LoginForm7 key="login7" />,
            title: "Login Oscuro",
            description: "Tema oscuro con acentos",
            category: "Oscuro",
            fileName: "loginForm7.tsx"
        },
        {
            component: <LoginForm8 key="login8" />,
            title: "Login Futurista",
            description: "Diseño con elementos futuristas",
            category: "Futurista",
            fileName: "loginForm8.tsx"
        },
        {
            component: <LoginForm9 key="login9" />,
            title: "Login Retro",
            description: "Estilo retro con nostalgia",
            category: "Retro",
            fileName: "loginForm9.tsx"
        },
        {
            component: <LoginForm10 key="login10" />,
            title: "Login Corporativo",
            description: "Diseño profesional empresarial",
            category: "Corporativo",
            fileName: "loginForm10.tsx"
        },
        {
            component: <LoginForm11 key="login11" />,
            title: "Login Creativo",
            description: "Diseño artístico y creativo",
            category: "Creativo",
            fileName: "loginForm11.tsx"
        },
        {
            component: <LoginForm12 key="login12" />,
            title: "Login Premium",
            description: "Diseño premium con detalles",
            category: "Premium",
            fileName: "loginForm12.tsx"
        },
    ],
    register: [
        {
            component: <RegisterForm1 key="register1" />,
            title: "Registro Minimalista",
            description: "Diseño limpio y simple",
            category: "Minimalista",
            fileName: "registerForm1.tsx"
        },
        {
            component: <RegisterForm2 key="register2" />,
            title: "Registro Glassmorphism",
            description: "Efecto de cristal elegante",
            category: "Glassmorphism",
            fileName: "registerForm2.tsx"
        },
        {
            component: <RegisterForm3 key="register3" />,
            title: "Registro Neumorphism",
            description: "Diseño suave y moderno",
            category: "Neumorphism",
            fileName: "registerForm3.tsx"
        },
        {
            component: <RegisterForm4 key="register4" />,
            title: "Registro Moderno",
            description: "Interfaz moderna y funcional",
            category: "Moderno",
            fileName: "registerForm4.tsx"
        },
        {
            component: <RegisterForm5 key="register5" />,
            title: "Registro Elegante",
            description: "Diseño elegante y sofisticado",
            category: "Elegante",
            fileName: "registerForm5.tsx"
        },
        {
            component: <RegisterForm6 key="register6" />,
            title: "Registro Colorido",
            description: "Paleta de colores vibrante",
            category: "Colorido",
            fileName: "registerForm6.tsx"
        },
        {
            component: <RegisterForm7 key="register7" />,
            title: "Registro Oscuro",
            description: "Tema oscuro con estilo",
            category: "Oscuro",
            fileName: "registerForm7.tsx"
        },
        {
            component: <RegisterForm8 key="register8" />,
            title: "Registro Futurista",
            description: "Diseño con elementos futuristas",
            category: "Futurista",
            fileName: "registerForm8.tsx"
        },
        {
            component: <RegisterForm9 key="register9" />,
            title: "Registro Retro",
            description: "Estilo retro con encanto",
            category: "Retro",
            fileName: "registerForm9.tsx"
        },
        {
            component: <RegisterForm10 key="register10" />,
            title: "Registro Corporativo",
            description: "Diseño profesional",
            category: "Corporativo",
            fileName: "registerForm10.tsx"
        },
        {
            component: <RegisterForm11 key="register11" />,
            title: "Registro Creativo",
            description: "Diseño artístico y único",
            category: "Creativo",
            fileName: "registerForm11.tsx"
        },
        {
            component: <RegisterForm12 key="register12" />,
            title: "Registro Premium",
            description: "Diseño premium exclusivo",
            category: "Premium",
            fileName: "registerForm12.tsx"
        },
    ]
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<TabType>("login")
    const [selectedForm, setSelectedForm] = useState<FormConfig | null>(null)
    const [showCode, setShowCode] = useState(false)
    const [copied, setCopied] = useState(false)
    const { toast } = useToast()

    const currentForms = useMemo(() => FORM_CONFIGS[activeTab], [activeTab])

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab)
    }

    const handleFormClick = (form: FormConfig) => {
        setSelectedForm(form)
    }

    const handleViewCode = async (form: FormConfig) => {
        try {
            const response = await fetch(`/api/code/${form.fileName}`)
            if (response.ok) {
                const code = await response.text()
                setSelectedForm({ ...form, code })
                setShowCode(true)
            } else {
                toast({
                    title: "Error",
                    description: "No se pudo cargar el código del formulario",
                    variant: "destructive"
                })
            }
        } catch {
            toast({
                title: "Error",
                description: "Error al cargar el código",
                variant: "destructive"
            })
        }
    }

    const handleCopyCode = async () => {
        if (selectedForm?.code) {
            try {
                await navigator.clipboard.writeText(selectedForm.code)
                setCopied(true)
                toast({
                    title: "Código copiado",
                    description: "El código se ha copiado al portapapeles",
                    variant: "default"
                })
                setTimeout(() => setCopied(false), 2000)
            } catch {
                toast({
                    title: "Error",
                    description: "No se pudo copiar el código",
                    variant: "destructive"
                })
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            📸 FormGallery Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Explora y personaliza formularios de login y registro
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mt-8">
                        <div className="bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => handleTabChange("login")}
                                className={`px-6 py-2 rounded-md font-medium transition-all ${activeTab === "login"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Login Forms
                            </button>
                            <button
                                onClick={() => handleTabChange("register")}
                                className={`px-6 py-2 rounded-md font-medium transition-all ${activeTab === "register"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                Register Forms
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forms Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentForms.map((form, index) => (
                        <motion.div
                            key={form.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* Form Preview */}
                            <div className="p-4 bg-gray-50 min-h-[200px] flex items-center justify-center">
                                <div className="scale-75 transform origin-center">
                                    {form.component}
                                </div>
                            </div>

                            {/* Form Info */}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900 text-lg">
                                        {form.title}
                                    </h3>
                                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                        {form.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">
                                    {form.description}
                                </p>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleFormClick(form)}
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Ver Demo
                                    </Button>
                                    <Button
                                        onClick={() => handleViewCode(form)}
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                    >
                                        <Code className="w-4 h-4 mr-2" />
                                        Código
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal for Form Demo */}
            <AnimatePresence>
                {selectedForm && !showCode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedForm(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {selectedForm.title}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        {selectedForm.description}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedForm(null)}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                            <div className="p-6 overflow-auto max-h-[60vh]">
                                {selectedForm.component}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal for Code View */}
            <AnimatePresence>
                {showCode && selectedForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowCode(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        Código: {selectedForm.title}
                                    </h2>
                                    <p className="text-gray-400 mt-1">
                                        {selectedForm.fileName}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleCopyCode}
                                        variant="outline"
                                        size="sm"
                                        className="text-white border-gray-600 hover:bg-gray-800"
                                    >
                                        {copied ? (
                                            <Check className="w-4 h-4 mr-2" />
                                        ) : (
                                            <Copy className="w-4 h-4 mr-2" />
                                        )}
                                        {copied ? "Copiado" : "Copiar"}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowCode(false)}
                                        className="text-white hover:bg-gray-800"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="p-6 overflow-auto max-h-[60vh]">
                                <pre className="text-sm text-gray-300 font-mono">
                                    <code>{selectedForm.code}</code>
                                </pre>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
} 