import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";
import Select from 'react-select';
import { getAllCriteria,getAllCriteriaSet,getAllRule,
getAllRuleSet } from '../../api/RuleEngineAPI';
import { addCompletedRule } from '../../api/GoalAPI';


const AddCompletedRuleForm = (props) => {

	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [ruleEngineType, setRuleEngineType] = useState('')
	const [criteriaType,setCriteriaType] = useState('')
	const [ruleEngineReference,setRuleEngineReference] = useState('')
	const [ruleEngineReferenceOptions,setRuleEngineReferenceOptions] = useState([])
	const ruleEngineOptions = [
		{label:'Criteria',value:'Criteria'},
		{label:'Criteria Set',value:'Criteria Set'},
		{label:'Rule', value:'Rule'},
		{label:'Rule Set', value: 'Rule Set'}
	]
	const criteriaOptions = [
		{value:'TASK', label: 'Task'},
		{value:'HABIT', label:'Habit'},
		{value:'BAD_HABIT',label:'Bad Habit'},
		{value:'SKILL',label:'Skill'},
		{value:'STAT',label:'Stat'},
		{value:'ACCOUNT',label:'Account'},
		{value:'FUND',label:'Fund'},
		{value:'BUDGET_PLAN',label:'Budget Plan'},
		{value:'TRANSACTION',label:'Transaction'},
		{value:'MONTHLY_BUDGET',label:'Monthly Budget'}
	  ]

	const onSubmit = async() =>{
		await addCompletedRule(config,'Bearer '+user.accessToken,
		props.id,ruleEngineReference);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.id);
	}

	const updateRuleEngineType = async(event) =>{
		setRuleEngineType(event.value)
		var ruleEngineReferenceOptions = new Array();
		if (event.value==="Criteria Set"){
			const ruleEngineReferenceList = await getAllCriteriaSet(config,'Bearer '+user.accessToken)
			for(var j =0;j<ruleEngineReferenceList.length;j++){
				let json = {
					'label':ruleEngineReferenceList[j]['name'],
					'value':ruleEngineReferenceList[j]['id']
				}
				ruleEngineReferenceOptions.push(json)
			  }
			setRuleEngineReferenceOptions(ruleEngineReferenceOptions);
		}
		else if(event.value==="Rule"){
			const ruleEngineReferenceList = await getAllRule(config,'Bearer '+user.accessToken)
			for(var j =0;j<ruleEngineReferenceList.length;j++){
				let json = {
					'label':ruleEngineReferenceList[j]['name'],
					'value':ruleEngineReferenceList[j]['id']
				}
				ruleEngineReferenceOptions.push(json)
			  }
			  setRuleEngineReferenceOptions(ruleEngineReferenceOptions);
		}
		else if(event.value==="Rule Set"){
			const ruleEngineReferenceList = await getAllRuleSet(config,'Bearer '+user.accessToken)
			for(var j =0;j<ruleEngineReferenceList.length;j++){
				let json = {
					'label':ruleEngineReferenceList[j]['name'],
					'value':ruleEngineReferenceList[j]['id']
				}
				ruleEngineReferenceOptions.push(json)
			  }
			  setRuleEngineReferenceOptions(ruleEngineReferenceOptions);
		}
		props.refreshFunction(config, 'Bearer ' + user.accessToken)
		
	}
	
	const updateCriteriaType = async(event) =>{
		setCriteriaType(event.value)
		const ruleEngineReferenceOptions = getAllCriteria(config, 'Bearer ' + user.accessToken,event)
		setRuleEngineReferenceOptions(ruleEngineReferenceOptions);
	}

	return (
		<form className='text-center'>
			<div className='row'>
				<div className='col-sm'>
					<Select className='form-control' options={ruleEngineOptions}
					onChange={updateRuleEngineType}/>
				</div>
				{ruleEngineType==='Criteria'?
				<div className='col-sm'>
					<Select className='form-control' options={criteriaOptions}
					onChange={(event)=>setCriteriaType(event.value)}/>
				</div>:null}
			</div>
			<div className='row'>
				<div className='col-sm'>
					<Select className='form-control' options={ruleEngineReferenceOptions}
					onChange={(event)=>setRuleEngineReference(ruleEngineType+'/'+event.value)}/>
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