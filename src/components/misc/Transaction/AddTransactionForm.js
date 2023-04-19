import React, { useState,useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { getAccounts } from '../../api/AccountAPI';
import { createTransaction } from '../../api/TransactionAPI';

const AddTransactionForm = (props) => {

	const [name, setName] = useState('');
	const [cost, setCost] = useState('');
	const [expenseName, setExpenseName] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const [subCategoryName, setSubCategoryName] = useState('');
	const [accountName, setAccountName] = useState('');
	const [subAccountName, setSubAccountName] = useState('');
	const [subAccountOptions,setSubAccountOptions] = useState([]);
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

	const onSubmit =async() =>{
		await createTransaction(config,'Bearer '+user.accessToken,name,cost,expenseName,accountName,
			categoryName,subCategoryName,subAccountName);
	}

	const handleExpenseNameChange = (event) => {
        setExpenseName(event.target.value);
        console.log(event.target.value);
      };

	const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);
        console.log(event.target.value);
      };
	
	const handleSubcategoryNameChange= async(event) => {
        setSubCategoryName(event.target.value);
        console.log(event.target.value);
      };
	
	const handleAccountNameChange = async(event) => {
        setAccountName(event.target.value)
		const record = await getAccounts(config,'Bearer '+user.accessToken,event.target.value);
		setSubAccountOptions(record)
        console.log(event.target.value);
      };
	
	const handleSubaccountNameChange = (event) => {
        setSubAccountName(event.target.value);
        console.log(event.target.value);
      };


	return (
		<form className='text-center'>
			<div className='row'>
				<div className='col-sm'>
					<input
						required='required'
						Name='text'
						className='form-control'
						id='name'
						placeholder='Name'
						value={name}
						onChange={(event) => setName(event.target.value)}
					></input>
				</div>
				<div className='col-sm'>
					<input
						required='required'
						Name='text'
						className='form-control'
						id='cost'
						placeholder='Cost'
						value={cost}
						onChange={(event) => setCost(event.target.value)}
					></input>
				</div>
				<div className='col-sm'>
				
                    <select required='required' onChange={handleExpenseNameChange} className='form-control'>
						<option value="" selected disabled hidden> Choose Expense Name</option>
                        {props.expenseOptions.map((expense_Name)=>(
                        <option value={expense_Name.name}>{expense_Name.name}</option>   
                        ))}
                    </select>
                </div>
			</div>
			<div className='row'>
				<div className='col-sm'>
				<label for='categoryName'></label>
                    <select required='required' onChange={handleCategoryNameChange} className='form-control'>
						<option value="" selected disabled hidden> Choose Category Name</option>
                        {props.categoryOptions?.map((category_Name)=>(
                        <option value={category_Name.name}>{category_Name.name}</option>   
                        ))}
                    </select>
                </div>
			 
				<div className='col-sm'>
				<label for='subCategoryName'></label>
                    <select required='required' onChange={handleSubcategoryNameChange} className='form-control'>
						<option value="" selected disabled hidden> Choose SubCategory Name</option>
                        {props.subCategoryOptions?.map((sub_category_Name)=>(
                        <option value={sub_category_Name.name}>{sub_category_Name.name}</option>   
                        ))}
                    </select>
                </div>
			</div>
			<div className='row'>
				<div className='col-sm'>
				<label for='accountName'></label>
                    <select required='required' onChange={handleAccountNameChange} className='form-control'>
						<option value="" selected disabled hidden> Choose Account Name</option>
                        {props.accountOptions?.map((account_Name)=>(
                        <option value={account_Name.name}>{account_Name.name}</option>   
                        ))}
                    </select>
                </div>
				<div className='col-sm'> 
				<label for='subAccountName'></label>
                    <select required='required' onChange={handleSubaccountNameChange} className='form-control'>
						<option value="" selected disabled hidden> Choose Sub Account Name</option>
                        {subAccountOptions?.map((sub_account_Name)=>(
                        <option value={sub_account_Name.name}>{sub_account_Name.name}</option>   
                        ))}
                    </select>
                </div>
			</div>
			<div className='row'>
				<div className='col-sm text-center'>
					<div onClick={onSubmit} className='btn btn-secondary mt-3'>
						Save
					</div >
				</div>
			</div>
		</form>
	);
};

export default AddTransactionForm;