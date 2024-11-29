import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // App Router 경로
    './components/**/*.{js,ts,jsx,tsx}', // 컴포넌트 경로
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#7d1213',
        'mint-light': '#d5f7f2',
        mint: '#cce9e4',
      },
    },
  },
  plugins: [],
};

export default config;
