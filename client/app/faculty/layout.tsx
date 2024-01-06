"use client";
import { useState,useEffect } from "react";
import { useRouter,usePathname } from "next/navigation";
import Image from "next/image";
import { Modal, ModalBody, ModalFooter,ModalHeader,Button, useDisclosure,ModalContent, Navbar,NavbarBrand,NavbarContent,NavbarItem,NavbarMenu,NavbarMenuItem,NavbarMenuToggle,} from "@nextui-org/react";
import { InputClass } from "@/components/utilities";

export default function Faculty({ children }: { children: React.ReactNode }) {
  const router = useRouter();
    useEffect(() => {
        fetch('/api/user/check-login')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.redirect != "faculty")
                {
                    router.replace('/');   
                }
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
    },[router]);
    return (
        <>
            <NavbarPage />
            <div className="py-5">
                {children}
            </div>
        </>
    );
}

function NavbarPage() {
    const router = useRouter();
    const [chooseData, setChooseData] = useState<number>(0);
    const [course, setCourse] = useState<string>("");
    const [semester, setSemester] = useState<string>("");
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
    }
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");
    const linkData = [
        { linkValue: "", display: "Home" },
        { linkValue: "assessment", display: "Assignment" },
        { linkValue: "subjects", display: "Subjects" },
    ];
        const { isOpen, onOpen, onClose } = useDisclosure();
        const handleOpen = () => {
            onOpen();
        };
    const handleClick = (value: string) => {
        setActiveSection(value)
        if (path !== `/faculty/${value}`) {
            router.push(`/faculty/${value}`)
        }
    }
    return (
        <>
            <Navbar
                onMenuOpenChange={setIsMenuOpen}
                className="py-1 bg-orange-100 shadow-md select-none shadow-stone-300"
            >
                <NavbarContent>
                    <NavbarBrand>
                        <Image
                            src="/icons/dcs-logo-remove-bg.png"
                            className="w-16 rounded-full"
                            alt="brand-icons"
                            width={2}
                            height={2}
                            unoptimized={true}
                        />
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden gap-4 sm:flex" justify="start">
                    {linkData.map((item, index) => (
                        <NavbarItem key={index}>
                            <div
                                onClick={() => handleClick(item.linkValue)}
                                className={`w-full px-4 py-2.5 font-semibold capitalize tracking-widest select-none font-sans ${item.linkValue === activeSection
                                        ? " text-teal-700  border-b-2 border-b-teal-500  underline-offset-4   "
                                        : "hover:bg-orange-200 rounded-md text-stone-600 "
                                    }`}
                            >
                                {item.display}
                            </div>
                        </NavbarItem>
                    ))}
                    <div onClick={handleOpen} className="px-4 py-2 font-semibold transition duration-300 rounded-md cursor-pointer text-stone-600 hover:bg-orange-200 select-none">
                        Paper
                    </div>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                </NavbarContent>
                <NavbarMenu className="pt-8 space-y-1">
                    {linkData.map((item, index) => (
                        <NavbarMenuItem key={index}>
                            <div
                                onClick={() => handleClick(item.linkValue)}
                                className={`w-full capitalize px-4 py-1 font-semibold select-none tracking-widest font-sans ${item.linkValue === activeSection
                                        ? " text-teal-700  border-b-2 border-b-teal-500  underline-offset-4   "
                                        : "hover:bg-orange-200 rounded-md text-stone-600"
                                    }`}
                            >
                                {item.display}
                            </div>
                        </NavbarMenuItem>
                    ))}
                            <div onClick={handleOpen} className="px-4 py-2 font-semibold transition duration-300 rounded-md cursor-pointer text-stone-600 hover:bg-orange-200 select-none">
                                Paper
                            </div>
                </NavbarMenu>
                <div className="flex items-center">
                    <Image
                        unoptimized={true}
                        width={0}
                        height={0}
                        src="/icons/user.png"
                        alt="Profile"
                        className="w-10 h-10 mr-2 border-t-2 rounded-full shadow-md border-t-stone-300 shadow-stone-400"
                    />
                    <button className="px-3 py-0.5 font-semibold text-white bg-orange-600 rounded-full" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </Navbar>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    action="/api/paper/encrypt-paper"
                    method="POST"
                    encType="multipart/form-data"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add Question Paper
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <input type="hidden" name="path" value={path} />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="title"
                                            className={InputClass.input}
                                            placeholder="Paper Title"
                                        />
                                        <label
                                            htmlFor="title"
                                            className={InputClass.label}
                                        >
                                            Paper title
                                        </label>
                                    </div>
                                    <ChooseCourse setChooseData={setChooseData} setCourse={setCourse} />
                                    <ChooseSemester data={chooseData} setChooseData={setChooseData} course={course} setSemester={setSemester} />
                                    <ChooseSubject data={chooseData} semester={semester} />
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="question_paper_file"
                                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100"
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
                                                        Click to upload Question Paper
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    DOCX
                                                </p>
                                            </div>
                                            <input
                                                id="question_paper_file"
                                                type="file"
                                                name="question_paper"
                                                required
                                                accept=".docx"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="public_key"
                                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100"
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
                                                        Click to Public Key
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    PEM
                                                </p>
                                            </div>
                                            <input
                                                id="public_key"
                                                type="file"
                                                name="public_key"
                                                required
                                                accept=".pem"
                                                className="hidden"
                                            />
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

function ChooseCourse({ setChooseData,setCourse}:CourseType) {
    interface CourseType{
        _id: string,
        course_name: string,
    };
    const [courseData, setCourseData] = useState<CourseType[]>([]);
     useEffect(() => {
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
     }, [setChooseData]);
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let value = e.target.value; 
        setChooseData(1);
        setCourse(value);
    }
    return (
        <div className="w-full">
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
        }

    return (
        <div className="w-full">
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

function ChooseSubject({ data, semester }: { data: number; semester:string}) {
     interface SubjectType{
       _id: string,
       subject_name: number,
       code:string
    };
    const [subject, setSubject] = useState<SubjectType[]>([]); 
    useEffect(() => {
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
    }, [semester]);
     useEffect(() => {
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
     }, [semester]);
      const isButtonDisabled = () => {
        return data >= 2 ? false : true;
      };
    return (
        <div className="w-full">
            <select
                name="subject"
                disabled={isButtonDisabled()}
                defaultValue={'Subject'}
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
                    <option key={index} value={value._id}>{value.subject_name} - {value.code} </option>
                ))}
            </select>
        </div>
    );
}