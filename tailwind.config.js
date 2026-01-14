export default {
  theme: {
    extend: {
      fontFamily: {
        /* Sans-serif fonts */
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'ui-sans-serif'],
        trebuchet: [
          '"Trebuchet MS"',
          '"Lucida Sans Unicode"',
          '"Lucida Grande"',
          '"Lucida Sans"',
          'Arial',
          'sans-serif',
        ],

        /* Serif fonts */
        serif: ['Merriweather', 'ui-serif', 'Georgia'],
        times: ['"Times New Roman"', 'Times', 'serif'],

        /* Monospace fonts */
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],

        /* Display / Heading fonts */
        display: ['Oswald', 'ui-sans-serif'],
        montserrat: ['Montserrat', 'ui-sans-serif'],

        /* Handwritten / Decorative fonts */
        handwritten: ['Pacifico', 'cursive'],
        cursive: ['"Comic Sans MS"', 'cursive'],
      },
    },
  },
  plugins: [],
}
