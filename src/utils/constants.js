// src/utils/constants.js

export const BASE_URL = "http://127.0.0.1:8000/";  // Base URL for local API

export const apiUrl = {
    // Complaints
    view_history: 'complaints/history/',        // To fetch complaint history
    update_complaint: 'complaints/update/',     // To update a complaint
    lodge_complaint: 'complaints/create/',      // To lodge a new complaint
    track_complaint: 'complaints/track/',       // To track the status of a complaint
    delete_complaint: 'complaints/delete/',     // To delete a complaint

    // Additional endpoints for other functionalities can be added here
};

