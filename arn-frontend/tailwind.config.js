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
        expressive: '#006eff',
        primary: '#171920',
        secondary: '#28282a',
        lightRed: '#ff3c4d',
        lightYellow: '#ffa72d',
        lightGreen: '#2a9444',
        disabledColor: '#E9ECEF',
        'dark-transparent': 'rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

