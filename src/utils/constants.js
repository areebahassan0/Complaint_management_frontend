// src/utils/constants.js



export const BASE_URL = "http://127.0.0.1:8000/";  // Base URL for local API

export const apiUrl = {
    //Login
    signup: 'api/user/signup/',
    login: 'api/user/login/',
    send_otp: 'api/user/send-otp/',
    verify_otp: 'api/user/verify-otp/',
    forget_password: 'api/user/forget-password/',
    forget_password_otp:'api/user/forget-password-otp/',
    change_password:'api/user/change-password/',
    // Complaints
    view_history: 'complaints/history/',        // To fetch complaint history
    update_complaint: 'complaints/update/',     // To update a complaint
    lodge_complaint: 'complaints/create/',      // To lodge a new complaint
    track_complaint: 'complaints/track/',       // To track the status of a complaint
    delete_complaint: 'complaints/delete/',     // To delete a complaint
    //ChatBot
    sendMessage:'chatbot/chat/',
    // Billing
    get_current_method: 'api/billing/method/',
    get_unpaid_bills: 'api/billing/unpaid/',
    update_method:'api/billing/method/change/',
    // Additional endpoints for other functionalities can be added here
    get_daily_consumption: 'api/consumption/daily/',
    get_monthly_consumption: 'api/consumption/monthly/',
    get_total_summary: 'api/consumption/summary/',
    get_daily_summary: 'api/consumption/daily-summary/',
    get_monthly_summary: 'api/consumption/monthly-summary/',
};

