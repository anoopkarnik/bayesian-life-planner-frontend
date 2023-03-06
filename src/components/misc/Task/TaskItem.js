import React,{useState,useContext} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import { completeTask, deleteTask, getSubTasks } from '../../api/TaskAPI';
import TaskDescription from './TaskDescription';
import ChildTaskItem from './ChildTaskItem';
import AddChildTaskForm from './AddChildTaskForm';

const TaskItem = (props) => {

	const [name,setName] = useState(props.record.name);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const [showDescription, setShowDescription] =useState(false);
	const [showChildTasks, setShowChildTasks] = useState(false);
	const [showAddTask,setShowAddTask] = useState(false);
	const urgent ={backgroundColor:"#F2A10F"}
	const medium ={backgroundColor:"#FFFF99"}
	const low ={backgroundColor:"#FFF"}
	var one_day = 1000*60*60*24
	var dueDateTime = new Date(props.record.dueDate)
	var dueDateTime2 = new Date(dueDateTime.getFullYear(),dueDateTime.getMonth(),dueDateTime.getDate()).getTime()
	var currentTime = new Date()
	var currentTime2 = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate()).getTime()
	const daysLeft = (dueDateTime2-currentTime2)/one_day
	const {showActive} = useContext(ActiveContext);

	const onDelete = async() =>{
		if (window.confirm('Are you sure you wish to delete this item?')){
			await deleteTask(config,'Bearer '+user.accessToken,props.record.id)
			await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.taskTypeName,showActive)
		}
	}

	const onComplete = async() => {
		await completeTask(config,'Bearer '+user.accessToken,props.record.id,user.id)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.taskTypeName,showActive)
	}

	const refreshChildTask = async() =>{
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.taskTypeName,showActive)
		setShowChildTasks(true);
		setShowAddTask(false);
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}

	const onShow = async() => {
		setShowChildTasks(!showChildTasks)
	}

	const onshowAddTask = async() =>{
		setShowAddTask(true);
	  }
	
	  const onHideAddTask= async() =>{
		setShowAddTask(false);
	  }


    
  return (
	<div>
    <li style={daysLeft<=0?urgent:daysLeft<7?medium:low} className='list-group-item d-flex justify-content-between align-items-center'>
		<div>
		{showChildTasks?
					<AiOutlineMinusCircle size='1.5em' onClick={onShow}/>:
					<AiOutlinePlusCircle size='1.5em' onClick={onShow}/>
			}
			{props.record.name}
		</div>
		<div>
			<span className='badge-primary badge-pill mr-3'>
				
			</span>
			<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
			<MdDone size='1.5em' onClick={onComplete}/>
			<FiExternalLink size='1em' onClick={onShowDescription}/>
			&nbsp;&nbsp;
			<div onClick={()=>{setShowAddTask(!showAddTask)}} 
				className='btn btn-sm'>
				<AiOutlinePlusCircle size='1.5em'/></div>
				{
					showDescription?<TaskDescription refreshFunction={props.refreshFunction} record={props.record}
					open={showDescription} hide={onHideDescription} />:null
				}

		</div>

    </li>
	{showChildTasks?
			<ul >
				{props.record.taskResponses.map((record)=>(
					<li>
						<ChildTaskItem record={record} 
							refreshFunction={props.refreshFunction}/>
					</li>
				))}
			</ul>:
		null}
		{showAddTask?
			<AddChildTaskForm refreshFunction={refreshChildTask} 
     			name={props.record.name} type={props.record.taskTypeName} 
				open={onshowAddTask} hide={onHideAddTask}
       		/>:
		null}
	</div>
  )
}

export default TaskItem