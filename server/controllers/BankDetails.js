const BankDetails = require("../models/BankDetails");


// Add bank Account
exports.addBankAccount = async(req, res) => {
    try{
        // fetch the data from req body
       const {
        ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;

        // validation
        if(!ifscCode || !branchName || !bankName || !accountNumber || !accountHolderName){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        // fetch the user id
        const userId = req.user.id;
        console.log("userId",userId)
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"UserId not found "
            })
        }

        // storing in database 
        const bankAccount = await BankDetails.create({
            userId:userId,
            ifscCode,
            branchName,
            bankName,
            accountNumber,
            accountHolderName,
        });

        return res.status(200).json({
            success:true,
            message:"Account Details Added Successfully",
            data:bankAccount,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Account Details could not added",
        });
    }
}

// Get All Bank Accounts of a single user
exports.getAllBankAccountOfUser = async(req, res) => {
    try{
        // fetch the userId from req user
        const userId = req.user.id;

        // validation
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User ID not Found",
            });
        }

        const allBankAccount = await BankDetails.find({userId});
        console.log("All bank Account", allBankAccount);

        // return response
        return res.status(200).json({
            success:true,
            message:"All Accounts Associated with the current user fetched Successfully",
            data:allBankAccount,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Unable to fetched the Account Details",
        });

    }
}

// Edit Bank Account
exports.editBankAccount = async(req, res) => {
    try{
        // fetch the id from req body
        const {id} = req.body;
        if(!id){
            return res.status(401).json({
                success:false,
                message:"Id is required",
            })
        }

        // fetch the user Id fromm req user
        const userId = req.user.id;
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"UserId not found ",
            })
        }
        // fetch the data from the req body
        const {
            ifscCode,
            branchName,
            bankName,
            accountNumber,
            accountHolderName
        }  = req.body;

        const updatedBankAccount = await BankDetails.findOneAndUpdate(
            {_id:id, userId:userId},
            {ifscCode, branchName, bankName, accountNumber, accountHolderName},
            {new:true},
        );

        if(!updatedBankAccount){
            return res.status(404).json({
                success:false,
                message:"Bank Account not Found ",
            })
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Bank account updated Successfully",
            data:updatedBankAccount,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"An error While Updating the Bank Account",
        })
    }
}

// Delete the Bank Account
exports.deleteBankAccount = async(req, res)=> {
    try{
        // fetch the bank id fromm req body;
        const id = req.body.data;
        console.log("Id",id)

        // validation 
        if(!id){
            return res.status(404).json({
                success:false,
                message:"id not found ",
            })
        }

        // fetch the user ID 
        const userId = req.user.id;
        // console.log("useId",userId)
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User Id not found ",
            })
        }

        console.log("Vishal Verma")
        const bankAccount = await BankDetails.findOneAndDelete({_id:id, userId:userId});
        if(!bankAccount){
            return res.status(404).json({
                success:false,
                message:"Bank Account not Found",
            });
        }
        console.log("Vishal Verma2")

        // return response
        return res.status(200).json({
            success:true,
            message:"Bank Account Delted Successfully",
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"An error While Deleting the BAnk Account",
        })
    }
}
