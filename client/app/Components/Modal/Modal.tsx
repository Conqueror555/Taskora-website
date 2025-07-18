"use client";
import { useTasks } from '@/context/taskContext';
import useDetectOutside from '@/hooks/useDetectOutside';
import React, { useEffect, useState, useRef } from 'react'



function Modal() {

    const{task, handelInput, createTask, isEditing, closeModal, modalMode, activeTask, updateTask,getTasks}= useTasks();
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);


    useDetectOutside({
        ref,

        callback:()=>{
            if (isEditing){
                closeModal();
            }
        },
    });

     useEffect(() => {
    setMounted(true); // Only render after client mounts
    if(modalMode ==="edit" && activeTask){
        handelInput("setTask")(activeTask);
    }
  }, [modalMode, activeTask]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let success = false;

    if (modalMode === "edit") {
        success = await updateTask(task);
    } else if (modalMode === "add") {
        success = await createTask(task);
    }

    if (success) {
        await getTasks(); 
        closeModal();
    }
};



    if (!mounted) return null;

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
     <div  ref = {ref}>
       <form
          action=""
          className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        
       >
        <div className="flex flex-col gap-1">
            <label htmlFor="title">Title</label>
            <input
                className="bg-[#F9F9F9] p-2 rounded-md border"
                type="text"
                placeholder="Task Title"
                name="title"
                value={task?.title?? ""}
                onChange={(e) => handelInput("title")(e)}
                />
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea
                className="bg-[#F9F9F9] p-2 rounded-md border resize-none"
                name="description"
                placeholder="Task Description"
                rows={4}
                value={task?.description?? ""}
                onChange={(e) => handelInput("description")(e)}
                />
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="priority">Select Priority</label>
            <select
                className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
                name="priority"
                value={task?.priority?? "low"}
                onChange={(e) => handelInput("priority")(e)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
            </select>
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="dueDate">Due Date</label>
            <input
                className="bg-[#F9F9F9] p-2 rounded-md border"
                type="date"
                name="dueDate"
                value={task.dueDate?? ""}
                onChange={(e) => handelInput("dueDate")(e)}
                />
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="completed">Task Completed</label>
            <div className="flex items-center justify-between bg-[#F9F9F9] p-2 rounded-md border">
                <label htmlFor="completed">Completed</label>
                <div>
                    <select
                        className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
                        name="completed"
                        value={task?.completed ? "true": "false"}
                        onChange={(e) => handelInput("completed")(e)}
                    >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="mt-8">
            <button
            type="submit"
            className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${
                modalMode === "edit"? "bg-blue-400" : "bg-green-400"
            }`}
            >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
            </button>
        </div>

       </form>
     </div>
    </div>
  )
}

export default Modal;