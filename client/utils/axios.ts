import axios from 'axios';
import config from '../../client.config';

const Axios = axios.create({
  baseURL: `http://localhost:${config.port}`,
});

export default Axios;