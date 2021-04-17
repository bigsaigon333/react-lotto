const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.{html,css}', './src/**/*.{js,jsx,html,css}'],
  darkMode: false,
  theme: {
    extend: {
      colors,
      minWidth: {
        '1/8': '12.5%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      strokeWidth: {
        3: '3',
        4: '4',
        5: '5',
      },
      ringWidth: {
        0.5: '0.5px',
        1.5: '1.5px',
      },
    },
  },
  variants: {
    extend: {
      ringColor: ['invalid', 'valid'],
      backgroundColor: ['invalid', 'valid'],
    },
  },
  plugins: ['invalid', 'valid'].map((variant) =>
    plugin(({ addVariant, e }) => {
      addVariant(variant, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`${variant}${separator}${className}`)}:${variant}`;
        });
      });
    })
  ),
};
