"use client";
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
export function Pill({ data }: { data: string }) {
    return (
        <div className="px-3 py-1 mx-3 my-5 mt-20 font-semibold text-orange-700 uppercase bg-orange-200 rounded-full shadow-md md:shadow-lg text-md md:text-xl md:mx-6 md:my-10 w-fit md:mt-28">
            {data}
        </div>
    );
}
import Image from "next/image";
export const InputClass = {
    input: "w-full p-2 border-b-2 rounded-md peer focus:border-orange-400 focus:border-2 border-b-orange-200 focus:ring-4 focus:ring-orange-300 focus:ring-offset-1 focus:px-3 placeholder:text-transparent focus:outline-none focus:rounded-md",
    label: "absolute left-0 px-1 ml-1 text-sm duration-150 ease-linear -translate-y-3 bg-white rounded-md peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-600 peer-focus:ml-3 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm",
};

export const ButtonClass =
    "mx-auto my-4 font-semibold bg-orange-600 rounded-full text-stone-100  focus:ring-4 text-md focus:ring-offset-0 focus:ring-orange-400 h-7 px-3";
//REVIEW - Welcome tag for sign in
export function ErrorTag({ type, data }: { type: string; data: string }) {
    interface ErrorData {
        [key: string]: {
            type: string;
            image: string;
            text: string;
            textColor: string;
            bgColor: string;
        };
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [runModal, setRunModal] = useState(true);
    const errorData: ErrorData = {
        success: {
            type: "Success",
            image: "verified.svg",
            text: "Congratulations !",
            textColor: "text-emerald-600",
            bgColor: "bg-emerald-200",
        },
        question: {
            type: "Question",
            image: "question.svg",
            text: "Did you know ?",
            textColor: "text-sky-600",
            bgColor: "bg-sky-200",
        },
        warning: {
            type: "Warning",
            image: "warning.svg",
            text: "Warning",
            textColor: "text-yellow-600",
            bgColor: "bg-yellow-200",
        },
        alert: {
            type: "Alert",
            image: "denied.svg",
            text: "Something went wrong !",
            textColor: "text-rose-600",
            bgColor: "bg-rose-200",
        },
    };
    const dataToggle = errorData[type];
    setTimeout(() => {
        if (runModal) {
            onOpen();
            setRunModal(false);
        }
    }, 1000);
    return (
        <>
            <Modal
                size="sm"
                backdrop="opaque"
                isOpen={isOpen}
                onClose={onClose}
                className="flex self-start mt-5"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className={`flex flex-col gap-1 font-sans ${dataToggle.bgColor} capitalize text-xl tracking-wider`}
                            >
                                <div className={dataToggle.textColor}>
                                    {dataToggle.type}
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <Image
                                    src={`/icons/${dataToggle.image}`}
                                    alt="denied"
                                    className="w-40 mx-auto mt-5 h-40"
                                    width={1}
                                    height={1}
                                    unoptimized={true}
                                />
                                <div
                                    className={`font-bold text-xl my-3 md:text-2xl text-center ${dataToggle.textColor}`}
                                >
                                    {dataToggle.text}
                                </div>
                                <div className="text-center text-stone-500 tracking-wide text-sm md:text-md md:font-semibold">
                                    Invalid userName and password
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className="text-lg font-semibold text-white w-24 rounded-lg bg-orange-600 hover:bg-orange-500 shadow-md shadow-orange-400 border-b-4 border-b-orange-700 mx-auto"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
