"use client";
import { FaDownload, FaEdit } from "react-icons/fa";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdLibraryAdd } from "react-icons/md";
import { FacultyDropDown } from "@/components/1_layout";

function AddSemester({ course_number }: { course_number: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const path = usePathname();
    return (
        <>
            <div
                className="bg-stone-500 w-56 mx-auto my-6 shadow-md shadow-stone-400 font-semibold text-white py-1.5 rounded-md center items-center space-x-3 justify-center text-lg flex flex-row"
                onClick={() => onOpen()}
            >
                <span className="text-lg">
                    <MdLibraryAdd />
                </span>
                <div>ADD SEMESTER</div>
            </div>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    encType="multipart/form-data"
                    action={`/api/course/add-semester/${course_number}`}
                    method="POST"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add semester
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <FacultyDropDown />
                                    <input
                                        type="hidden"
                                        name="path"
                                        value={path}
                                    />
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="dropzone-file"
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
                                                        Click to upload Syllabus
                                                        Image
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    PDF
                                                </p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                name="syllabus"
                                                accept="application/pdf"
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
                                        className="bg-orange-500 shadow-lg px-3 rounded-lg shadow-orange-300 text-white font-semibold"
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

function CourseSemesterDetail({
    semester_number,
    subject,
    faculty_name,
    syllabus,
    semester_id,
}: {
    semester_number: number;
    subject: number;
    faculty_name: string;
    syllabus: string;
    semester_id: string;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    };
    const path = usePathname();
    return (
        <>
            <div className="flex flex-col bg-white md:px-10 my-10 shadow-md w-fit mx-auto px-5 py-3 shadow-stone-400 rounded-lg">
                <span
                    className="self-end text-stone-500 md:text-lg text-base mb-5 mt-2"
                    onClick={handleOpen}
                >
                    <FaEdit />
                </span>
                <div className="flex flex-row space-x-5 justify-center md:text-lg text-base  items-center">
                    Semester -
                    <span className="font-bold">&nbsp;{semester_number}</span>
                    <span>by</span>
                    <span className="capitalize font-semibold md:text-base text-sm">
                        {faculty_name}
                    </span>
                    <a
                        href={syllabus}
                        className="text-stone-600  md:text-base text-sm border-2 border-orange-200 bg-orange-100 rounded px-3 py-2"
                    >
                        <FaDownload />
                    </a>
                </div>
                <Link
                    href={`${path}/${semester_number}-${semester_id}`}
                    className="flex flex-row bg-teal-200 border-teal-400 border-2 w-fit rounded-full self-center my-3 px-4 space-x-3"
                >
                    <span className="md:text-base text-sm self-center">
                        Subject
                    </span>
                    <span className="md:text-base text-sm self-center">
                        {subject}
                    </span>
                </Link>
            </div>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    encType="multipart/form-data"
                    action={`/api/course/update-semester/${semester_id}`}
                    method="POST"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Semester - {semester_number}
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <FacultyDropDown />
                                    <input
                                        type="hidden"
                                        name="path"
                                        value={path}
                                    />
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="dropzone-file"
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
                                                        Click to upload Syllabus
                                                        Image
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    PDF
                                                </p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                name="syllabus"
                                                accept="application/pdf"
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
                                        className="bg-orange-500 shadow-lg px-3 rounded-lg shadow-orange-300 text-white font-semibold"
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

export default function CourseDetails() {
    interface SemesterData {
        _id: string;
        number_of_subject: number;
        semester_number: number;
        syllabus_document: string;
        user_info: {
            user_name: string;
        };
    }
    const pathName = useParams();
    const patternValue = pathName.course_details;
    const pattern =
        typeof patternValue === "string" ? patternValue.split("-") : [];
    const courseName = pattern[0];
    const courseNumber = pattern[1];
    const [data, setData] = useState<SemesterData[]>([]);
    useEffect(() => {
        fetch(`/api/course/semester-details/${courseNumber}`)
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
    }, [courseNumber]);
    return (
        <div className="py-14 gap-y-6 flex flex-col">
            <div className="text-center w-full md:text-4xl text-2xl my-5 ">
                {courseName.replaceAll("%20", " ")} Details
            </div>
            <AddSemester course_number={courseNumber} />
            <div className="grid lg:grid-cols-2 grid-cols-1">
                {data.map((value, index) => (
                    <CourseSemesterDetail
                        key={index}
                        semester_number={value.semester_number}
                        subject={value.number_of_subject}
                        faculty_name={value.user_info.user_name}
                        syllabus={value.syllabus_document}
                        semester_id={value._id}
                    />
                ))}
            </div>
        </div>
    );
}
