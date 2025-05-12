
// This file serves as a frontend client for our MongoDB-powered backend API

const API_BASE_URL = 'http://localhost:5000/api';

// Helper for making authenticated requests
const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// Products API
export const productsApi = {
  getAll: async () => {
    return authFetch('/products');
  },
  
  getById: async (id: string) => {
    return authFetch(`/products/${id}`);
  },
  
  create: async (productData: any) => {
    return authFetch('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },
  
  update: async (id: string, productData: any) => {
    return authFetch(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },
  
  delete: async (id: string) => {
    return authFetch(`/products/${id}`, {
      method: 'DELETE'
    });
  }
};

// Users API
export const usersApi = {
  getAll: async () => {
    return authFetch('/users');
  },
  
  makeAdmin: async (userId: string) => {
    return authFetch(`/users/${userId}/make-admin`, {
      method: 'PUT'
    });
  },
  
  removeAdmin: async (userId: string) => {
    return authFetch(`/users/${userId}/remove-admin`, {
      method: 'PUT'
    });
  }
};
