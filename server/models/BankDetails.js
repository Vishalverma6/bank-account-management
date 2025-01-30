const mongoose = require("mongoose");

const bankDetailsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    ifscCode: {
        type: String,
        required: true,
        trim: true,
    },
    branchName: {
        type: String,
        required: true,
        trim: true,
    },
    bankName: {
        type: String,
        required: true,
        trim: true,
    },
    accountNumber: {
        type: String,
        required: true,
        // unique: true,
    },
    accountHolderName: {
        type: String,
        required: true,
        trim: true,
    },
},
  {timestamps:true},
)

module.exports = mongoose.model("BankDetails",bankDetailsSchema);
