module.exports = {
  content: [
    "./www/.vitepress/**/*.{vue,js,ts,md}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}