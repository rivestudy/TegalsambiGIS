// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
    theme: {
        extend: {
            animation: {
                wave: "wave 4s ease-in-out infinite",
            },
            keyframes: {
                wave: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "50%": { transform: "translateX(-50px)" },
                },
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
