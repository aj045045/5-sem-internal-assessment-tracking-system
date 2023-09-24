"use client";
import { Button } from "@nextui-org/react";
export function Pill({ data, id = "none" }: { data: string; id: string }) {
    return (
        <div
            id={id}
            className="px-3 py-1 mx-3 my-5 mt-20 font-semibold text-orange-700 uppercase bg-orange-200 rounded-full shadow-md md:shadow-lg text-md md:text-xl md:mx-6 md:my-10 w-fit md:mt-28"
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
                className="w-full p-2 border-b-2 rounded-md peer focus:border-orange-400 focus:border-2 border-b-orange-200 focus:ring-4 focus:ring-orange-300 focus:ring-offset-1 focus:px-3 placeholder:text-transparent focus:outline-none focus:rounded-md"
                placeholder={placeholder}
            />
            <label
                htmlFor={type}
                className="absolute left-0 px-1 ml-1 text-sm duration-150 ease-linear -translate-y-3 bg-white rounded-md peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-600 peer-focus:ml-3 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm"
            >
                {placeholder}
            </label>
        </div>
    );
}

export function ButtonTag({ data }: { data: string }) {
    return <Button className="mx-auto my-4 font-semibold bg-orange-600 rounded-full text-stone-100 w-fit focus:ring-4 text-md focus:ring-offset-0 focus:ring-orange-400 px-unit-2 h-unit-8">{data}</Button>;
}
