

import { apiUrl } from '../utils/constants';
import { POST } from '../services/api.service.wrapper';

export const sendMessage = async (message) => {
    try {
        const payload = { message };  // Wrap the message inside an object

        const reply = await POST(apiUrl.sendMessage, payload /*, headers if needed */);
        return { status: true, data: reply };
    } catch (error) {
        console.error('Error sending chatbot message:', error);
        return { status: false, message: 'Failed to send message to chatbot.' };
    }
};
