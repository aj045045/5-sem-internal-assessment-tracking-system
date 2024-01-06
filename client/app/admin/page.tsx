"use client";
import { Pill } from "@/components/utilities";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    useDisclosure,
    ModalContent,
} from "@nextui-org/react";
import { InputClass } from "@/components/utilities";
import { useState, useEffect } from "react";
import { DataCardContainer, DataFacultyContainer } from "@/components/2_layout";
import { useRouter, usePathname } from "next/navigation";

function AdminWelcome() {
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
     interface AdminData {
       email_id: string;
       last_logged: string;
       password: string;
       profile: string;
       user_name: string;
       user_type: string;
       _id: string;
   }
   const [admin, setAdmin] = useState<AdminData[] |any>([]);
   useEffect(() => {
       if (admin.length === 0) {
           fetch("/api/user/get-user")
               .then((response) => {
                   if (!response.ok) {
                       throw new Error("Network response was not ok");
                   }
                   return response.json();
               })
               .then((dataValue) => {
                   setAdmin(dataValue);
               })
               .catch((error) => {
                   console.error("Error fetching faculty data:", error);
               });
       }
   }); 
    return (
        <div className="flex flex-row md:justify-center justify-around pt-5 select-none">
            <div className="flex text-sm md:text-lg text-stone-700 flex-col w-full mx-3 px-5 md:p-10  py-5 bg-orange-100 border-orange-300 border-2 rounded-md p-2">
                <div className="">
                    Hello&nbsp;&nbsp;
                    <span className="font-semibold tracking-wider ">ADMIN</span>
                </div>
                <div className="">Here is your overview of department !</div>
                <div><span>You have last visited the website on </span><span className="font-semibold text-stone-600">{admin.last_logged}</span></div>
            </div>
            <div
                className="text-sm mx-2 md:text-lg bg-orange-600 h-fit py-1 px-2 text-white font-semibold rounded-md"
                onClick={handleLogout}
            >
                Sign&nbsp;out
            </div>
        </div>
    );
}

function PageNav() {
    const handleCreateKeys = () => {
        fetch("/api/paper/keys")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.blob(); // Handle the response as a blob directly
            })
            .then((blob) => {
                const currentDate = new Date();
                let year, day, month, hour, min, second;
                year = currentDate.getFullYear();
                day = currentDate.getDate();
                month = currentDate.getMonth();
                hour = currentDate.getHours();
                min = currentDate.getMonth();
                second = currentDate.getSeconds();
                const fileName = `keys-${day}-${month}-${year}_${hour};${min};${second}.zip`;
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            })
            .catch((error) => {
                console.error("Error fetching keys:", error);
            });
    };
    const path = usePathname();
    const [chooseData, setChooseData] = useState<number>(0);
    const [course, setCourse] = useState<string>("");
    const [semester, setSemester] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    };
    return (
        <>
            <div className="flex justify-around space-x-4 my-10 text-xs md:text-base">
                <div className="bg-orange-200 px-3  py-1 rounded-md border-2 border-orange-300" onClick={handleOpen}>    Decrypt paper</div>
                <div onClick={handleCreateKeys}  className="bg-orange-200 px-3  py-1 rounded-md border-2 border-orange-300" >    Create keys</div>
                <div className="bg-orange-200 px-3  py-1 rounded-md border-2 border-orange-300">    Papers</div>
            </div>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    action="/api/paper/decrypt-paper"
                    method="POST"
                    encType="multipart/form-data"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Decrypt Paper
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <ChooseCourse
                                        setChooseData={setChooseData}
                                        setCourse={setCourse}
                                    />
                                    <ChooseSemester
                                        data={chooseData}
                                        setChooseData={setChooseData}
                                        course={course}
                                        setSemester={setSemester}
                                    />
                                    <ChooseSubject
                                        setChooseData={setChooseData}
                                        setSubject={setSubject}
                                        data={chooseData}
                                        semester={semester}
                                    />
                                    <ChoosePaper subject={subject} data={chooseData} />
                                    <input type="hidden" name="path" value={path} />
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
type SubjectType = {
    data: number;
    semester: string;
    setChooseData: React.Dispatch<React.SetStateAction<number>>;
    setSubject: React.Dispatch<React.SetStateAction<string>>;
};

function ChooseCourse({ setChooseData, setCourse }: CourseType) {
    interface CourseType {
        _id: string;
        course_name: string;
    }
    const [courseData, setCourseData] = useState<CourseType[]>([]);
    useEffect(() => {
        fetch("/api/assessment/choose-course")
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
    }, [setChooseData]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let value = e.target.value;
        setChooseData(1);
        setCourse(value);
    };
    return (
        <div className="w-full">
            <select
                onChange={(e) => handleSelectChange(e)}
                name="course"
                defaultValue={"course"}
                className={InputClass.input}
            >
                <option
                    value="course"
                    disabled
                    className="bg-orange-600 text-white "
                >
                    Choose course
                </option>
                {courseData.map((value: CourseType, index: any) => (
                    <option key={index} value={value._id}>
                        {value.course_name}
                    </option>
                ))}
            </select>
        </div>
    );
}

function ChooseSemester({
    setChooseData,
    data,
    setSemester,
    course,
}: SemesterType) {
    const isButtonDisabled = () => {
        return data >= 1 ? false : true;
    };

    interface SemesterType {
        _id: string;
        semester_number: number;
    }
    const [semesterData, setSemesterData] = useState<SemesterType[]>([]);
    useEffect(() => {
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
    }, [course]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChooseData(data + 1);
        setSemester(e.target.value);
    };

    return (
        <div className="w-full">
            <select
                name="semester"
                disabled={isButtonDisabled()}
                onChange={(e) => handleSelectChange(e)}
                defaultValue={"semester"}
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
                    <option key={index} value={value._id}>
                        Semester {value.semester_number}{" "}
                    </option>
                ))}
            </select>
        </div>
    );
}

function ChooseSubject({ data, semester,setChooseData,setSubject }: SubjectType) {
    interface SubjectType {
        _id: string;
        subject_name: number;
        code: string;
    }
    const [subject, setSubject_data] = useState<SubjectType[]>([]);
    useEffect(() => {
        fetch(`/api/assessment/assessment-subject/${semester}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setSubject_data(data);
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
    }, [semester,setSubject]);
    const isButtonDisabled = () => {
        return data >= 2 ? false : true;
    };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChooseData(data + 1);
        setSubject(e.target.value);
    };
    return (
        <div className="w-full">
            <select
                name="subject"
                onChange={(e)=>handleSelectChange(e)}
                disabled={isButtonDisabled()}
                defaultValue={"Subject"}
                className={`${InputClass.input} disabled:bg-stone-300 disabled:border-2 disabled:border-stone-500`}
            >
                <option
                    value="Subject"
                    disabled
                    className="bg-orange-600 text-white "
                >
                    Choose Subject
                </option>
                {subject.map((value, index) => (
                    <option key={index} value={value._id}>
                        {value.subject_name} - {value.code}{" "}
                    </option>
                ))}
            </select>
        </div>
    );
}

function ChoosePaper({
    data,
    subject,
}: { data: number; subject:string}) {
    const isButtonDisabled = () => {
        return data >= 3 ? false : true;
    };
    interface SubjectType{
        _id: string;
        title: string;
    }
    const [semesterData, setSemesterData] = useState<SubjectType[]>([]);
    useEffect(() => {
        fetch(`/api/paper/get-paper/${subject}`)
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
    }, [subject]);
    return (
        <div className="w-full">
            <select
                name="paper"
                disabled={isButtonDisabled()}
                defaultValue={"Paper"}
                className={`${InputClass.input} disabled:bg-stone-300 disabled:border-2 disabled:border-stone-500`}
            >
                <option
                    value="Paper"
                    disabled
                    className="bg-orange-600 text-white "
                >
                    Choose Paper
                </option>
                {semesterData.map((value, index: any) => (
                    <option key={index} value={value._id}>
                        Semester {value.title}
                    </option>
                ))}
            </select>
            <label
                htmlFor="question_paper_file"
                className="flex flex-col mt-10 items-center justify-center w-full h-40 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                            Click to upload Private key for decryption
                        </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        DOCX
                    </p>
                </div>
                <input
                    id="question_paper_file"
                    type="file"
                    name="private_key"
                    required
                    accept=".pem"
                    className="hidden"
                />
            </label>
        </div>
    );
}

export default function AdminPage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (data.length === 0) {
            fetch("/api/user/data-list")
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
    }, [data.length]);
    return (
        <>
            <AdminWelcome />
            <PageNav />
            <Pill data="Summary" />
            <DataCardContainer dataList={data} />
            <Pill data="Faculty" />
            <DataFacultyContainer />
        </>
    );
}
