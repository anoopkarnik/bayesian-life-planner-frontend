import React,{useState,useContext} from 'react'
import DatePicker from "react-datepicker";
import { UserContext } from '../../context/UserContext';


const DatePick = (props) => {

  const date = new Date();
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date(date.setMonth(date.getMonth()+1)));
  const {user, setUser} = useContext(UserContext);

    const onChange= async(date) => {
        if(props.name==="Start Date"){
          setStartDate(date)
            props.refreshTransactions(user.id,props.backend_url,'Bearer '+user.accessToken,props.expenseTypes,
              props.accountTypes,
              props.categoryTypes,props.subCategoryTypes,
              date,props.dateTo)
          }
        else if(props.name==="End Date"){
          setEndDate(date)
            props.refreshTransactions(user.id,props.backend_url,'Bearer '+user.accessToken,props.expenseTypes,
              props.accountTypes,
              props.categoryTypes,props.subCategoryTypes,
              props.dateFrom,date)
          }
        }        
  return (
    <div className='col-sm'> 
      <label>{props.name}</label>
      {props.name==="Start Date"?<div>
      <DatePicker selected={startDate} onChange={onChange} />
      </div>:
      <div>
      <DatePicker selected={endDate} onChange={onChange} />
      </div>}
    </div>
  )
}

export default DatePick;