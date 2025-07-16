"use client"

import { useState, useEffect } from "react"
import LoginForm1 from "../login/loginForm1"
import LoginForm2 from "../login/loginForm2"
import { LoginForm3 } from "../login/loginForm3"
import { LoginForm4 } from "../login/loginForm4"
import { LoginForm5 } from "../login/loginForm5"
import LoginForm6 from "../login/loginForm6"
import LoginForm7 from "../login/loginForm7"
import LoginForm8 from "../login/loginForm8"
import LoginForm9 from "../login/loginForm9"
import LoginForm10 from "../login/loginForm10"
import LoginForm11 from "../login/loginForm11"
import LoginForm12 from "../login/loginForm12"
import RegisterForm1 from "../register/registerForm1"
import RegisterForm2 from "../register/registerForm2"
import RegisterForm3 from "../register/registerForm3"
import RegisterForm4 from "../register/registerForm4"
import RegisterForm5 from "../register/registerForm5"
import RegisterForm6 from "../register/registerForm6"
import RegisterForm7 from "../register/registerForm7"
import RegisterForm8 from "../register/registerForm8"
import RegisterForm9 from "../register/registerForm9"
import RegisterForm10 from "../register/registerForm10"
import RegisterForm11 from "../register/registerForm11"
import RegisterForm12 from "../register/registerForm12"

const loginForms = [
  <LoginForm1 key="login1" />, <LoginForm2 key="login2" />, <LoginForm3 key="login3" />, <LoginForm4 key="login4" />,
  <LoginForm5 key="login5" />, <LoginForm6 key="login6" />, <LoginForm7 key="login7" />, <LoginForm8 key="login8" />, 
  <LoginForm9 key="login9" />, <LoginForm10 key="login10" />, <LoginForm11 key="login11" />, <LoginForm12 key="login12" />
]

const registerForms = [
  <RegisterForm1 key="register1" />,
  <RegisterForm2 key="register2" />,
  <RegisterForm3 key="register3" />,
  <RegisterForm4 key="register4" />,
  <RegisterForm5 key="register5" />,
  <RegisterForm6 key="register6" />,
  <RegisterForm7 key="register7" />,
  <RegisterForm8 key="register8" />,
  <RegisterForm9 key="register9" />,
  <RegisterForm10 key="register10" />,
  <RegisterForm11 key="register11" />,
  <RegisterForm12 key="register12" />
]

export default function GalleryView() {
  const [tab, setTab] = useState<"login" | "register">("login")

  useEffect(() => {
    const handlerRegister = () => setTab("register")
    const handlerLogin = () => setTab("login")
    if (typeof window !== 'undefined') {
      window.addEventListener('switchToRegister', handlerRegister)
      window.addEventListener('switchToLogin', handlerLogin)
      return () => {
        window.removeEventListener('switchToRegister', handlerRegister)
        window.removeEventListener('switchToLogin', handlerLogin)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-black via-zinc-900 to-neutral-800 py-12 px-2">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-fuchsia-600 to-indigo-500 bg-clip-text text-transparent mb-10 text-center font-serif tracking-tight drop-shadow-lg">
        Galería de Formularios Premium
      </h1>
      <div className="flex mb-8 rounded-xl overflow-hidden border border-zinc-800 shadow-lg">
        <button
          className={`px-8 py-3 font-semibold text-lg transition-all duration-200 focus:outline-none ${
            tab === "login"
              ? "bg-zinc-900 text-amber-400 shadow"
              : "bg-zinc-800 text-zinc-400 hover:text-amber-400"
          }`}
          onClick={() => setTab("login")}
        >
          Logins
        </button>
        <button
          className={`px-8 py-3 font-semibold text-lg transition-all duration-200 focus:outline-none ${
            tab === "register"
              ? "bg-zinc-900 text-amber-400 shadow"
              : "bg-zinc-800 text-zinc-400 hover:text-amber-400"
          }`}
          onClick={() => setTab("register")}
        >
          Registers
        </button>
      </div>
      <div className="w-full max-w-6xl">
        {tab === "login" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {loginForms}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {registerForms}
          </div>
        )}
      </div>
    </div>
  )
} 