import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createHabit } from '../../api/HabitAPI';
import DatePicker from "react-datepicker";
import { ConfigContext } from '../../../context/ConfigContext';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const AddHabitForm = (props) => {

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
	const [scheduleTypes,setScheduleTypes] = useState(['daily','weekly',
'monthly','yearly']);
	const [weekDays,setWeekDays] = useState({
		MONDAY:false,TUESDAY:false,WEDNESDAY:false,THURSDAY:false,
		FRIDAY:false,SATURDAY:false,SUNDAY:false})
	
	const {MONDAY,TUESDAY,WEDNESDAY,THURSDAY,
	FRIDAY,SATURDAY,SUNDAY} = weekDays;

	const onSubmit =async () =>{
		console.log(weekDays);

		await createHabit(config, 'Bearer '+user.accessToken,user.id,name,
		startDate,timeTaken,dueDate,every,scheduleType,props.name,daysOfWeek);
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken);
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

	const handleWeekDaysChange = (event) =>{
		setWeekDays({...weekDays,[event.target.name]:event.target.checked});
	}

	useEffect(() => {let weekDaysList = [];
		if(weekDays.MONDAY){weekDaysList.push("MONDAY")};
		if(weekDays.TUESDAY){weekDaysList.push("TUESDAY")};
		if(weekDays.WEDNESDAY){weekDaysList.push("WEDNESDAY")};
		if(weekDays.THURSDAY){weekDaysList.push("THURSDAY")};
		if(weekDays.FRIDAY){weekDaysList.push("FRIDAY")};
		if(weekDays.SATURDAY){weekDaysList.push("SATURDAY")};
		if(weekDays.SUNDAY){weekDaysList.push("SUNDAY")};
		setDaysOfWeek(weekDaysList);},[daysOfWeek])


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
				
				<FormGroup >
				<div className='col-sm'>
					<FormControlLabel 
						control={
							<Checkbox checked={MONDAY} onChange={handleWeekDaysChange} 
							name="MONDAY"/>} label="M"
					/>
					<FormControlLabel 
						control={
							<Checkbox checked={TUESDAY} onChange={handleWeekDaysChange} 
							name="TUESDAY"/>} label="T"
					/>
					<FormControlLabel 
						control={
							<Checkbox checked={WEDNESDAY} onChange={handleWeekDaysChange} 
							name="WEDNESDAY"/>} label="W"
					/>
					<FormControlLabel 
						control={
							<Checkbox checked={THURSDAY} onChange={handleWeekDaysChange} 
							name="THURSDAY"/>} label="T"
					/>
					</div>
					<div className='col-sm'>
					<FormControlLabel 
						control={
							<Checkbox checked={FRIDAY} onChange={handleWeekDaysChange} 
							name="FRIDAY"/>} label="F"
					/>
					<FormControlLabel 
						control={
							<Checkbox checked={SATURDAY} onChange={handleWeekDaysChange} 
							name="SATURDAY"/>} label="S"
					/>
					<FormControlLabel 
						control={
							<Checkbox checked={SUNDAY} onChange={handleWeekDaysChange} 
							name="SUNDAY"/>} label="S"
					/>
					</div>

				</FormGroup>
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

export default AddHabitForm;