import React,{useState,useContext,useEffect,useMemo} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {ImPlus} from 'react-icons/im'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import {  carriedOutBadHabit, deleteBadHabit} from '../../api/BadHabitAPI';
import BadHabitDescription from './BadHabitDescription';
import ChildBadHabitItem from './ChildBadHabitItem';
import AddChildBadHabitForm from './AddChildBadHabitForm';

const BadHabitItem = (props) => {

	const [name,setName] = useState(props.record.name);
	const [showDescription, setShowDescription] =useState(false);
	const [showChildBadHabits, setShowChildBadHabits] = useState(false);
	const [showAddBadHabit,setShowAddBadHabit] = useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const SECOND = 1000;
	const MINUTE = SECOND*60;
	const HOUR = MINUTE*60;
	const DAY = HOUR*24

	const [time,setTime]= useState(Date.now() - Date.parse(props.record.updatedAt))

	const onDelete = async() =>{
		await deleteBadHabit(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+user.accessToken)
	}

	const onComplete = async() => {
		await carriedOutBadHabit(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+ user.accessToken)
		setTime(Date.now() - Date.parse(props.record.updatedAt));
	}

	const onRefresh = async() =>{
		setShowAddBadHabit(false);
		await props.refreshFunction(config,'Bearer '+user.accessToken)
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}

	const onShow = async() => {
		setShowChildBadHabits(!showChildBadHabits)
	}

	const onshowAddBadHabit = async() =>{
		setShowAddBadHabit(true);
	  }
	
	  const onHideAddBadHabit= async() =>{
		setShowAddBadHabit(false);
	  }


	useEffect(() => {
		const interval = setInterval(() => 
		setTime(Date.now() - new Date(Date.parse(props.record.updatedAt))), 1000);
	
		return () => clearInterval(interval);
	  }, [Date.parse(props.record.updatedAt)]);
	
    
  return (
	<div>
    	<li className='list-group-item d-flex justify-content-between align-items-center'>
		<div>{props.record.badHabitResponses.length>0?<>
				{showChildBadHabits?
					<AiOutlineMinusCircle size='1em' onClick={onShow}/>:
					<AiOutlinePlusCircle size='1em' onClick={onShow}/>
				}</>:<>&emsp;</>}
				{props.record.name}
		</div>
			<div>
				<span className='badge-primary badge-pill mr-3'>
					{`${Math.floor(time/DAY)}`.padStart(2, "0")}:
					{`${Math.floor(time/HOUR)%24}`.padStart(2, "0")}:
					{`${Math.floor(time/MINUTE)%60}`.padStart(2, "0")}:
					{`${Math.floor(time/SECOND)%60}`.padStart(2, "0")}
				</span>
				&nbsp;&nbsp;&nbsp;
				<ImPlus size='0.9em' onClick={onComplete}/>
				<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
				<FiExternalLink size='1em' onClick={onShowDescription}/>
				&nbsp;&nbsp;
				<div onClick={()=>{setShowAddBadHabit(!showAddBadHabit)}} 
				className='btn btn-sm'>
				<AiOutlinePlusCircle size='1.5em'/></div>
				{
					showDescription?<BadHabitDescription refreshFunction={props.refreshFunction}
					open={showDescription} hide={onHideDescription} 
					record={props.record}/>:null
				}
			</div>
    	</li>
		{showChildBadHabits?
			<ul >
				{props.record.badHabitResponses.map((record)=>(
					<li>
						<ChildBadHabitItem record={record} 
							refreshFunction={props.refreshFunction}/>
					</li>
				))}


			</ul>:
		null}
		{showAddBadHabit?
			<AddChildBadHabitForm refreshFunction={onRefresh} 
     			name={props.record.name} type={props.record.badHabitTypeName} 
				open={onshowAddBadHabit} hide={onHideAddBadHabit}
       		/>:
		null}
	</div>
  )
}

export default BadHabitItem