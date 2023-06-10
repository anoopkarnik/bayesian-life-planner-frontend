import React, { useState, useContext, useEffect } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import { MdDone } from 'react-icons/md'
import { ImPlus } from 'react-icons/im'
import { FiExternalLink } from 'react-icons/fi';
import { UserContext } from '../../../../context/UserContext';
import { ConfigContext } from '../../../../context/ConfigContext';
import { deleteCriteriaSet, deleteRule, deleteRuleSet } from '../../../api/RuleEngineAPI';
import RuleEngineDescription from './RuleEngineDescription';
import ChildRuleEngineItem from './ChildRuleEngineItem';
import AddChildRuleEngineForm from './AddChildRuleEngineForm';

const RuleEngineItem = (props) => {

	const [name, setName] = useState(props.record.name);
	const [showDescription, setShowDescription] = useState(false);
	const [childrenLength, setChildrenLength] = useState('')
	const [children, setChildren] = useState([])
	const { user } = useContext(UserContext);
	const { config } = useContext(ConfigContext);
	const [showChild, setShowChild] = useState(false);
	const [showAddChild, setShowAddChild] = useState(false);

	useEffect(() => {
		refreshItem()
	},[])

	const refreshItem = async () => {
		if (props.name === "Criteria Set") {
			setChildrenLength(props.record.criteriaList.length)
			setChildren(props.record.criteriaList)
		}
		else if (props.name === "Rule") {
			setChildrenLength(props.record.criteriaSetList.length)
			setChildren(props.record.criteriaSetList)
		}
		else if (props.name === "Rule Set") {
			setChildrenLength(props.record.ruleList.length)
			setChildren(props.record.ruleList)
		}
		setShowAddChild(false)
	}

	const refreshFunction = async() =>{
		await props.refreshFunction(config, 'Bearer ' + user.accessToken, props.record.criteriaType)
		refreshItem()
	}

	const onShow = async () => {
		setShowChild(!showChild);
	}

	const onDelete = async () => {
		if (window.confirm('Are you sure you wish to delete this item?')) {
			if (props.name === "Criteria Set") {
				await deleteCriteriaSet(config, 'Bearer ' + user.accessToken, props.record.id)
			}
			else if (props.name === "Rule") {
				await deleteRule(config, 'Bearer ' + user.accessToken, props.record.id)
			}
			else if (props.name === "Rule Set") {
				await deleteRuleSet(config, 'Bearer ' + user.accessToken, props.record.id)
			}

			await props.refreshFunction(config, 'Bearer ' + user.accessToken, props.record.criteriaType)
		}
	}

	const onShowDescription = async () => {
		setShowDescription(true);
	}

	const onHideDescription = async () => {
		setShowDescription(false);
	}

	const onshowAddChild = async () => {
		setShowAddChild(true);
	}

	const onHideAddChild = async () => {
		setShowAddChild(false);
	}

	return (
		<div>
			<li className='list-group-item d-flex justify-content-between align-items-center'>
				<div>
					{childrenLength > 0 ? <>
						{showChild ?
							<AiOutlineMinusCircle size='1em' onClick={onShow} /> :
							<AiOutlinePlusCircle size='1em' onClick={onShow} />
						}</> : <>&emsp;</>}
					{props.record.name}
				</div>
				<div>
					<span className='badge-primary badge-pill mr-3'>
					</span>

					<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
					<FiExternalLink size='1em' onClick={onShowDescription} />
					<div onClick={() => { setShowAddChild(!showAddChild) }}
						className='btn btn-sm'>
						<AiOutlinePlusCircle size='1.5em' /></div>
					{
						showDescription ? <RuleEngineDescription refreshFunction={props.refreshFunction}
							name={props.name} open={showDescription} hide={onHideDescription}
							record={props.record} /> : null
					}
				</div>
			</li>
			{showChild ?
				<ul >
					{children.map((record) => (
						<li>
							<ChildRuleEngineItem record={record} name={props.name}
								id={props.record.id} criteriaType={props.record.criteriaType}
								refreshFunction={props.refreshFunction} />
						</li>
					))}
				</ul> :
				null}
			{showAddChild ?
				<AddChildRuleEngineForm refreshFunction={refreshFunction}
					name={props.name} record={props.record}
					children={children}
					open={onshowAddChild} hide={onHideAddChild}
				/> : null}
		</div>
	)
}

export default RuleEngineItem