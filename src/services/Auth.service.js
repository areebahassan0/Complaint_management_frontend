import { apiUrl } from '../utils/constants';
import { POST } from './api.service.wrapper';

// User signup
export const signup = async (signupData) => {
    try {
        // Step 1: Call the signup API
        const response = await POST(apiUrl.signup, signupData);
        console.log('Signup Response:', response);

        // Step 2: Trigger OTP API if signup is successful
        if (response) {
            console.log('Signup successful, triggering OTP...');
            
            // Prepare payload for sending OTP
            const otpPayload = { email: signupData.email };
            
            try {
                const otpResponse = await POST(apiUrl.send_otp, otpPayload);
                console.log('OTP Sent Response:', otpResponse);
                return {
                    status: true,
                    data: response,
                    otpStatus: true,
                    message: 'Signup successful. OTP sent to email.',
                };
            } catch (otpError) {
                console.error('Error sending OTP:', otpError);
                return {
                    status: true,
                    data: response,
                    otpStatus: false,
                    message: 'Signup successful, but failed to send OTP.',
                };
            }
        }
    } catch (error) {
        console.error('Error during signup:', error);
        return { status: false, message: 'Signup failed.' };
    }
};


// User login
export const login = async (loginData) => {
    try {
        const response = await POST(apiUrl.login, loginData);
        console.log('Login Response:', response);
        return { status: true, data: response };
    } catch (error) {
        console.error('Error during login:', error);
        return { status: false, message: 'Login failed.' };
    }
};

// Verify OTP
export const verifyOTP = async (otpData) => {
    try {
        const response = await POST(apiUrl.verify_otp, otpData);
        console.log('Verify OTP Response:', response);
        return { status: true, data: response };
    } catch (error) {
        console.error('Error during OTP verification:', error);
        return { status: false, message: 'OTP verification failed.' };
    }
};
// Forget Password
export const forgetPassword = async (email) => {
    try {
        const response = await POST(apiUrl.forget_password, { email });
        console.log('Forget Password Response:', response);
        return { status: true, data: response };
    } catch (error) {
        console.error('Error during Forget Password:', error);
        return { status: false, message: 'Forget Password request failed.' };
    }
};
export const resendOTP = async(email) => {
    try {

        const otpResponse = await POST(apiUrl.send_otp, email);
                console.log('OTP Sent Response:', otpResponse);
                return {
                    status: true,
                    data: otpResponse,
                    otpStatus: true,
                    message: 'OTP sent to email.',
                };
        } catch (otpError) {
                console.error('Error sending OTP:', otpError);
                return {
                    status: true,
                    otpStatus: false,
                    message: 'Failed to send OTP.',
                };
}
}
export const changePassword = async ({ email, new_password, confirm_password }) => {
    try {
        const payload = { email, new_password, confirm_password };
        const changePasswordResponse = await POST(apiUrl.change_password, payload);

        console.log('Change Password Response:', changePasswordResponse);

        return {
            status: true,
            data: changePasswordResponse,
            passwordChangeStatus: true,
            message: 'Password changed successfully.',
        };
    } catch (error) {
        console.error('Error changing password:', error);

        return {
            status: true, // Maintain consistency with pattern
            passwordChangeStatus: false,
            message: 'Failed to change password.',
        };
    }
};
