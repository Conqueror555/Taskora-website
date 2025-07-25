"use client";
import { useUserContext } from "@/context/userContext";
import React, { useEffect, useState } from "react";

function LoginForm() {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { email, password } = userState;

  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false); // <-- Mount check

  useEffect(() => {
    setMounted(true);
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  // Prevent hydration errors by skipping render on server
  if (!mounted) return null;

  return (
    <form
      onSubmit={loginUser}
      className="relative m-[2rem] px-10 py-14 rounded-lg bg-gray-500 w-full max-w-[520px]"
    >
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-white text-[1.35rem] font-medium">
          Login to Your Account
        </h1>
        <p className="mb-8 px-[2rem] text-center text-white text-[14px]">
          Login Now. Don't have an account?{" "}
          <a
            href="/register"
            className="font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300"
          >
            Register here
          </a>
        </p>

        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="mb-1 text-white">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email || ""}
            onChange={handlerUserInput("email")}
            name="email"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-[#dad5d5]"
            placeholder="johndoe@gmail.com"
          />
        </div>

        <div className="relative mt-[1rem] flex flex-col">
          <label htmlFor="password" className="mb-1 text-white">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password || ""}
            onChange={handlerUserInput("password")}
            name="password"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-[#dad5d5]"
            placeholder="***************"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
          >
            {showPassword ? (
              <i className="fas fa-eye-slash" />
            ) : (
              <i className="fas fa-eye" />
            )}
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <a
            href="/forgot-password"
            className="font-bold text-[#2ECC71] text-[14px] hover:text-[#7263F3] transition-all duration-300"
          >
            Forgot password?
          </a>
        </div>

        <div className="flex">
          <button
            type="submit"
            disabled={!email || !password}
            className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
          >
            Login Now
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 right-0">
        
      </div>
    </form>
  );
}

export default LoginForm;
