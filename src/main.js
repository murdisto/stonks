import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { firebase } from './firebase';

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  if (!app) {
    app = createApp(App)
  .use(store)
  .use(router);

  app.config.globalProperties.axios = axios;
  app.mount('#app');
      
  }
})

