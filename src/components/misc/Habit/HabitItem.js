import React,{useState,useContext} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {ImPlus} from 'react-icons/im'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ActiveContext } from '../../../context/ActiveContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { completeHabit, deleteHabit} from '../../api/HabitAPI';
import HabitDescription from './HabitDescription';
import Popup from 'reactjs-popup';
import { CurrentDateContext } from '../../../context/CurrentDateContext';

const HabitItem = (props) => {

	var one_day = 1000*60*60*24
	const [name,setName] = useState(props.record.name);
	const [showDescription, setShowDescription] =useState(false);
	const [showAddHabit,setShowAddHabit] = useState(false);
	const {currentDate} = useContext(CurrentDateContext);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const urgent ={backgroundColor:"#F2A10F",border:"None"}
	const medium ={backgroundColor:"#FFFF99",border:"None"}
	const low ={backgroundColor:"#FFF",border:"None"}
	var dueDateTime = new Date(props.record.dueDate)
	var dueDateTime2 = new Date(dueDateTime.getFullYear(),dueDateTime.getMonth(),dueDateTime.getDate()).getTime()
	var currentTime = new Date()
	var currentTime2 = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate()).getTime()
	const daysLeft = (dueDateTime2-currentTime2)/one_day
	const {showActive} = useContext(ActiveContext);

	const onDelete = async() =>{
		if (window.confirm('Are you sure you wish to delete this item?')){
			await deleteHabit(config,'Bearer '+user.accessToken,props.record.id)
			await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.habitTypeName,showActive,currentDate)
		}
	}

	const onComplete = async() => {
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id,'Complete',currentDate)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive,currentDate)
	}

	const onAtomicComplete = async() => {
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id,'Atomic',currentDate)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive,currentDate)
	}

	const onConditionalComplete = async() => {
		await completeHabit(config,'Bearer '+user.accessToken,props.record.id,'Condition',currentDate)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.habitTypeName,showActive,currentDate)
	}

	const onRefresh = async() =>{
		setShowAddHabit(false);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.habitTypeName,showActive,currentDate)
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}

	const onshowAddHabit = async() =>{
		setShowAddHabit(true);
	  }
	
	  const onHideAddHabit= async() =>{
		setShowAddHabit(false);
	  }

 
    
  return (
	<div>
    <li className='list-group-item d-flex justify-content-between align-items-center'>
		<div>
			{props.record.name}
		</div>
			{props.record.streak}
			<Popup trigger={<button><ImPlus size='0.8em'/></button>}>
				<div className='p-3 mb-2 bg-light'>
					<div className='badge-primary badge-pill mr-3'> Select completion Type</div>
					<div onClick={onComplete} className='btn btn-secondary'>Complete</div>&ensp;
					<div onClick={onAtomicComplete} className='btn btn-secondary'>Atomic</div>&ensp;
					<div onClick={onConditionalComplete} className='btn btn-secondary'>Conditional</div>
				</div>
			</Popup>

			{props.record.totalTimes}
		<div>
			<span className='badge-primary badge-pill mr-3'>

			</span>

			<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
			<FiExternalLink size='1em' onClick={onShowDescription}/>
			&nbsp;&nbsp;
			{
				showDescription?<HabitDescription refreshFunction={props.refreshFunction}
				open={showDescription} hide={onHideDescription} 
				record={props.record}/>:null
			}
		</div>
    </li>
	
	</div>
  )
}

export default HabitItem