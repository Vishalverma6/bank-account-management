const express = require("express");
const { login, signUp } = require("../controllers/Auth");

const router = express.Router();




// routes for sign up
router.post("/signup",signUp);

// routes for Sign Up
router.post("/login",login);


// exports the router 
module.exports = router;