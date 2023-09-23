import { DataCard, DataFaculty } from "@/components/1_layout";

//REVIEW - Cards for data display container
export function DataCardContainer({
    dataList,
}: {
    dataList: { value: string; type: string }[];
}) {
    return (
        <div className="z-30 gap-y-5 grid-cols-1 place-items-center sm:grid-cols-3 grid  md:gap-x-5 md:justify-around md:grid-cols-5">
            {dataList.map((data, index) => (
                <DataCard key={index} data={data.value} type={data.type} />
            ))}
        </div>
    );
}

//REVIEW - Faculty for data display container
export function DataFacultyContainer({
    data,
}: {
    data: {
        image: string;
        name: string;
        designation: string;
        specialization: string;
    }[];
}) {
    return (
        <div className="gap-y-5 grid-cols-1 py-5 place-items-center sm:grid-cols-2 grid  md:gap-x-5 md:justify-around lg:grid-cols-3">
            {data.map((value, index) => (
                <DataFaculty image={value.image} name={value.name} designation={value.designation} specialization={value.specialization} key={index} />
            ))}
        </div>
    );
}
