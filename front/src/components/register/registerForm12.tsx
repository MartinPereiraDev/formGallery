"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "../../hooks/use.toast";

export default function RegisterForm12() {
  const [userData, setUserData] = useState({ username: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "", confirm: "" });
  const [touched, setTouched] = useState({ username: false, password: false, confirm: false });
  const { toast } = useToast();

  const validate = (data: typeof userData) => {
    const errs: typeof errors = { username: "", password: "", confirm: "" };
    if (!data.username) errs.username = "El usuario es requerido";
    if (!data.password) errs.password = "La contraseña es requerida";
    if (!data.confirm) errs.confirm = "Por favor confirma tu contraseña";
    if (data.password && data.confirm && data.password !== data.confirm) errs.confirm = "Las contraseñas no coinciden";
    return errs;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newData = { ...userData, [name]: value };
    setUserData(newData);
    setErrors(validate(newData));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validate(userData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, password: true, confirm: true });
    const errs = validate(userData);
    setErrors(errs);
    if (!errs.username && !errs.password && !errs.confirm) {
      toast({
        title: "Registro exitoso",
        description: "¡Cuenta creada correctamente!",
        variant: "default"
      });
      setUserData({ username: "", password: "", confirm: "" });
      setTouched({ username: false, password: false, confirm: false });
      setErrors({ username: "", password: "", confirm: "" });
    }
  };

  return (
    <div className="rounded-3xl flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400">
      <div
        className="relative max-w-md w-full mx-auto flex flex-col items-center rounded-3xl"
        style={{
          background: "linear-gradient(120deg, rgba(255,255,255,0.30) 60%, rgba(255,255,255,0.18) 100%)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "2px solid rgba(255,255,255,0.18)",
          padding: "2.5rem 2.5rem 2rem 2.5rem",
        }}
      >
        {/* Avatar */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-xl z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-10 mt-8 tracking-wide text-center drop-shadow-lg" style={{textShadow: "0 2px 8px #b47aff80"}}>
          Registrarse
        </h2>
        <form className="w-full space-y-7" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-400 shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 relative">
              <Input
                id="username12r"
                name="username"
                type="text"
                placeholder="Usuario"
                className="h-12 bg-transparent border-2 border-white/80 rounded-full focus:border-pink-300 focus:ring-pink-200 text-white placeholder:text-white/70 font-semibold shadow-none px-5"
                value={userData.username}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoComplete="username"
                style={{boxShadow: "0 0 0 2px rgba(255,255,255,0.18) inset"}}
              />
              {touched.username && errors.username && (
                <p className="text-pink-200 text-xs mt-1 ml-2">{errors.username}</p>
              )}
            </div>
          </div>
          {/* Password */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-400 shadow-md">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 relative">
              <Input
                id="password12r"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="h-12 bg-transparent border-2 border-white/80 rounded-full focus:border-pink-300 focus:ring-pink-200 text-white placeholder:text-white/70 font-semibold shadow-none px-5 pr-12"
                value={userData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                style={{boxShadow: "0 0 0 2px rgba(255,255,255,0.18) inset"}}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {touched.password && errors.password && (
                <p className="text-pink-200 text-xs mt-1 ml-2">{errors.password}</p>
              )}
            </div>
          </div>
          {/* Confirm Password */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-400 shadow-md">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 relative">
              <Input
                id="confirm12r"
                name="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirmar Contraseña"
                className="h-12 bg-transparent border-2 border-white/80 rounded-full focus:border-pink-300 focus:ring-pink-200 text-white placeholder:text-white/70 font-semibold shadow-none px-5 pr-12"
                value={userData.confirm}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                style={{boxShadow: "0 0 0 2px rgba(255,255,255,0.18) inset"}}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {touched.confirm && errors.confirm && (
                <p className="text-pink-200 text-xs mt-1 ml-2">{errors.confirm}</p>
              )}
            </div>
          </div>
          {/* Opciones */}
          <div className="flex items-center justify-between text-white/90 text-sm mt-1">
            <div className="flex items-center gap-2">
              <Checkbox id="terms12" className="border-white/60 bg-white/20" />
              <Label htmlFor="terms12" className="text-white/90 select-none cursor-pointer">Aceptar términos</Label>
            </div>
          </div>
          {/* Botón */}
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 hover:from-pink-400 hover:to-blue-500 text-white font-bold shadow-lg mt-2 text-lg tracking-wide border-none"
            style={{ boxShadow: "0 4px 24px 0 rgba(186,104,200,0.25)", letterSpacing: 1.5, fontSize: "1.25rem" }}
          >
            REGISTRARSE
          </Button>
          {/* Links */}
          <div className="text-center mt-2">
            <span className="text-base text-white/90">¿Ya tienes una cuenta?{' '}
              <button
                type="button"
                className="text-pink-200 font-bold hover:underline"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('switchToLogin');
                    window.dispatchEvent(event);
                  }
                }}
              >
                ¡Inicia sesión!
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
} 