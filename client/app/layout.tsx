import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/providers/UserProvider";
import { Inter } from "next/font/google";
import MiniSidebar from "./Components/MiniSidebar/MiniSidebar";
import Header from "./Components/Header/Header";
import SidebarProvider from "@/providers/SidebarProvider"; // your right sidebar
import MainContentLayout from "@/providers/MainContentLayout";
import MainLayout from "@/providers/MainLayout";
import GTMinitializer from "@/providers/GTMinitializer";

const inter = Inter({ subsets: ["latin"] });




export const metadata: Metadata = {
  title: "Taskora",
  description: "Generated by Prashant Shejwal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <GTMinitializer />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
      </head>
      <body className={inter.className}>
       
        <UserProvider>
          <Toaster position="top-center" />
          <div className="h-full flex overflow-hidden relative">
            {/* Left Mini Sidebar */}
            <MiniSidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col bg-gray-700">
              <Header />
              <MainContentLayout>
                <MainLayout>{children}</MainLayout>
                
              </MainContentLayout>
              <SidebarProvider />
            </div>

            
            
          </div>
        </UserProvider>
       
      </body>
    </html>
  );
}
