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
function AddSubject() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <div
                className="bg-stone-500 mx-10 my-6 shadow-md shadow-stone-400 font-semibold text-white py-1.5 rounded-md center items-center space-x-3 justify-center text-lg flex flex-row"
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
                    encType="multipart/form-data"
                    action="/api/course/add-subject"
                    method="POST"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-orange-200 text-orange-600">
                                    Add semester
                                </ModalHeader>
                                <ModalBody className="flex space-y-4 mt-5">
                                    <input
                                        type="hidden"
                                        name="id"
                                        value="id's"
                                    />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="subject"
                                            className={InputClass.input}
                                            placeholder=""
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
                                            className={InputClass.input}
                                        >
                                            <option value="theory" selected>
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
                                                PNG or JPG
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            name="plan"
                                            className="hidden"
                                        />
                                    </label>
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

function Subject_row() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
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
                        <a href="#" className="font-medium text-stone-500">
                            <FaDownload />
                        </a>
                    </td>
                    <td className="px-6 py-4">Jay Patel</td>
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
                                        name="id"
                                        value="id's"
                                    />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="subject"
                                            className={InputClass.input}
                                            placeholder=""
                                            value={"operating system"}
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
                                            value={"value"}
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
                                            value={"credit"}
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
                                            className={InputClass.input}
                                        >
                                            <option value="theory" selected>
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
                                                PNG or JPG
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            name="plan"
                                            className="hidden"
                                        />
                                    </label>
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
    return (
        <>
            <div className="md:mx-20 pb-96 ">
                <div>
                    <AddSubject />
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg shadow-stone-400">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-sm tracking-wide text-gray-700 uppercase bg-stone-100 border-l-4 border-l-teal-500  dark:bg-gray-700 dark:text-gray-400">
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
                            <Subject_row />
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
