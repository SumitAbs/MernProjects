// frontend/src/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchItems = () => axios.get(`${API_URL}/items`);
export const createItem = (item) => axios.post(`${API_URL}/items`, item);
export const updateItem = (id, updatedItem) => axios.put(`${API_URL}/items/${id}`, updatedItem);
export const deleteItem = (id) => axios.delete(`${API_URL}/items/${id}`);


