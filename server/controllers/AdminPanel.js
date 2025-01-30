const BankDetails = require("../models/BankDetails")


exports.getAllBankAccount = async(req, res) => {
    try{
        
        const bankAccountDetails = await BankDetails.find()
                                        .populate("userId") 

        // return response
        return res.status(200).json({
            success:true,
            message:"All Bank Accounts Fetched Successfully",
            data:bankAccountDetails
        });

    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could Not fetched the All Bank Accounts ",
        })
    }
}

// Search bank Accounts
exports.searchBankAccount = async (req, res) => {
    try {
        const { data } = req.body;  // Extract the search term from the request body

        // Check if the search data is valid
        if (!data) {
            return res.status(400).json({
                success: false,
                message: "No search term provided",
            });
        }

        const filter = {
            $or: [
                { bankName: { $regex: data, $options: 'i' } },
                { userName: { $regex: data, $options: 'i' } },
                { ifscCode: { $regex: data, $options: 'i' } },
            ]
        };

        console.log("Filter being applied:", filter);  // Log the filter for debugging

        // Perform the search
        const filteredBankAccounts = await BankDetails.find(filter).populate("userId");

        console.log("Filtered Bank Accounts:", filteredBankAccounts);  // Log the results for debugging

        if (filteredBankAccounts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bank accounts found matching the search criteria",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bank accounts search successful",
            data: filteredBankAccounts,
        });
    } catch (error) {
        console.error("Error occurred during search:", error);  // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "An error occurred while searching bank accounts",
        });
    }
};

