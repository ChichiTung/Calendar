/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // 'node_modules/preline/dist/*.js',
  ],
  theme: {
    screens: {  
      'sm': '576px', 
      'md': '768px', 
      'lg': '992px',
    },
    container: {
      center: true
    },
    extend: {
      colors:{
      white: '#FFFFFF',
      text:'#FFFFFF98',
      text_black:'#253D47',
      gray: '#D6D6D650',
      green_1: '#05AC87',
      green_2:'#74E7B685',
      green_3:'#04C082',
      green_4:'#00FF94',

     

      blue_1: '#031214',
      blue_2:'#1C6472',
      blue_3:'#39BDD7',
      indigo:'#1A2C33',
      column:'#131E23',
      column_2:'#192930',
      ring:'#05Ac8780',


      // admin
      black_m:'#222',
      white_m:'#EEE',
      white_wb:'#FEFEFE',
    
      gray_d:'#666',
      gray_m:'#999',
      gray_l:'#DDD',
      gray_lightest:'#efefef',

       green_m:'#008d6e',
       green_l:'#C3EED4',
       green_lighter:'#E0F6E9',
       green_lightest:'#F4FFF8',
       green_d:'#094629',

       blue_l:'#E2FAFF',
       blue_d:'#0A67AB',
       blue_m:'#12AFCE',

       red_m:'##FFB6B6',
       red_error:'#FF6363',
       red_l:'#FFE2E2',
       orange_m:'#FFDDBE',
       orange_l:'#FFF0E3',

       



    }, 
    },
  },
  plugins: [],
}

