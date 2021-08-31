import axios from 'axios';

let token = null;
if(process.browser) token = sessionStorage.getItem('token');

export default axios.create({
    baseURL: `${process.env.BACKEND_URL}`,
    headers: {
        authorization: (token) ? `Bearer ${token}` : undefined
    }
});
