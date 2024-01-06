"use client";
import { useEffect, useState } from "react";
import { Pill } from "@/components/utilities";
import { FaDownload } from "react-icons/fa";

export default function Subject() {
    interface SubjectType {
        subject_name: string;
        type: string;
        code: string;
        credit: string;
        subject_plan: string;
        semesterDetail: {
            semester_number: number;
        };
        courseDetail: {
            course_name: string;
            code: string;
        }[];
    }
    const [subject, setSubject] = useState<SubjectType[]>([]);
    useEffect(() => {
        if (subject.length === 0) {
            fetch("/api/course/get-faculty-subject")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setSubject(data);
                })
                .catch((error) => {
                    console.error("Error fetching faculty data:", error);
                });
        }
    });
    return (
        <>
            <Pill data="Subject Detail"/>
            <div className="space-y-16 py-10">
            {subject.map((data, index) => (
                <>
                    <SubjectDetail key={index} course_name={data.courseDetail[0].course_name} plan={data.subject_plan} course_code={data.courseDetail[0].code} credit={data.credit} name={data.subject_name} code={data.code} semester={data.semesterDetail.semester_number} type={data.type}/>
                </>
            ))}
            </div>
        </>
    );
}

function SubjectDetail({ course_name, course_code, credit, name, code, semester, type, plan }: { plan: string; course_name: string; course_code: string; credit: string; name: string; code: string; semester: number; type: string; }) {
    return (
        <div className="bg-white border-l-5 space-y-3 border-l-teal-500 w-fit flex flex-col items-center mx-auto py-4 px-8 shadow-lg shadow-stone-400 rounded-lg">
            <div className="space-x-10 capitalize text-lg flex flex-row items-center"><span>&quot;{course_name}&quot;</span><span>{course_code}</span><span className="text-stone-500 font-semibold">{semester}</span><a href={plan} className="bg-orange-200 p-2 border-2 border-orange-300 rounded-md text-stone-600"><FaDownload/></a></div>
            <div className="space-x-5"><span className="font-semibold uppercase tracking-wide text-stone-600 text-md underline underline-offset-4 decoration-2">{name}</span><span>{code}</span><span>{credit}&nbsp;&nbsp;credit</span></div>
            <div className="space-x-10 bg-teal-200  py-0.5 border-2 border-teal-400 rounded-full w-20 justify-center flex capitalize ">{type}</div>
        </div>
    )
}