import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf6fd',
          100: '#d0e8f7',
          200: '#a3d1ef',
          300: '#5fa8db',
          400: '#00508a',
          500: '#00508a',
          600: '#003f6e',
          700: '#002f52',
          800: '#001e3c',
          900: '#001428',
          950: '#000a14',
        },
        accent: {
          50: '#edf6fd',
          100: '#d0e8f7',
          200: '#a3d1ef',
          300: '#5fa8db',
          400: '#00508a',
          500: '#003f6e',
          600: '#002f52',
          700: '#001e3c',
          800: '#001428',
          900: '#000a14',
          950: '#00050a',
        },
        dark: {
          DEFAULT: '#edf6fd',
          50: '#f5f9fe',
          100: '#edf6fd',
          200: '#e0f0fa',
          300: '#d0e8f7',
          400: '#c0e0f4',
          500: '#b0d8f1',
          600: '#90c8eb',
          700: '#70b8e5',
          800: '#50a8df',
          900: '#3098d9',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#475569',
          500: '#334155',
          600: '#1e293b',
          700: '#001e3c',
          800: '#001428',
          900: '#000a14',
          950: '#00050a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};

export default config;
