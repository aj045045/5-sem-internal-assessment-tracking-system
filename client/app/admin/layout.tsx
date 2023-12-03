"use client";
import {
    LuPanelLeftClose,
    LuLayoutDashboard,
    LuPanelLeftOpen,
} from "react-icons/lu";
import { CgDatabase } from "react-icons/cg";
import {
    FaTasks,
    FaUserTie,
    FaUserGraduate,
    FaPaperclip,
    FaFilePdf,
    FaUsers,
} from "react-icons/fa";
import Image from "next/image";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { ImBooks } from "react-icons/im";
import { useState } from "react";
import Router from "next/router";
import { useRouter, usePathname } from "next/navigation";
import { ButtonClass } from "@/components/utilities";
export default function SideNav({ children }: { children: React.ReactNode }) {
    const [openTab, setOpenTab] = useState(false);
    const handlePanel = () => {
        openTab === true ? setOpenTab(false) : setOpenTab(true);
    };
    const router = useRouter();
    const pathName = usePathname();
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
                    <div className="flex flex-row mt-4 space-x-3 ">
                        <Image
                            className="w-6 rounded-full md:w-12"
                            src="/icons/user.png"
                            alt="User Image"
                            unoptimized={true}
                            width={1}
                            height={1}
                        />
                        <span className="self-center text-md md:text-xl">
                            Ansh Yadav
                        </span>
                        <span className="content-start px-1 mt-1 text-xs md:text-sm font-semibold text-teal-700 capitalize bg-teal-300 rounded-full shadow-md h-min md:px-2">
                            admin
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-center h-8 mt-4 space-x-4 rounded-md hover:bg-orange-300">
                            <span className="self-center text-lg md:text-xl">
                                <LuLayoutDashboard />
                            </span>
                            <div
                                onClick={() => {
                                    pathName === "/admin"
                                        ? router.replace("/admin")
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
                                        ? router.replace("/admin/assessment")
                                        : router.push("/admin/assessment");
                                }}
                                className="self-center text-sm capitalize md:text-lg"
                            >
                                Assessment
                            </div>
                        </div>
                        <div className="flex flex-row justify-center h-8 mt-4 space-x-4 rounded-md hover:bg-orange-300">
                            <span className="self-center text-lg md:text-xl">
                                <ImBooks />
                            </span>
                            <div
                                onClick={() => {
                                    pathName === "/admin/course"
                                        ? router.replace("/admin/course")
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
                                                ? router.replace(
                                                      "/admin/faculty"
                                                  )
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
                                            pathName === "/admin/student"
                                                ? router.replace(
                                                      "/admin/student"
                                                  )
                                                : router.push("/admin/student");
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
                                        ? router.replace("/admin/paper")
                                        : router.push("/admin/paper");
                                }}
                                className="self-center text-sm capitalize md:text-lg"
                            >
                                Papers
                            </div>
                        </div>{" "}
                        <div className="flex flex-row justify-center h-8 mt-4 space-x-4 rounded-md hover:bg-orange-300">
                            <span className="self-center text-lg md:text-xl">
                                <FaFilePdf />
                            </span>
                            <div
                                onClick={() => {
                                    pathName === "/admin/assignment"
                                        ? router.replace("/admin/assignment")
                                        : router.push("/admin/assignment");
                                }}
                                className="self-center text-sm capitalize md:text-lg"
                            >
                                Assignment
                            </div>
                        </div>
                        <div className="flex flex-row justify-center h-8 mt-4 space-x-4 rounded-md hover:bg-orange-300">
                            <span className="self-center text-lg md:text-xl">
                                <CgDatabase />
                            </span>
                            <div
                                onClick={() => {
                                    pathName === "/admin/decrypt-paper"
                                        ? router.replace("/admin/decrypt-paper")
                                        : router.push("/admin/decrypt-paper");
                                }}
                                className="self-center text-sm capitalize md:text-lg"
                            >
                                Decrypt Papers
                            </div>
                        </div>
                    </div>
                    <div
                        className={ButtonClass}
                        onClick={() => router.push("/")}
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
                        : `w-full`
                }`}
            >
                {children}
            </div>
        </>
    );
}
