module.exports = {
  content: [
    "./src/**/*.{html,ts,less}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'public-sans': ['Public Sans', 'sans-serif']
      },
      colors: {
        expressive: '#6aa43d',
        primary: '#506041',
        secondary: '#364126',
        lightRed: '#F8D7DA',
        lightYellow: '#FFEACD',
        lightGreen: '#D4EDDA',
        disabledColor: '#E9ECEF',
        'dark-transparent': 'rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

