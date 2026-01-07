import axios from 'axios';

export const safeApi = axios.create({
    baseURL: 'https://fakestoreapi.com',
});