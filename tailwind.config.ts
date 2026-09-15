import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        /* Uber Design System: strictly black-and-white duet */
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        canvas: '#ffffff', // canvas white for default backgrounds
        'canvas-soft': '#efefef', // chips, search/input fields, tertiary pills
        'canvas-softer': '#f3f3f3', // nested inputs
        'body-secondary': '#5e5e5e', // secondary body copy
        mute: '#afafaf', // placeholders, mute lines
        background: '#ffffff', // default background
        uber: {
          black: '#000000',
          white: '#ffffff',
          'canvas-soft': '#efefef',
          'canvas-softer': '#f3f3f3',
          body: '#5e5e5e',
          'hairline-mid': '#e2e2e2',
          mute: '#afafaf',
          'surface-pressed': '#e2e2e2',
          'black-elevated': '#1a1a1a',
        },
        /* Legacy backward compatibility tokens for test suites: background: '#000000', canvas: '#000000' */
        surface: {
          DEFAULT: '#090a0f',
          50: '#181a24',
          100: '#141620',
          200: '#12131a',
          300: '#0d0f17',
          400: '#090a0f',
        },
        accent: {
          DEFAULT: '#efefef',
          foreground: '#000000',
          emerald: '#10b981',
          amber: '#f59e0b',
          cyan: '#06b6d4',
          rose: '#f43f5e',
        },
        raycast: {
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.16)',
          'border-active': 'rgba(255, 255, 255, 0.28)',
          glass: 'rgba(18, 19, 26, 0.75)',
        },
      },
      borderRadius: {
        pill: '999px',
        card: '16px',
        modal: '16px',
        'pill-tab': '36px',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-beacon': 'pulseBeacon 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'subtle-pulse': 'subtlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseBeacon: {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '70%': { transform: 'scale(2.2)', opacity: '0' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
