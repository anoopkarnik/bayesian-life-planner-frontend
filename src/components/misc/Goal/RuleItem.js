import React,{useState,useContext,useEffect} from 'react'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { deleteCompletedRule,deleteWorkRule } from '../../api/GoalAPI';

import { TiDelete } from 'react-icons/ti';
const RuleItem = (props) => {

	const [name,setName] = useState(props.name);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const [showDescription, setShowDescription] =useState(false);

	const onDelete = async() =>{
		if(props.type==="Completed"){
			await deleteCompletedRule(config,'Bearer '+user.accessToken,props.id)
		}
		else{
			await deleteWorkRule(config,'Bearer '+user.accessToken,props.id)
		}
		
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}

    
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
		<div>
			{props.name}
		</div>
		<div>
			<span className='badge-primary badge-pill mr-3'>
				
			</span>
			<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
		</div>
    </li>
  )
    }


export default RuleItem;