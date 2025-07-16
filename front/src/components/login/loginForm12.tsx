"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginForm12() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({ username: false, password: false });

  const validate = (data: typeof userData) => {
    const errs: typeof errors = { username: "", password: "" };
    if (!data.username) errs.username = "Username is required";
    if (!data.password) errs.password = "Password is required";
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
    setTouched({ username: true, password: true });
    const errs = validate(userData);
    setErrors(errs);
    if (!errs.username && !errs.password) {
      alert("Login successful!");
      setUserData({ username: "", password: "" });
      setTouched({ username: false, password: false });
      setErrors({ username: "", password: "" });
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
          padding: "2rem 2rem 2rem 2rem",
        }}
      >
        {/* Avatar */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-26 h-26 rounded-full bg-white flex items-center justify-center shadow-xl z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-10 mt-8 tracking-wide text-center drop-shadow-lg" style={{textShadow: "0 2px 8px #b47aff80"}}>
          Sign In
        </h2>
        <form className="w-full space-y-7" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-400 shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 relative">
              <Input
                id="username12"
                name="username"
                type="text"
                placeholder="Username"
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
                id="password12"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="h-12 bg-transparent border-2 border-white/80 rounded-full focus:border-pink-300 focus:ring-pink-200 text-white placeholder:text-white/70 font-semibold shadow-none px-5 pr-12"
                value={userData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoComplete="current-password"
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
          {/* Opciones */}
          <div className="flex items-center justify-between text-white/90 text-sm mt-1">
            <div className="flex items-center gap-2">
              <Checkbox id="remember12" className="border-white/60 bg-white/20" />
              <Label htmlFor="remember12" className="text-white/90 select-none cursor-pointer">Remember me</Label>
            </div>
            <button type="button" className="hover:underline text-white/80">Forgot password?</button>
          </div>
          {/* Botón */}
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 hover:from-pink-400 hover:to-blue-500 text-white font-bold shadow-lg mt-2 text-lg tracking-wide border-none"
            style={{ boxShadow: "0 4px 24px 0 rgba(186,104,200,0.25)", letterSpacing: 1.5, fontSize: "1.25rem" }}
          >
            LOGIN
          </Button>
          {/* Links */}
          <div className="text-center mt-2">
            <span className="text-base text-white/90">Don&apos;t have account?{' '}
              <button
                type="button"
                className="text-pink-200 font-bold hover:underline"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const event = new CustomEvent('switchToRegister');
                    window.dispatchEvent(event);
                  }
                }}
              >
                Sign up!
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
} 