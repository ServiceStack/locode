const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./www/.vitepress/**/*.{vue,js,ts,md}",
    "./www/docs/*.md"
  ],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        rose: colors.rose,
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}