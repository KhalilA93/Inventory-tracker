import axios from 'axios';

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

export const fetchGames = () => axios.get(`${API_BASE_URL}/games`);
export const addGame = (game) => axios.post(`${API_BASE_URL}/games`, game);
export const deleteGame = (id) => axios.delete(`${API_BASE_URL}/games/${id}`);

export const fetchStorageSystems = (gameId) => axios.get(`${API_BASE_URL}/storagesystems?gameId=${gameId}`);
export const addStorageSystem = (storage) => axios.post(`${API_BASE_URL}/storagesystems`, storage);
export const deleteStorageSystem = (id) => axios.delete(`${API_BASE_URL}/storagesystems/${id}`);

export const fetchItems = (gameId, storageId) => axios.get(`${API_BASE_URL}/items?gameId=${gameId}&storageId=${storageId}`);
export const addItem = (item) => axios.post(`${API_BASE_URL}/items`, item);
export const deleteItem = (id) => axios.delete(`${API_BASE_URL}/items/${id}`);
