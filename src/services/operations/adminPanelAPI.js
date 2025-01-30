import toast from "react-hot-toast";
import { adminPanelEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";


const {
    GET_ALL_BANK_ACCOUNT_API,
    SEARCH_BANK_ACCOUNT_API,
} = adminPanelEndpoints;


// get all the bank account of all User
export const getAllBankAccount = async(token)=> {
    const toastId = toast.loading("Loading...");
    let result= [];
    try{
        
        const response = await apiConnector("GET",GET_ALL_BANK_ACCOUNT_API,null,{
            Authorization:`Bearer ${token}`
        });

        console.log("GET_ALL_BANK_ACCOUNT_API RESPONSE .....",response);
        if(!response?.data?.success){
            throw new Error("Could not Fetched all user's Bank Account")
        }
        toast.success(response?.data?.message || "Bank account Fetched Successfully");
        result= response?.data?.data;
    }
    catch(error){
        console.log("GET_ALL_BANK_ACCOUNT_API ERROR....",error);
        toast.error(error?.response?.data?.message || error?.message);
    }
    toast.dismiss(toastId);
    return result;
}

// search the Bank Account of User 
export const searchBankAccount =async(data, token)=> {
    const toastId = toast.loading("Loading...");
    console.log("data",data)
    let result= [];
    try{
        const response = await apiConnector("POST",SEARCH_BANK_ACCOUNT_API,{data}, {
            Authorization:`Bearer ${token}`
        });
        console.log("SEARCH_BANK_ACCOUNT_API RESPONSE .....",response);
        if(!response?.data?.success){
            throw new Error("Failed to Search the user")
        }
        toast.success(response?.data?.message || "Bank account fetched Successfully");
        result= response?.data?.data || [];
    }
    catch(error){
        console.log("DELETE_MENU_API ERROR....",error);
        toast.error(error?.response?.data?.message || error?.message);
    }
    toast.dismiss(toastId);
    return result;
}