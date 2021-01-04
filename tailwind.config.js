module.exports = {
  important: true,
  purge: {
    enabled: true,
    preserveHtmlElements: true,
    content: [
      './dist/**/*.html',
      './dist/**/*.js',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      mono: '"Ubuntu Mono"'
      },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
}
