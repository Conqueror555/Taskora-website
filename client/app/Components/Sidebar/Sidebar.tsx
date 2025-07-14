"use client"
import React from 'react';
import Profile from '../Profile/Profile';
import RadioChart from '../RadioChart/RadioChart';
import { useUserContext } from '@/context/userContext';
import { useRouter } from "next/navigation";

function Sidebar() {
  const { logoutUser } = useUserContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser(); // wait until logout is done
    router.push("/login"); // redirect manually here
  };
  return (
    <div className="w-[18rem]  h-screen fixed top-[3.8rem] right-0 bg-[#f9f9f9] shadow-md z-10 flex flex-col overflow-y-auto">
      <Profile />
      <div className="mt-0 mx-5">
        <RadioChart />
      </div>
      <button className="mt-0 mb-6 mx-6 py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
        onClick={handleLogout}
      > 
          Sign Out 
      </button>
    </div>
  );
}

export default Sidebar;
