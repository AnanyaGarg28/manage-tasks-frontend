/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: '#1A3B583D',
        blue: '#1A3B58', 
        lightgray: '#1A3B5854',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      letterSpacing: {
        wide: '0.03em',
        widest: '0.05em',
      },
    },
  },
  plugins: [],
}
