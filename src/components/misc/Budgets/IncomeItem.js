import React,{useState,useContext} from 'react'
import { TiDelete } from 'react-icons/ti';
import { deleteIncome} from '../../api/BudgetAPI';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';

const IncomeItem = (props) => {

  const {user, setUser} = useContext(UserContext);
  const {config} = useContext(ConfigContext);


  const onDelete = async() =>{
    await deleteIncome(config,'Bearer '+user.accessToken,props.id)
    await props.refreshFunction(config,'Bearer '+user.accessToken)
  } 


return (
  <li className='list-group-item d-flex justify-content-between align-items-center'>
   {props.name}
			<div>
				<span className='badge-primary badge-pill mr-3'>
          Rs {props.income}
				</span>
				<TiDelete size='1.5em' onClick={onDelete}></TiDelete>
			</div>
  </li>
  
  )
}

export default IncomeItem 