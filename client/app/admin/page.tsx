"use client";
import { Pill } from "@/components/utilities";

import { useState,useEffect } from "react";
import { DataCardContainer, DataFacultyContainer } from "@/components/2_layout";
import { useRouter } from "next/navigation";

function AdminWelcome() {
    const router = useRouter();
    const handleLogout = () => {
        fetch('/api/user/logout')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.redirect === "home") {
                    router.replace('/');
                }
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
    };
    return (
        <div className="flex flex-row md:justify-center justify-around pt-5 select-none">
            <div className="flex text-sm md:text-lg text-stone-700 flex-col w-full mx-3 px-5 md:p-10  py-5 bg-orange-100 border-orange-300 border-2 rounded-md p-2">
                <div className="">
                    Hello&nbsp;&nbsp;
                    <span className="font-semibold tracking-wider ">
                    ADMIN
                    </span>
                </div>
                <div className="">Here is your overview of department !</div>
            </div>
            <div className="text-sm mx-2 md:text-lg bg-orange-600 h-fit py-1 px-2 text-white font-semibold rounded-md" onClick={handleLogout}>
                Sign&nbsp;out
            </div>
        </div>
    );
}

function PageNav() {
    const handleCreateKeys = () => {
        fetch('/api/paper/keys')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.blob(); // Handle the response as a blob directly
            })
            .then((blob) => {
                const currentDate = new Date();
                let year, day, month, hour, min, second;
                year = currentDate.getFullYear();
                day = currentDate.getDate();
                month = currentDate.getMonth();
                hour = currentDate.getHours();
                min = currentDate.getMonth();
                second = currentDate.getSeconds();
                const fileName = `keys-${day}-${month}-${year}_${hour};${min};${second}.zip`;
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            })
            .catch((error) => {
                console.error("Error fetching keys:", error);
            });
    };
    return (
        <div className="flex justify-around space-x-4 my-10 text-xs md:text-base">
                <div
                    className="bg-orange-200 px-3  py-1 rounded-md border-2 border-orange-300"
                >
                    Decrypt paper
            </div>
            
            <div
                onClick={handleCreateKeys}
                    className="bg-orange-200 px-3  py-1 rounded-md border-2 border-orange-300"
                >
                    Create keys
            </div>
            
            <div
                    className="bg-orange-200 px-3  py-1 rounded-md border-2 border-orange-300"
                >
                    Papers
                </div>
        </div>
    );
}

export default function AdminPage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/api/user/data-list")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
    }, []);
    return (
        <>
            <AdminWelcome />
            <PageNav />
            <Pill data="Summary" />
            <DataCardContainer dataList={data} />
            <Pill data="Faculty" />
            <DataFacultyContainer />
        </>
    );
}
