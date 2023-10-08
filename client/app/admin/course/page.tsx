"use client";

import { FaBookMedical } from "react-icons/fa";
import { InputClass, Pill } from "@/components/utilities";
import {
    Select,
    SelectItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
function AddCourse() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    };
    return (
        <>
            <Button
                className="bg-transparent h-fit w-full"
                onPress={() => handleOpen()}
            >
                <div className="flex border-l-4 border-l-teal-500 sm:flex-row flex-col items-center py-4 my-16 bg-white border-t-2 rounded-md shadow-md border-t-stone-200 sm:justify-center  space-x-10 w-4/6 mx-auto sm:h-28 h-36 overflow-hidden">
                    <div className="md:text-4xl text-xl  rounded-full md:p-5 p-2 sm:m-0 mb-2 text-stone-600 border-2 border-stone-200 ">
                        <FaBookMedical />
                    </div>
                    <div className="flex flex-col w-40 gap-y-1 max-h-28">
                        <div className="text-lg font-semibold capitalize">
                            Add Course
                        </div>
                        <div className="text-sm capitalize ">
                            Click to add Course
                        </div>
                    </div>
                </div>
            </Button>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    encType="multipart/form-data"
                    action="/api/course/add-course"
                    method="POST"
                    onSubmit={() => console.log("SUBMIT FORM")}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add Course
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="courseName"
                                            className={InputClass.input}
                                            placeholder="Course"
                                        />
                                        <label
                                            htmlFor="courseName"
                                            className={InputClass.label}
                                        >
                                            Course Name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="duration"
                                            className={InputClass.input}
                                            placeholder="course"
                                        />
                                        <label
                                            htmlFor="courseDuration"
                                            className={InputClass.label}
                                        >
                                            Duration ( in years )
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="capacity"
                                            placeholder="course"
                                            className={InputClass.input}
                                        />
                                        <label
                                            htmlFor="capacity"
                                            className={InputClass.label}
                                        >
                                            Capacity
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="code"
                                            placeholder="course"
                                            className={InputClass.input}
                                        />
                                        <label
                                            htmlFor="code"
                                            className={InputClass.label}
                                        >
                                            Code
                                        </label>
                                    </div>
                                    <div className="flex w-full flex-wrap gap-4">
                                        <Select
                                            label="Select Course Type"
                                            placeholder="Select a type "
                                            className="w-full border-b-2  border-b-orange-200 rounded-md"
                                        >
                                            <SelectItem key="gia" value="gia">
                                                GIA
                                            </SelectItem>
                                            <SelectItem key="hpp" value="hpp">
                                                HPP
                                            </SelectItem>
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

function Course() {
    return <AddCourse />;
}

export default Course;
