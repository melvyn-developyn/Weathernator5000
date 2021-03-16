import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store';

const app = createApp(App);
const sleep = timeout => new Promise(res => setTimeout(() => res(), timeout));

axios.interceptors.request.use(
    async config => {
        await sleep(1000);
        store.api_calls++;
        return config;
    },
    error => error
);

app.config.globalProperties.$http = axios;

app.mount('#app');

