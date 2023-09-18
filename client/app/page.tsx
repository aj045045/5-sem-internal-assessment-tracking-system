import { HeroHeader, DataCardContainer } from "@/pages/1_page";

function SignIn() {
    const featuredArrayData = [
        {
            value: "1",
            type: "course",
        },
        {
            value: "2",
            type: "Faculty",
        },
        {
            value: "3",
            type: "Faculty",
        },
        {
            value: "4",
            type: "Faculty",
        },
        {
            value: "5",
            type: "Faculty",
        },
        {
            value: "6",
            type: "Faculty",
        },
        {
            value: "7",
            type: "Faculty",
        },
        {
            value: "8",
            type: "Faculty",
        },
        {
            value: "9",
            type: "Faculty",
        },
        {
            value: "10",
            type: "Faculty",
        },
        {
            value: "11",
            type: "Faculty",
        },
        {
            value: "12",
            type: "Faculty",
        },
        {
            value: "13",
            type: "Faculty",
        },
        {
            value: "14",
            type: "Faculty",
        },
        {
            value: "15",
            type: "Faculty",
        },
    ];
    return (
        <>
            <HeroHeader />
            <hr className="mt-80 invisible md:mt-[500px]" />
            FEATURES
            <DataCardContainer dataList={featuredArrayData} />
        </>
    );
}

export default SignIn;
