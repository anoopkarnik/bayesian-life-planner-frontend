import React,{useState,useContext} from 'react'
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti';
import {MdDone} from 'react-icons/md'
import {ImPlus} from 'react-icons/im'
import {FiExternalLink} from 'react-icons/fi';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { deleteAccount} from '../../api/AccountAPI';
import AccountDescription from './AccountDescription';
import { ActiveContext } from '../../../context/ActiveContext';

const AccountItem = (props) => {

	const [name,setName] = useState(props.record.name);
	const [showDescription, setShowDescription] =useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);

	const onDelete = async() =>{
		if (window.confirm('Are you sure you wish to delete this item?')){
			await deleteAccount(config,'Bearer '+user.accessToken,props.record.id)
			await props.refreshFunction(config,'Bearer '+user.accessToken)
		}
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
			<span className='badge-primary badge-pill mr-3'>
			Rs {props.record.balance}
			</span>
			
			<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
			<FiExternalLink size='1em' onClick={onShowDescription}/>
			{
				showDescription?<AccountDescription refreshFunction={props.refreshFunction}
				open={showDescription} hide={onHideDescription} 
				record={props.record}/>:null
			}
		</div>
    </li>
  )
}

export default AccountItem