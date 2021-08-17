/* REDUX SAGA 5 
Crio o arquivo api.js
yarn add axios
importo axios
Configuro o axios (create, base url, passo ali a url do meu server, e exporto a api) */

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000'
})

export default api;