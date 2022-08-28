import axios from 'axios';
import { API_BASE_URL } from '@env';

export const api = axios.create({
  baseURL: 'https://nlw-feedback-widget-production-fcba.up.railway.app',
});
