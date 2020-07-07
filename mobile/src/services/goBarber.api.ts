import axios from 'axios';

const GoBarberAPI = axios.create({
  baseURL: 'http://localhost:3333',
});

export default GoBarberAPI;
