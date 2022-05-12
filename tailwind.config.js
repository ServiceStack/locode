module.exports = {
  content: [
    "./www/.vitepress/**/*.{vue,js,ts,md}",
    "./www/locode/**/*.md"
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            paddingTop: '2rem',
            maxWidth: 'unset',

            a: {
              color: theme(`colors.blue.600`),
              textDecoration: `none`,
              "&:hover": {
                textDecoration: `underline`,
              },
            },

            table: {
              fontSize: 'unset',
              lineHeight: 'unset',
            },
            th: {
              padding:'0.6em 1em'
            },
            td: {
              padding:'0.6em 1em'
            },

          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')({
      className: 'content'
    }),
  ],
}
