import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: '#4F46E5',
                    light: '#818CF8',
                    dark: '#3730A3',
                },
                accent: {
                    DEFAULT: '#10B981',
                }
            },
        },
    },

    plugins: [forms],
};
