"use client";
import { useUserContext } from "@/context/userContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (fallback: string, protectedPaths: string[] = []) => {
  const { user,loading } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

 const shouldProtect =
    protectedPaths.length === 0 ||
    protectedPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (loading) return;

    if (shouldProtect && (!user || !user._id)) {
      router.replace(fallback);
    }
  }, [user, loading, pathname]);
};

export default useRedirect;
