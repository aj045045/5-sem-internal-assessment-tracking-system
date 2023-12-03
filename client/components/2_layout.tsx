"use client";
import { DataCard, DataFaculty } from "@/components/1_layout";
import { useState, useEffect } from "react";

//REVIEW - Cards for data display container
export function DataCardContainer({
    dataList,
}: {
    dataList: { value: string; type: string }[];
    }) {
        return (
            <div className="z-30 gap-y-5 grid-cols-1 place-items-center sm:grid-cols-3 grid  md:gap-x-5 md:justify-around md:grid-cols-5">
            {Object.entries(dataList).map(([key, value]) => (
                 <DataCard key={key} data={value} type={key} />
                ))} 
        </div>
    );
}

//REVIEW - Faculty for data display container
export function DataFacultyContainer() {
    type FacultyType = {
        profile: string;
        user_name: string;
        faculty_data: {
            designation: string;
            specialization: string;
        }[];
    };
    const [facultyData, setFacultyData] = useState<FacultyType[]>([]);
    useEffect(() => {
        fetch("/api/user/faculty-display-all")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setFacultyData(data);
            });
    }, []);
    return (
        <div className="gap-y-5 grid-cols-1 py-5 place-items-center sm:grid-cols-2 grid  md:gap-x-5 md:justify-around lg:grid-cols-3">
            {facultyData.map((value, index) => (
                <DataFaculty
                    image={value.profile}
                    name={value.user_name}
                    designation={value.faculty_data[0].designation}
                    specialization={value.faculty_data[0].specialization}
                    key={index}
                />
            ))}
        </div>
    );
}
