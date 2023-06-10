import React,{useState,useContext} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {ImPlus} from 'react-icons/im'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { deleteTopic} from '../../api/TopicAPI';
import TopicDescription from './TopicDescription';
import { completeTopic } from '../../api/TopicAPI';
import { ActiveContext } from '../../../context/ActiveContext';


const TopicItem = (props) => {

	const [value,setValue] = useState(props.record.value);
	const [isEditing,setIsEditing] = useState(false);
	const [showDescription, setShowDescription] =useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const [showAddTopic, setShowAddTopic] = useState(false);
	const {showActive} = useContext(ActiveContext);

	const onDelete = async() =>{
		if (window.confirm('Are you sure you wish to delete this item?')){
			await deleteTopic(config,'Bearer '+user.accessToken,props.record.id)
			await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.topicTypeName,showActive)
		}
	}

	const onRefresh = async() =>{
		setShowAddTopic(false);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.topicTypeName,showActive)
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}

	const onshowAddTopic = async() =>{
		setShowAddTopic(true);
	  }
	
	  const onHideAddTopic= async() =>{
		setShowAddTopic(false);
	  }


   
  return (
	<div>
    	<li className='list-group-item d-flex justify-content-between align-items-center'>
		<div>
				{props.record.name}
				
			</div>
			<div>

				<span className='badge-primary badge-pill mr-3'>

				</span>
			
				<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
				<FiExternalLink size='1em' onClick={onShowDescription}/>
				&nbsp;&nbsp;
				{
					showDescription?<TopicDescription refreshFunction={props.refreshFunction}
					open={showDescription} hide={onHideDescription} 
					record={props.record}/>:null
				}
			</div>
    	</li>
	</div>
  )
}

export default TopicItem