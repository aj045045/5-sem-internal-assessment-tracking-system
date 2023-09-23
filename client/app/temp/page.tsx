"use client";

function FormFun() {
    const type: string[] = ["userName", "emailId", "password", "userType"];
    return (
        <div className=" flex items-center justify-center flex-col gap-y-10">
            <form
                action="/api/sign-in"
                className="bg-orange-200 flex flex-col w-40 "
                method="POST"
            >
                {type.map((t, index) => (
                    <input key={index} type="text" name={t} placeholder={t} />
                ))}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default function TempApp() {
    return (
        <div className="py-56">
            <FormFun />
        </div>
    );
}
