import React,{useState,useContext} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {ImPlus} from 'react-icons/im'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import { completeHabit, deleteHabit} from '../../api/HabitAPI';
import HabitDescription from './HabitDescription';
import AddChildHabitForm from './AddChildHabitForm';

const ChildHabitItem = (props) => {

	var one_day = 1000*60*60*24
	const [name,setName] = useState(props.record.name);
	const [showDescription, setShowDescription] =useState(false);
	const [showChildHabits, setShowChildHabits] =useState(false);
	const [showAddHabit, setShowAddHabit] = useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const {showActive} = useContext(ActiveContext);
	const urgent ={backgroundColor:"#F2A10F"}
	const medium ={backgroundColor:"#FFFF99"}
	const low ={backgroundColor:"#FFF"}
	var dueDateTime = new Date(props.record.dueDate).getTime()
	var currentTime = new Date().getTime()
	const daysLeft = (dueDateTime-currentTime)/one_day

	const onDelete = async() =>{
		if (window.confirm('Are you sure you wish to delete this item?')){
			await deleteHabit(config,'Bearer '+user.accessToken,props.record.id)
			await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.habitTypeName,showActive)
		}
	}

	const onComplete = async() => {
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive)
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}
	
	const onShow = async() => {
		setShowChildHabits(!showChildHabits)
	}

	const onshowAddHabit = async() =>{
		setShowAddHabit(true);
	  }
	
	  const onHideAddHabit= async() =>{
		setShowAddHabit(false);
	  }	

 
    
  return (
	<div>
    <li style={daysLeft<1?urgent:daysLeft<7?medium:low} className='list-group-item d-flex justify-content-between align-items-center'>
		<div>
			{/* {showChildHabits?
					<AiOutlineMinusCircle size='1.5em' onClick={onShow}/>:
					<AiOutlinePlusCircle size='1.5em' onClick={onShow}/>
				} */}
			{props.record.name}
		</div>
			{props.record.streak}
			<ImPlus size='0.9em' onClick={onComplete}/>
			{props.record.totalTimes}
		<div>
			<span className='badge-primary badge-pill mr-3'>

			</span>

			<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
			<FiExternalLink size='1em' onClick={onShowDescription}/>
			{
				showDescription?<HabitDescription refreshFunction={props.refreshFunction}
				open={showDescription} hide={onHideDescription} 
				record={props.record}/>:null
			}
		</div>
    </li>
	{showChildHabits?
			<ul>
				{props.record.habitResponses.map((record)=>(
					<li>
						<ChildHabitItem record={record} 
							refreshFunction={props.refreshFunction}/>
					</li>
				))}
			</ul>:null}
			{showAddHabit?
					<AddChildHabitForm refreshFunction={props.refreshFunction} 
     				 	name={props.record.name} type={props.record.habitTypeName} 
						open={onshowAddHabit} hide={onHideAddHabit}
       				/>:null}
	</div>
  )
}

export default ChildHabitItem