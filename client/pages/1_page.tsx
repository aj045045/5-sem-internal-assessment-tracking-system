import { DataCard } from "@/components/1_layout";

import Image from "next/image";

//REVIEW - Hero Image for signIn page
export function HeroHeader() {
    return (
        <>
            <div className="md:w-2/6  md:text-justify font-sans mt-10 absolute leading-10  z-10 tracking-wider mx-5 text-white drop-shadow-md text-center uppercase font-extrabold text-3xl md:text-5xl lg:text-6xl">
                knowledge is an investment that will never lose
            </div>
            <div className="relative flex flex-col-reverse md:flex-row items-center md:justify-end justify-center">
                <div className=" mt-44 md:mt-0 md:justify-end justify-center flex">
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
                        className="absolute md:mr-36 md:h-auto brightness-100 md:w-48 z-20 drop-shadow-xl w-48 mt-20 h-44 p-3 saturate-100"
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

//REVIEW - Cards for data display
export function DataCardContainer({
    dataList,
}: {
    dataList: { value: string; type: string }[];
}) {
    return (
        <div className="relative gap-y-4 justify-center grid grid-flow-row grid-cols-2 mx-3 md:grid-flow-col md:grid-cols-5 md:grid-rows-3">
            {dataList.map((data, index) => (
                <DataCard key={index} data={data.value} type={data.type} />
            ))}
        </div>
    );
}
