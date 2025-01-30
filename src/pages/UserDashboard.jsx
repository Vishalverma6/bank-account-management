import React, { useState } from "react";
import "../styles/pages/UserDashboard.css";
import BankAccount from "../components/core/dashboard/BankAccount";
import BankAccountDetails from "../components/core/dashboard/BankAccountDetails";

const UserDashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editBank, setEditBank] = useState(false);

  const clickHandler = () => {
    setModalOpen(true);
    
  };

  return (
    <div className="user-dashboard">
      <h1 className="dashboard-title">
        Bank Account
        <button className="add-bank-button" 
         onClick={clickHandler}>
          Add New Bank
        </button>
      </h1>

      <div className="account-details">
         <BankAccountDetails editBank={editBank} setEditBank={setEditBank}  modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      </div>

      

    </div>
  );
};

export default UserDashboard;
