import React,{useState,useContext} from 'react'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { completeSubTask, deleteSubTask } from '../../api/TaskAPI';
import SubTaskDescription from './SubTaskDescription';
import {FiExternalLink} from 'react-icons/fi';

const SubTaskItem = (props) => {

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

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}


	const onDelete = async() =>{
		await deleteSubTask(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
	}

	const onComplete = async() => {
		await completeSubTask(config,'Bearer '+user.accessToken,props.record.id,user.id)
		await props.refreshFunction(user.id,config,'Bearer '+ user.accessToken)
	}

    
  return (
    <li style={daysLeft<=0?urgent:daysLeft<7?medium:low}  
	className='list-group-item d-flex justify-content-between align-items-center'>
			{props.record.name}
			<div>
				<span className='badge-primary badge-pill mr-3'>
				
				</span>
				<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
				<MdDone size='1.5em' onClick={onComplete}/>
				<FiExternalLink size='1em' onClick={onShowDescription}/>
			{
				showDescription?<SubTaskDescription refreshFunction={props.refreshFunction}
				open={showDescription} hide={onHideDescription} 
				record={props.record}/>:null
			}
			</div>
    </li>
  )
}

export default SubTaskItem