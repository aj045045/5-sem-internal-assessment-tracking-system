"use client";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { ErrorTag, InputClass } from "./utilities";
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

//REVIEW - Data card for Pages container
export function DataCard({ data, type }: { data: any; type: string }) {
    return (
        <div className="flex  flex-row items-center justify-center w-40 h-12 space-x-3 bg-white border-t-2 border-l-4 rounded-md shadow-md md:w-44 border-l-teal-500 border-t-stone-200 md:h-14">
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
    type FormData = {
        emailId: string;
        password: string;
    };
    const [showPassword, setShowPassword] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [runModal, setRunModal] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        emailId: "",
        password: "",
    });
    const handleFormSubmit = (e: React.FocusEvent) => {
        e.preventDefault();
        fetch("/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((response: Response) => {
                if (!response.ok) {
                    <ErrorTag
                        type="warning"
                        data="Connection error try after sometime"
                    />;
                }
                return response.json();
            })
            .then((dataValue: any) => {
                if (dataValue.redirect == "false") {
                    <ErrorTag
                        type="alert"
                        data="Invalid User Name or Password try Again"
                    />;
                }
            });
    };
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    setTimeout(() => {
        if (runModal) {
            onOpen();
            setRunModal(false);
        }
    }, 2000);
    return (
        <>
            <div className="flex flex-col justify-center p-4 mx-5 my-6 border-2 border-teal-400 rounded-md bg-teal-50 md:w-auto md:mx-28 w-fit sm:mx-auto md:my-20">
                <div className="font-sans text-xl font-extrabold tracking-wider text-center uppercase text-stone-500 md:text-2xl">
                    Welcome to Internal Assessment System
                </div>
                <div className="flex flex-col my-4 md:flex-row md:mx-auto md:space-x-10">
                    <div className="px-4 py-2 text-justify border-2 rounded-md bg-stone-100 text-md border-stone-300">
                        Explore our Programs, Research, and Resources.
                    </div>
                    <Button
                        onPress={() => {
                            onOpen();
                        }}
                        className="px-4 py-2 mx-auto mt-4 font-semibold text-white bg-orange-600 rounded-full md:focus:ring-4 md:text-lg md:my-auto hover:bg-orange-500 focus:ring-2 focus:ring-orange-300 w-fit"
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
                            <ModalHeader className="flex flex-col gap-1 font-sans bg-teal-100 text-teal-600">
                                Sign in to your account
                            </ModalHeader>
                            <ModalBody>
                                <div className="relative mt-6">
                                    <input
                                        type="email"
                                        name="emailId"
                                        placeholder="emailId"
                                        className={InputClass.input}
                                        onChange={handleFormChange}
                                    />
                                    <label
                                        htmlFor="emailId"
                                        className={InputClass.label}
                                    >
                                        Email Id
                                    </label>
                                </div>
                                <div className="relative mt-5">
                                    <input
                                        type={
                                            showPassword === true
                                                ? "text"
                                                : "password"
                                        }
                                        onChange={handleFormChange}
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
                                <div className="flex flex-row text-xl gap-x-4 mt-3">
                                    <input
                                        type="checkbox"
                                        className="w-5"
                                        name="togglePassword"
                                        onChange={() => {
                                            showPassword === true
                                                ? setShowPassword(false)
                                                : setShowPassword(true);
                                        }}
                                    />
                                    <label htmlFor="togglePassword">
                                        Show password
                                    </label>
                                </div>
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
                                    className="text-lg text-white bg-orange-600 hover:bg-orange-500"
                                    onPress={onClose}
                                    onClick={() => handleFormSubmit}
                                >
                                    Submit
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
export function Aims({ lists }: { lists: { id: number; data: string }[] }) {
    return (
        <ul className="grid gap-y-4 marker:text-teal-600 marker:font-bold md:mx-20 mx-10 text-sm md:text-md lg:text-lg items-center text-justify list-[upper-roman] tracking-wider md:[word-spacing:10px] [word-spacing:5px] font-sans text-neutral-600 list-outside hyphens-auto">
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
            className="py-1 bg-orange-100 shadow-md shadow-stone-300"
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
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <Link
                            onClick={() => setActiveSection(item)}
                            activeClass="active"
                            to={item}
                            spy={true}
                            smooth={true}
                            offset={-50}
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
                            onClick={() => setActiveSection(item)}
                            to={item}
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={500}
                            className={`w-full capitalize px-4 py-2.5 font-semibold tracking-widest font-sans ${
                                item === activeSection
                                    ? " text-teal-700  border-b-2 border-b-teal-500  underline-offset-4   "
                                    : "hover:bg-orange-200 rounded-full text-stone-600"
                            }`}
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
            <div className="flex   border-l-4 border-l-teal-500 flex-row items-center py-4 mx-auto bg-white border-t-2 rounded-md shadow-md border-t-stone-200 justify-evenly w-80">
                <Image
                    src={`/${image}`}
                    className="w-20 h-20 border-2 border-orange-200 rounded-full p-0.5"
                    alt="Image temp"
                    unoptimized={true}
                    width={1}
                    height={1}
                />
                <div className="flex flex-col w-40 gap-y-1 max-h-28">
                    <div className="text-lg font-semibold capitalize">
                        {name}
                    </div>
                    <div className="text-sm capitalize ">{designation}</div>
                    <div className="overflow-hidden text-sm first-letter:uppercase text-stone-500 max-h-unit-2xl">
                        {specialization}
                    </div>
                </div>
            </div>
        </>
    );
}

//REVIEW - Faculty Drop down from backend

export function FacultyDropDown() {
    interface FacultyData {
        _id: string;
        user_name: string;
    }
    const [dataFaculty, setData] = useState<FacultyData[]>([]);
    useEffect(() => {
        fetch("/api/user/faculty-dropdown")
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
    }, []);
    return (
        <div className="relative">
            <select name="faculty_dropdown" className={InputClass.input}>
                {dataFaculty.map((data, index) => (
                    <option value={data._id} key={index}>
                        {data.user_name}
                    </option>
                ))}
            </select>
            <label htmlFor="faculty" className={InputClass.label}>
                Choose Faculty
            </label>
        </div>
    );
}
