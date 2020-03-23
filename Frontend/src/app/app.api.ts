import axios from 'axios';

axios.defaults.withCredentials = true;

export const API = axios.create({
    baseURL: 'http://localhost:3000/api'
});
