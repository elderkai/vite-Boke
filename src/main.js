import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import ElementPlus from 'element-plus';
// import VueMarkdownIt from 'vue3-markdown-it';
import $axios from './util/index';
import store from './store/index';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App)
app.config.globalProperties.$axios=$axios;
app.use(router)
app.use(store);
app.use(Vant);
app.use(ElementPlus)
// app.use(VueMarkdownIt);
app.mount('#app')