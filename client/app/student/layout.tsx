"use client";
import { useState,useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
export default function SideNav({ children }: { children: React.ReactNode }) {
  const router = useRouter();
    useEffect(() => {
        fetch('/api/user/check-login')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.redirect != "student")
                {
                    router.replace('/');   
                }
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
    },[router]);
    return (
        <>
           {children} 
        </>
    );
}
