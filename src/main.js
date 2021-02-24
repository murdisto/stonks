import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './firebase';

let app;
// wrapping the Vue app in firebase's onAuthStateChanged method to maintain the 
// authentication state of the app
auth.onAuthStateChanged(user => {
  console.log(user);
  if (!app) {
    app = createApp(App)
    .use(store)
    .use(router);
    
    if (user) {
      store.dispatch('fetchUserProfile', user);
    }

  app.config.globalProperties.axios = axios;
  app.mount('#app');
  
    
  }
})

