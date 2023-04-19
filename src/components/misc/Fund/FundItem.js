import React,{useState,useContext} from 'react'
import { TiDelete } from 'react-icons/ti';
import { deleteFunds,updateAmountNeeded,
  updateAmountAllocated } from '../../api/FundAPI';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import FundDescription from './FundDescription';
import { FiExternalLink } from 'react-icons/fi';

const FundItem = (props) => {

  const [isEditingAllocated,setIsEditingAllocated] = useState(false);
  const [isEditingNeeded,setIsEditingNeeded] = useState(false);
  const [amountAllocated,setAmountAllocated] = useState(props.item.amountAllocated);
  const [amountNeeded,setAmountNeeded] = useState(props.item.amountNeeded);
  const {user, setUser} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [showDescription, setShowDescription] =useState(false);

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}


  const onEditAllocated = async() =>{
		if(isEditingAllocated){
			await updateAmountAllocated(props.item.id,config,'Bearer '+user.accessToken,amountAllocated)
      await props.refreshFunction(config,'Bearer '+user.accessToken)
		}
		setIsEditingAllocated(!isEditingAllocated);
	}

  const onEditNeeded = async() =>{
		if(isEditingNeeded){
			await updateAmountNeeded(props.item.id,config,'Bearer '+user.accessToken,amountNeeded)
      await props.refreshFunction(config,'Bearer '+user.accessToken)
		}
		setIsEditingNeeded(!isEditingNeeded);
	}

  const onDelete = async() =>{
    await deleteFunds(config,'Bearer '+user.accessToken,props.item.id)
    await props.refreshFunction(config,'Bearer '+user.accessToken)
  } 


return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>	
    {props.item.name}
    <FiExternalLink size='1em' onClick={onShowDescription}/>
			{
					showDescription?<FundDescription refreshFunction={props.refreshFunction} record={props.item}
					open={showDescription} hide={onHideDescription} />:null
			}
    <div data-toggle="tooltip" data-placement="top" title="Amount out of the Avaialable allocated | Total amount needed for this fund to complete">
    <span onDoubleClick={onEditAllocated} className='badge-primary badge-pill mr-3'>
        {isEditingAllocated?
        <input required='required' Name='text' id='amountAllocated' 
        placeholder='amountAllocated' value={amountAllocated} 
        onChange={(event) => setAmountAllocated(event.target.value)}></input>
        :<> {props.item.amountAllocated} </>}
      </span>
    | 
      <span onDoubleClick={onEditNeeded} className='badge-primary badge-pill mr-3'>
        {isEditingNeeded?
        <input required='required' Name='text' id='amountNeeded' 
        placeholder='amountNeeded' value={amountNeeded} 
        onChange={(event) => setAmountNeeded(event.target.value)}></input>
        :<> {props.item.amountNeeded} </>}
      </span>
      <TiDelete size='1.5em' onClick={onDelete}></TiDelete>
    </div>
  </li>
  )
}

export default FundItem;