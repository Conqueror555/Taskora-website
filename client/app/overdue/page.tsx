"use client";
import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
import { useEffect, useState } from "react";
import { useTasks } from "@/context/taskContext";

import { Task } from "@/utils/type";
import { filteredTasks, overdueTasks } from "@/utils/utilities";
import Filters from "../Components/Filters/Filters";
import TaskItem from "../TaskItem/TaskItem";
import { container, item } from "@/utils/animations";
import { motion } from "framer-motion"


export default function Home() {
  useRedirect("/login");

  const { tasks,openModalForAdd, priority, setPriority  } = useTasks();

  const overdue = overdueTasks(tasks);

  const filtered = filteredTasks(overdue, priority);

  useEffect(()=>{
        setPriority("all");
    },[]);
    
  
  return (
    <main className= "m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Overdue Tasks</h1>
        <Filters />
      </div>
      <motion.div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[1.5rem]"
          variants={container}
          initial="hidden"
          animate="visible"
          >
      { filtered.map((task: Task,i: number) => (
          <TaskItem key={i} task={task}/>
        ))}
        <motion.button className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-black border-dashed border-2 border-gray-600
                hover:bg-gray-500 hover:border-none transition duration-200 ease-in-out"
        onClick={ openModalForAdd}
        variants={item}>
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
}
