"use client";
import { MdLibraryAdd } from "react-icons/md";
import { FaDownload, FaEdit } from "react-icons/fa";
import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { InputClass } from "@/components/utilities";
import { FacultyDropDown } from "@/components/1_layout";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Pill } from "@/components/utilities";
import { FaFileCsv } from "react-icons/fa6";
function AddSubject({ semester_id }: { semester_id: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const pathName = usePathname();
    return (
        <>
            <div
                className="bg-stone-400  mx-auto w-80 my-6 shadow-md shadow-stone-500 font-semibold text-white py-1.5 rounded-md center items-center space-x-3 justify-center text-lg flex flex-row"
                onClick={() => onOpen()}
            >
                <span className="text-lg">
                    <MdLibraryAdd />
                </span>
                <div>ADD SUBJECT</div>
            </div>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    onSubmit={() => console.log("SUBMIT FORM")}
                    encType="multipart/form-data"
                    action={`/api/course/add-subject`}
                    method="POST"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add Subject
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <input
                                        type="hidden"
                                        name="path"
                                        value={pathName}
                                    />
                                    <input
                                        type="hidden"
                                        name="semester_id"
                                        value={semester_id}
                                    />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="subject_name"
                                            className={InputClass.input}
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor="subject"
                                            className={InputClass.label}
                                        >
                                            Subject name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="code"
                                            className={InputClass.input}
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor="code"
                                            className={InputClass.label}
                                        >
                                            Code
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="credit"
                                            className={InputClass.input}
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor="credit"
                                            className={InputClass.label}
                                        >
                                            Credit
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <select
                                            name="type"
                                            defaultValue="theory"
                                            className={InputClass.input}
                                        >
                                            <option value="theory">
                                                Theory
                                            </option>
                                            <option value="practical">
                                                practical
                                            </option>
                                        </select>
                                        <label
                                            htmlFor="type"
                                            className={InputClass.label}
                                        >
                                            Choose Subject Type
                                        </label>
                                    </div>

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
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">
                                                    Click to upload Plan of the
                                                    Subject
                                                </span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PDF
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            accept="application/pdf"
                                            name="plan"
                                            className="hidden"
                                        />
                                    </label>
                                    <FacultyDropDown />
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

function AddStudent({ semester_id }: { semester_id: string }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const pathName = usePathname();
    return (
        <>
            <div
                className="bg-stone-400  mx-auto w-80 my-6 shadow-md shadow-stone-500 font-semibold text-white py-1.5 rounded-md center items-center space-x-3 justify-center text-lg flex flex-row"
                onClick={() => onOpen()}
            >
                <span className="text-lg">
                    <MdLibraryAdd />
                </span>
                <div>ADD STUDENT</div>
            </div>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    onSubmit={() => console.log("SUBMIT FORM")}
                    encType="multipart/form-data"
                    action={`/api/user/add-student`}
                    method="POST"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add Student
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <input
                                        type="hidden"
                                        name="path"
                                        value={pathName}
                                        required
                                    />
                                    <input
                                        type="hidden"
                                        name="semester_id"
                                        value={semester_id}
                                        required
                                    />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="student_name"
                                            className={InputClass.input}
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="student_name"
                                            className={InputClass.label}
                                        >
                                            Student name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email_id"
                                            className={InputClass.input}
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="email_id"
                                            className={InputClass.label}
                                        >
                                            E-mail Id
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="password"
                                            className={InputClass.input}
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="password"
                                            className={InputClass.label}
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="roll_no"
                                            className={InputClass.input}
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="roll_no"
                                            className={InputClass.label}
                                        >
                                            Roll no
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="allotment_year"
                                            className={InputClass.input}
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="allotment_year"
                                            className={InputClass.label}
                                        >
                                            Allotment Year
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
function Subject_row({
    subject_name,
    code,
    credit,
    type,
    plan,
    faculty_name,
    subject_id,
    semester_id,
}: {
    subject_name: string;
    code: string;
    credit: string;
    type: string;
    plan: string;
    faculty_name: string;
    subject_id: string;
    semester_id: string;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <tbody>
                <tr className="bg-white dark:bg-gray-800 hover:bg-neutral-100  dark:hover:bg-gray-600">
                    <th
                        scope="row"
                        className="px-6 py-4 uppercase text-stone-600 tracking-wide whitespace-nowrap dark:text-white"
                    >
                        {subject_name}
                    </th>
                    <td className="px-6 py-4">{code}</td>
                    <td className="px-6 py-4 ">{credit}</td>
                    <td className="px-6 py-4 capitalize">{type}</td>
                    <td className="px-6 py-4 text-right">
                        <a href={plan} className="font-medium text-stone-500">
                            <FaDownload />
                        </a>
                    </td>
                    <td className="px-6 py-4 capitalize text-black tracking-wide text-md">
                        {faculty_name}
                    </td>
                    <td className="px-6 py-4 text-md" onClick={() => onOpen()}>
                        <FaEdit />
                    </td>
                </tr>
            </tbody>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    encType="multipart/form-data"
                    action="/api/course/add-subject"
                    method="POST"
                    onSubmit={() => console.log("SUBMIT FORM")}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Edit Operating system
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <input
                                        type="hidden"
                                        name="semester_id"
                                        value={semester_id}
                                    />
                                    <input
                                        type="hidden"
                                        name="subject_id"
                                        value={subject_id}
                                    />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="subject"
                                            className={InputClass.input}
                                            placeholder=""
                                            value={subject_name}
                                        />
                                        <label
                                            htmlFor="subject"
                                            className={InputClass.label}
                                        >
                                            Subject name :
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="code"
                                            className={InputClass.input}
                                            placeholder=""
                                            value={code}
                                        />
                                        <label
                                            htmlFor="credit"
                                            className={InputClass.label}
                                        >
                                            Code :
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="credit"
                                            className={InputClass.input}
                                            placeholder=""
                                            value={credit}
                                        />
                                        <label
                                            htmlFor="credit"
                                            className={InputClass.label}
                                        >
                                            Credit :
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <select
                                            name="type"
                                            defaultValue={type}
                                            className={InputClass.input}
                                        >
                                            <option value="theory">
                                                Theory
                                            </option>
                                            <option value="practical">
                                                practical
                                            </option>
                                        </select>
                                        <label
                                            htmlFor="faculty"
                                            className={InputClass.label}
                                        >
                                            Choose Subject Type
                                        </label>
                                    </div>
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
                                                    Click to upload Plan of the
                                                    Subject
                                                </span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PDF
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            name="plan"
                                            accept="application/pdf"
                                            className="hidden"
                                        />
                                    </label>
                                    <FacultyDropDown />
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
function Subject({
    dataValue,
    semester_id,
}: {
    dataValue: {
        _id: string;
        subject_name: string;
        type: string;
        code: string;
        credit: string;
        subject_plan: string;
        user_info: { user_name: string };
    }[];
    semester_id: string;
}) {
    return (
        <div>
            <Pill data="Subject Details" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg shadow-stone-400">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm tracking-wide text-gray-700 uppercase bg-stone-200  border-b-2 border-b-stone-300  dark:bg-gray-700 dark:text-gray-400">
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
                    {dataValue.map((value: any, index: any) => (
                        <Subject_row
                            key={index}
                            subject_name={value.subject_name}
                            code={value.code}
                            credit={value.credit}
                            type={value.type}
                            plan={value.subject_plan}
                            faculty_name={value.user_info.user_name}
                            subject_id={value._id}
                            semester_id={semester_id}
                        />
                    ))}
                </table>
            </div>
        </div>
    );
}

function DisplayStudent({
    dataValue,
    semester_id,
}: {
    dataValue: {
        allotment_year: number;
        roll_no: number;
        user_info: {
            _id: string;
            email_id: string;
            user_name: string;
        };
    }[];
    semester_id: string;
}) {
    const path = usePathname();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
            <div className="flex flex-row items-center">
                <Pill data="student details" />
                <div
                    className="text-2xl ml-auto mr-10 mt-10 p-3 bg-orange-100 rounded-xl border-2 border-orange-200 w-fit"
                    onClick={() => onOpen()}
                >
                    <FaFileCsv />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg shadow-stone-400">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm tracking-wide text-gray-700 uppercase bg-stone-200  border-b-2 border-b-stone-300  dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Roll.no
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="text-center">
                                E-mail
                            </th>
                            <th scope="col" className="text-center">
                                Allotment Year
                            </th>
                            <th className="px-6 py-3">EDIT</th>
                        </tr>
                    </thead>
                    {dataValue.map((value: any, index: any) => (
                        <Student_row
                            key={index}
                            roll_no={value.roll_no}
                            name={value.user_info.user_name}
                            email_id={value.user_info.email_id}
                            allotment_year={value.allotment_year}
                            semester_id={semester_id}
                            user_id={value.user_info._id}
                        />
                    ))}
                </table>
            </div>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    encType="multipart/form-data"
                    action={`/api/user/add-student-file/${semester_id}`}
                    method="POST"
                    onSubmit={() => console.log("SUBMIT FORM")}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add Student Using CSV
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <div>
                                        Format of the CSV file will be{" "}
                                        <span className="font-bold">
                                            Name, E-mail Id, Roll_no, Allotment
                                            Year (row number 1 will be excluded)
                                        </span>
                                    </div>
                                    <input
                                        type="hidden"
                                        name="path"
                                        value={path}
                                    />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="password"
                                            className={InputClass.input}
                                            placeholder=""
                                        />
                                        <label
                                            htmlFor="password"
                                            className={InputClass.label}
                                        >
                                            Password :
                                        </label>
                                    </div>
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
                                                    Click to upload Student list
                                                    in csv format
                                                </span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                CSV
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            name="student_file"
                                            accept=".csv"
                                            className="hidden"
                                        />
                                    </label>
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
        </div>
    );
}
function Student_row({
    roll_no,
    name,
    email_id,
    allotment_year,
    semester_id,
    user_id,
}: {
    roll_no: number;
    name: string;
    email_id: string;
    allotment_year: string;
    semester_id: string;
    user_id: string;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const pathName = usePathname();
    return (
        <>
            <tbody>
                <tr className="bg-white dark:bg-gray-800 hover:bg-neutral-100  dark:hover:bg-gray-600">
                    <td className="px-6 py-4 text-base">{roll_no}</td>
                    <th
                        scope="row"
                        className="px-6 py-4 uppercase text-stone-600 tracking-wide whitespace-nowrap dark:text-white"
                    >
                        {name}
                    </th>
                    <td className="text-center">{email_id}</td>
                    <td className="text-center ">{allotment_year}</td>
                    <td className="px-6 py-4 text-md" onClick={() => onOpen()}>
                        <FaEdit />
                    </td>
                </tr>
            </tbody>
            <Modal
                className="self-start mt-10"
                size="md"
                isOpen={isOpen}
                onClose={onClose}
            >
                <form
                    onSubmit={() => console.log("SUBMIT FORM")}
                    encType="multipart/form-data"
                    action={`/api/course/add-subject`}
                    method="POST"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add Student
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <input
                                        type="hidden"
                                        name="path"
                                        value={pathName}
                                        required
                                    />
                                    <input
                                        type="hidden"
                                        name="semester_id"
                                        value={semester_id}
                                        required
                                    />
                                    <input
                                        type="hidden"
                                        name="user_id"
                                        value={user_id}
                                    />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="student_name"
                                            className={InputClass.input}
                                            placeholder=""
                                            value={name}
                                            required
                                        />
                                        <label
                                            htmlFor="student_name"
                                            className={InputClass.label}
                                        >
                                            Student name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email_id"
                                            className={InputClass.input}
                                            placeholder=""
                                            value={email_id}
                                            required
                                        />
                                        <label
                                            htmlFor="email_id"
                                            className={InputClass.label}
                                        >
                                            E-mail Id
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="roll_no"
                                            className={InputClass.input}
                                            placeholder=""
                                            value={roll_no}
                                            required
                                        />
                                        <label
                                            htmlFor="roll_no"
                                            className={InputClass.label}
                                        >
                                            Roll no
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="allotment_year"
                                            className={InputClass.input}
                                            value={allotment_year}
                                            placeholder=""
                                            required
                                        />
                                        <label
                                            htmlFor="allotment_year"
                                            className={InputClass.label}
                                        >
                                            Allotment Year
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

export default function Subject_details() {
    interface SubjectData {
        _id: string;
        subject_name: string;
        type: string;
        code: string;
        credit: string;
        subject_plan: string;
        user_info: {
            user_name: string;
        };
    }
    interface StudentDetails {
        allotment_year: number;
        roll_no: number;
        user_info: {
            _id: string;
            email_id: string;
            user_name: string;
        };
    }
    const path = useParams();
    const semester =    typeof path.subject_details === "string" ? path.subject_details.split("-")         : [];
    const patternValue = path.course_details;
    const courseName: string = typeof patternValue === "string" ? patternValue.slice(0, patternValue.lastIndexOf("-")) : "";
    const semesterNumber = semester[0];
    const semesterId = semester[1];
    const [student, setStudent] = useState<StudentDetails[]>([]);
    const [data, setData] = useState<SubjectData[]>([]);
    //REVIEW - GET SUBJECT DETAILS
    useEffect(() => {
        fetch(`/api/course/subject-details/${semesterId}`)
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
    }, [semesterId]);
    //REVIEW - GET STUDENT DETAILS
    useEffect(() => {
        fetch(`/api/user/student-details/${semesterId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("student", data);
                setStudent(data);
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
    }, [semesterId]);
    return (
        <>
            <div className="md:mx-20 md:pb-32 pb-16 space-y-14">
                <div className="flex space-y-6 items-center mt-10 flex-col">
                    <div className="text-xl md:text-3xl">
                        {courseName.replaceAll("%20", " ")}
                    </div>
                    <div className="text-lg md:text-2xl  underline-offset-4 text-stone-600">
                        Semester - {semesterNumber}
                    </div>
                </div>
                <div className="flex md:flex-row flex-col self-center">
                    <AddSubject semester_id={semesterId} />
                    <AddStudent semester_id={semesterId} />
                </div>
                <Subject dataValue={data} semester_id={semesterId} />
                <DisplayStudent dataValue={student} semester_id={semesterId} />
            </div>
        </>
    );
}
