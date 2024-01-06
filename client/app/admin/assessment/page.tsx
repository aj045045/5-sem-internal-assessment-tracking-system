"use client";
import { InputClass, Pill } from "@/components/utilities";
import React, { useState, useEffect, useRef} from "react";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Select, SelectItem, Button, } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Assessment() {
    const [chooseData, setChooseData] = useState<number>(0);
    const [course, setCourse] = useState<string>("");
    const [semester, setSemester] = useState<string>("");
    return (
        <div className="mt-10 pb-10">
            <div className=" md:flex-row flex-col space-y-10 md:space-y-0 items-center flex md:justify-evenly">
                <ChooseCourse setChooseData={setChooseData} setCourse={setCourse} />
                <ChooseSemester data={chooseData} setChooseData={setChooseData} course={course} setSemester={setSemester} />
            </div>
            <AddAssessmentCategory/>
            <AddAssessment data={chooseData} semester={semester} />
            <Pill data="Assessment Detail" />
            <AssessmentDetails semester={semester} data={chooseData} />
        </div>
    );
}

type CourseType = {
    setChooseData: React.Dispatch<React.SetStateAction<number>>;
    setCourse: React.Dispatch<React.SetStateAction<string>>;
};

type SemesterType = {
    setChooseData: React.Dispatch<React.SetStateAction<number>>;
    data: number;
    setSemester: React.Dispatch<React.SetStateAction<string>>;
    course: string;
};
type AddAssessmentType = {
    data: number;
    semester: string;
};
function ChooseCourse({ setChooseData,setCourse}:CourseType) {
    interface CourseType{
        _id: string,
        course_name: string,
    };
    const [courseData, setCourseData] = useState<CourseType[]>([]);
    useEffect(() => {
        if (courseData.length === 0) {
            fetch('/api/assessment/choose-course')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setCourseData(data);
                })
                .catch((error) => {
                    console.error("Error fetching faculty data:", error);
                });
        }
    }, [setChooseData, courseData.length]);
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let value = e.target.value; 
        setChooseData(1);
        setCourse(value);
    }
    return (
        <div className="md:w-72 w-40">
            <select
                onChange={(e) => handleSelectChange(e)}
                name="course"
                defaultValue={'course'}
                className={InputClass.input}
            >
                <option
                    value="course"
                    disabled
                    className="bg-orange-600 text-white "
                >
                    Choose course
                </option>
                {courseData.map((value:CourseType, index:any) => (
                    <option key={index} value={value._id}>{value.course_name}</option>
                    ))}
            </select>
        </div>
    );
};

function ChooseSemester({ setChooseData, data,setSemester,course }:SemesterType){
    const isButtonDisabled = () => {
        return data >= 1 ? false : true;
    };
    
     interface SemesterType{
        _id: string,
        semester_number: number,
    };
    const [semesterData, setSemesterData] = useState<SemesterType[]>([]);
    useEffect(() => {
        if (semesterData.length === 0) {
        fetch(`/api/assessment/choose-semester/${course}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setSemesterData(data);
                })
                .catch((error) => {
                    console.error("Error fetching faculty data:", error);
                });
            }
     }, [course,semesterData.length]);
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChooseData(data + 1);
        setSemester(e.target.value);
        }

    return (
        <div className="md:w-72 w-40">
            <select
                name="semester"
                disabled={isButtonDisabled()}
                onChange={(e) => handleSelectChange(e)}
                defaultValue={'semester'}
                className={`${InputClass.input} disabled:bg-stone-300 disabled:border-2 disabled:border-stone-500`}
            >
                 <option
                    value="semester"
                    disabled
                    className="bg-orange-600 text-white "
                >
                    Choose Semester
                </option>
                {semesterData.map((value: SemesterType, index: any) => (
                    <option key={index} value={value._id}>Semester {value.semester_number} </option>
                ))}
            </select>
        </div>
    );
}

function AddAssessmentCategory() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    };
    const path = usePathname();
    return (
        <>
            <div
                className={`flex  sm:flex-row flex-col py-4 my-16 rounded-md shadow-md sm:justify-center space-x-10 mx-auto h-26 overflow-hidden w-72 bg-white border-t-2 border-stone-200 border-l-4 border-l-teal-500 hover:bg-stone-100`}
                onClick={() => handleOpen()}
            >
                <div className="flex flex-col gap-y-1 max-h-28">
                    <div className="text-lg font-semibold capitalize">
                        Add Assessment Type
                    </div>
                    <div className="text-sm capitalize ">
                        Click to add Assessment Type
                    </div>
                </div>
            </div>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    action="/api/assessment/add-assessment-type"
                    method="POST"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add Assessment Type
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <input type="hidden" name="path" value={path} />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="assessment_category"
                                            className={InputClass.input}
                                            placeholder="Assessment Type"
                                        />
                                        <label
                                            htmlFor="assessment_category"
                                            className={InputClass.label}
                                        >
                                            Assessment Type
                                        </label>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <input
                                        type="submit"
                                        className="bg-orange-500 shadow-lg shadow-orange-300 text-white font-semibold px-4 rounded-lg"
                                    />
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}


function AddAssessment({ data,semester }:AddAssessmentType) {
    const path = usePathname();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    };
    interface SubjectType{
        _id: string,
        subject_name: number,
        code:string
    };
    interface AssessmentType{
        _id: string,
        assessment_type: number,
    };
    const [subject, setSubject] = useState<SubjectType[]>([]);
    const [type, setType] = useState<AssessmentType[]>([]);
    useEffect(() => {
        if (subject.length === 0) {
            
            fetch(`/api/assessment/assessment-subject/${semester}`)
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
    }, [semester,subject.length]);

    useEffect(() => {
        if (type.length === 0) {
            
            fetch(`/api/assessment/assessment-type`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setType(data);
                })
                .catch((error) => {
                    console.error("Error fetching faculty data:", error);
                });
        }
    }, [semester, type.length]);
    return (
        <>
            <div
                className={`flex  sm:flex-row flex-col items-center py-4 my-16 rounded-md shadow-md sm:justify-center space-x-10 mx-auto sm:h-28 h-36 overflow-hidden w-96 ${
  data >= 2 ? 'bg-white border-t-2 border-stone-200 border-l-4 border-l-teal-500 hover:bg-stone-100' : 'bg-stone-200 border-2 border-stone-400'
}`}
                onClick={() => { data >=2? handleOpen():null }}
            >
                <div className="md:text-4xl text-xl  rounded-full md:p-5 p-2 sm:m-0 mb-2 text-stone-600 border-2 border-stone-200 ">
                    <BsClipboard2CheckFill />
                </div>
                <div className="flex flex-col w-40 gap-y-1 max-h-28">
                    <div className="text-lg font-semibold capitalize">
                        Add Assessment
                    </div>
                    <div className="text-sm capitalize ">
                        Click to add Assessment
                    </div>
                </div>
            </div>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    action={`/api/assessment/add-assessment/${semester}`}
                    method="POST"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add Assessment
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <input type="hidden" name="path" value={path} />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="assessment_title"
                                            className={InputClass.input}
                                            placeholder="Assessment Title"
                                        />
                                        <label
                                            htmlFor="assessment_title"
                                            className={InputClass.label}
                                        >
                                            Assessment Title
                                        </label>
                                    </div>
                                    <div className="flex w-full flex-wrap gap-4">
                                        <Select
                                            name="subject"
                                            label="Subject"
                                            placeholder="Select a Subject "
                                            className="w-full border-b-2  border-b-orange-200 rounded-md"
                                        >
                                            {subject.map((value) => (<SelectItem key={value._id} >{value.subject_name} - {value.code}</SelectItem>))}
                                        </Select>
                                    </div>
                                    <div className="flex w-full flex-wrap gap-4">
                                        <Select
                                            name="type"
                                            label=" Assessment Type"
                                            placeholder="Select a type / category "
                                            className="w-full border-b-2  border-b-orange-200 rounded-md"
                                        >
                                            {type.map((value) => (<SelectItem key={value._id} >{value.assessment_type}</SelectItem>))}
                                        </Select>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <input
                                        type="submit"
                                        className="bg-orange-500 shadow-lg shadow-orange-300 text-white font-semibold px-4 rounded-lg"
                                    />
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}

function AssessmentDetails({semester,data}:AddAssessmentType) {
   interface AssessmentData{
        assessment_info: {
            _id: string,
            title: string,
        },
        code: string
        data_type: {
            assessment_type: string
        },
        subject_name:string 
    };
  const [assessment, setAssessment] = useState<AssessmentData[]>([]);
    useEffect(() => {
        if (data >= 2) {
            fetch(`/api/assessment/display-assessment/${semester}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setAssessment(data);
                })
                .catch((error) => {
                    console.error("Error fetching faculty data:", error);
                })
        };
    }, [semester, data]);
    return (
        <>
            {data < 2 ? (
                <div className="bg-stone-300 border-2 border-stone-400  flex flex-col py-5 space-y-2 w-80 mx-auto items-center px-5 rounded-md  shadow-md shadow-stone-300">
                    <div className="text-xl capitalize">Select Semester</div>
                    <div className="capitalize text-stone-600">None - <span className="font-mono font-semibold">none</span></div>
                    <div className="capitalize py-0.5 px-2.5 rounded-full bg-stone-200 border-2 border-stone-400">Select semester to view</div>
                </div>
            ) : (
                <div className="mt-10 flex-col grid md:grid-cols-2 ">
                    {assessment.map((data, index) => (
                        <>
                                <Link href={`assessment/${data.subject_name.replace(/\s+/g,'%20')}-${data.assessment_info._id}`} key={index} className="bg-white flex flex-col mb-10 py-5 space-y-3 mx-auto items-center px-5 rounded-md border-l-4 border-l-teal-500 shadow-md shadow-stone-300 border-t-2 border-stone-200 h-40 w-fit">
                                <div className="text-xl tracking-wider capitalize">{data.assessment_info?.title}</div>
                                <div className="capitalize text-stone-600">{data.subject_name} - <span className="font-mono font-semibold">{data.code}</span></div>
                                <div className="capitalize py-0.5 px-2.5 rounded-full bg-teal-200 border-2 border-teal-400">{data.data_type?.assessment_type}</div>
                            </Link>
                        </>
                    ))}
                </div>
            )}
        </>);
}