// src/services/History.service.js

import { apiUrl } from '../utils/constants';
import { GET, PATCH, POST, DELETE } from './api.service.wrapper';

// Fetch complaint history for a specific user
export const getComplaintHistory = async (token) => {
    try{
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        // const params = { user_id: userId };
        const response = await GET(apiUrl.view_history, null,headers);
        console.log("Before response.json", response)
        return { status: true, data: response };
    } catch (error) {
        console.error('Error fetching complaints:', error);
        return { status: false, message: 'Failed to fetch complaints.' };
    }
};
// Fetch track history for a specific user
export const getComplaintTrack= async (userId) => {
    try{
        const params = { user_id: userId };
        const response = await GET(apiUrl.track_complaint, params);
        console.log("Before response.json", response)
        return { status: true, data: response };
    } catch (error) {
        console.error('Error fetching complaints:', error);
        return { status: false, message: 'Failed to fetch complaints.' };
    }
};

// Update a specific complaint by ID
export const updateComplaint = async (complaintId, data) => {
    const url = `${apiUrl.update_complaint}?complaint_id=${complaintId}`;
    const response = await PATCH(url, data);
    return response;
};

// Lodge a new complaint
export const lodgeComplaint = async (data) => {
    const response = await POST(apiUrl.lodge_complaint, data);
    return response;
};

// Fetch tracking information for complaints by user ID
export const trackComplaint = async (userId) => {
    const params = { user_id: userId };
    const response = await GET(apiUrl.track_complaint, params);
    return response;
};

// Delete a complaint by ID
export const deleteComplaint = async (complaintId) => {
    const url = `${apiUrl.delete_complaint}?complaint_id=${complaintId}`;
    const response = await DELETE(url, null);
    return response;
};
