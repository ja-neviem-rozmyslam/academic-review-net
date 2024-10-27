module.exports = {
  content: [
    "./src/**/*.{html,ts,less}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#506041',
        secondary: '#364126',
        backgroundSecondary: '#DDDDDD',
        background: '#EEEEEE',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

