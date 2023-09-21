export function Pill({ data, id = "none" }: { data: string; id: string }) {
    return (
        <div
            id={id}
            className="px-3 py-1 mx-3 my-5 font-semibold text-orange-700 uppercase bg-orange-200 rounded-full shadow-md md:shadow-lg text-md md:text-xl  md:mx-6 md:my-10 w-fit"
        >
            {data}
        </div>
    );
}

export function Input({
    type,
    placeholder,
    name,
}: {
    type: string;
    placeholder: string;
    name: string;
}) {
    return (
        <div className="relative mt-6">
            <input
                type={type}
                name={name}
                className="peer w-full rounded-md focus:border-orange-400 focus:border-2 border-b-2 border-b-orange-200 focus:ring-4 focus:ring-orange-300 focus:ring-offset-1  focus:px-3 p-2  placeholder:text-transparent focus:outline-none focus:rounded-md"
                placeholder={placeholder}
            />
            <label
                htmlFor={type}
                className="absolute rounded-md left-0 ml-1 px-1 -translate-y-3 bg-white text-sm duration-150 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-600 peer-focus:ml-3 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm"
            >
                {placeholder}
            </label>
        </div>
    );
}
