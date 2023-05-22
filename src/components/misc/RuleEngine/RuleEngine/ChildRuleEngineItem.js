import React, { useState, useContext,useEffect } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import { MdDone } from 'react-icons/md'
import { ImPlus } from 'react-icons/im'
import { FiExternalLink } from 'react-icons/fi';
import { UserContext } from '../../../../context/UserContext';
import { ConfigContext } from '../../../../context/ConfigContext';
import { deleteCriteriaSet, deleteRule, deleteRuleSet } from '../../../api/RuleEngineAPI';
import RuleEngineDescription from './RuleEngineDescription';

const ChildRuleEngineItem = (props) => {

	const [name, setName] = useState(props.record.name);
	const [showDescription, setShowDescription] = useState(false);
	const [childrenLength,setChildrenLength] = useState('')
	const [children, setChildren] = useState([])
	const { user } = useContext(UserContext);
	const { config } = useContext(ConfigContext);
	const [showChild,setShowChild] = useState(false);
	const [showAddChild,setShowAddChild] = useState(false);

	return (
		<li className='list-group-item d-flex justify-content-between align-items-center'>
			<div>
				{props.record.name}
			</div>
			<div>
				<span className='badge-primary badge-pill mr-3'>
				</span>
			</div>
		</li>
	)
}

export default ChildRuleEngineItem