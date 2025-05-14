import { GET } from './api.service.wrapper';
import { getAccessToken } from './Auth.service';
import { apiUrl } from '../utils/constants';

export const getDailyConsumption = async () => {
  const token = getAccessToken();
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await GET(apiUrl.get_daily_consumption, null, headers);
    return { status: true, data: response };
  } catch (error) {
    return { status: false, message: 'Failed to fetch daily consumption.' };
  }
};

export const getMonthlyConsumption = async () => {
  const token = getAccessToken();
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await GET(apiUrl.get_monthly_consumption, null, headers);
    return { status: true, data: response };
  } catch (error) {
    return { status: false, message: 'Failed to fetch monthly consumption.' };
  }
};

export const getTotalSummary = async () => {
  const token = getAccessToken();
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await GET(apiUrl.get_total_summary, null, headers);
    return { status: true, data: response };
  } catch (error) {
    return { status: false, message: 'Failed to fetch total summary.' };
  }
};

export const getDailySummary = async () => {
  const token = getAccessToken();
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await GET(apiUrl.get_daily_summary, null, headers);
    return { status: true, data: response };
  } catch (error) {
    return { status: false, message: 'Failed to fetch daily summary.' };
  }
};

export const getMonthlySummary = async () => {
  const token = getAccessToken();
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await GET(apiUrl.get_monthly_summary, null, headers);
    return { status: true, data: response };
  } catch (error) {
    return { status: false, message: 'Failed to fetch monthly summary.' };
  }
}; 