/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'slate-rgba': 'rgba(50, 50, 58, 1.0)',
      },
      borderColor: {
        'teal-600': '#047857',
      },
    },
  },
};

