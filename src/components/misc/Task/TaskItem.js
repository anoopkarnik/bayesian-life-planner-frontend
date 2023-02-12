import React,{useState,useContext} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { completeTask, deleteTask, getSubTasks } from '../../api/TaskAPI';
import SubTaskList from './SubTaskList';
import TaskDescription from './TaskDescription';

const TaskItem = (props) => {

	const [name,setName] = useState(props.record.name);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const [showSubTasks, setShowSubTasks] = useState(false);
	const [showDescription, setShowDescription] =useState(false);
	const [subTasks, setSubTasks] = useState([]);
	const urgent ={backgroundColor:"#F2A10F"}
	const medium ={backgroundColor:"#FFFF99"}
	const low ={backgroundColor:"#FFF"}
	var one_day = 1000*60*60*24
	var dueDateTime = new Date(props.record.dueDate).getTime()
	var currentTime = new Date().getTime()
	const daysLeft = (dueDateTime-currentTime)/one_day

	const onDelete = async() =>{
		await deleteTask(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
	}

	const onComplete = async() => {
		await completeTask(config,'Bearer '+user.accessToken,props.record.id,user.id)
		await props.refreshFunction(user.id,config,'Bearer '+ user.accessToken)
	}

	const onShow = async() =>{
		setShowSubTasks(!showSubTasks)
		await refreshTask();
		console.log(new Date(props.record.dueDate).getDate() - new Date().getDate())
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}

	const refreshTask = async() =>{
		const subtasks = await getSubTasks(config,'Bearer '+user.accessToken,user.id,props.record.id)
		setSubTasks(subtasks);
	}

    
  return (
    <li style={daysLeft<=0?urgent:daysLeft<7?medium:low} className='list-group-item d-flex justify-content-between align-items-center'>
		<div>
		{showSubTasks?<AiOutlineMinusCircle size='1.5em' onClick={onShow}/>:
		<AiOutlinePlusCircle size='1.5em' onClick={onShow}/>
			}
			{props.record.name}
		</div>
		{showSubTasks?null:
		<div>
			<span className='badge-primary badge-pill mr-3'>
				
			</span>
			<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
			<MdDone size='1.5em' onClick={onComplete}/>
				<FiExternalLink size='1em' onClick={onShowDescription}/>
				{
					showDescription?<TaskDescription refreshFunction={props.refreshFunction}
					open={showDescription} hide={onHideDescription} 
					record={props.record}/>:null
				}

		</div>}
					{showSubTasks?<SubTaskList refreshFunction={refreshTask} 
			records={subTasks} taskId={props.record.id}

			/>:null}

    </li>
  )
}

export default TaskItem