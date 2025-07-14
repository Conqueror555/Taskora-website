"use client";
import React,{ useEffect } from "react";
import LoginForm from "../Components/auth/LoginForm/LoginForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";


function page() {
  const { user,loading } = useUserContext();
  const router = useRouter();

  useEffect(()=>{
    //rflect to home page if user is alredy logged in
    if(!loading && user && user._id){
      router.replace("/");
    }
  }, [user, loading, router]);
  //return null or a Loading spinner/indicator
   if (loading) {
    return <div>Loading...</div>; // or a spinner
  }
    if(user && user._id){
      return null;
    }
  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}

export default page;
