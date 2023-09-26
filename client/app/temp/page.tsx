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

    const type: string[] = ["userName", "emailId", "Password", "userType"];

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log("TRY TO SUBMIT");
            const response = await fetch("/api/user/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("SUCCESS");
                const responseData = await response.json();
                // Handle success, e.g., redirect or show a success message
                console.log("SUCCESS FULL", responseData.redirect);
            } else {
                console.log("ERROR FOUND");
                // Handle errors
            }
        } catch (error) {
            console.error("Error", error);
        }
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
                {/* <ErrorTag type="error" data="Invalid password or userName"/> */}
                <FormFun />
            </div>
        </>
    );
}
