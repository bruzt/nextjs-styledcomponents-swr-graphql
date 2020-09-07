import axios from 'axios';

let token = null;
if(process.browser) token = sessionStorage.getItem('token');

export default axios.create({
    baseURL: 'http://localhost:3001/graphql',
    headers: {
        authorization: (token) ? `Bearer ${token}` : undefined
    }
});
