// src/services/History.service.js

import { apiUrl } from '../utils/constants';
import { GET, PATCH, POST, DELETE } from './api.service.wrapper';
import {getAccessToken } from './Auth.service';
// Fetch complaint history for a specific user
export const getComplaintHistory = async () => {
    const token = getAccessToken();
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
    const token = getAccessToken();
        
    try{
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const params = { user_id: userId };
        const response = await GET(apiUrl.track_complaint, null,headers);
        console.log("Before response.json", response)
        return { status: true, data: response };
    } catch (error) {
        console.error('Error fetching complaints:', error);
        return { status: false, message: 'Failed to fetch complaints.' };
    }
};

// Update a specific complaint by ID
export const updateComplaint = async (complaintId, data) => {
    const token = getAccessToken();
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const url = `${apiUrl.update_complaint}?complaint_id=${complaintId}`;
        const response = await PATCH(url, data,headers);
        return { status: true, data: response };
    }
    catch (error) {
        console.error('Error updating complaints:', error);
        return { status: false, message: 'Failed to update complaints.' };
    }
};

// Lodge a new complaint
export const lodgeComplaint = async (data) => {
    const token = getAccessToken();
    try{
        const headers = {
            Authorization: `Bearer ${token}`,
        };
    const response = await POST(apiUrl.lodge_complaint, data,headers);
    return response;
    } catch (error) {
        console.error('Error lodging complaints:', error);
        return { status: false, message: 'Failed to lodge complaints.' };
    }
}

// Fetch tracking information for complaints by user ID
export const trackComplaint = async () => {
    const token = getAccessToken();
    try{
        const headers = {
            Authorization: `Bearer ${token}`,
        };
       //const params = { user_id: userId };
        const response = await GET(apiUrl.track_complaint,null,headers);
        return response;
    }
    catch (error) {
        console.error('Error fetching complaints:', error);
        return { status: false, message: 'Failed to fetch complaints.' };
    }
}

// Delete a complaint by ID
export const deleteComplaint = async (complaintId) => {
    const token = getAccessToken();
    try{
        const headers = {
            Authorization: `Bearer ${token}`,
        };
    const url = `${apiUrl.delete_complaint}?complaint_id=${complaintId}`;
    const response = await DELETE(url, null ,headers);
    return response;
}catch (error) {
    console.error('Error fetching complaints:', error);
    return { status: false, message: 'Failed to fetch complaints.' };
}
}
