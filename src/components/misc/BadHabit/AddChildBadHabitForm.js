import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createChildBadHabit } from '../../api/BadHabitAPI';
import DatePicker from "react-datepicker";
import { ConfigContext } from '../../../context/ConfigContext';


const AddChildBadHabitForm = (props) => {

	const [name, setName] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [active, setActive] = useState(true);
	const handleRadio= async(event) =>{
		const active = event.target.value === 'true' ? true: false;
		console.log('handle', active);
		setActive(active);
	  }

	const onSubmit =async () =>{

		await createChildBadHabit(config, 'Bearer '+user.accessToken,name,
		startDate,props.type,props.name,active);
		await props.refreshFunction(config,'Bearer '+user.accessToken);
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
				<div className='col-sm' onChange={(event) => setActive(event.target.value)}>
        			Active <br/>
					<label>
						<input type="radio" value="true" name="active"
						onChange={handleRadio}/> 
						Yes
					</label>
					<t/>
					<label>
						<input type="radio" value="false" name="active"
						onChange={handleRadio}/> 
						No
					</label>
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

export default AddChildBadHabitForm;