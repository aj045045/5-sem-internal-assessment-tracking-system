"use client";
import {
    LuPanelLeftClose,
    LuLayoutDashboard,
    LuPanelLeftOpen,
} from "react-icons/lu";
import { FaArrowLeftLong } from 'react-icons/fa6';
import { CgDatabase } from "react-icons/cg";
import {
    FaTasks,
    FaUserTie,
    FaUserGraduate,
    FaPaperclip,
    FaUsers,
} from "react-icons/fa";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { ImBooks } from "react-icons/im";
import { useState,useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ButtonClass } from "@/components/utilities";
export default function SideNav({ children }: { children: React.ReactNode }) {
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
  
  const pathName = usePathname();
    useEffect(() => {
        fetch('/api/user/check-login')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.redirect != "admin")
                {
                    router.replace('/');   
                }
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
    },[router]);
    const [openTab, setOpenTab] = useState(false);
    const handlePanel = () => {
        openTab === true ? setOpenTab(false) : setOpenTab(true);
    };
    return (
        <>
            <div className="flex flex-row">
                <div
                    className={`flex flex-col h-full py-2  mr-2 bg-orange-200  overflow-x-hidden z-10 transition-width duration-500 delay-75 ease-in-out  fixed ${
                        openTab === true
                            ? `w-48 md:w-64 pl-2 border-r-2 border-stone-300 `
                            : `w-0`
                    }`}
                >
                    <div
                        className="p-1 mt-2 ml-auto mr-4 text-lg bg-orange-300 rounded md:text-xl shadow-md shadow-stone-500"
                        onClick={() => {
                            handlePanel();
                        }}
                    >
                        <LuPanelLeftClose />
                    </div>
                    <div className="flex flex-row mt-4 space-x-3  mr-5 select-none">
                        <Image
                            className="w-8 rounded-full md:w-14 ml-auto mr-5"
                            src="/icons/user.png"
                            alt="User Image"
                            unoptimized={true}
                            width={1}
                            height={1}
                        />
                        <span className="content-start px-1 mt-1 text-xs md:text-sm font-semibold text-teal-700 capitalize bg-teal-300 rounded-full shadow-md h-min md:px-2">
                            admin
                        </span>
                    </div>
                    <div className="flex flex-col select-none">
                        <div className="flex flex-row justify-center h-8 mt-4 space-x-4 rounded-md hover:bg-orange-300">
                            <span className="self-center text-lg md:text-xl">
                                <LuLayoutDashboard />
                            </span>
                            <div
                                onClick={() => {
                                    pathName === "/admin"
                                        ? ""
                                        : router.push("/admin");
                                }}
                                className="self-center text-sm capitalize md:text-lg"
                            >
                                dashboard
                            </div>
                        </div>
                        <div className="flex flex-row justify-center h-8 mt-4 space-x-4 rounded-md hover:bg-orange-300">
                            <span className="self-center text-lg md:text-xl">
                                <FaTasks />
                            </span>
                            <div
                                onClick={() => {
                                    pathName === "/admin/assessment"
                                        ? ""
                                        : router.push("/admin/assessment");
                                }}
                                className="self-center text-sm capitalize md:text-lg"
                            >
                                Assignment
                            </div>
                        </div>
                        <div className="flex flex-row justify-center h-8 mt-4 space-x-4 rounded-md hover:bg-orange-300">
                            <span className="self-center text-lg md:text-xl">
                                <ImBooks />
                            </span>
                            <div
                                onClick={() => {
                                    pathName === "/admin/course"
                                        ? ""
                                        : router.push("/admin/course");
                                }}
                                className="self-center text-sm capitalize md:text-lg"
                            >
                                Course
                            </div>
                        </div>
                        <Accordion>
                            <AccordionItem
                                key="1"
                                aria-label="users"
                                title="Users"
                                startContent={
                                    <span className="self-center text-lg md:text-xl">
                                        <FaUsers />
                                    </span>
                                }
                                className="mx-auto w-fit"
                            >
                                <div className="flex flex-row justify-center h-8 space-x-4 rounded-md hover:bg-orange-300">
                                    <span className="self-center text-lg md:text-xl">
                                        <FaUserTie />
                                    </span>
                                    <div
                                        onClick={() => {
                                            pathName === "/admin/faculty"
                                                ? ""
                                                : router.push("/admin/faculty");
                                        }}
                                        className="self-center text-sm capitalize md:text-lg"
                                    >
                                        Faculty
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center h-8 mt-4 space-x-4 rounded-md hover:bg-orange-300">
                                    <span className="self-center text-lg md:text-xl">
                                        <FaUserGraduate />
                                    </span>
                                    <div
                                        className="self-center text-sm capitalize md:text-lg"
                                        onClick={() => {
                                            pathName === "/admin/course"
                                                ? ""
                                                : router.push("/admin/course");
                                        }}
                                    >
                                        Student
                                    </div>
                                </div>
                            </AccordionItem>
                        </Accordion>
                        <div className="flex flex-row justify-center h-8 mt-4 space-x-4 rounded-md hover:bg-orange-300">
                            <span className="self-center text-lg md:text-xl">
                                <FaPaperclip />
                            </span>
                            <div
                                onClick={() => {
                                    pathName === "/admin/paper"
                                        ? ""
                                        : router.push("/admin/paper");
                                }}
                                className="self-center text-sm capitalize md:text-lg"
                            >
                                Papers
                            </div>
                        </div>{" "}
                    </div>
                    <div
                        className={`${ButtonClass} select-none`}
                        onClick={handleLogout}
                    >
                        Sign out
                    </div>
                </div>
                <div
                    className="p-1 bg-orange-300 m-3 w-auto h-auto text-xl rounded-md justify-center flex fixed shadow-md shadow-stone-500"
                    onClick={() => {
                        handlePanel();
                    }}
                >
                    <LuPanelLeftOpen />
                </div>
            </div>
            <div
                className={`${
                    openTab === true
                        ? `md:w-4/5 w-3/4 bg-orange-50 float-right pl-3 overflow-hidden transition-width duration-700 delay-75 flex flex-col ease-linear`
                        : `w-full py-10`
                }`}
            >
                <Tooltip showArrow={true} content="Click to go Back">
                    <div
                        className={`fixed text-xl text-teal-800 z-20 bg-orange-100  shadow-stone-400 shadow-md border-t-2 border-t-ne-200  w-fit px-4 py-0.5 rounded-full ${
                            openTab === true ? `mt-5 ml-5` : ` ml-14`
                        }`}
                        onClick={() => router.back()}
                    >
                        <FaArrowLeftLong />
                    </div>
                </Tooltip>
                {children}
            </div>
        </>
    );
}
