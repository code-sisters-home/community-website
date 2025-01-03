import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const hue = 152;
const hue2 = 268;

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
        stromboli: {
          '50': '#f2f7f4',
          '100': '#e0ebe3',
          '200': '#c3d7cb',
          '300': '#9bbaa9',
          '400': '#6f9883',
          '500': '#4f7a65',
          '600': '#3e6553',
          '700': '#2f4d3f',
          '800': '#273e34',
          '900': '#21332b',
          '950': '#121c18',
      },
      purpleheart: {
        '50': '#f9f6fe',
        '100': '#f1eafd',
        '200': '#e6d8fc',
        '300': '#d2b9f9',
        '400': '#b78cf4',
        '500': '#9c60ec',
        '600': '#8440dd',
        '700': '#702ec2',
        '800': '#602a9f',
        '900': '#4f2380',
        '950': '#330d5e',
    },
    
        second: 'hsl(var(hue2), 88%, 36%)',
        background: '',
      },
    },
    fontFamily: {
      ubuntu: ['Ubuntu Mono'],
      roboto: ['Roboto'],
      signika: ['Signika Negative'],
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
export default config;
