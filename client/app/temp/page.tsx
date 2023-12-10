"use client";

import { DataFacultyContainer } from "@/components/2_layout";
import { ErrorTag } from "@/components/utilities";

// import React from "react";
// import { useState } from "react";
// import { ErrorTag } from "@/components/utilities";
// type FormData = {
//     userName: string;
//     Password: string;
//     emailId: string;
//     userType: string;
// };

// const FormFun: React.FC = () => {
//     const [formData, setFormData] = useState<FormData>({
//         userName: "",
//         Password: "",
//         emailId: "",
//         userType: "",
//     });

//     const type: string[] = ["userName", "emailId", "password", "userType"];

//     const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFormSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("TRY TO SUBMIT");
//         fetch("/api/user/submit-form", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(formData),
//         })
//             .then((response: Response) => {
//                 if (!response.ok) {
//                     console.log("ERROR", response);
//                 }
//                 console.log("json data");
//                 return response.json();
//             })
//             .then((dataValue: any) => {
//                 console.log("data", dataValue);
//                 console.log("redirect", dataValue.redirect);
//                 if (dataValue.redirect == "true") {
//                     console.log("redirect is /");
//                 }
//                 if (dataValue.redirect == "false") {
//                     console.log("redirect is not /", dataValue);
//                 }
//             })
//             .catch((error: Error) => {
//                 console.error("Error:", error);
//             });
//         console.log("finish");
//     };

//     return (
//         <div className="flex flex-col items-center justify-center gap-y-10">
//             <form
//                 onSubmit={handleFormSubmit}
//                 className="flex flex-col w-39 bg-orange-200"
//             >
//                 {type.map((t, index) => (
//                     <input
//                         key={index}
//                         onChange={handleFormChange}
//                         value={formData[t]}
//                         type="text"
//                         name={t}
//                         placeholder={t}
//                     />
//                 ))}
//                 <input type="submit" value="Submit" />
//             </form>
//         </div>
//     );
// };

// export default function Temp() {
//     return (
//         <>
//             <ErrorTag type="alert" data="alter"/>
//             <ErrorTag type="success" data="alter"/>
//             <ErrorTag type="question" data="alter"/>
//             <ErrorTag type="warning" data="alter"/>
//             <DataFacultyContainer/>
//             <div className="box">
//                 <div className="cube"></div>
//                 <div className="cube"></div>
//                 <div className="cube"></div>
//                 <div className="cube"></div>
//             </div>
//             <div className="justify-center flex text-2xl">Loading...</div>
//             <style jsx>
//                 {`
//                     .cube {
//                         position: absolute;
//                         width: 1em;
//                         height: 1em;
//                         background: #fed74c;
//                         -webkit-animation: move 3s ease-in-out infinite;
//                         animation: move 3s ease-in-out infinite;
//                         transform-style: preserve-3d;
//                         box-shadow: 5em 5em 0.3em 0.1em #dbdbdb;
//                     }
//                     .cube::before,
//                     .cube::after {
//                         content: "";
//                         position: absolute;
//                         top: 0;
//                         left: 0;
//                         right: 0;
//                         bottom: 0;
//                     }
//                     .cube::before {
//                         background-color: #c97431;
//                         transform-origin: 100% 100%;
//                         transform: rotateY(-90deg);
//                     }
//                     .cube::after {
//                         background-color: #e7a22b;
//                         transform-origin: 0% 100%;
//                         transform: rotateX(90deg);
//                     }
//                     .cube:nth-of-type(1) {
//                         -webkit-animation-delay: -11.25s;
//                         animation-delay: -11.25s;
//                     }
//                     .cube:nth-of-type(2) {
//                         -webkit-animation-delay: -10.5s;
//                         animation-delay: -10.5s;
//                     }
//                     .cube:nth-of-type(3) {
//                         -webkit-animation-delay: -9.75s;
//                         animation-delay: -9.75s;
//                     }
//                     .cube:nth-of-type(4) {
//                         -webkit-animation-delay: -9s;
//                         animation-delay: -9s;
//                     }
//                     @-webkit-keyframes move {
//                         0%,
//                         87.5%,
//                         100% {
//                             transform: translate(1em, 0em);
//                         }
//                         12.5% {
//                             transform: translate(2em, 0em);
//                         }
//                         25% {
//                             transform: translate(2em, 1em);
//                         }
//                         37.5%,
//                         50% {
//                             transform: translate(1em, 1em);
//                         }
//                         62.5% {
//                             transform: translate(0em, 1em);
//                         }
//                         75% {
//                             transform: translate(0em, 0em);
//                         }
//                     }
//                     @keyframes move {
//                         0%,
//                         87.5%,
//                         100% {
//                             transform: translate(1em, 0em);
//                         }
//                         12.5% {
//                             transform: translate(2em, 0em);
//                         }
//                         25% {
//                             transform: translate(2em, 1em);
//                         }
//                         37.5%,
//                         50% {
//                             transform: translate(1em, 1em);
//                         }
//                         62.5% {
//                             transform: translate(0em, 1em);
//                         }
//                         75% {
//                             transform: translate(0em, 0em);
//                         }
//                     }

//                     .box {
//                         position: absolute;
//                         top: 0;
//                         left: 0;
//                         right: 0;
//                         bottom: 0;
//                         width: 3em;
//                         height: 2em;
//                         margin: 30vmin auto;
//                         font-size: 50px;
//                         transform-style: preserve-3d;
//                         transform: rotateX(60deg) rotateZ(45deg);
//                     }
//                     .box:hover * {
//                         -webkit-animation-play-state: paused;
//                         animation-play-state: paused;
//                     }
//                     .box:active * {
//                         -webkit-animation-play-state: running;
//                         animation-play-state: running;
//                     }

//                     *,
//                     *::before,
//                     *::after {
//                         box-sizing: border-box;
//                     }

//                     html {
//                         height: 100%;
//                     }

//                     body {
//                         display: flex;
//                         flex-direction: column;
//                         min-height: 100%;
//                         margin: 0;
//                         line-height: 1.4;
//                     }
//                 `}
//             </style>
//         </>
//     );
// }

// pages/Profile.jsx
import React from "react";
import Image from "next/image";

function Profile({
    userData,
}: {
    userData: {
        name: string;
        email_id: string;
        roll_no: string;
    };
}) {
    // Ensure userData is an object before attempting to destructure
    if (!userData || typeof userData !== "object") {
        // Handle the case where userData is not in the expected format
        return <div>Error loading profile data</div>;
    }

    const { name, email_id, roll_no } = userData;

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-md">
                {/* Profile Header */}
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src={"/icons/user.png"}
                        alt="Profile Picture"
                        width={0}
                        height={0}
                        unoptimized={true}
                        className="w-16 h-16 rounded-full mb-4"
                    />
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">{name}</h1>
                        <p className="text-gray-500">{email_id}</p>
                        <p className="text-gray-500">{roll_no}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

type data = {
    name: string;
    email_id: string;
    roll_no: string;
};
let data = {
    name: "ansh",
    email_id: "aj@gmail.com",
    roll_no:"36"
}

export default function Student() {
    return (
        <>
            <Profile userData={data}/>
        </>
    )
};
