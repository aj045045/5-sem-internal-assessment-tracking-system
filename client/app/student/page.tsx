"use client";
import HorizontalTabs from "@/components/Horizontaltabs-1";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const Profile = () => {
    // Static profile data
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
    const router = useRouter();
    const handleLogout = () => {
        fetch("/api/user/logout")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.redirect === "home") {
                    router.replace("/");
                }
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
    };
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-orange-200">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mt-16">
                    <div className="flex items-center justify-center mb-6">
                        <Image
                            unoptimized={true}
                            width={0}
                            height={0}
                            src={"/icons/user.png"}
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
                    <p className="text-gray-600 text-center mb-1">
                        {" "}
                        User Created at {data.last_logged}
                    </p>
                    <div className="bg-orange-300 w-fit px-3 py-2 rounded-full font-bold text-orange-700 capitalize mx-auto my-5" onClick={handleLogout}>
                        Logout
                    </div>
                    <HorizontalTabs />
                </div>
            </div>
        </>
    );
};

export default Profile;
