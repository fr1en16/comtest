import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#775948',
        'text-primary': '#EDDDD3',
        'text-muted': '#ACA59B',
        'text-dark': '#683E23',
        'header-peach': '#FAC7A6',
        'header-brown': '#683E23',
        'button-bg': '#FAC8A7',
        'button-text': '#2C4935',
        'accent': '#775948',
        'role-p': '#775948',
        'role-a': '#683E23',
        'role-e': '#FAC7A6',
        'role-i': '#ACA59B',
        // Compass mapping
        'compass': {
          'bg-primary': '#775948',
          'text-primary': '#EDDDD3',
          'text-muted': '#ACA59B',
          'heading-primary': '#EDDDD3',
          'heading-secondary': '#683E23',
          'button-bg': '#FAC8A7',
          'button-text': '#2C4935',
        }
      },
      borderRadius: {
        'none': '0px',
        'sm': '0px',
        'DEFAULT': '0px',
        'md': '0px',
        'lg': '0px',
        'xl': '0px',
        '2xl': '0px',
        '3xl': '0px',
        'full': '0px',
      },
      fontFamily: {
        arimo: ['Arimo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
