import React,{useState,useContext} from 'react'
import { TiDelete } from 'react-icons/ti';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { deleteTransaction } from '../../api/TransactionAPI';
import { FiExternalLink } from 'react-icons/fi';
import TransactionDescription from './TransactionDescription';

const TransactionsItem = (props) => {

	const [balance,setBalance] = useState(props.record.cost);
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [showDescription, setShowDescription] =useState(false);

	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}


	const onDelete = async() =>{
		await deleteTransaction(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.expenseTypes,
				props.accountTypes,	props.categoryTypes,props.subCategoryTypes,
				props.dateFrom,props.dateTo)
			
	}
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
		{props.record.name}
		<div>
			<span className='badge-primary badge-pill mr-3' data-toggle="tooltip" data-placement="top" title="Double Click to edit the record on accounts tab">
				<>Rs {props.record.cost}</>
			</span>
			<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
			<FiExternalLink size='1em' onClick={onShowDescription}/>
			{
					showDescription?<TransactionDescription refreshFunction={props.refreshFunction} record={props.record}
					open={showDescription} hide={onHideDescription} />:null
			}
		</div>
    </li>
  )
}

export default TransactionsItem