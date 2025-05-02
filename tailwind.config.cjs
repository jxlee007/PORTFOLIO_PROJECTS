module.exports = {
    content: ['./src/**/*.{astro,html,js}'],
    theme: {
      extend: {
        fontFamily: {
          'general-sans': ['"General Sans"', 'sans-serif'],
          'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        },
        colors: { 'custom-black': '#000' },
        container: {
          center: true,
        },
      },
    },
    plugins: [],
  };