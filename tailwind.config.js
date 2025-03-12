/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mint': {
          100: 'rgb(var(--color-mint))',
        },
        'baby-blue': {
          100: 'rgb(var(--color-baby-blue))',
        },
        'lavender': {
          100: 'rgb(var(--color-lavender))',
        },
      },
      animation: {
        'bounce': 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
};
