"use client";
import { useUserContext } from '@/context/userContext';
import { github, moon, profile } from '@/utils/Icons';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTasks } from '@/context/taskContext';
import { useRouter } from 'next/navigation'; 
import confetti from "canvas-confetti";

function Header() {
  const {user} = useUserContext();
  const router = useRouter();
  const { openModalForAdd,activeTasks,openProfileModel} = useTasks();
  const [isMounted, setIsMounted] = useState(false);
  const handleConfetti = () => {
  confetti({
  particleCount: 120,
  spread: 70,
  shapes: ["circle"], // or ["square"]
  origin: { y: 0.6 },
});

};

  useEffect(() => {
    // Set flag true only on client side
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or show a spinner/skeleton
  }

  const isLoggedIn = !!user?._id;
  const userName = user?.name || "User";

  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-gray-700">
      <div>
        <h1 className="text-lg font-medium text-[#f5f5f7]">
          <span role="img" aria-label="wave">👋</span>{" "}
          {isLoggedIn ? `Welcome, ${userName}!` : "Welcome to Taskora"}
        </h1>
        <p className="text-sm text-[#f5f5f7]">
          {isLoggedIn ? (
            <>You have <span className="font-bold text-[#3aafae]">
              {activeTasks.length}
              </span> active tasks</>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>

      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button className="px-4 py-2 bg-[#3aafae] text-[#f9f9f9] rounded-full hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
        onClick={() => {
          if(user?._id){
            openModalForAdd();
          }else{
            router.push("/login");
          }
        }}
        >
          {user._id ? "Add a New Task" : "Login/Register"}
        </button>

      {isLoggedIn && (
        <div className="flex gap-4 items-center">
          <Link
            href="https://github.com"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 text-[#f5f5f7] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {github}
          </Link>
          <button
              onClick={handleConfetti}
              className="h-10 w-10 text-[#f5f5f7] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] hover:bg-gray-100 transition"
                >
              {moon}
          </button>
          <div
            onClick={openProfileModel}
            
            
            rel="noopener noreferrer"
            className="h-10 w-10 text-[#f5f5f7] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {profile}
          </div>
        </div>
        )}
      </div>
    </header>
  );
}

export default Header;
