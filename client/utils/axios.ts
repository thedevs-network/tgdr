import axios from 'axios';
import config from '../config';

const Axios = axios.create({
  baseURL: `http://localhost:${config.port}`,
});

export default Axios;