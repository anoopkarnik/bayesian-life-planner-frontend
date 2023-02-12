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

const BadHabitItem = (props) => {

	const [name,setName] = useState(props.record.name);
	const [showDescription, setShowDescription] =useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const SECOND = 1000;
	const MINUTE = SECOND*60;
	const HOUR = MINUTE*60;
	const DAY = HOUR*24

	const [time,setTime]= useState(Date.now() - Date.parse(props.record.updatedAt))

	const onDelete = async() =>{
		await deleteBadHabit(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
	}

	const onComplete = async() => {
		await carriedOutBadHabit(config,'Bearer '+user.accessToken,props.record.id,user.id)
		await props.refreshFunction(user.id,config,'Bearer '+ user.accessToken)
		setTime(Date.now() - Date.parse(props.record.updatedAt));
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}


	useEffect(() => {
		const interval = setInterval(() => 
		setTime(Date.now() - new Date(Date.parse(props.record.updatedAt))), 1000);
	
		return () => clearInterval(interval);
	  }, [Date.parse(props.record.updatedAt)]);
	
    
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
		<div>
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
			{
				showDescription?<BadHabitDescription refreshFunction={props.refreshFunction}
				open={showDescription} hide={onHideDescription} 
				record={props.record}/>:null
			}
		</div>
    </li>
  )
}

export default BadHabitItem