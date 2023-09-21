import { DataCard } from "@/components/1_layout";

//REVIEW - Cards for data display
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
