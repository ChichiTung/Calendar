import { createApp } from 'vue'
import './style.css'

import App from './App.vue'
import router from './router'
import pinia from './plugins/pinia'

// CSS
import '../src/assets/style/normal.css'
import '../src/assets/style/tailwind.css'
import '../src/assets/style/output.css'

// time picker & date picker
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'

createApp(App).use(router).use(pinia).mount('#app')
// .use(i18n).use(VueDatePicker)
