const express = require("express");
const { addBankAccount, getAllBankAccountOfUser, editBankAccount, deleteBankAccount } = require("../controllers/BankDetails");
const { auth, isUser } = require("../middlewares/auth");
const router = express.Router();


// routes for Adding Bank Account Details
router.post("/addBankAccount",auth,isUser,addBankAccount);

// routes for Getting All bank Account Of  a single user
router.get("/getAllBankAccountOfUser",auth,isUser,getAllBankAccountOfUser);

// routes for editing the existing account 
router.put("/editBankAccount",auth,isUser,editBankAccount);

// routes for deleting the Bank Accounts 
router.delete("/deletBankAccount",auth,isUser,deleteBankAccount);

module.exports = router;