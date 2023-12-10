"use client";
import { DataFacultyContainer } from "@/components/2_layout";
import { InputClass, Pill } from "@/components/utilities";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
function AddFaculty() {
    type FormData = {
        userName: string;
        password: string;
        emailId: string;
        designation: string;
        phoneNo: string;
        specialization: string;
    };
    const [formData, setFormData] = useState<FormData>({
        userName: "", password: "", emailId: "", designation: "", specialization: "",phoneNo:""
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    };
    // const handleFormSubmit = (e: React.FormEvent) => {
    //     console.log('SUBMIT FORM');
    //     e.preventDefault();
    //     fetch("api/user/faculty-sign-up", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json", },
    //         body: JSON.stringify(formData),
    //     }).then((response: Response) => {
    //         if (response.ok) {
    //             return response.json();
    //         }
    //     }).then((dataValue: any) => {
    //         if (dataValue.redirect == "true") {
    //             console.log(dataValue.redirect)
    //         }
    //     })
    //      console.log("finish");
    // };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    return (
        <>
             <div className="flex border-l-4 border-l-teal-500 sm:flex-row flex-col items-center hover:bg-stone-100 py-4 my-16 bg-white border-t-2 rounded-md shadow-md border-t-stone-200 sm:justify-center  space-x-10 mx-auto sm:h-28 h-36 overflow-hidden w-96"
                onClick={() => handleOpen()}
                >
                <div className="flex flex-row items-center justify-center space-x-10 w-4/6 mx-auto h-28 ">
                    <Image
                        src={`/icons/user.svg`}
                        className="w-20 border-2 rounded-full shadow-inner border-stone-200"
                        alt="Image temp"
                        width={1}
                        height={1}
                        unoptimized={true}
                    />
                    <div className="flex flex-col w-40 gap-y-1 max-h-28">
                        <div className="text-lg font-semibold capitalize">
                            Add Faculty
                        </div>
                        <div className="text-sm capitalize ">
                            Click to add Faculty
                        </div>
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
                    encType="multipart/form-data"
                    action="/api/user/faculty-sign-up"
                    method="POST"
                    onSubmit={() => console.log("SUBMIT FORM")}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add Faculty
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="userName"
                                            className={InputClass.input}
                                            placeholder="User name"
                                        />
                                        <label
                                            htmlFor="userName"
                                            className={InputClass.label}
                                        >
                                            User Name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="emailId"
                                            className={InputClass.input}
                                            placeholder="email"
                                        />
                                        <label
                                            htmlFor="emailId"
                                            className={InputClass.label}
                                        >
                                            Email-Id
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="password"
                                            className={InputClass.input}
                                        />
                                        <label
                                            htmlFor="password"
                                            className={InputClass.label}
                                        >
                                            Password
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
                                                        Click to upload Profile
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
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="designation"
                                            placeholder="designation"
                                            className={InputClass.input}
                                        />

                                        <label
                                            htmlFor="designation"
                                            className={InputClass.label}
                                        >
                                            Designation
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phoneNo"
                                            placeholder="phone number"
                                            className={InputClass.input}
                                        />
                                        <label
                                            htmlFor="phoneNo"
                                            className={InputClass.label}
                                        >
                                            Phone No
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="specialization"
                                            placeholder="specialization"
                                            className={InputClass.input}
                                        />
                                        <label
                                            htmlFor="specialization"
                                            className={InputClass.label}
                                        >
                                            Specialization
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
                                        value="Submit"
                                        onClick={onClose}
                                        className="bg-orange-500 px-5 py-2 rounded-lg shadow-lg shadow-orange-300 text-white font-semibold"
                                        type="submit"/>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}

function FacultyUser() {
    return (
        <>
            <div className=" flex flex-col">
                <AddFaculty />
                <Pill data="Faculty Details" />
                <DataFacultyContainer/>
            </div>
        </>
    );
}
export default FacultyUser;
