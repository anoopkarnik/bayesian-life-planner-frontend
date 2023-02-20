import React,{useState,useContext,useEffect} from 'react'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { deleteRule } from '../../api/RuleAPI';
import { TiDelete } from 'react-icons/ti';
const RuleItem = (props) => {

	const [name,setName] = useState(props.record.name);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const [showDescription, setShowDescription] =useState(false);
	const urgent ={backgroundColor:"#F2A10F"}
	const medium ={backgroundColor:"#FFFF99"}
	const low ={backgroundColor:"#FFF"}
	var one_day = 1000*60*60*24
	var dueDateTime = new Date(props.record.dueDate).getTime()
	var currentTime = new Date().getTime()
	const daysLeft = (dueDateTime-currentTime)/one_day

	const onDelete = async() =>{
		await deleteRule(config,'Bearer '+user.accessToken,props.record.ruleType,props.record.id)
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}

    
  return (
    <li style={daysLeft<=0?urgent:daysLeft<7?medium:low} className='list-group-item d-flex justify-content-between align-items-center'>
		<div>
			{props.record.name}
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