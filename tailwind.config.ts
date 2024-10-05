import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        maestroSky: '#c3ebfa',
        maestroSkyLight: '#edf9fd',
        maestroPurple: '#cfceff',
        maestroPurpleLight: '#f1f0ff',
        maestroYellow: '#fedc56',
        maestroYellowLight: '#FFFFC5',
      },
    },
  },
  plugins: [],
};
export default config;
