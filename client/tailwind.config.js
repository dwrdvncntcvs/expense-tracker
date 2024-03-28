/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                primary: "#164863",
                secondary: "#427D9D",
                tertiary: "#9BBEC8",
                quaternary: "#DDF2FD",
                light: "gray",
                success: "#2DD36F",
                warning: "#FFC409",
                failure: "#EB445A",
            },
        },
    },
    plugins: [],
};
