"use client";
import Image from "next/image";
import { useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";

import { Input } from "./utilities";

//REVIEW - Data card for Pages container
export function DataCard({ data, type }: { data: string; type: string }) {
    return (
        <div className="flex flex-row items-center justify-center w-40 h-12 space-x-3 bg-white border-t-2 border-l-4 rounded-md shadow-md md:w-44 border-l-teal-500 border-t-stone-200 md:h-14">
            <div className="text-3xl font-semibold md:text-4xl">{data}</div>
            <div className="mt-3 font-sans uppercase text-md md:text-lg">
                {type}
            </div>
        </div>
    );
}

//REVIEW - Hero Image for signIn page
export function HeroHeader() {
    return (
        <>
            <div className="absolute z-10 mx-5 mt-10 font-sans text-3xl font-extrabold leading-10 tracking-wider text-center text-white uppercase md:w-2/6 md:text-justify drop-shadow-md md:text-5xl lg:text-6xl">
                knowledge is an investment that will never lose
            </div>
            <div className="relative flex flex-col-reverse items-center justify-center md:flex-row md:justify-end">
                <div className="flex justify-center mt-44 md:mt-0 md:justify-end">
                    <Image
                        src="/icons/blob.svg"
                        alt="Background blog"
                        width="1"
                        height="1"
                        className="absolute md:drop-shadow-2xl drop-shadow-sm brightness-100  w-80 md:h-auto md:w-[450px] z-10"
                    />
                    <Image
                        src="/icons/completed.svg"
                        alt="Phone Image"
                        className="absolute z-20 w-48 p-3 mt-20 md:mr-36 md:h-auto brightness-100 md:w-48 drop-shadow-xl h-44 saturate-100"
                        width="1"
                        height="1"
                    />
                </div>
                <Image
                    src="/icons/pattern.svg"
                    alt="Background-images"
                    className="absolute z-0 w-full h-[120vh] md:h-[10in] contrast-50"
                    width="1"
                    height="1"
                />
            </div>
        </>
    );
}

//REVIEW - Welcome tag for sign in
export function WelcomeTag() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [runModal, setRunModal] = useState(true);

    setTimeout(() => {
        if (runModal) {
            onOpen();
            setRunModal(false);
        }
    }, 2000);
    return (
        <>
            <div className="bg-teal-50 justify-center mx-5 rounded-md md:w-auto md:mx-28 p-4 my-6 border-2 border-teal-400 flex w-fit flex-col sm:mx-auto md:my-20">
                <div className="text-xl text-stone-500 md:text-2xl uppercase font-sans text-center font-extrabold tracking-wider">
                    Welcome to Internal Assessment System
                </div>
                <div className="flex flex-col my-4 md:flex-row md:mx-auto md:space-x-10">
                    <div className="bg-stone-100 text-justify text-md px-4 py-2 rounded-md border-stone-300 border-2">
                        Explore our Programs, Research, and Resources.
                    </div>
                    <Button
                        onPress={() => {
                            onOpen();
                        }}
                        className="mt-4 mx-auto rounded-full px-4 md:focus:ring-4 md:text-lg md:my-auto py-1 font-semibold bg-orange-600 hover:bg-orange-500 focus:ring-2 focus:ring-orange-300  text-white w-fit"
                    >
                        SIGN&nbsp;IN
                    </Button>
                </div>
            </div>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onClose={onClose}
                className="flex self-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 bg-teal-100 font-sans">
                                Sign in to your account
                            </ModalHeader>
                            <ModalBody>
                                <form action="" method="post">
                                    <Input
                                        type="email"
                                        placeholder=" User name"
                                        name="email-id"
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        name="Password"
                                    />
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className="text-teal-700"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    className="bg-orange-600 text-lg hover:bg-orange-500 text-white"
                                    onPress={onClose}
                                >
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

//REVIEW - Aims Data to configure
export function Aims({
    lists,
    id = "none",
}: {
    lists: { id: number; data: string }[];
    id: string;
}) {
    return (
        <ul
            id={id}
            className="grid gap-y-4 marker:text-teal-600 marker:font-bold md:mx-20 mx-10 text-sm md:text-md lg:text-lg items-center text-justify list-[upper-roman] tracking-wider md:[word-spacing:10px] [word-spacing:5px] font-sans text-neutral-600 list-outside hyphens-auto"
        >
            {lists.map((list) => (
                <li key={list.id}>{list.data}</li>
            ))}
        </ul>
    );
}

//REVIEW - Navbar for sign-in page

export function NavbarSignIn() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const menuItems = ["services", "family", "aims", "faculty"];
    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            className="bg-orange-100 shadow-md py-1 shadow-stone-300"
        >
            <NavbarContent>
                <NavbarBrand>
                    <img
                        src="/icons/dcs-logo-remove-bg.png"
                        className="w-16 rounded-full"
                        alt="brand-icons"
                    />
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="start">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <Link
                            onClick={() => setActiveSection(item)}
                            activeClass="active"
                            to={item}
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={500}
                            className={`w-full px-4 py-2.5 font-semibold capitalize tracking-widest font-sans ${
                                item === activeSection
                                    ? " text-teal-700  border-b-2 border-b-teal-500  underline-offset-4   "
                                    : "hover:bg-orange-200 rounded-full text-stone-600"
                            }`}
                            size={2}
                        >
                            {item}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            activeClass="active"
                            to={item}
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={500}
                            className={`w-full px-4 py-2.5 font-semibold capitalize tracking-widest font-sans ${
                                item === activeSection
                                    ? " text-teal-700  border-b-2 border-b-teal-500  underline-offset-4   "
                                    : "hover:bg-orange-200 rounded-full text-stone-600"
                            }`}
                            className=" capitalize w-full"
                            size={2}
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

//REVIEW - Faculty data
export function DataFaculty({
    image,
    name,
    designation,
    specialization,
}: {
    image: string;
    name: string;
    designation: string;
    specialization: string;
}) {
    return (
        <>
            <div className="flex border-t-2 border-t-stone-200 flex-row justify-evenly w-80 py-4 items-center mx-auto bg-white rounded-md shadow-md">
                <img
                    src={`/icons/${image}`}
                    className="w-20 rounded-full border-2 shadow-inner border-stone-200"
                    alt="Image temp"
                />
                <div className="flex w-40 flex-col gap-y-1 max-h-28">
                    <div className="capitalize text-lg font-semibold">
                        {name}
                    </div>
                    <div className="capitalize text-sm  ">{designation}</div>
                    <div className="first-letter:uppercase overflow-hidden  text-sm text-stone-500">
                        {specialization}
                    </div>
                </div>
            </div>
        </>
    );
}
