"use client";
import { FaDownload, FaEdit } from "react-icons/fa";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { InputClass } from "@/components/utilities";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
function SemesterDetails() {
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <div className="flex flex-row space-x-6 justify-center md:mt-6 bg-teal-100 border-2 border-teal-200 rounded-full w-fit mx-auto my-2 px-3 ">
                        <span className="font-semibold mx-3">6</span>
                        subjects
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="edit">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Subject
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Code
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Credit
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Plan
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Faculty
                                        </th>
                                        <th className="px-6 py-3">EDIT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            Operating system
                                        </th>
                                        <td className="px-6 py-4">MCS-MMG</td>
                                        <td className="px-6 py-4">5</td>
                                        <td className="px-6 py-4">Theory</td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-stone-500"
                                            >
                                                <FaDownload />
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">Jay Patel</td>
                                        <td className="px-6 py-4 text-md">
                                            <FaEdit />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
}
function CourseSemester() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    };
    return (
        <>
            <div className="flex flex-col bg-white md:px-10  shadow-md w-fit mx-auto px-5 py-3 shadow-stone-400 rounded-lg">
                <span
                    className="self-end text-stone-500 text-lg mb-5 mt-2"
                    onClick={handleOpen}
                >
                    <FaEdit />
                </span>
                <div className="flex flex-row space-x-5 justify-center text-lg items-center">
                    Semester -<span className="font-bold">5</span>
                    <span className="">by</span>
                    <span className="capitalize font-semibold">Jay Patel</span>
                    <span className="text-stone-600 border-2 border-orange-200 bg-orange-100 rounded px-3 py-2">
                        <FaDownload />
                    </span>
                    <span className=""></span>
                </div>
                <SemesterDetails />
            </div>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    encType="multipart/form-data"
                    action="/api/user/faculty-sign-up"
                    method="POST"
                    onSubmit={() => console.log("SUBMIT FORM")}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Semester Name
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <div className="relative">
                                        <select
                                            name="faculty"
                                            className={InputClass.input}
                                        >
                                            <option value="">jay sir</option>
                                            <option value="">janvi</option>
                                            <option value="">ansh</option>
                                        </select>
                                        <label
                                            htmlFor="faculty"
                                            className={InputClass.label}
                                        >
                                            Choose Faculty
                                        </label>
                                    </div>
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
                                                    PNG or JPG
                                                </p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                name="profile"
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
    const pathName = useParams();
    console.log(pathName["course_details"]);
    const [data, setData] = useState([]);
    // http://127.0.0.1:5000/assessment-system/course/semester-details/6526a14836266c6413419d31
    useEffect(() => {
        fetch(`/api/course/semester-details/${pathName}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, [pathName]);
    return (
        <>
            <div className="text-center w-full text-3xl my-5">Course Name</div>
            <CourseSemester />
        </>
    );
}
