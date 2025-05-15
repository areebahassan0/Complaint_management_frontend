import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { apiUrl } from '../utils/constants';
import { logout } from './Auth.service';

// Base axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token is expired or invalid, logout user
            logout();
        }
        return Promise.reject(error);
    }
);

// Function to get the full URL for an endpoint
const getFullUrl = (endpoint) => `${BASE_URL}${endpoint}`;

// Wrapper functions
export const POST = async (url, data = null, headers = {}) => {
    try {
        const response = await api.post(
            getFullUrl(url),
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                withCredentials: true,  // sends session cookies (same as fetch's `credentials: 'include'`)
            }
        );
        return response?.data;
    } catch (error) {
        console.error('Error in POST request:', error.response?.data || error);
        throw error.response?.data || error;
    }
};

export const GET = async (url, params = null, headers = {}) => {
    try {
        const response = await api.get(getFullUrl(url), {
            params,
            headers,
        });
        return response?.data;
    } catch (error) {
        console.error('Error in GET request:', error.response?.data || error);
        throw error.response?.data || error;
    }
};

export const PUT = async (url, data = null, headers = {}) => {
    try {
        const response = await api.put(getFullUrl(url), data, { headers });
        return response?.data;
    } catch (error) {
        console.error('Error in PUT request:', error.response?.data || error);
        throw error.response?.data || error;
    }
};

export const PATCH = async (url, data = null, headers = {}) => {
    try {
        const response = await api.patch(getFullUrl(url), data, { headers });
        return response?.data;
    } catch (error) {
        console.error('Error in PATCH request:', error.response?.data || error);
        throw error.response?.data || error;
    }
};

export const DELETE = async (url, params = null, headers = {}) => {
    try {
        const response = await api.delete(getFullUrl(url), {
            params,
            headers,
        });
        return response?.data;
    } catch (error) {
        console.error('Error in DELETE request:', error.response?.data || error);
        throw error.response?.data || error;
    }
};
