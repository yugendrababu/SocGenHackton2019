import axios from 'axios';
import configuration from '../../config/swift-config';

const { basePath } = configuration.path;

const instance = axios.create({
  baseURL: basePath,
});

export default instance;
