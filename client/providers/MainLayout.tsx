"use client"
import Modal from '@/app/Components/Modal/Modal';
import ProfileModal from '@/app/Components/Profile/ProfileModal';
import { useTasks } from '@/context/taskContext';
import React from 'react'

interface MainLayoutProps{
    children: React.ReactNode;
}
function MainLayout({ children }:MainLayoutProps){
    const{ isEditing, profileModal } = useTasks();
    return (<div className="main-layout flex-1 bg-gray-400 border-2 border-[#585454] rounded-[1.5rem] overflow-auto">
            {isEditing && <Modal />}
            {profileModal && <ProfileModal />}
            {children}
            </div>);
}

export default MainLayout;