import React, { useState,useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';

const AddBudgetForm = (props) => {

	const [name, setName] = useState('');
	const [cost, setCost] = useState('');
	const [expenseName, setExpenseName] = useState('');
	const [categoryName, setCategoryName] = useState('');
	const [subCategoryName, setSubCategoryName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

	const onSubmit =() =>{
		console.log('Bearer '+user.accessToken,name,cost,expenseName,
			categoryName,subCategoryName)
		props.createBudget(config,'Bearer '+user.accessToken,name,cost,expenseName,
			categoryName,subCategoryName);
	}

	const handleExpenseNameChange = (event) => {
        setExpenseName(event.target.value);
        console.log(event.target.value);
      };

	const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);
        console.log(event.target.value);
      };
	
	const handleSubcategoryNameChange= (event) => {
        setSubCategoryName(event.target.value);
        console.log(event.target.value);
      };

	return (
		<form className='text-center' onSubmit={onSubmit}>
			<div className='row'>
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
				<label for='subaccountName'></label>
                    <select required='required' onChange={handleCategoryNameChange} className='form-control'>
						<option value="" selected disabled hidden> Choose Category Name</option>
                        {props.categoryOptions.map((category_Name)=>(
                        <option value={category_Name.name}>{category_Name.name}</option>   
                        ))}
                    </select>
                </div>
			 
				<div className='col-sm'>
				<label for='subaccountName'></label>
                    <select required='required' onChange={handleSubcategoryNameChange} className='form-control'>
						<option value="" selected disabled hidden> Choose SubCategory Name</option>
                        {props.subCategoryOptions.map((sub_category_Name)=>(
                        <option value={sub_category_Name.name}>{sub_category_Name.name}</option>   
                        ))}
                    </select>
                </div>
			</div>
			<div className='row'>
				<div className='col-sm text-center'>
					<button type='submit' className='btn btn-secondary mt-3'>
						Save
					</button >
				</div>
			</div>
		</form>
	);
};

export default AddBudgetForm;