// src/services/History.service.js

import { apiUrl } from '../utils/constants';
import { GET, PATCH, POST, DELETE } from './api.service.wrapper';
import {getAccessToken } from './Auth.service';
// Fetch complaint history for a specific user
export const getBillingMethod = async () => {
    const token = getAccessToken();
    try{
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        
        // const params = { user_id: userId };
        const response = await GET(apiUrl.get_current_method, null,headers);
        console.log("Before response.json", response)
        return { status: true, data: response };
    } catch (error) {
        console.error('Error fetching method:', error);
        return { status: false, message: 'Failed to fetch method.' };
    }
};
export const updateMethod = async (data) => {
    const token = getAccessToken();
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await PATCH(apiUrl.update_method, data,headers);
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error updating method:', error);
        return { status: false, message: 'Failed to update method.' };
    }
};
export const getBillingHistory = async () => {
    const token = getAccessToken();
    try{
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        
        // const params = { user_id: userId };
        const response = await GET(apiUrl.get_billing_history, null,headers);
        console.log("Before response.json", response)
        return { status: true, data: response };
    } catch (error) {
        console.error('Error fetching billing history:', error);
        return { status: false, message: 'Failed to fetch billing history.' };
    }
};