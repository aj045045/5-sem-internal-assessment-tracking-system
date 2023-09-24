"use client";
import {
    LuPanelLeftClose,
    LuLayoutDashboard,
    LuPanelLeftOpen,
} from "react-icons/lu";
import { ButtonTag } from "@/components/utilities";
import { useState } from "react";

export default function SideNav({ children }: { children: React.ReactNode }) {
    const [openTab, setOpenTab] = useState(false);
    const handlePanel = () => {
        openTab === true ? setOpenTab(false) : setOpenTab(true);
    };
    return (
        <div className="flex flex-row">
            <div
                className={`flex flex-col h-full py-2  mr-2 bg-orange-200  overflow-x-hidden z-10 transition-width duration-500 delay-75 ease-linear  fixed ${
                    openTab === true
                        ? `w-48 md:w-64 pl-2 border-r-2 border-stone-300 `
                        : `w-0`
                }`}
            >
                <div
                    className="p-1 mt-2 ml-auto mr-4 text-lg bg-orange-300 rounded md:text-2xl "
                    onClick={() => {
                        handlePanel();
                    }}
                >
                    <LuPanelLeftClose />
                </div>
                <div className="flex flex-row mt-4 space-x-3 ">
                    <img
                        className="w-6 rounded-full md:w-12"
                        src="/icons/user.png"
                    />
                    <span className="self-center text-md md:text-xl">
                        Ansh Yadav
                    </span>
                    <span className="content-start px-1 mt-1 text-xs md:text-sm font-semibold text-teal-700 capitalize bg-teal-300 rounded-full shadow-md h-min md:px-2">
                        admin
                    </span>
                </div>
                <div className="flex flex-row justify-center h-8 mt-4 space-x-4 rounded-md hover:bg-orange-300">
                    <span className="self-center text-lg md:text-xl">
                        <LuLayoutDashboard />
                    </span>
                    <span className="self-center text-sm capitalize md:text-lg">
                        dashboard
                    </span>
                </div>
                <ButtonTag data="Sign out" />
            </div>
            <div>
                <div
                    className="p-1 bg-orange-300 m-3 w-7 h-auto text-xl rounded-lg justify-center flex "
                    onClick={() => {
                        handlePanel();
                    }}
                >
                    <LuPanelLeftOpen />
                </div>
                {children}
            </div>
        </div>
    );
}
