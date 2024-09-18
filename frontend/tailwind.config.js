/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            "theme-accent": "rgb(255, 255, 255)",
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            "light",
            {
                black: {
                    ...daisyUIThemes["dark"],
                    primary: "rgb(29, 155, 240)",
                    secondary: "rgb(24, 24, 24)",
                    "--theme-accent": "rgb(255, 255, 255)",
                },
            },
        ],
    },
};
