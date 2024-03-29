import React,{useState,useContext} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {ImPlus} from 'react-icons/im'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { deleteSkill} from '../../api/SkillAPI';
import SkillDescription from './SkillDescription';
import ChildSkillItem from './ChildSkillItem';
import AddChildSkillForm from './AddChildSkillForm';
import { completeSkill } from '../../api/SkillAPI';
import { ActiveContext } from '../../../context/ActiveContext';


const SkillItem = (props) => {

	const [value,setValue] = useState(props.record.value);
	const [isEditing,setIsEditing] = useState(false);
	const [showDescription, setShowDescription] =useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const [showChildSkills, setShowChildSkills] = useState(false);
	const [showAddSkill, setShowAddSkill] = useState(false);
	const {showActive} = useContext(ActiveContext);

	const onDelete = async() =>{
		if (window.confirm('Are you sure you wish to delete this item?')){
			await deleteSkill(config,'Bearer '+user.accessToken,props.record.id)
			await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.skillTypeName,showActive)
		}
	}

	const onRefresh = async() =>{
		setShowAddSkill(false);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.skillTypeName,showActive)
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}
	const onShow = async() => {
		setShowChildSkills(!showChildSkills)
	}

	const onshowAddSkill = async() =>{
		setShowAddSkill(true);
	  }
	
	  const onHideAddSkill= async() =>{
		setShowAddSkill(false);
	  }

	const onComplete = async() => {
		await completeSkill(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+ user.accessToken,props.record.skillTypeName,showActive)
	}

   
  return (
	<div>
    	<li className='list-group-item d-flex justify-content-between align-items-center'>
		<div>{props.record.skillResponses.length>0?<>
				{showChildSkills?
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
				<div onClick={()=>{setShowAddSkill(!showAddSkill)}} 
				className='btn btn-sm'>
				<AiOutlinePlusCircle size='1.5em'/></div>
				{
					showDescription?<SkillDescription refreshFunction={props.refreshFunction}
					open={showDescription} hide={onHideDescription} 
					record={props.record}/>:null
				}
			</div>
    	</li>
		{showChildSkills?
			<ul >
				{props.record.skillResponses.map((record)=>(
					<li>
						<ChildSkillItem record={record} 
							refreshFunction={props.refreshFunction}/>
					</li>
				))}


			</ul>:
		null}
		{showAddSkill?
			<AddChildSkillForm refreshFunction={onRefresh} 
     			name={props.record.name} type={props.record.skillTypeName}
       		/>:
		null}
	</div>
  )
}

export default SkillItem