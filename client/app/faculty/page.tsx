"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

const FacultyProfile = () => {
    // Static profile data
    interface FacultyData {
        email_id: string;
        last_logged: string;
        password: string;
        profile: string;
        user_name: string
        user_type: string;
        _id: string;
    }
    const [data, setData] = useState<FacultyData[]|any>([]);
    useEffect(() => {
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
    });
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-orange-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mt-4">
                    <div className="flex items-center justify-center mb-6">
                        <Image
                            unoptimized={true}
                            width={0}
                            height={0}
                            src={`/${data.profile}`}
                            alt={`${data.user_name}'s Profile`}
                            className="w-32 h-32 rounded-full"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-center mb-1">
                        {data.user_name}
                    </h1>
                    <p className="text-gray-600 text-lg text-center mb-1">
                        {data.email_id}
                    </p>
                    <p className="text-gray-600 text-lg text-center mb-1">
                        {data.last_logged}
                    </p>
                </div>
            </div>
        </>
    );
};

export default FacultyProfile;
