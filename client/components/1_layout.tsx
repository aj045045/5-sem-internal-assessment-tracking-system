export function DataCard({ data, type }: { data: string; type: string }) {
    return (
        <div className="flex flex-row space-x-3 bg-white w-32 md:w-36 justify-center h-12 border-l-4 border-l-teal-500 border-t-2 border-t-stone-300 items-center  rounded-md shadow-md md:h-14">
            <div className="font-semibold text-3xl md:text-4xl">{data}</div>
            <div className="text-md md:text-lg uppercase font-sans mt-3">{type}</div>
        </div>
    );
}
