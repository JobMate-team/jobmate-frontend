import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Pretendard', 'Arial', 'sans-serif'],
    },
    extend: {
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
      },
    },
  },
  plugins: [lineClamp],
};
