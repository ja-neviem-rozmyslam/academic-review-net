module.exports = {
  content: [
    "./src/**/*.{html,ts,less}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#627254',
        secondary: '#76885B',
        backgroundSecondary: '#DDDDDD',
        background: '#EEEEEE',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

