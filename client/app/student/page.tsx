"use client";
import Image from "next/image";
import { useState, useEffect,ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function Student() {
    return (
        <StudentRecord>
            <TabsData StudentTab={<StudentTab/>} SubjectTab={<SubjectTab/>} />
        </StudentRecord>
    );
}

function StudentRecord({ children }:{children:React.ReactNode}) {
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
        <div className="min-h-screen flex items-center justify-center bg-orange-200 pb-10">
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
                <p className="text-lg text-center mb-1 text-cyan-600 underline underline-offset-4">
                    @&nbsp;&nbsp;{data.email_id}
                </p>
                <p className="text-gray-600 text-center mb-1">
                    You have last visited the website on&nbsp;&nbsp;<span className="font-semibold text-stone-500">{data.last_logged}</span>
                </p>
                <div className="bg-orange-300 w-fit px-3 py-1 rounded-full font-bold text-orange-600 capitalize mx-auto my-5" onClick={handleLogout}>
                    Logout
                </div>
                {children}
            </div>
        </div>
    );
}

interface TabsChildren{
    StudentTab:ReactNode,
    SubjectTab:ReactNode,
}
function TabsData({StudentTab,SubjectTab}:TabsChildren) {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options"
                color="primary"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-teal-600"
                }}
            >
                <Tab key="assignment" title="Assignment">
                    <Card shadow="lg" radius="md" fullWidth={true}>
                        <CardBody>
                            {StudentTab}
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="subject" title="Subject">
                    <Card shadow="lg" radius="md" fullWidth>
                        <CardBody>
                            {SubjectTab}
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="paper" title="Paper">
                    <Card shadow="lg" radius="md" fullWidth>
                        <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}

function StudentTab() {
     interface StudentData{
    roll_no: number;
    assessment_record_detail: {
            status: boolean;
            last_changed: string;
        }
    assessment_detail: {
        title: string;
    },
    assessment_type: [
      {
            assessment_type: string;
      }
    ]
    };
    const [student,setStudent] = useState<StudentData[]>([]);
    useEffect(() => {
        if (student.length === 0) {
            fetch("/api/assessment/get-student-assessment-record")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((dataValue) => {
                    setStudent(dataValue);
                })
                .catch((error) => {
                    console.error("Error fetching faculty data:", error);
                });
        }
    });
    return (
        <>
            <div className="space-y-5 my-10">
                {student.map((data, index) => (
                    <div key={index} className={`flex flex-col items-center w-fit mx-auto px-4 rounded-lg border-2  space-y-3 py-3 ${data.assessment_record_detail.status? `bg-orange-200 border-orange-400` :"bg-stone-200 border-stone-400"}`}>
                        <div className="flex items-center flex-row space-x-5"><span className="capitalize font-semibold text-stone-600 text-lg">{data.assessment_detail.title}</span><span>{data.assessment_record_detail.status? 'submitted': 'created'} on</span><span className="text-md">{data.assessment_record_detail.last_changed}</span></div>
                        <div className="bg-teal-200 rounded-full border-2 border-teal-500 px-2 text-sm">{data.assessment_type[0].assessment_type}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

function SubjectTab() {
    interface SubjectData{
        roll_no: number;
        allotment_year: number;
        semester_detail: {
            subject_name: string;
            type: string;
            code: string;
            credit: string;
            subject_plan: string;
        }
    };
     const [subject,setSubject] = useState<SubjectData[]>([]);
    useEffect(() => {
        if (subject.length === 0) {
            fetch("/api/assessment/get-student-subject")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((dataValue) => {
                    console.log(dataValue);
                    setSubject(dataValue);
                })
                .catch((error) => {
                    console.error("Error fetching faculty data:", error);
                });
        }
    },[subject]);
    return (
        <>
            <div className="flex flex-col my-5 w-fit mx-auto p-4 rounded-md ">
                <div className="flex flex-row space-x-4 text-stone-600 font-semibold items-center mx-auto mb-10">
                    <span>Roll No <span className="text-4xl">{subject[0]?.roll_no}</span></span>
                    <span className="items-center flex">Batch year&nbsp;<span className="text-xl">{subject[0]?.allotment_year}</span></span>
                </div>
                <div className="space-y-10">
                    {subject.map((data, index) => (
                        <div key={index} className="bg-orange-100 border-l-4 border-l-teal-600 space-y-5 p-5 rounded-lg shadow-md shadow-stone-400">
                            <div className="flex flex-row space-x-4 mx-auto"><span className="font-semibold capitalize text-stone-600 tracking-wider">{data.semester_detail.subject_name}</span><span className="uppercase">{data.semester_detail.code}</span>
                                <span>
                                    <span>credit</span>&nbsp;&nbsp;
                                    <span className="font-semibold">{data.semester_detail.credit}</span>
                                </span>
                            </div>
                            <div className="mx-auto bg-teal-400 rounded-400 w-fit px-4  uppercase border-teal-600 border-2 rounded-full">{data.semester_detail.type}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
