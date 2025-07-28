module.exports = {
    content: ['./src/**/*.{astro,html,js}'],
    theme: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      extend: {
        fontFamily: {
          'general-sans': ['"General Sans"', 'sans-serif'],
          'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        },
        colors: { 
          'custom-black': '#000',
        },
        container: {
          center: true,
          padding: {
            DEFAULT: '1rem',
            sm: '1.5rem',
            md: '2rem',
            lg: '2.5rem',
            xl: '3rem',
            '2xl': '3.5rem',
          },
        },
        spacing: {
          'safe-top': 'env(safe-area-inset-top)',
          'safe-bottom': 'env(safe-area-inset-bottom)',
          'safe-left': 'env(safe-area-inset-left)',
          'safe-right': 'env(safe-area-inset-right)',
        },
        minHeight: {
          'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
        },
        fontSize: {
          'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
          'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
          'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
          'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
          'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
          'fluid-2xl': 'clamp(1.5rem, 5vw, 2rem)',
          'fluid-3xl': 'clamp(1.875rem, 6vw, 2.5rem)',
          'fluid-4xl': 'clamp(2.25rem, 7vw, 3rem)',
          'fluid-5xl': 'clamp(3rem, 8vw, 4rem)',
        },
      },
    },
    plugins: [],
  };