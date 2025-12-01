// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', 
  ],
  theme: {
    extend: {
      // === KEYFRAMES (Unchanged) ===
      keyframes: {
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.05' },
          '50%': { opacity: '0.08' },
        },
        'pan-background': {
            '0%': { backgroundPosition: '0% 0%' },
            '100%': { backgroundPosition: '100% 100%' },
        },
        'animated-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' }, 
        },
      },
      // === ANIMATIONS (Unchanged) ===
      animation: {
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
        'pulse-slow': 'pulse-slow 15s ease-in-out infinite',
        'pan-background': 'pan-background 60s linear infinite',
        
        'animated-gradient': 'animated-gradient 12s ease infinite',
        'typing': 'typing 3.5s steps(30, end) forwards', 
        'blink': 'blink 1s step-end infinite',
      },
      // === AMENDED BACKGROUNDS ===
      backgroundImage: {
        // AMENDED: Now using hard-coded white with 10% opacity
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
        
        'liquid-gradient': 'linear-gradient(120deg, #0f0c29, #302b63, #24243e, #0f0c29)',
      },
      // === BACKGROUND SIZES (Unchanged) ===
      backgroundSize: {
        'grid-size': '4rem 4rem',
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
};
export default config;