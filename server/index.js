const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT

const userRoutes = require("./routes/User");
const bankAccountRoutes = require("./routes/BankAccount");
const adminPanelRoutes = require("./routes/AdminPanel");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// database connection
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"http://localhost:3000",
        // http://localhost:3000
        credentials:true,
    })
)

// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/bank",bankAccountRoutes);
app.use("/api/v1/admin",adminPanelRoutes);



app.listen(PORT,() => {
    console.log(`Your server is Started At PORT ${PORT}`)
})

app.get("/", (req, res) => {
    return res.status(200).json({
        success:true,
        message:"Your server is up and running...",
    })
})