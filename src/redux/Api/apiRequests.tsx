
import axios, { AxiosRequestConfig } from 'axios';

import { endpoint } from './endpoints';
import { errorToast, successToast } from '../../configs/customToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { callMultipleApis } from './index';

// Interface for API request
interface ApiRequest {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT';
    data?: any; // Supports JSON & FormData
    headers?: Record<string, string>;
    token?: string; // Optional Auth Token (per request)
}


const send_Otp = async (email: string) => {
    // Prepare the request body for login API

    console.log('========endpoint.sendotp+email,============================');
    console.log(endpoint.sendotp + email,);
    console.log('====================================');
    const apiRequests: ApiRequest[] = [
        {
            endpoint: endpoint.sendotp + email,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);
        console.log('API Response:', results);


        const response = results[0];

        console.log('==================response.status==================');
        console.log(response.status);
        console.log('====================================');
        if (response.status) {

            successToast("Otp Resent Successfully")

            return { success: true, message: "OTP sent", user: email || null };
        }
        else {
            return { success: false, message: "Unexpected response", user: null };

        }


    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, user: null };
    }
};
const register = async (body: any) => {
    // Prepare the request body for login API

    const apiRequests: ApiRequest[] = [
        {
            endpoint: endpoint.register,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);
        console.log('API Response:', results);


        const response = results[0];


        if (response.status) {

            successToast(response?.message)
            await AsyncStorage.setItem('token', response?.token)
            return { success: true, message: response?.message, user: response.user || null };

        }
        else {
            errorToast(response?.message)

            return { success: false, message: "Unexpected response", user: null };
        }


    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, user: null };
    }
};
const login = async (body: any) => {
    // Prepare the request body for login API

    const apiRequests: ApiRequest[] = [
        {
            endpoint: endpoint.login,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);
        console.log('API Response:', results);


        const response = results[0];


        if (response.status) {

            successToast(response?.message)
            await AsyncStorage.setItem('token', response?.token)
            return { success: true, message: response?.message, user: response.user || null };

        }
        else {
            errorToast(response?.message)

            return { success: false, message: "Unexpected response", user: null };
        }


    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, user: null };
    }
};
const otp_Verify = async (email: string, otp: string,) => {
    // Prepare the request body for login API
    const requestBody = { email, otp };

    console.log('================endpoint.verifyotp+`email=${email}&otp=${otp}`,====================');
    console.log(endpoint.verifyotp+`email=${email}&otp=${otp}`,);
    console.log('====================================');
    const apiRequests: ApiRequest[] = [
        {
            endpoint: endpoint.verifyotp+`email=${email}&otp=${otp}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);
        console.log('API Response:', results);


        const response = results[0];


        if (response.status) {
           

                await AsyncStorage.setItem('token', response.token)
                successToast("OTP verified successfully")

                return { success: true, message: "OTP verified successfully", token: response.token };
        }
        
        else  {
            errorToast(response.message)
            return { success: true, message: "User not found", token: null };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, token: null };
    }
};

const getcitylist = async () => {


    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.cities,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];


        if (response?.data) {
            // successToast('Bike Remove Successfully')
            return { success: true, message: "Success", data: response?.data, };
        }
        else {

            return { success: false, message: "Unexpected response", data: [] };
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, state: [] };
    }
};

const createpassword = async (body: any) => {
console.log('=========createpassword===========================',body);


    const apiRequests: ApiRequest[] = [
        {
            endpoint: endpoint.setpassword,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);
        console.log('API Response:', results);


        const response = results[0];


        if (response.status) {

            successToast(response?.message)
        
            return { success: true, message: response?.message, user: response.user || null };

        }
        else {
            errorToast(response?.message)

            return { success: false, message: "Unexpected response", user: null };
        }


    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, user: null };
    }
};

export { login, otp_Verify, send_Otp, getcitylist, register ,createpassword }  