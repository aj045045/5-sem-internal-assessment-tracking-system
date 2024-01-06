"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function FacultyProfile(){
    interface FacultyData {
        email_id: string;
        last_logged: string;
        password: string;
        profile: string;
        user_name: string;
        user_type: string;
        _id: string;
    }
    const [data, setData] = useState<FacultyData[] | any>([]);
    useEffect(() => {
        if (data.length === 0) {
            
            fetch("/api/user/get-user")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((dataValue) => {
                    setData(dataValue);
                })
                .catch((error) => {
                    console.error("Error fetching faculty data:", error);
                });
        }
    }, [data]);
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-center mb-6">
                        <Image
                            unoptimized={true}
                            width={0}
                            height={0}
                            src={`/${data.profile}`}
                            alt={`${data.user_name}'s Profile`}
                            className="w-32 h-32  rounded-full shadow-md border-t-3 border-t-stone-300 shadow-stone-400"
                        />
                    </div>
                    <h1 className="mb-1 text-2xl font-bold text-center">
                        {data.user_name}
                    </h1>
                    <p className="mb-1 text-lg text-center text-sky-600 underline underline-offset-4 decoration-1">
                        @&nbsp;{data.email_id}
                    </p>
                    <p className="mb-1 text-lg text-center text-gray-600">
                        You have last visited the website on&nbsp;&nbsp;<span className="font-semibold">{data.last_logged}</span>
                    </p>
                </div>
            </div>
        </>
    )
};