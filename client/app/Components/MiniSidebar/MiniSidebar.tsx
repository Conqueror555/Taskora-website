"use client";
import React from 'react'
import IconGrid from '@/public/icons/IconGrid';
import IconFileCheck from '@/public/icons/IconFileCheck';
import IconStopwatch from '@/public/icons/IconStopwatch';
import IconCheck from '@/public/icons/IconCheck';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";




function MiniSidebar(){
    const { user } = useUserContext();
    const isLoggedIn = !!user?._id;


    const pathname = usePathname();

    const getStrokeColor = (link: string) => {
  return pathname === link ? "#2ECC71" : "#dad5d5";
};



    const navItems = [
        {
            icon: <IconGrid 
               strokeColor={getStrokeColor("/")}
                />,
            title:"All",
            link:"/",
        },
        {
            icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
            title:"Completed",
            link:"/completed",
        },
        {
            icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
            title:"Pending",
            link:"/pending",
        },
        {
            icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
            title:"Overdue",
            link:"/overdue",
        },

    ];
    return ( 
    <div className="basis-[5rem] flex flex-col bg-gray-700">
      <div className="flex items-center justify-center h-[5rem]">
        <Image src="/Taskora-logo.png" 
          width={60} 
          height={60} 
          alt="Taskora-logo"
          priority
        />
      </div>
      
      <div className="mt-8  flex flex-col items-center ">
        {isLoggedIn && (
        <ul className="flex flex-col items-center ">
          {navItems.map((item,index) => (
            <li key={index} className="relative group py-4">
                <Link href={item.link} className="flex items-center justify-center h-[50px] w-[50px]">
                  {item.icon}
                </Link>

                 {/* Hover Tooltip */}

                 <span className="u-triangle absolute top-[50%] translate-y-[-50%] left-[40px] text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.title}
                 </span>
            </li>
          ))}
          
        </ul>
        )}
         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] font-bold text-#f5f5f5 text-center">
            Creator: PS_555
          </div>
      </div>
     
    </div>
  );
}

export default MiniSidebar;