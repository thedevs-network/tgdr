import axios from 'axios';
import config from '../../client.config.example';

const Axios = axios.create({
  baseURL: config.BASE_URL,
});

export default Axios;