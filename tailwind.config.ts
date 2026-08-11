import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050505',
          surface: '#0C0C0C',
          elevated: '#141414',
          border: '#1C1C1C',
        },
        tx: {
          1: '#F5F7FA',
          2: '#8B95A7',
          3: '#3D4451',
          4: '#1E2128',
        },
        accent: '#6EE7FF',
        'accent-dim': '#3CC8E8',
        'accent-bg': 'rgba(110,231,255,0.08)',
        project: {
          healthcare: '#4AE3B5',
          sciml: '#38BDF8',
          distributed: '#A78BFA',
          security: '#F87171',
          genai: '#FBBF24',
        },
      },
      fontFamily: {
        clash: ['var(--font-clash)', 'Arial Black', 'sans-serif'],
        dm: ['var(--font-dm)', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(72px,10vw,140px)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(48px,7vw,96px)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(32px,5vw,64px)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(24px,4vw,40px)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      },
      animation: {
        'marquee-fwd': 'marquee-fwd 40s linear infinite',
        'marquee-rev': 'marquee-rev 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scroll-cue': 'scroll-cue 1.4s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'pulse-accent': 'pulse-accent 3s ease-in-out infinite',
        'draw-line': 'draw-line 1.5s ease forwards',
      },
      keyframes: {
        'marquee-fwd': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-rev': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        'float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'scroll-cue': { '0%,100%': { transform: 'translateY(0)', opacity: '1' }, '50%': { transform: 'translateY(6px)', opacity: '0.5' } },
        'cursor-blink': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        'pulse-accent': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(110,231,255,0)' },
          '50%': { boxShadow: '0 0 30px 4px rgba(110,231,255,0.12)' },
        },
        'draw-line': { '0%': { strokeDashoffset: '1000' }, '100%': { strokeDashoffset: '0' } },
      },
      boxShadow: {
        'accent-sm': '0 0 20px rgba(110,231,255,0.15)',
        'accent-md': '0 0 40px rgba(110,231,255,0.2)',
        'card': '0 1px 0 rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
}

export default config
