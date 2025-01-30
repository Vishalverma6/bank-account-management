const BASE_URL = process.env.REACT_APP_BASE_URL

console.log("Baseurl",BASE_URL)
// Auth endpoints 

export const authEndpoints ={
    SIGNUP_API :BASE_URL + "/auth/signup",
    LOGIN_API :BASE_URL + "/auth/login",
}

export const bankEndpoints  = {
    ADD_BANK_ACCOUNT_API : BASE_URL + "/bank/addBankAccount",
    GET_ALL_BANK_ACCOUNT_OF_USER_API : BASE_URL + "/bank/getAllBankAccountOfUser",
    EDIT_BANK_ACCOUNT_API : BASE_URL + "/bank/editBankAccount",
    DELETE_BANK_ACCOUNT_API : BASE_URL + "/bank/deletBankAccount",
}

export const adminPanelEndpoints ={
    GET_ALL_BANK_ACCOUNT_API : BASE_URL + "/admin/getAllBankAccount",
    SEARCH_BANK_ACCOUNT_API : BASE_URL + "/admin/searchBankAccount",
}

