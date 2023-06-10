import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { addCriteriaToCriteriaSet, createCriteriaSet,createRule,createRuleSet, modifyCriteriaSetParams, modifyRuleParams, modifyRuleSetParams } from '../../../api/RuleEngineAPI';
import { ConfigContext } from '../../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";
import Select from 'react-select'
import { getAllCriteria,getAllCriteriaSet,getAllRule } from '../../../api/RuleEngineAPI';
import { criteriaOptions } from '../../../../variables';

const AddChildRuleEngineForm = (props) => {

	const [name, setName] = useState(props.record.name);
	const [childrenOptions, setChildrenOptions] = useState([])
	const [childId, setChildId] = useState('');
	const { user, setUser } = useContext(UserContext);
	const { config } = useContext(ConfigContext);
	const [children,setChildren] = useState(props.children)
	const [criteria,setCriteria] = useState('')


	useEffect(()=>{
		updateChildren();
	},[])

	const updateCriteria = async(event)=>{
		setCriteria(event.value);
		const criteriaList = await getAllCriteria(config, 'Bearer ' + user.accessToken,event.value)
			var options = new Array();
			for(var j =0;j<criteriaList.length;j++){
				let json = {
					'label':criteriaList[j]['name'],
					'value':criteriaList[j]['id']
				}
				options.push(json)
		  	}
		setChildrenOptions(options)
	}

	const updateChildren =async()=>{
		if(props.name==="Rule"){
			const criteriaSetList = await getAllCriteriaSet(config, 'Bearer ' + user.accessToken)
			var options = new Array();
			for(var j =0;j<criteriaSetList.length;j++){
				let json = {
					'label':criteriaSetList[j]['name'],
					'value':criteriaSetList[j]['id']
				}
				options.push(json)
		  	}
			setChildrenOptions(options)
		}
		else if(props.name==="Rule Set"){
			const ruleList = await getAllRule(config, 'Bearer ' + user.accessToken)
			var options = new Array();
			for(var j =0;j<ruleList.length;j++){
				let json = {
					'label':ruleList[j]['name'],
					'value':ruleList[j]['name']
				}
				options.push(json)
		  	}
			setChildrenOptions(options)
		}
	}

	const updateChildIds = async(event)=>{
		setChildId(event.value)
	}

	const onSubmit = async () => {
		if (props.name==="Criteria Set"){
			await addCriteriaToCriteriaSet(config, 'Bearer ' + user.accessToken, 
			props.record.id,childId);
		}
		else if(props.name==="Rule"){
			await modifyRuleParams(config, 'Bearer ' + user.accessToken, 
			props.record.id,childId);
		}
		else if(props.name==="Rule Set"){
			await modifyRuleSetParams(config, 'Bearer ' + user.accessToken,
			props.record.id,childId);
		}
		props.refreshFunction()
	}

	return (
		<SlidingPane
			isOpen={props.open}
			className=''
			overlayClassName="blur"
			title="RuleEngine Text"
			from="bottom"
			onRequestClose={props.hide}
			width="500px"
		>
			<form className='text-center'>
				<div className='row'>
					{props.name==='Criteria Set'?
					<div className='col-sm'>
						<Select className='form-control' options={criteriaOptions}
							onChange={updateCriteria} />
					</div>:null}
				</div>
				<div className='row'>
					<div className='col-sm'>
						<Select className='form-control' options={childrenOptions}
							onChange={updateChildIds} />
					</div>
				</div>
				<div className='row'>
					<div className='col-sm'>
						<div onClick={onSubmit} type='submit' className='btn btn-secondary mt-3'>
							Save
						</div>
					</div>
				</div>
			</form>
		</SlidingPane>
	);
};

export default AddChildRuleEngineForm;