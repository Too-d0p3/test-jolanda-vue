// tailwind.config.js
module.exports = {
    darkMode: "false", // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
    content: [
        "./index.html",
        "./vue/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/flowbite-datepicker/**/*.{vue,js,ts,jsx,tsx}"
    ],
};
