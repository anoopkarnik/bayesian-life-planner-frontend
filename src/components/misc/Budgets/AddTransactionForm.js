import React, { useState,useContext } from 'react';
import { createTransaction } from '../../api/TransactionAPI';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { getAccounts } from '../../api/AccountAPI';

const AddTransactionForm = (props) => {

	const [name, setName] = useState('');
	const [cost, setCost] = useState('');
	const [accountName, setAccountName] = useState('');
	const [subAccountName, setSubAccountName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [subAccountOptions,setSubAccountOptions] = useState([]);

	const onSubmit =() =>{
		console.log('Bearer '+user.accessToken,name,cost,accountName,	subAccountName)
		createTransaction(config,'Bearer '+user.accessToken,name,cost,props.expenseName,accountName,
			props.categoryName,props.subCategoryName,subAccountName);
	}

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
		<form className='text-center' onSubmit={onSubmit}>
			<div className='row'>
				<div className='col-sm'>
				<label for='name'></label>
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
				<label for='cost'></label>
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
				<label for='accountName'></label>
                    <select required='required' onChange={handleAccountNameChange} className='form-control'>
						<option value="" selected disabled hidden> Choose Account Name</option>
                        {props.accountOptions?.map((account_Name)=>(
                        <option value={account_Name.name}>{account_Name.name}</option>   
                        ))}
                    </select>
                </div>
				<div className='col-sm'> 
				<label for='subaccountName'></label>
                    <select required='required' onChange={handleSubaccountNameChange} className='form-control'>
						<option value="" selected disabled hidden> Choose Sub Account Name</option>
                        {subAccountOptions?.map((sub_account_Name)=>(
                        <option value={sub_account_Name.name}>{sub_account_Name.name}</option>   
                        ))}
                    </select>
                </div>
				<div className='row'> 
				<div className='col-sm text-center'>
					<button type='submit' className='btn btn-secondary mt-3'>
						Save
					</button>
				</div>
				</div>
			</div>
		</form>
	);
};

export default AddTransactionForm;