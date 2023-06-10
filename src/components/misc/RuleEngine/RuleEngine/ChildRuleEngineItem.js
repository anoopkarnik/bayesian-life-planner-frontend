import React, { useState, useContext,useEffect } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import { MdDone } from 'react-icons/md'
import { ImPlus } from 'react-icons/im'
import { FiExternalLink } from 'react-icons/fi';
import { UserContext } from '../../../../context/UserContext';
import { ConfigContext } from '../../../../context/ConfigContext';
import { removeCriteriaFromCriteriaSet,removeCriteriaSetFromRule,
removeRuleFromRuleSet } from '../../../api/RuleEngineAPI';

const ChildRuleEngineItem = (props) => {

	const [name, setName] = useState(props.record.name);
	const [showDescription, setShowDescription] = useState(false);
	const [childrenLength,setChildrenLength] = useState('')
	const [children, setChildren] = useState([])
	const { user } = useContext(UserContext);
	const { config } = useContext(ConfigContext);
	const [showChild,setShowChild] = useState(false);
	const [showAddChild,setShowAddChild] = useState(false);

	const onDelete = async()=>{
		if (props.name === "Criteria Set") {
			await removeCriteriaFromCriteriaSet(config, 'Bearer ' + user.accessToken,
			 props.id,props.record.id)
		}
		else if (props.name === "Rule") {
			await removeCriteriaSetFromRule(config, 'Bearer ' + user.accessToken, 
			props.id,props.record.id)
		}
		else if (props.name === "Rule Set") {
			await removeRuleFromRuleSet(config, 'Bearer ' + user.accessToken, 
			props.id,props.record.id)
		}

		await props.refreshFunction(config, 'Bearer ' + user.accessToken, props.criteriaType)

	}

	return (
		<li className='list-group-item d-flex justify-content-between align-items-center'>
			<div>
				{props.record.name}
			</div>
			<div>
				<span className='badge-primary badge-pill mr-3'>
					<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
				</span>
			</div>
		</li>
	)
}

export default ChildRuleEngineItem