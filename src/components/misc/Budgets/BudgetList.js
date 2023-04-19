import React,{useState,useContext} from 'react'
import {getMonthlyBudget} from '../../api/BudgetAPI';
import BudgetItem from './BudgetItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';

const BudgetList = (props) => {

    const [showItems,setShowItems] = useState(false)
    const [items,setItems] = useState([])
    const {user, setUser} = useContext(UserContext);
    const {config} = useContext(ConfigContext);

    const onShow = async() =>{
        const monthlyBudgets = await getMonthlyBudget(props.name,config,'Bearer '+user.accessToken)
        setItems(monthlyBudgets);
    };

    const completeShow = async() =>{
      await  onShow();
      setShowItems(!showItems);
    }

  return (
    <div id="accordion">
        <div class="card" data-toggle="tooltip" data-placement="top" title="Total transactions done in this expense type | Total planned budget transactions in this expense type | Total Budget allotted to this expense type">
            <li onClick={completeShow} className='card-header gray-button list-group-item d-flex justify-content-between align-items-center' id="headingOne">
                    {props.name}
		            <div>
			            <span className='badge-primary badge-pill mr-3'>
				            Rs {props.value1} | {props.value3} | {props.value2}
			            </span>
		            </div>
            </li>
            {showItems ===true?
    		<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      			<div class="card-body">
	  				<ul className='list-group'>
						{items.map((item)=>(
              <BudgetItem item={item}
              refreshFunction={props.refreshFunction} onShow={onShow} 
              accountOptions={props.accountOptions} 
              subAccountOptions={props.subAccountOptions}/>
            ))}
					</ul>
      			</div>
    		</div>:null}
        </div>
    </div>
  )
}

export default BudgetList