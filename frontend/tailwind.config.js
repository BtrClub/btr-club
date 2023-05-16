/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bgImage: "url('../public/assets/btrBackground.jpg')",
        waves: "url(https://etherscan.io/images/svg/waves-light.svg)",
      },
    },
  },
  plugins: [],
};
