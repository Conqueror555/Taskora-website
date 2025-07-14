"use client";

import { useUserContext } from "@/context/userContext";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Metadata } from "next";

interface PageProps {
  params: {
    resetToken: string;
  };
}

export default function Page({ params }: PageProps) {
  const resetToken = params.resetToken;

  // ✅ Extract resetToken from params safely

  const { resetPassword } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset token:", resetToken);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    resetPassword(resetToken, password);
  };

  return (
    <main className="auth-page w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full"
      >
        <div className="relative z-10">
          <h1 className="mb-2 text-center text-[1.35rem] font-medium">
            Reset Your Password!
          </h1>

          <div className="relative mt-[1rem] flex flex-col">
            <label className="mb-1 text-[#999]">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            />
          </div>

          <div className="relative mt-[1rem] flex flex-col">
            <label className="mb-1 text-[#999]">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="*********"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            />
          </div>

          <div className="flex">
            <button
              type="submit"
              className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
            >
              Reset Password
            </button>
          </div>
        </div>
        <img src="/flurry.png" alt="" />
      </form>
    </main>
  );
}
