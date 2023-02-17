import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createRootTask } from '../../api/TaskAPI';
import DatePicker from "react-datepicker";
import { ConfigContext } from '../../../context/ConfigContext';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const AddTaskForm = (props) => {

	const [name, setName] = useState('');
	const [timeTaken, setTimeTaken] = useState('');
	const [dueDate, setDueDate] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date());
	const [every,setEvery] = useState(1);
	const [scheduleType,setScheduleType] = useState('');
	const [daysOfWeek,setDaysOfWeek] = useState([]);
	const [showDays, setShowDays] = useState(false);
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [scheduleTypes,setScheduleTypes] = useState(['onetime','daily','weekly',
'monthly','yearly']);
	const weekDays = [
		{value:'MONDAY',label:'M'},
		{value:'TUESDAY',label:'T'},
		{value:'WEDNESDAY',label:'W'},
		{value:'THURSDAY',label:'T'},
		{value:'FRIDAY',label:'F'},
		{value:'SATURDAY',label:'S'},
		{value:'SUNDAY',label:'S'},
	]

	const onSubmit =async () =>{
		console.log(weekDays);

		await createRootTask(config, 'Bearer '+user.accessToken,name,
		startDate,timeTaken,dueDate,every,scheduleType,props.name,daysOfWeek);
		await props.refreshFunction(config,'Bearer '+user.accessToken);
	}

	
	const onDueDateChange = async(date) =>{
		setDueDate(date)
	}

	const onStartDateChange = async(date) =>{
		setStartDate(date)
	}

	const handleScheduleTypeChange = async(event) =>{
		console.log(event.target.value)
		setScheduleType(event.target.value);
		if(event.target.value==="weekly"){
			setShowDays(true);
		}
		else{
			setShowDays(false);
		}
	}

	const onhandleWeekDayChange = (e) =>{
		const {value,checked} = e.target;
		if(checked){
			setDaysOfWeek((prev) => [...prev,value])
		}
		else{
			setDaysOfWeek((prev)=> prev.filter((x)=> x!==value));
		}
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
					<input required='required' Name='text' className='form-control'
					id='time taken(in mins)' placeholder='time taken(in mins)' value={timeTaken} 
					onChange={(event) => setTimeTaken(event.target.value)}></input>
				</div>
			</div>
			<div className='row'>
			<div className='col-sm'> 
				<label for='startDate'></label>
					<DatePicker selected={startDate}  className='form-control'
					onChange={onStartDateChange}/>
                </div>
				<div className='col-sm'> 
				<label for='dueDate'></label>
					<DatePicker selected={dueDate}  className='form-control'
					onChange={onDueDateChange}/>
                </div>
			</div>
			<div className='row'>
				<div className='col-sm'>
                    <select required='required' onChange={handleScheduleTypeChange} className='form-control'>
						<option value="" selected disabled hidden> Choose Schedule Type</option>
                        {scheduleTypes.map((schedule)=>(
                        <option value={schedule}>{schedule}</option>   
                        ))}
                    </select>
                </div>
				<div className='col-sm'>
					<input required='required' Name='text' className='form-control'
					id='every' placeholder='every' value={every} 
					onChange={(event) => setEvery(event.target.value)}></input>
				</div>
			</div>
			{showDays?
			<div className='row'>
				<div className='col-sm'>
					{weekDays.map((x,i)=>(
						<label key={i}>
							<input type="checkbox" name="day" value={x.value} 
							onChange={onhandleWeekDayChange}/>
							{' '}
							{x.label}
						</label>
					))}
				</div>
			</div>:null}
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

export default AddTaskForm;