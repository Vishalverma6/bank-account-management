import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { searchBankAccount } from '../../services/operations/adminPanelAPI';
import { useSelector } from 'react-redux';
import "../../styles/components/SearchForm.css"

const SearchForm = () => {
    const token = useSelector((state) => state.auth.token)
    const {register, reset, handleSubmit} = useForm();
    const [searchData, setSearchData] = useState([]);

    const onSubmit = async(data) => {
        const query = data.search;

        const filteredData = await searchBankAccount(query, token)
        
        
        
        setSearchData(filteredData)
        console.log("filtered results",filteredData);
    

    }
        console.log("search Data",searchData)
    
    const handleReset =() => {
        reset();
        setSearchData();
    }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="search-form">
        <input
            type='text'
            placeholder='Search....'
            {...register("search")}
            className="search-input"
         />
         <div className="button-container">
            <button type='submit' className="search-button">
                Search
            </button>
            <button onClick={handleReset} type='button' className="reset-button">
                Reset
            </button>
        </div>
      </form>

      <div className="bank-account-list">
                    
      {searchData?.map((data) => (
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
    </div>
  )
}

export default SearchForm
