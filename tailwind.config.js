module.exports = {
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        '20vh': '20vh',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
