"use client";
import React from "react";
import { useState } from "react";
import { ErrorTag } from "@/components/utilities";
type FormData = {
    userName: string;
    Password: string;
    emailId: string;
    userType: string;
};

const FormFun: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        userName: "",
        Password: "",
        emailId: "",
        userType: "",
    });

    const type: string[] = ["userName", "emailId", "password", "userType"];

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("TRY TO SUBMIT");
        fetch("/api/user/submit-form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response: Response) => {
                if (!response.ok) {
                    console.log("ERROR", response);
                }
                console.log("json data");
                return response.json();
            })
            .then((dataValue: any) => {
                console.log("data", dataValue);
                console.log("redirect", dataValue.redirect);
                if (dataValue.redirect == "true") {
                    console.log("redirect is /");
                }
                if (dataValue.redirect == "false") {
                    console.log("redirect is not /", dataValue);
                }
            })
            .catch((error: Error) => {
                console.error("Error:", error);
            });
        console.log("finish");
    };

    return (
        <div className="flex flex-col items-center justify-center gap-y-10">
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col w-39 bg-orange-200"
            >
                {type.map((t, index) => (
                    <input
                        key={index}
                        onChange={handleFormChange}
                        value={formData[t]}
                        type="text"
                        name={t}
                        placeholder={t}
                    />
                ))}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default function TempApp() {
    return (
        <>
            <div className="hs-95">
                <ErrorTag type="question" data="Invalid password or userName" />
                <FormFun />
            </div>
        </>
    );
}
