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

export const getUnpaidBills = async () => {
    const token = getAccessToken();
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        
        const response = await GET(apiUrl.get_unpaid_bills, null, headers);
        return { status: true, data: response };
    } catch (error) {
        console.error('Error fetching unpaid bills:', error);
        return { status: false, message: 'Failed to fetch unpaid bills.' };
    }
};

export const updateMethod = async (data) => {
    const token = getAccessToken();
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // Validate data before sending
        if (data.billing_type === 'PACKAGE' && !data.package_id) {
            return { 
                status: false, 
                message: 'Package ID is required for package billing' 
            };
        }

        if (data.billing_type === 'INSTALLMENT' && !data.frequency) {
            return { 
                status: false, 
                message: 'Frequency is required for installment billing' 
            };
        }

        const response = await PATCH(apiUrl.update_method, data, headers);
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error updating method:', error);
        return { 
            status: false, 
            message: error.response?.data?.error || 'Failed to update method.' 
        };
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