import React,{useState,useContext,useEffect} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {ImPlus} from 'react-icons/im'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { deleteGoal} from '../../api/GoalAPI';
import GoalDescription from './GoalDescription';
import ChildGoalItem from './ChildGoalItem';
import AddChildGoalForm from './AddChildGoalForm';
import { completeGoal } from '../../api/GoalAPI';
import {BsCircleFill} from 'react-icons/bs';
import { ActiveContext } from '../../../context/ActiveContext';


const GoalItem = (props) => {

	const [value,setValue] = useState(props.record.value);
	const [isEditing,setIsEditing] = useState(false);
	const [showDescription, setShowDescription] =useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const [showChildGoals, setShowChildGoals] = useState(false);
	const [showAddGoal, setShowAddGoal] = useState(false);
	const [childCompletedPercentage,setChildCompletedPercentage] = useState(0);
	const {showActive} = useContext(ActiveContext);
	const onDelete = async() =>{
		if (window.confirm('Are you sure you wish to delete this item?')){
			await deleteGoal(config,'Bearer '+user.accessToken,props.record.id)
			await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.goalTypeName,showActive)
		}
	}
	const onRefresh = async() =>{
		setShowAddGoal(false);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.record.goalTypeName,showActive)
		
	}

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}
	const onShow = async() => {
		setShowChildGoals(!showChildGoals)
	}

	const onshowAddGoal = async() =>{
		setShowAddGoal(true);
	  }
	
	  const onHideAddGoal= async() =>{
		setShowAddGoal(false);
	  }

	const onComplete = async() => {
		await completeGoal(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+ user.accessToken)
	}

	const getChildCompletedPercentages = async() =>{
		let childCompletedPercentage1 = 0.00;
		if (props.record.goalResponses.length>0){
			for(let response of props.record.goalResponses){
				childCompletedPercentage1+=response.completedPercentage;
			}
			childCompletedPercentage1 = childCompletedPercentage1/props.record.goalResponses.length
		}
		console.log(childCompletedPercentage1);
		setChildCompletedPercentage(childCompletedPercentage1);
	}

	useEffect(() => {
		getChildCompletedPercentages()
	  }, []);
   
  return (
	<div>
    	<li className='list-group-item d-flex justify-content-between align-items-center'>
			<div>{props.record.goalResponses.length>0?<>
				{showChildGoals?
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
				<div onClick={()=>{setShowAddGoal(!showAddGoal)}} 
				className='btn btn-sm'>
				<AiOutlinePlusCircle size='1.5em'/></div>
				{
					showDescription?<GoalDescription refreshFunction={props.refreshFunction}
					open={showDescription} hide={onHideDescription} 
					record={props.record} childCompletedPercentage={childCompletedPercentage}/>:null
				}
			</div>
    	</li>
		{showChildGoals?
			<ul >
				{props.record.goalResponses.map((record)=>(
					<li>
						<ChildGoalItem record={record} 
							refreshFunction={props.refreshFunction}/>
					</li>
				))}


			</ul>:
		null}
		{showAddGoal?
			<AddChildGoalForm refreshFunction={onRefresh} 
     			name={props.record.name} type={props.record.goalTypeName} open={onshowAddGoal} hide={onHideAddGoal}
       		/>:
		null}
	</div>
  )
}

export default GoalItem