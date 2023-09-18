import { DataCardContainer } from "@/pages/1_page";
function SignIn() {
    const featuredArrayData = [
        {
            value: "4",
            type: "course",
        },
        {
            value: "6",
            type: "Faculty",
        },
    ];
    return (
        <>
            <DataCardContainer dataList={featuredArrayData} />
        </>
    );
}

export default SignIn;
