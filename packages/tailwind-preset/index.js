/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  theme: {
    screens: {
      xl: { max: '1535px' },
      lg: { max: '1279px' },
      md: { max: '1023px' },
      sm: { max: '767px' },
      xs: { max: '479px' },
    },
    extend: {
      colors: {
        white: {
          DEFAULT: '#ffffff',
        },
        primary: {
          DEFAULT: '#bd2e4f',
          950: '#c03857',
          300: '#d790a1',
          200: '#f2d5dc',
          100: '#f5e0e5',
        },
        accent: {
          DEFAULT: '#00abff',
        },
        red: {
          error: '#bd2e2e',
          youtube: '#FF0000',
        },
        black: {
          DEFAULT: '#211e1e',
          950: '#2b2828',
          300: '#8c8b8b',
          200: '#d2d2d2',
          100: '#dedddd',
        },
        blue: {
          linkedin: '#0A66C2',
          facebook: '#1877F2',
          telegram: '#0088cc',
          twitter: '#1DA1F2',
        },
        green: {
          whatsapp: '#25D366',
        },
        pink: {
          instagram: '#E4405F',
        },
      },
    },
  },
}
