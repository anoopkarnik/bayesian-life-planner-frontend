import React,{useState,useContext} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {ImPlus} from 'react-icons/im'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { deleteStats,addStatsValue} from '../../api/StatsAPI';
import StatsDescription from './StatsDescription';


const StatsItem = (props) => {

	const [value,setValue] = useState(props.record.value);
	const [isEditing,setIsEditing] = useState(false);
	const [showDescription, setShowDescription] =useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);

	const onDelete = async() =>{
		await deleteStats(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
	}

	const onEdit = async() =>{
		if(isEditing){
			await addStatsValue(config,'Bearer '+user.accessToken,props.record.id,value)
      		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
		}
		setIsEditing(!isEditing);
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
			{props.record.name}
		</div>
		
		<div>
			<span onDoubleClick={onEdit} className='badge-primary badge-pill mr-3'>
				{isEditing?
					<input required='required' Name='value' id='value' 
						placeholder='value' value={value} 
						onChange={(event) => setValue(event.target.value)}>
					</input>
				:<>{props.record.value}</>}
			</span>
			
			<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
			<FiExternalLink size='1em' onClick={onShowDescription}/>
			{
				showDescription?<StatsDescription refreshFunction={props.refreshFunction}
				open={showDescription} hide={onHideDescription} 
				record={props.record}/>:null
			}
		</div>
    </li>
  )
}

export default StatsItem