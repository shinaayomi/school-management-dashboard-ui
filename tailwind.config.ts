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
       shinaSky: '#C3EBFA',
       shinaSkyLight: '#EDF9FD',
       shinaPurple: '#CFCEFF',
       shinaPurpleLight: '#F1F0FF',
       shinaYellow: '#FAE27C',
       shinaYellowLight: '#FEFCE8',
      },
    },
  },
  plugins: [],
};
export default config;
