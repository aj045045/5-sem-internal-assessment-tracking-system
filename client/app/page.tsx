import {
    HeroHeader,
    WelcomeTag,
    Aims,
    NavbarSignIn,
} from "@/components/1_layout";
import { DataCardContainer, DataFacultyContainer } from "@/components/2_layout";
import { Pill } from "@/components/utilities";

function SignIn() {
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
            specialization: "phd in data base management system and computer science specialist",
        },{
            image: "female.svg",
            name: "dr. maytri javeri",
            designation: "professor",
            specialization: "phd in machine learning",
        },
    ];
    const AimsList = [
        {
            id: 1,
            data: "Quality software professionalism relevant and useful to the Industry, Business and Other organization.",
        },
        {
            id: 2,
            data: "Course that fits one's career goals and prepare them to prove themselves in any national/international scenario.",
        },
        {
            id: 3,
            data: "Nation's finest in nurturing a future generation of competent, credible and ethical forensic scientists.",
        },
        {
            id: 4,
            data: "Adopting innovative teaching methods that promote learning, creativity and critical thinking skills.",
        },
        {
            id: 5,
            data: "Reviewing regularly the curriculum, courses and programs offered to meet the changing needs of the forensic science profession.",
        },
    ];
    return (
        <>
            <NavbarSignIn />
            <HeroHeader />
            <hr className=" invisible md:mt-[80vh]  mt-[55vh]" />
            <Pill id="services" data="Services" />
            <DataCardContainer dataList={dataCard} />
            <WelcomeTag />
            <Pill id="family" data="family" />
            <div className="bg-orange-100 md:py-20 md:mx-10 rounded-md border-2 border-orange-300 mb-6 md:mb-20">
                <video
                    id="family"
                    className=" aspect-video shadow-lg rounded-xl p-0.5 brightness-75 mx-auto"
                    autoPlay
                    muted
                    loop
                >
                    <source
                        src="/icons/department_celebration.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
            <Aims id="aims" lists={AimsList} />
            <Pill id="faculty" data="faculty" />
            <DataFacultyContainer data={dataFaculty} />
        </>
    );
}

export default SignIn;
