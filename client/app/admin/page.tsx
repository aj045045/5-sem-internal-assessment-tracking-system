import { Pill } from "@/components/utilities";
import Link from "next/link";
import { DataCardContainer,DataFacultyContainer } from "@/components/2_layout";
function AdminWelcome() {
    return (
        <div className="flex flex-row md:justify-center justify-around">
            <div className="flex text-sm md:text-lg text-stone-700 flex-col w-full mx-3 px-5 md:p-10  py-5 bg-orange-100 border-orange-300 border-2 rounded-md p-2">
                <div className="">
                    Hello&nbsp;
                    <span className="font-semibold tracking-wider">
                        Ansh yadav
                    </span>
                </div>
                <div className="">Here is your overview of department !</div>
            </div>
            <div className="text-sm mx-2 md:text-lg bg-orange-600 h-fit py-1 px-2 text-white font-semibold rounded-md">
                Sign&nbsp;out
            </div>
        </div>
    );
}

function PageNav({ linkData }: { linkData: { link: string; text: string }[] }) {
    return (
        <div className="flex justify-around space-x-4 my-10 text-xs md:text-base">
            {linkData.map((data, index) => (
                <Link
                    key={index}
                    className="bg-orange-200 px-3  py-1 rounded-md border-2 border-orange-300"
                    href={data.link}
                >
                    {data.text}
                </Link>
            ))}
        </div>
    );
}

type typeLinkData = {
    link: string;
    text: string;
}[];

const dataLink: typeLinkData = [
    { link: "admin/paper", text: "Add result" },
    { link: "admin/decrypt-paper", text: "Decrypt Paper" },
    { link: "admin/create-keys", text: "Create keys" },
];
const dataCard = [
    {
        value: "6",
        type: "Programs",
    },
    {
        value: "10",
        type: "Faculty",
    },
    {
        value: "24",
        type: "Semester",
    },
    {
        value: "120",
        type: "Subject",
    },
    {
        value: "800",
        type: "Student",
    },
];
const dataFaculty = [
    {
        image: "user.svg",
        name: "dr. hardik joshi",
        designation: "assistant professor",
        specialization: "phd in networking",
    },
    {
        image: "user.svg",
        name: "mr. erik shah",
        designation: "assistant professor",
        specialization: "phd in machine learning",
    },
    {
        image: "user.svg",
        name: "dr. jay patel",
        designation: "assistant professor",
        specialization: "phd in crime investigation",
    },
    {
        image: "female.svg",
        name: "dr. bhumika shah",
        designation: "professor",
        specialization:
            "phd in data base management system and computer science specialist",
    },
    {
        image: "female.svg",
        name: "dr. maytri javeri",
        designation: "professor",
        specialization: "phd in machine learning",
    },
];
export default function AdminPage() {
    return (
        <>
            <AdminWelcome />
            <PageNav linkData={dataLink} />
            <Pill data="Summary" />
            <DataCardContainer dataList={dataCard} />
            <Pill data="Faculty" />
            <DataFacultyContainer data={dataFaculty} />
        </>
    );
}
