import axios from 'axios';

const Http = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000
})

export default Http;
