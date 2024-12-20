// src/axios.js (or your preferred file)
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',  // Set the baseURL for your Laravel app's API
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default instance;
