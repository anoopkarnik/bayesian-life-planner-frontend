import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createBadHabit } from '../../api/BadHabitAPI';
import DatePicker from "react-datepicker";
import { ConfigContext } from '../../../context/ConfigContext';


const AddBadHabitForm = (props) => {

	const [name, setName] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

	const onSubmit =async () =>{

		await createBadHabit(config, 'Bearer '+user.accessToken,user.id,name,
		startDate,props.name);
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken);
	}

	const onStartDateChange = async(date) =>{
		setStartDate(date)
	}

	return (
		<form className='text-center' onSubmit={onSubmit}>
			<div className='row'>
				<div className='col-sm'>
					<input required='required' Name='text' className='form-control'
					id='name' placeholder='Name' value={name} 
					onChange={(event) => setName(event.target.value)}></input>
				</div>
				<div className='col-sm'> 
					<label for='startDate'></label>
						<DatePicker selected={startDate}  className='form-control'
						onChange={onStartDateChange}/>
                	</div>
			</div>
			<div className='row'>
				<div className='col-sm text-center'>
					<div onClick={onSubmit} type='submit' className='btn btn-secondary mt-3'>
						Save
					</div>
				</div>
			</div>
		</form>
	);
};

export default AddBadHabitForm;