import axios from 'axios';

const API_BASE_URL = "http://localhost:5000"; 

export const fetchGames = () => axios.get(`${API_BASE_URL}/api/games`);
export const addGame = (game) => axios.post(`${API_BASE_URL}/api/games`, game);
export const deleteGame = (id) => axios.delete(`${API_BASE_URL}/api/games/${id}`);

export const fetchStorageSystems = (gameId) => axios.get(`${API_BASE_URL}/api/storage?gameId=${gameId}`);
export const addStorageSystem = (storage) => axios.post(`${API_BASE_URL}/api/storage`, storage);
export const deleteStorageSystem = (id) => axios.delete(`${API_BASE_URL}/api/storage/${id}`);

export const fetchItems = (gameId, storageId) => axios.get(`${API_BASE_URL}/api/items?gameId=${gameId}&storageId=${storageId}`);
export const addItem = (item) => axios.post(`${API_BASE_URL}/api/items`, item);
export const deleteItem = (id) => axios.delete(`${API_BASE_URL}/api/items/${id}`);
