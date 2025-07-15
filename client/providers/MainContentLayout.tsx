"use client";
import { useUserContext } from "@/context/userContext";
import React from 'react';

interface MainContentLayoutProps {
  children: React.ReactNode;
}

function MainContentLayout({ children }: MainContentLayoutProps) {
  const { user, loading } = useUserContext();

  // While loading user data, show nothing or a loader
  if (loading) {
    return null; // or return <Loader /> if you have a loader component
  }

  const userId = user?._id;

  return (
    <main className={`pb-[1.5rem] flex h-full ${userId ? "pr-[20rem]" : " "}`}>
      {children}
    </main>
  );
}

export default MainContentLayout;
