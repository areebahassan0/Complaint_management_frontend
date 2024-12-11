// src/services/api.service.wrapper.js

import axios from 'axios';
import { BASE_URL } from '../utils/constants';

// Base axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get the full URL for an endpoint
const getFullUrl = (endpoint) => `${BASE_URL}${endpoint}`;

// Wrapper functions
export const POST = async (url, data = null, config = null) => {
    try {
        const response = await api.post(getFullUrl(url), data, config);
        return response?.data;
    } catch (error) {
        console.error('Error in POST request:', error);
        throw error;
    }
};

export const GET = async (url, params = null, headers = {}) => {
    try {
        const fullUrl = getFullUrl(url); // Get the full URL
        // Combine params and headers in the API call
        const config = {
            params: params, // Pass query parameters
            headers: headers, // Pass custom headers
        };

        const response = await api.get(fullUrl, config); // Include headers in the request config
        return response?.data;
    } catch (error) {
        console.error("Error in GET request:", error);
        throw error;
    }
};


export const PUT = async (url, id, data = null, config = null) => {
    try {
        const response = await api.put(`${getFullUrl(url)}/${id}`, data, config);
        return response?.data;
    } catch (error) {
        console.error('Error in PUT request:', error);
        throw error;
    }
};

export const PATCH = async (url, data = null, config = null) => {
    try {
        const response = await api.patch(getFullUrl(url), data, config);
        return response?.data;
    } catch (error) {
        console.error('Error in PATCH request:', error);
        throw error;
    }
};

export const DELETE = async (url, id, body = null) => {
    try {
        const response = await api.delete(`${getFullUrl(url)}/${id}`, {
            data: body,
        });
        return response?.data;
    } catch (error) {
        console.error('Error in DELETE request:', error);
        throw error;
    }
};
