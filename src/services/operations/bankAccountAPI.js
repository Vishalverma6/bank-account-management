import toast from "react-hot-toast";
import { bankEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { data } from "react-router-dom";


const {
    ADD_BANK_ACCOUNT_API,
    EDIT_BANK_ACCOUNT_API,
    GET_ALL_BANK_ACCOUNT_OF_USER_API,
    DELETE_BANK_ACCOUNT_API
} = bankEndpoints;

// Add Bank Account
export const addBankAccount = async(data, token) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    console.log("token",token)
    try{
        const response = await apiConnector("POST",ADD_BANK_ACCOUNT_API, data,{
            Authorization :`Bearer ${token}`,
        })
        console.log("ADD_BANK_ACCOUNT_API API RESPONSE",response)
        if(!response.data.success){
            throw new Error (response?.data?.message || "unable to add the bank ")
        }
        result = response?.data
        toast.success(response?.data?.message || "Bank account Added Successfully")

    }
    catch(error){
        console.log("ADD_BANK_ACCOUNT_API API ERROR .....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

// update the bank Account 
export const updateBankaccount = async(data,token) => {
    const toastId = toast.loading("Loading...");
    let result= null;
    try{
        const response = await apiConnector("PUT",EDIT_BANK_ACCOUNT_API, data,{
            Authorization:`Bearer ${token}`,
        })
        console.log("EDIT_BANK_ACCOUNT_API REPONSE.....",response);
        if(!response?.data?.success){
            throw new Error("Could not update the Bank Account ")
        }
        toast.success(response?.data?.message || "Bank Account  Updated Successfully");
        result = response?.data?.data;
        console.log("RESULT",result);
    }
    catch(error){
        console.log("EDIT_BANK_ACCOUNT_API ERROR.....",error);
        toast.error(error?.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// Get the user Bank account 
export const getUserBankAccount = async(token) => {
    const toastId = toast.loading("Loading...");
    let result= []
    // console.log("token6",token)
    try{
        const response = await apiConnector("GET",GET_ALL_BANK_ACCOUNT_OF_USER_API,null, {
            Authorization :`Bearer ${token}`,
        })

        console.log("GET_ALL_BANK_ACCOUNT_OF_USER_API API RESPONSE",response)
        if(!response.data.success){
            throw new Error (response?.data?.message || "Could not fetch all menu items ")
        }
        result = response?.data?.data
        toast.success(response?.data?.message || "Successfully fetched Bank Account")
    }
    catch(error){
        console.log("GET_ALL_BANK_ACCOUNT_OF_USER_API API ERROR .....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

// Delete the bank account 
export const deleteBankAccount = async(data,token)=> {
    const toastId = toast.loading("Loading...");
    console.log("ID",data)
    let result= null;
    try{
        const response = await apiConnector("DELETE",DELETE_BANK_ACCOUNT_API, {data}, {
            Authorization:`Bearer ${token}`,
        })
        console.log("DELETE_BANK_ACCOUNT_API RESPONSE .....",response);
        if(!response?.data?.success){
            throw new Error("Could not Delete Bank account")
        }
        toast.success(response?.data?.message || "Bank Account deleted Successfully");
        // result= response?.data?.updatedCourse;
    }
    catch(error){
        console.log("DELETE_BANK_ACCOUNT_API ERROR....",error);
        toast.error(error?.response?.data?.message || error?.message);
    }
    toast.dismiss(toastId);
}
