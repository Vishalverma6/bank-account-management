const express = require("express");
const { getAllBankAccount, searchBankAccount } = require("../controllers/AdminPanel");
const { auth, isAdmin } = require("../middlewares/auth");

const router = express.Router();



// routes for getting All Bank Accounts
router.get("/getAllBankAccount",auth,isAdmin,getAllBankAccount);

// routes for searching the the bank Accounts
router.post("/searchBankAccount",auth,isAdmin,searchBankAccount);
module.exports =router;