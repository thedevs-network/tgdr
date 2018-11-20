import axios from 'axios';
import config from '../../client.config';

const Axios = axios.create({
  baseURL: config.baseURL,
});

export default Axios;