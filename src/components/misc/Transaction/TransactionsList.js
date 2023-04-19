import React from 'react'
import TransactionsItem from './TransactionsItem'
import { UserContext } from '../../../context/UserContext';

const TransactionsList = (props) => {

    
  return (
    <ul className='list-group'>
      <div>
      {props.records.map((record) => (
          <TransactionsItem name={props.name} record={record} deleteFunction={props.deleteFunction} 
          refreshFunction={props.refreshFunction} editFunction={props.editFunction}
          backend_url={props.backend_url} expenseTypes={props.expenseTypes} 
          accountTypes={props.accountTypes} categoryTypes={props.categoryTypes} 
          subCategoryTypes={props.subCategoryTypes} subAccountTypes={props.subAccountTypes} 
          dateFrom={props.dateFrom} dateTo={props.dateTo}/>
      ))}</div>
      </ul>
  )
}

export default TransactionsList