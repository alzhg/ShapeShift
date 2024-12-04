/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    extend: {
      colors: {

        'shapeshift-field-light-green': '#E3F1E6',
        'shapeshift-light-blue': '#C5D7F3',
        'shapeshift-green': '#7fCC29',
        'shapeshift-grey': '#F2F4F7',

        'shapeshift-login-hover': '#A3D84D',
        'shapeshift-create-acc-hover': '#A7B9E0'

       },
       screens: {
        tablet: '640px',
        notebook: '768px',
        laptop: '1024px',
        desktop: '1280px',
        'lg-desktop': '1536px'
      }
    },
  },
  plugins: [],
};