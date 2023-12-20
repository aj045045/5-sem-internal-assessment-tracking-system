"use client";
import { useParams } from "next/navigation";
import { Checkbox,cn } from "@nextui-org/react";
import React,{ useState,useEffect } from "react";
import { ErrorTag } from "@/components/utilities";

export default function StudentAssessment() {
    const path = useParams();
    const patternValue = path.assessment_details;
    const assessmentName: string =
        typeof patternValue === "string"
            ? patternValue.slice(0, patternValue.lastIndexOf("-"))
            : "";
    const assessmentNumber = patternValue.slice(
        patternValue.lastIndexOf("-") + 1
    );
    interface AssessmentType {
    "_id": string,
    "last_changed": string,
    "status": boolean,
    "student_info": {
      "roll_no": number
    },
    "user_info": {
      "user_name": string
    }
    };
    const [assessmentData, setAssessmentData] = useState<AssessmentType[]>([]);
     useEffect(() => {
        fetch(`/api/assessment/get-assessment-record/${assessmentNumber}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setAssessmentData(data);
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
     }, [assessmentNumber]);
    return (
        <>
            <div className="w-full mx-auto text-sm text-center md:w-10/12 ">
                <div className="pt-20 mb-10 md:text-xl lg:text-2xl text-lg  tracking-wide [word-spacing:1rem]">
                    {decodeURIComponent(assessmentName)}
                </div>
                <TableHeader />
                <div className="flex flex-col space-y-8 mt-12 pb-12">
                    {assessmentData.map((value,index) => ( 
                        <CheckBox key={index} name={value.user_info.user_name} roll_no={value.student_info.roll_no} status={value.status} assessment_record_id={value._id} date={value.last_changed} />
                    ))}
                </div>
            </div>
        </>
    );
}

function TableHeader() {
    return (
        <div className="flex flex-row items-center mb-4 text-sm tracking-wide text-gray-700 shadow-md shadow-stone-300 uppercase border-b-2 bg-stone-300 border-b-stone-400 rounded-xl ">
            <div className="py-3 pl-10 sm:pl-16 md:pl-26 lg:pl-32">Choose</div>
            <div className="py-3 pl-10 sm:pl-16 md:pl-26 lg:pl-32">Roll No</div>
            <div className="py-3 pl-10 sm:pl-16 md:pl-26 lg:pl-32">Name</div>
            <div className="py-3 pl-10 sm:pl-16 md:pl-26 lg:pl-32">
                Recent Viewed
            </div>
        </div>
    );
}

function CheckBox({ name, assessment_record_id, roll_no, date, status }: { name: string, assessment_record_id: string,roll_no:number,date:string,status:boolean }) {
    const [isSelected, setIsSelected] = useState(status);
    const [response, setResponse] = useState<React.ReactNode | null | string>(null);
    interface DataType{
        assessment_id: string;
        status: boolean;
    };
    const handleChangeStatus = (e: React.ChangeEvent<HTMLElement>) => {
        setIsSelected(!isSelected);
        e.preventDefault();
        const postData: DataType = {
            assessment_id: assessment_record_id,
            status: !isSelected
        };
        fetch('/api/assessment/change-assessment-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.change);
                if (data.change === "False")
                {
                    setResponse(<ErrorTag data="Some Error Occur Please Try after some time !" type="alert" />);    
                }
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
    };
    
    return (
        <>
            {response}
            <Checkbox
                aria-label={name}
                classNames={{
                    base: cn(
                        "inline-flex w-full max-w-full bg-content1 ",
                        "hover:bg-content2 items-center justify-start shadow-lg shadow-stone-300 border-t-2 border-t-stone-150",
                        "cursor-pointer rounded-lg gap-2 pl-14 sm:pl-20 md:pl-24 lg:pl-32 py-3",
                        "overflow-hidden data-[selected=true]:border-2 data-[selected=true]:bg-orange-100 data-[selected=true]:border-orange-300"
                    ),
                    label: "min-w-full",
                }}
                color="warning"
                size="md"
                isSelected={isSelected}
                onChange={handleChangeStatus}
            >
                <div className="flex flex-row w-full gap-2">
                    <div className="flex flex-row w-full items-center">
                        <div className="py-3 ml-12 lg:text-lg md:text-base text-sm font-semibold sm:ml-20 lg:ml-36">
                            {roll_no}
                        </div>
                        <div className="py-3 ml-12 capitalize text-center text-sm sm:text-sm  md:text-base lg:text-lg w-20 sm:ml-20 lg:ml-36 sm:w-24 md:w-40">
                            {name}
                        </div>
                        <div className="px-4 my-3 ml-12 text-teal-800 bg-teal-200 border-2 text-xs border-teal-400 rounded-full sm:ml-20 sm:text-sm lg:text-base">
                            {date}
                        </div>
                    </div>
                </div>
            </Checkbox>
        </>
    );
}
