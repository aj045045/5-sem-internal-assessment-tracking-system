import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Providers } from "./providers";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Internal assessment",
    description: "Generated by Ansh Yadav",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}