/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#171822",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "fuschia": "#915eff",
        "dark": "#050816"
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xxs: "390px",
        xs: "450px",
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1200px"
      },
      backgroundImage: {
        //"hero-pattern": "url('/src/assets/hero.png')",
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        }
      }
    },
  },
  plugins: [],
};