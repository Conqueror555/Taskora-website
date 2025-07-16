"use client"
import React, { createContext, useEffect, useState } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";
import axios from "axios";
const TaskContext = createContext();

const serverUrl = "http://localhost:8000";

export const TaskProvider = ({ children }) => {
    
const { user, loading: userLoading } = useUserContext();

    const [tasks,setTasks] = useState([]);
    const [loading,setLoading] = React.useState(false);
    const [task, setTask] = React.useState({});
    const [isEditing,setIsEditing] = React.useState(false);
    const [priority, setPriority] = React.useState("all");
    const [activeTask, setActiveTask] = React.useState(null);
    const [modalMode, setModalMode] = React.useState("");
    const [profileModal, setProfileModal] = React.useState(false);

    const openModalForAdd = ()=>
    {
      setModalMode("add");
      setIsEditing(true);
      setTask({});
    };
     const openModalForEdit = (task)=>
    {
      setModalMode("edit");
      setIsEditing(true);
      setActiveTask(task);
    };

    const openProfileModel = () => {
      setProfileModal(true);
    };

    const closeModal = () => {
      setIsEditing(false);
      setProfileModal(false);
      setModalMode("");
      setActiveTask(null);
      setTask({});
    };


    const getTasks = async() => {
      setLoading(true);
      try{
        const response = await axios.get(`${serverUrl}/api/v1/tasks`, {
  headers: {
    Authorization: `Bearer ${user?.token}`,
  },
});
       
        setTasks(response.data.tasks);
      }catch(error){
        console.log("Error getting tasks", error);
      }
      setLoading(false);
    };

     const getTask = async(taskId) => {
      setLoading(true);
      try{
        const response = await axios.get(`${serverUrl}/api/v1/task/${taskId}`);
       
        setTask(response.data);
      }catch(error){
        console.log("Error getting tasks", error);
      }
      setLoading(false);
    };
      const createTask = async (task) => {
            setLoading(true);
            try{
              const res = await axios.post(`${serverUrl}/api/v1/task/create`, task,{
  headers: {
    Authorization: `Bearer ${user?.token}`, // assuming token is stored in user object
  },
});

              setTasks([...tasks,res.data]);
              toast.success("Task created successfully");
              return true;
              
            }  catch (error) {
               console.log("Error creating task:", error?.response?.data || error.message || error);
               toast.error("Failed to create task");
               return false;
            } finally {
                 setLoading(false);
            }
        };

      const updateTask = async (task) => {
        setLoading(true);
        try {
         const res = await axios.patch(`${serverUrl}/api/v1/task/${task._id}`, task);
// update the task in the tasks array
         const newTasks = tasks.map((tsk) => {
           return tsk._id === res.data._id ? res.data: tsk;
        });
        setTasks(newTasks);
        toast.success("Task updated successfully");
        return true;
        } catch (error) {
        console.log("Error updating task",error);
        toast.error("Failed to update task");
        return false;
      }finally{
      setLoading(false);
      }
      };

      const deleteTask = async (taskId) => {
          setLoading(true);
          try {
          await axios.delete(`${serverUrl}/api/v1/task/${taskId}`);
// remove the task from the tasks array
          const newTasks = tasks.filter((tsk) => tsk._id !== taskId);
          setTasks (newTasks);
          } catch (error){
            console.log("Error deleting task",error);
        }
        setLoading(false);
        };

        const handelInput = (name) => (e) => {
            if (!e || !e.target) {
            console.warn("Invalid input event:", e);
            return;
          }

  const value = name === "completed" ? e.target.value === "true" : e.target.value;
  setTask((prev) => ({ ...prev, [name]: value }));
};


        const completedTasks = tasks.filter((task) => task.completed);

        const activeTasks = tasks.filter((task) => !task.completed);

    useEffect(() => {
      if (user && !userLoading) {
      getTasks();
    }
  }, [user,userLoading]);

    return (
        <TaskContext.Provider
          value={{
            tasks,
            loading,
            task,
            getTask,
            getTasks,
            createTask,
            updateTask,
            deleteTask,
            priority,
            setPriority,
            handelInput,
            isEditing,
            setIsEditing,
            openModalForAdd,
            openModalForEdit,
            activeTask,
            closeModal,
            modalMode,
            openProfileModel,
            activeTasks,
            completedTasks,
            profileModal,
          }}
          >
            {children}
          </TaskContext.Provider>
    );
};

export const useTasks = () => {
    return React.useContext(TaskContext);
} 