import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { firebase } from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App)
  .use(store)
  .use(router);

app.config.globalProperties.axios = axios;
app.mount('#app');
console.log('firebase', firebase);
