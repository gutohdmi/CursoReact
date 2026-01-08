import axios from 'axios';

const safeApi = axios.create({
    baseURL: 'https://fakestoreapi.com',
});

function clearToken() {
    localStorage.removeItem('auth:token');
}

export { safeApi, clearToken };