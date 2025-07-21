"use client";
import { useUserContext } from '@/context/userContext';
import { useTasks } from '@/context/taskContext';
import React from 'react'
import Image from 'next/image';

function Profile() {
    const { user } = useUserContext();
    const { tasks, activeTasks,completedTasks,openProfileModel } = useTasks();
  return (
    <div className ="mx-6 mt-6 mb-2">
        <div
         className="px-1 py-2 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem] 
              hover:bg-[#E6E6E6]/50 transition duration-[300] ease-in-out cursor-pointer border-[2] border-[transparent] hover:border-[2] hover:border-[white]"
              onClick={openProfileModel}
              >
            <div>
                <Image
                   src="/Taskora-logo.png"
                   alt="avatar"
                   width={50}
                   height={50}
                   className="rounded-full" />
            </div>
              <h1 className="flex flex-col text-x1 text-[#f5f5f7]">
                  <span className=" font-medium">Hello, </span>
                  <span className="font-bold">{user?.name}</span>
              </h1>
        </div>

        <div className="mt-3 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-gray-200">
              <p>Total Tasks:</p>
                <div className="pl-4 flex items-center gap-2">
              
                  <span className="absolute h-[4%] w-[0.2rem] left-[25px] top-[1/2] translate-y-[-5%] bg-[#3aafae] rounded-[5px]"></span>
      
              
                  <span className="font-medium translate-x-[50%] text-xl text-[#d2c3c3]">
                    {tasks.length}
                  </span>
                </div>
            </div>
            <div className="text-gray-200">
              <p>In Progress:</p>
                <div className="pl-4 flex items-center gap-2">
              
                  <span className="absolute h-[4%] w-[0.2rem] left-[148px] top-[1/2] translate-y-[-5%] bg-[#3aafae] rounded-[5px]"></span>
      
              
                  <span className="font-medium translate-x-[70%] text-xl text-[#d2c3c3]">
                    {activeTasks.length}
                  </span>
                </div>
            </div>
            <div className="text-gray-200">
              <p>Open Tasks:</p>
                <div className="pl-4 flex items-center gap-2">
              
                  <span className="absolute h-[4%] w-[0.2rem] left-[25px] top-[1/2] translate-y-[-5%] bg-[#3aafae] rounded-[5px]"></span>
      
              
                  <span className="font-medium translate-x-[50%] text-xl text-[#d2c3c3]">
                    {activeTasks.length}
                  </span>
                </div>
            </div>
            <div className="text-gray-200">
              <p>Completed:</p>
                <div className="pl-4 flex items-center gap-2">
              
                  <span className="absolute h-[4%] w-[0.2rem] left-[148px] top-[1/2] translate-y-[-5%] bg-[#3aafae] rounded-[5px]"></span>
      
              
                  <span className="font-medium translate-x-[50%] text-xl text-[#d2c3c3]">
                    {completedTasks.length}
                  </span>
                </div>
            </div>
            
          </div>
        </div>
        <h3 className="mt-0 font-[medium] text-[#f5f5f7]">Activity</h3>
       

    </div>
  );
}

export default Profile