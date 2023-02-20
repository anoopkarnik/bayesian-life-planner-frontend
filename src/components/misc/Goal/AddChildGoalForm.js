import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createChildGoal } from '../../api/GoalAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";
import DatePicker from "react-datepicker";



const AddChildGoalForm = (props) => {

	const [name, setName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const [dueDate, setDueDate] = useState(new Date());
	const {config} = useContext(ConfigContext);

	const onSubmit =async () =>{
		await createChildGoal(config, 'Bearer '+user.accessToken,name,
		props.type,dueDate,props.name);
		await props.refreshFunction(config,'Bearer '+user.accessToken);
	}

	const onDueDateChange = async(date) =>{
		setDueDate(date)
	}


	return (
		<form className='text-center'>
			<div className='row'>
				<div className='col-6'>
					<input required='required' Name='name' className='form-control'
					id='name' placeholder='name' value={name} 
					onChange={(event) => setName(event.target.value)}></input>
				</div>
				<div className='col-3'>
				<label for='dueDate'></label>
					<DatePicker selected={dueDate}  className='form-control'
					onChange={onDueDateChange}/>
				</div>
				<div className='col-3 text-center'>
					<div onClick={onSubmit} type='submit' className='btn btn-secondary form-control'>
						Save
					</div>
				</div>
			</div>
		</form>
	);
};

export default AddChildGoalForm;