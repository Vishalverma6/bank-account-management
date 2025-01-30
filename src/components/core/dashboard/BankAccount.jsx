import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import "../../../styles/components/BankAccount.css";
import toast from 'react-hot-toast';
import { addBankAccount, updateBankaccount } from '../../../services/operations/bankAccountAPI';
import { setLoading } from '../../../slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setBankDetail } from '../../../slices/authSlice';
import { data } from 'react-router-dom';

const BankAccount = ({editBank,editData,  setModalOpen }) => {
    
    const dispatch = useDispatch();
    const token = useSelector((state)=> state.auth.token)
    console.log("token1",token)
    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm();

    console.log("editData",editData)
    useEffect(()=> {
        if(editBank && editData){
            setValue("bankName",editData?.bankName);
            setValue("branchName",editData?.branchName);
            setValue("accountHolderName",editData?.accountHolderName);
            setValue("accountNumber",editData?.accountNumber);
            setValue("ifscCode",editData?.ifscCode);
        }
    },[editBank, editData, setValue])

    const onSubmit = async(data) => {
        const { confirmAccountNumber, ...bankData } = data;
        
        try {
            setLoading(true);
            if(editBank){
                const response = await updateBankaccount({
                    id:editData?._id,
                    ifscCode:bankData?.ifscCode,
                    branchName:bankData?.branchName,
                    bankName:bankData?.bankName,
                    accountNumber:bankData?.accountNumber,
                    accountHolderName:bankData?.accountHolderName,

                },token)
                console.log("response ",response)
                toast.success("Bank Account Updated ");
                dispatch(setBankDetail(response));
            }
            else{
                const response = await addBankAccount(bankData, token);
                toast.success("Bank Account Added");
                console.log("response",response)
                dispatch(setBankDetail(response?.data));
            }
            setModalOpen(false);
            setLoading(false);
            
        } 
        catch (error) {
            toast.error(editBank ? "Failed to update bank account":"Failed to add bank account");
        }
    };

    return (
        <div className="bank-container">
            <h1 className="bank-heading">
                {editBank ? "Update the Bank" : "Add the New Bank"}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bank-input-group">
                    <label htmlFor="bankName" className="bank-label">
                        Bank Name<sup className="required">*</sup>
                    </label>
                    <input
                        id="bankName"
                        placeholder="Add Name"
                        {...register("bankName", { required: true })}
                        className="form-input"
                    />
                    {errors.bankName && (
                        <span className="error-message">Bank Name is required**</span>
                    )}
                </div>

                {/* branch Name */}
                <div className="bank-input-group">
                    <label htmlFor="branchName" className="bank-label">
                        Branch Name<sup className="required">*</sup>
                    </label>
                    <input
                        id="branchName"
                        placeholder="Enter Branch Name"
                        {...register("branchName", { required: true })}
                        className="form-input"
                    />
                    {errors.branchName && (
                        <span className="error-message">Bank Name is required**</span>
                    )}
                </div>

                {/* Holder Name */}
                <div className="bank-input-group">
                    <label className="bank-label" htmlFor="accountHolderName">
                        Holder Name<sup className="required">*</sup>
                    </label>
                    <input
                        id="accountHolderName"
                        placeholder="Enter Bank Holder Name"
                        {...register("accountHolderName", { required: true })}
                        className="form-input"
                    />
                    {errors.accountHolderName && (
                        <span className="error-message">Holder Name is required**</span>
                    )}
                </div>

                {/* Account Number */}
                <div className="bank-input-group">
                    <label className="bank-label" htmlFor="accountNumber">
                        Account Number<sup className="required">*</sup>
                    </label>
                    <input
                        id="accountNumber"
                        placeholder="Enter Account Number"
                        {...register("accountNumber", { required: true })}
                        className="form-input"
                    />
                    {errors.accountNumber && (
                        <span className="error-message">Account Number is required**</span>
                    )}
                </div>

                {/* Confirm Account Number */}
                <div className="bank-input-group">
                    <label className="bank-label" htmlFor="confirmAccountNumber">
                        Confirm Account Number<sup className="required">*</sup>
                    </label>
                    <input
                        id="confirmAccountNumber"
                        placeholder="Enter Confirm Account Number"
                        {...register("confirmAccountNumber", {
                            required: true,
                            validate: (value) => value === getValues("accountNumber") || "Account numbers must match",
                        })}
                        className="form-input"
                    />
                    {errors.confirmAccountNumber && (
                        <span className="error-message">Confirm Account Number is required**</span>
                    )}
                </div>

                {/* IFSC Code */}
                <div className="bank-input-group">
                    <label className="bank-label" htmlFor="ifscCode">
                        IFSC Code<sup className="required">*</sup>
                    </label>
                    <input
                        id="ifscCode"
                        placeholder="IFSC Code"
                        {...register("ifscCode", { required: true })}
                        className="form-input"
                    />
                    {errors.ifscCode && (
                        <span className="error-message">IFSC code is required**</span>
                    )}
                </div>

                <div className="form-buttons">
                    <button type="submit" className="submit-button">
                        {editBank ? "Update Bank" : "Add Bank"}
                    </button>
                    <button type="button" className="cancel-button" onClick={() => setModalOpen(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BankAccount;
