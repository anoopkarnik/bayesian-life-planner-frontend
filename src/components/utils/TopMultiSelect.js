import React,{useContext} from 'react'
import {Multiselect} from "multiselect-react-dropdown";
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';

const TopMultiSelect = (props) => {

  const {user, setUser} = useContext(UserContext)
  const {config} = useContext(ConfigContext)
    const onSelect = async(event) => {
        const selectedValues = []
        if(event.length>0){
            for(let i =0;i<event.length;i++){
                selectedValues.push(event[i].name)
            }
            if(props.name=="Expense Types"){
              props.refreshTransactions(config,'Bearer '+user.accessToken,selectedValues,props.accountTypes,
                props.categoryTypes,props.subCategoryTypes,
                props.dateFrom,props.dateTo)
            }
            else if(props.name=="Account Types"){
              props.refreshTransactions(config,'Bearer '+user.accessToken,props.expenseTypes,selectedValues,
                props.categoryTypes,props.subCategoryTypes,
                props.dateFrom,props.dateTo)
            }
            else if(props.name=="Category Types"){
              props.refreshTransactions(config,'Bearer '+user.accessToken,props.expenseTypes,props.accountTypes,
                selectedValues,props.subCategoryTypes,
                props.dateFrom,props.dateTo)
            }
            else if(props.name=="Subcategory Types"){
              props.refreshTransactions(config,'Bearer '+user.accessToken,props.expenseTypes,props.accountTypes,
                props.categoryTypes,selectedValues,
                props.dateFrom,props.dateTo)
            };
            
        }    
      };
  return (
    <div className='col-sm'>
    <label>{props.name}</label>
    <Multiselect options={props.values} onSelect={onSelect} onRemove={onSelect} displayValue="name" showCheckbox/>
</div>
  )
}

export default TopMultiSelect