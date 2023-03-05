import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createRootGoal } from '../../api/GoalAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";
import DatePicker from "react-datepicker";
import { ActiveContext } from '../../../context/ActiveContext';



const AddGoalForm = (props) => {

	const [name, setName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const [dueDate, setDueDate] = useState(new Date());
	const {config} = useContext(ConfigContext);
	const [active, setActive] = useState(true);
	const handleRadio= async(event) =>{
		const active = event.target.value === 'true' ? true: false;
		console.log('handle', active);
		setActive(active);
	  }
	  const {showActive} = useContext(ActiveContext);

	const onSubmit =async () =>{
		await createRootGoal(config, 'Bearer '+user.accessToken,name,
		props.name,dueDate,active);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.name,showActive);
	}

	const onDueDateChange = async(date) =>{
		setDueDate(date)
	}


	return (
		<form className='text-center'>
			<div className='row'>
				<div className='col-sm'>
					<input required='required' Name='name' className='form-control'
					id='name' placeholder='name' value={name} 
					onChange={(event) => setName(event.target.value)}></input>
				</div>
				<div className='col-sm'>
				<label for='dueDate'></label>
					<DatePicker selected={dueDate}  className='form-control'
					onChange={onDueDateChange}/>
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

export default AddGoalForm;