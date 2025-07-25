"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterForm() {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="relative m-[2rem] px-10 py-14 rounded-lg bg-gray-500 w-full max-w-[520px]">
      <div className="relative z-10">
        <h1 className="mb-2 text-center text-[#f5f5f7]  text-[1.35rem] font-medium">
          Register for an Account
        </h1>
        <p className="mb-8 px-[2rem] text-center text-[#d5d7da] text-[14px]">
          Create an account. Already have an account?{" "}
          <a
            href="/login"
            className="font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300"
          >
            Login here
          </a>
        </p>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-[#f1e9e9]">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handlerUserInput("name")(e)}
            name="name"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-[#dad5d5]"
            placeholder="John Doe"
          />
        </div>
        <div className="mt-[1rem] flex flex-col">
          <label htmlFor="email" className="mb-1 text-[#f1e9e9]">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => handlerUserInput("email")(e)}
            name="email"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-[#dad5d5]"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="relative mt-[1rem] flex flex-col">
          <label htmlFor="password" className="mb-1 text-[#f1e9e9]">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => handlerUserInput("password")(e)}
            name="password"
            className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-[#dad5d5]"
            placeholder="***************"
          />
          <button
            type="button"
            className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
          >
            {showPassword ? (
              <FaEyeSlash onClick={togglePassword} />
            ) : (
              <FaEye onClick={togglePassword} />
            )}
          </button>
        </div>

        <div className="flex">
          <button
            type="submit"
            disabled={!name || !email || !password}
            onClick={registerUser}
            className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
          >
            Register Now
          </button>
        </div>
      </div>
      
    </form>
  );
}

export default RegisterForm;
