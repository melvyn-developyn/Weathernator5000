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

axios.interceptors.response.use(
    async config => {
        const url = config.config.url;
        const five_mins_from_now = new Date().setTime(
            new Date().getTime() + (5 * 60 * 1000)
        );
        let data = { data: config.data, timeout:  five_mins_from_now}
        localStorage.setItem(url, JSON.stringify(data));
        return config;
    },
    error => error
);

class AxiosCache {
    get(...args) {
        let cached = localStorage.getItem(args[0]);
        if (cached) {
            cached = JSON.parse(cached);
            if (cached.timeout > new Date()) {
                return new Promise(res => res(cached));
            }
            localStorage.removeItem(args[0]);
        }
        
        // refresh cache
        return axios(...args);
    }
}

app.config.globalProperties.$http = new AxiosCache();

app.mount('#app');

