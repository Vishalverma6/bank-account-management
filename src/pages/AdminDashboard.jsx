import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { setLoading } from '../slices/profileSlice';
import { getAllBankAccount } from '../services/operations/adminPanelAPI';
import "../styles/components/AdminDashboard.css"
import SearchForm from '../components/AdminDashboard/SearchForm';

const AdminDashboard = () => {
    const token = useSelector((state)=> state.auth.token)
    const [showAccount, setShowAccount] = useState(true);
    const [userData, setUserData] = useState([]);


    const getAllAccountData = async()=> {
        setLoading(true);
        const result = await getAllBankAccount(token);
        console.log("result2",result);
        setUserData(result);
        setLoading(false);
        
    }
    useEffect(()=> {
        getAllAccountData();
    },[])

    const clickHandler =() => {
        setShowAccount(!showAccount);
    }

    return (
        <div className="admin-dashboard-container">

            
           <div className='button-container'>
              <button className='button'
                onClick={clickHandler}
                >
                {showAccount ? <p >See Less</p> : <p>See More</p>}
              </button>

                
                 <SearchForm/>
               
             </div>
            {/* Check if there are bank accounts */}
            {userData?.length === 0 ? (
                <div className="no-accounts">
                    No bank accounts found.
                </div>
            ) : showAccount && (


                <div className="bank-account-list">
                    
                    {userData?.map((data) => (
                        <div key={data?._id} className="bank-card">
                            <div className="bank-card-header">
                                <p className="bank-name">{data?.bankName}</p>
                                
                            </div>
                            <div className="bank-card-body">
                                <p>
                                    A/C No.: <strong>{data?.accountNumber}</strong>
                                </p>
                                <p>
                                    IFSC Code: <strong>{data?.ifscCode}</strong>
                                </p>
                                <p >
                                    Holder Name: <span className='holder-name'>{data?.accountHolderName}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminDashboard
