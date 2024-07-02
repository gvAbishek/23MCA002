import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000'; 

const api = axios.create({
  baseURL: BASE_URL,
});

export const getAllProducts = () => api.get('/products');
export const getProductById = (productId) => api.get(`/products/${productId}`);
