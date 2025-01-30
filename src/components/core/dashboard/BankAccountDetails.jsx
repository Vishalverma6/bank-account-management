import React, { useEffect, useState } from 'react';
import "../../../styles/components/BankAccountDetails.css";
import { setLoading } from '../../../slices/profileSlice';
import { useSelector } from 'react-redux';
import { deleteBankAccount, getUserBankAccount } from '../../../services/operations/bankAccountAPI';
import toast from 'react-hot-toast';
import { CiCircleRemove, CiEdit } from 'react-icons/ci';
import BankAccount from './BankAccount';


const BankAccountDetails = ({modalOpen,setModalOpen,setEditBank, editBank}) => {
  const token = useSelector((state) => state.auth.token);
  
  const [editData, setEditData] = useState(null)

//   console.log("editData12",editData)
  
  const bankDetails = useSelector((state) => state.auth.bankDetail);
//   console.log("bankDetails",bankDetails);
  const [bankData, setBankData] = useState([]);

  const getBankAccount = async () => {
    try {
      setLoading(true);
      const result = await getUserBankAccount(token);
      setBankData(result);
      setLoading(false);

    } catch (error) {
      console.log("Could not find the bank details");
      toast.error("Could not find the bank details");
    }
   
  };

  useEffect(() => {
    getBankAccount();
  }, [bankDetails]);

  const deleteAccount = async(data)=> {
    console.log("id",data);
    setLoading(true);
    const response = await deleteBankAccount(data,token);
    setLoading(false);
    getBankAccount()

  }

  const editAccount = (data) => {
    setEditBank(true)
    setModalOpen(true);
    setEditData(data);
    
  };
  useEffect(() => {
    console.log("editBank changed to:", editBank);
  }, [editBank]);
  

  return (
    <div className="bank-details-container">
      {!bankData?.length>0 ? (
        <div className='no-account'>
            You Have not Add any Bank account Please add 
        </div>
      ) 
      :
       (bankData?.map((data) => (
        <div key={data?._id} className="bank-card">
          <div className="bank-card-header">
            <p className="bank-name">{data?.bankName}</p>
            <div className="bank-actions">
              <button onClick={() => editAccount(data)}
              className="edit-button">
                <CiEdit /> Edit
              </button>
              <button 
              onClick={()=> deleteAccount(data?._id)}
              className="remove-button">
                 <CiCircleRemove />
                 Remove
              </button>
            </div>
          </div>

          <div className="bank-card-body">
            <div className="bank-card-row">
              <p>A/C No.: <strong>{data?.accountNumber}</strong></p>
              <p>IFSC Code: <strong>{data?.ifscCode}</strong></p>
            </div>
            <p>Holder Name: <strong>{data?.accountHolderName}</strong></p>
          </div>
        </div>
      )))}

       {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <BankAccount editData={editData} editBank={editBank} setEditBank={setEditBank} setModalOpen={setModalOpen} />
          </div>
        </div>
      )}
    
    </div>
  );
};

export default BankAccountDetails;
