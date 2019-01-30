import axios from 'axios';
import store from '../store/store';

const Http = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000
})

Http.interceptors.request.use((config) => {
    show();
    return config;
}, error => {
    hide();
    return Promise.reject(Error)
})
Http.interceptors.response.use((config) => {
    hide();
    return config;
}, (error) => {
    hide();
    return Promise.reject(error);
})

function show() {
    store.commit('SHOW_PROGRESS');
}
function hide() {
    store.commit('HIDE_PROGRESS');
}
export default Http;
