
import axios, { AxiosRequestConfig } from 'axios';

import { endpoint } from './endpoints';
import { errorToast, successToast } from '../../configs/customToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { callMultipleApis } from './index';
import { ToastAndroid } from 'react-native';

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


            ToastAndroid.show('Login Successfully', ToastAndroid.SHORT);
            await AsyncStorage.setItem('token', response?.token)
            return { success: true, message: response?.message, user: response.user || null };

        }
        else {
            ToastAndroid.show(response?.message, ToastAndroid.SHORT);

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
const getdashboard = async () => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.dashboard+`latitude=22.7196&longitude=75.8577&country_id=101`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];


        if (response?.status) {
           
            return { success: true, message: "Success", data: response, };
        }
        else {

            return { success: false, message: "Unexpected response", data: [] };
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, state: [] };
    }
};
const getservicesbycategoryid = async (id:string) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.getservicesbycategoryid+`${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];


        if (response?.status) {
           
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
const getneaybycarservicestore = async (latitude:string,longitude:string,id:string) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.getneaybycarservicestore+`latitude=${latitude}&longitude=${longitude}&car_service_id=${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];


        if (response?.status) {
           
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
const getcarservicestoreid = async (id:string) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.getcarservicestoreid+`${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];


        if (response?.status) {
           
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

const addstorereview = async (body: any) => {
console.log('=========createpassword===========================',body);
const token = await AsyncStorage.getItem('token')


    const apiRequests: ApiRequest[] = [
        {
            endpoint: endpoint.addstorereview,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);
        console.log('API Response:', results);


        const response = results[0];


        if (response.status) {
            return { success: true, message: response?.message, user: response.user || null };
        }
        else {
            return { success: false, message: response?.message, user: null };
        }


    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, user: null };
    }
};
const updatestorereview = async (body: any) => {
console.log('=========createpassword===========================',body);
const token = await AsyncStorage.getItem('token')


    const apiRequests: ApiRequest[] = [
        {
            endpoint: endpoint.updatestorereview,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);
        console.log('API Response:', results);


        const response = results[0];


        if (response.status) {
            return { success: true, message: response?.message, user: response.user || null };
        }
        else {
            return { success: false, message: response?.message, user: null };
        }


    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, user: null };
    }
};
const reviewdelete = async (review_id:string,user_id:string) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.deletereview+`review_id=${review_id}&user_id=${user_id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];


        if (response?.status) {
           
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
const getuser = async (user_id:string,) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.getuser+`user_id=${user_id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];



        if (response?.status) {
           
            return { success: true, message: "Success", data: response?.user, };
        }
        else {

            return { success: false, message: "Unexpected response", data: [] };
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, state: [] };
    }
};
const listaddress = async (id:string,) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.listaddress+`${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];

console.log('================response====================',response);

        if (response?.status) {
           
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
const addaddress = async (user_id:string,title:string,address:string,latitude:string,longitude:string,is_default:number) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.addaddress+`user_id=${user_id}&title=${title}&address=${address}&latitude=${latitude}&longitude=${longitude}&is_default=${is_default}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];

console.log('================response====================',response);

        if (response?.status) {
           
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
const updateaddress = async (user_id:string,title:string,address:string,latitude:string,longitude:string,is_default:number,address_id:string) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.updateaddress+`user_id=${user_id}&title=${title}&address=${address}&latitude=${latitude}&longitude=${longitude}&is_default=${is_default}&address_id=${address_id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];

console.log('================response====================',response);

        if (response?.status) {
           
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
const deleteaddress = async (user_id:string,address_id:string,) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.deleteaddress+`address_id=${address_id}&user_id=${user_id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];


        if (response?.status) {
           
            return { success: true, message: "Success", data: response?.message, };
        }
        else {

            return { success: false, message: "Unexpected response", data: [] };
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, state: [] };
    }
};

const getbookmarkslist = async (user_id:string,longitude:string,latitude:string) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.getbookmarkslist+`user_id=${user_id}&latitude=${latitude}&longitude=${longitude}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];


        if (response?.status) {
           
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
const chatuserlist = async (user_id:string,) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.chatuserlist+`${user_id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];


        if (response?.status) {
           
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
const getuserchat = async (user_id:string,receiver_id:string) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.getuserchat+`sender_user_id=${user_id}&receiver_user_id=${receiver_id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];


        if (response?.status) {
           
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
const removebookmark = async (bookmark_id:string,) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.removebookmark+`bookmark_id=${bookmark_id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];



        if (response?.status) {
           
            return { success: true, message: "Success", data: response?.message, };
        }
        else {

            return { success: false, message: "Unexpected response", data: [] };
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, state: [] };
    }
};
const addbookmark = async (user_id:string,store_id:string,) => {

    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {

            endpoint: endpoint.addbookmark+`user_id=${user_id}&car_service_store_id=${store_id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,


            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);

        const response = results[0];



        if (response?.status) {
           
            return { success: true, message: "Success", data: response?.message, };
        }
        else {

            return { success: false, message: "Unexpected response", data: [] };
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, state: [] };
    }
};
const sendchatmessage = async (body: any) => {
    // Prepare the request body for login API
    const token =await AsyncStorage.getItem('token')

    const apiRequests: ApiRequest[] = [
        {
            endpoint: endpoint.sendchatmessage,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        },
    ];

    try {
        // Call the multiple APIs and await the result
        const results = await callMultipleApis(apiRequests);
        console.log('API Response:', results);


        const response = results[0];


        if (response.status) {

            return { success: true, message: response?.message,  };

        }
        else {
       
            return { success: false, message: "Unexpected response",  };
        }


    } catch (error) {
        console.error('Error fetching data:', error);
        return { success: false, message: error.message, user: null };
    }
};

export {sendchatmessage,getuserchat,addbookmark,chatuserlist, removebookmark,getuser,getbookmarkslist,updateaddress,addaddress,deleteaddress,login,updatestorereview,listaddress,reviewdelete, otp_Verify,getcarservicestoreid, addstorereview,send_Otp, getcitylist, register ,getneaybycarservicestore,createpassword,getdashboard,getservicesbycategoryid }  