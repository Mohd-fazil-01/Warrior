/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-green': '#79ff5b',
        'neon-cyan': '#00dddd',
        'neon-pink': '#ff0099',
        'dark-bg': '#0a0e27',
        'dark-panel': '#1a1f3a',
        'dark-border': '#2a3050',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        scan: 'scan 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
      },
      backgroundImage: {
        'glass-panel': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
    },
  },
  plugins: [],
};
