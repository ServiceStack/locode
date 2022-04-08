module.exports = {
  content: [
    "./www/.vitepress/**/*.{vue,js,ts,md}",
    "./www/docs/*.md"
  ],
  theme: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}