import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'virtual:svg-icons-register'

import MPreviewer, {MText} from '../lib/m-previewer.es.js'

createApp(App)
.use(MPreviewer)
.use(MText)
.mount('#app')
