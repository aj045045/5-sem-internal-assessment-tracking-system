import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            // primary: "#f97316",
            primary:'#FF7F50',
            secondary: "#d6d3d1",
            warning: "#fde047",
            info: "#67e8f9",
            danger: "#dc2626",
            assent: "#14b8a6",
        },
    },
    plugins: [],
};
export default config
