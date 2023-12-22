'use client';
import {
    HeroHeader,
    WelcomeTag,
    Aims,
    NavbarSignIn,
} from "@/components/1_layout";
import { DataCardContainer, DataFacultyContainer } from "@/components/2_layout";
import { Pill } from "@/components/utilities";
import { useState,useEffect } from "react";
function SignIn() {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (data.length === 0) {
            fetch('/api/user/data-list')
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
        }
    });
    const AimsList = [
        {
            id: 1,
            data: "Quality software professionalism relevant and useful to the Industry, Business and Other organization.",
        },
        {
            id: 2,
            data: "Course that fits one's career goals and prepare them to prove themselves in any national/international scenario.",
        },
        {
            id: 3,
            data: "Nation's finest in nurturing a future generation of competent, credible and ethical forensic scientists.",
        },
        {
            id: 4,
            data: "Adopting innovative teaching methods that promote learning, creativity and critical thinking skills.",
        },
        {
            id: 5,
            data: "Reviewing regularly the curriculum, courses and programs offered to meet the changing needs of the forensic science profession.",
        },
    ];
    return (
        <>
            <NavbarSignIn />
            <HeroHeader />
            <hr className=" invisible md:mt-[80vh]  mt-[55vh]" />
            <hr className="invisible" id="services" />
            <Pill data="Services" />
            <DataCardContainer dataList={data} />
            <WelcomeTag />
            <hr className="invisible" id="family" />
            <Pill data="family" />
            <div className="bg-orange-100 md:py-20 md:mx-10 rounded-md border-2 border-orange-300 mb-6 md:mb-20">
                <video
                    className=" aspect-video shadow-lg rounded-xl p-0.5 brightness-75 mx-auto"
                    autoPlay
                    muted
                    loop
                >
                    <source
                        src="/icons/department_celebration.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <hr className="invisible"  id="aims"/>
            </div>
            <Aims lists={AimsList} />
            <hr className="invisible" id="faculty" />
            <Pill data="faculty" />
            <DataFacultyContainer />
        </>
    );
}

export default SignIn;
