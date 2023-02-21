import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createCompletedRule, getAllTypes,getAllNames } from '../../api/RuleAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";
import Select from 'react-select';
import { getTotalTasks,getTotalHabits,getTotalStats,getTotalSkills,
	 getTotalBadHabits
   } from '../../api/AdminAPI';



const AddCompletedRuleForm = (props) => {

	const [ruleType,setRuleType] = useState('')
	const [name, setName] = useState('');
	const [value, setValue ] = useState('');
	const [id, setId] = useState('');
	const [goalId, setGoalId] = useState(props.id)
	const [conditionType, setConditionType] = useState('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [conditionOptions, setConditionOptions] = useState([]);
	const [totalTypes, setTotalTypes]  = useState([]);
	const [names, setNames] = useState([]);
	const [weightage,setWeightage] = useState(1);
	

	const ruleOptions = [
		{value:'task', label: 'Task'},
		{value:'habit', label:'Habit'},
		{value:'badHabit',label:'Bad Habit'},
		{value:'skill',label:'Skill'},
		{value:'stat',label:'Stat'}
	  ]

	const taskOptions1 = [
		{value:'TASK_COMPLETED', label: 'Completed'}
	]
	const habitOptions1 = [
		{value:'HABIT_TOTAL_TIMES', label: 'Total Times'},
		{value:'HABIT_STREAK', label: 'Streak'},
		{value:'HABIT_TOTAL_TIME_SPENT', label: 'Total Time Spent'}
	]
	const badHabitOptions1 = [
		{value:'BAD_HABIT_MONTHLY', label: 'Monthly times repeated'},
		{value:'BAD_HABIT_YEARLY', label: 'Yearly times repeated'},
		{value:'BAD_HABIT_LAST_TIME', label: 'Last time completed'}
	]

	const statOptions1 = [
		{value:'STAT_HIGHER_PREFERRED',label: 'Higher is acceptable'},
		{value:'STAT_LOWER_PREFERRED',label: 'Lower is accepatable'}
	]

	const onRuleTypeChange = async(event)=>{
		setRuleType(event.value);
		const types = await getAllTypes(config,'Bearer '+user.accessToken,event.value)
		setTotalTypes(types);
		if (event.value ==="task"){
			setConditionOptions(taskOptions1);
		}
		else if(event.value ==="habit"){
			setConditionOptions(habitOptions1);
		}
		else if(event.value ==="badHabit"){
			setConditionOptions(badHabitOptions1);
		}
		else if(event.value ==="skill"){

		}
		else if(event.value ==="stat"){
			setConditionOptions(statOptions1);
		}
	}

	const onCategoryTypeChange = async(event) =>{
		const data = await getAllNames(config,'Bearer '+user.accessToken,ruleType,event.value)
		setNames(data);
	}

	const onSubmit =async () =>{
		await createCompletedRule(config,'Bearer '+user.accessToken,
		ruleType,name,id,props.id,value,conditionType,weightage);
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken);
	}

	

	return (
		<form className='text-center'>
			<div className='row'>
				<div className='col-sm'>
					<Select className='form-control' options={ruleOptions}
					onChange={onRuleTypeChange}/>
				</div>
				<div className='col-sm'>
					<Select className='form-control' options={conditionOptions}
					onChange={(event) => setConditionType(event.value)}/>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm'>
					<Select className='form-control' options={totalTypes}
					onChange={onCategoryTypeChange}/>
				</div>
				<div className='col-sm'>
					<Select className='form-control' options={names}
					onChange={(event) => setId(event.value)}/>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm'>
					<input required='required' Name='name' className='form-control'
					id='name' placeholder='name' value={name} 
					onChange={(event) => setName(event.target.value)}></input>
				</div>
				<div className='col-sm'>
					<input required='required' Name='Value' className='form-control'
					id='value' placeholder='value' value={value} 
					onChange={(event) => setValue(event.target.value)}></input>
				</div>
				<div className='col-sm'>
					<input required='required' Name='Weightage' className='form-control'
					id='weightage' placeholder='weightage' value={weightage} 
					onChange={(event) => setWeightage(event.target.value)}></input>
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

export default AddCompletedRuleForm;