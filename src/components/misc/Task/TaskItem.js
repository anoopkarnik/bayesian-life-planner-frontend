import React,{useState,useContext} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
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
	var dueDateTime = new Date(props.record.dueDate).getTime()
	var currentTime = new Date().getTime()
	const daysLeft = (dueDateTime-currentTime)/one_day

	const onDelete = async() =>{
		await deleteTask(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+user.accessToken)
	}

	const onComplete = async() => {
		await completeTask(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+ user.accessToken)
	}

	const onRefresh = async() =>{
		setShowAddTask(false);
		await props.refreshFunction(config,'Bearer '+user.accessToken)
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
		<div>{props.record.taskResponses.length>0?<>
				{showChildTasks?
					<AiOutlineMinusCircle size='1em' onClick={onShow}/>:
					<AiOutlinePlusCircle size='1em' onClick={onShow}/>
				}</>:<>&emsp;</>}
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
					showDescription?<TaskDescription record={props.record} 
					refreshFunction={props.refreshFunction}
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
			<AddChildTaskForm refreshFunction={onRefresh} 
     			name={props.record.name} type={props.record.taskTypeName} 
				open={onshowAddTask} hide={onHideAddTask}
       		/>:
		null}
	</div>
  )
}

export default TaskItem