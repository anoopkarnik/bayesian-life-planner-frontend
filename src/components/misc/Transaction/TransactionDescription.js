import { bgcolor } from "@mui/system";
import React, { Component, useState,useContext, useEffect } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { modifyTaskParams } from "../../api/TaskAPI";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import {AiFillEdit} from 'react-icons/ai';
import DatePicker from "react-datepicker";
import { modifyTransactionParams } from "../../api/TransactionAPI";
import { getTotalExpenses,getTotalCategories,
getTotalSubCategories } from "../../api/AdminAPI";

const TransactionDescription = (props) => {

    function formatDate(newDate) {
        const months = {0: 'January',1: 'February',2: 'March',3: 'April',
        4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September',
          9: 'October', 10: 'November',  11: 'December' }
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const year = newDate.getFullYear()
        const date = newDate.getDate()
        const monthIndex = newDate.getMonth()
        const monthName = months[newDate.getMonth()]
        const dayName = days[newDate.getDay()] // Thu
        const formatted = `${dayName}, ${date} ${monthName} ${year}`
        return formatted.toString()
      }
    const [description,setDescription] = useState(props.record.description);
    const [isEditing,setIsEditing] = useState(false);
    const {user, setUser} = useContext(UserContext);
	  const {config} = useContext(ConfigContext);
    const [name,setName] = useState(props.record.name);
    const [startDate,setStartDate] = useState(props.record.startDate);
    const [accountName, setAccountName] = useState(props.record.accountName);
    const [accountTypeName,setAccountTypeName] = useState(props.record.accountTypeName);
    const [categoryName, setCategoryName] = useState(props.record.categoryName);
    const [expenseName, setExpenseName] = useState(props.record.expenseName);
    const [subCategoryName,setSubCategoryName] = useState(props.record.subCategoryName);
    const [active, setActive] =useState(props.record.active);
    const [hidden, setHidden] = useState(props.record.hidden);
    const [completed,setCompleted] = useState(props.record.completed);
    const [cost,setCost] = useState(props.record.cost);
    const [expenseOptions,setExpenseOptions] = useState([])
    const [categoryOptions,setCategoryOptions] = useState([])
    const [subCategoryOptions,setSubCategoryOptions] = useState([]);
    const options = [
      {value:'true' ,label:'True'},
      {value:'false',label:'False'},
      {value:null,label:null}
    ]
    const onUpdate = async() =>{
      await modifyTransactionParams(config, 'Bearer '+user.accessToken,
      props.record.id,props.record.createdAt,props.record.updatedAt,
      name,startDate,accountName,accountTypeName,categoryName,
      expenseName,subCategoryName,description,cost,active,hidden,completed,
      user.id);
      setIsEditing(false);

    }

    const refreshTransactionDescriptionPage = async(backend_url,bearerToken) =>{
      const {expenses,expenseOptions} = await getTotalExpenses(backend_url,bearerToken);
      const {categories,categoryOptions} = await getTotalCategories(backend_url,bearerToken);
      const {subCategories,subCategoryOptions} = await getTotalSubCategories(backend_url,bearerToken);
      setExpenseOptions(expenseOptions);  
      setCategoryOptions(categoryOptions);    
      setSubCategoryOptions(subCategoryOptions);    
    }

    useEffect(() => {
      refreshTransactionDescriptionPage(config,'Bearer '+user.accessToken);
    }, []);

  return (
    <div>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Transaction Description"
        onRequestClose={props.hide}
        width="500px"
      >
        <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsEditing(!isEditing)}>Edit Item</button>
        &emsp;<button onClick={onUpdate} className='btn btn-secondary mt-3'>Update</button><br/><br/>
        <b>Account Name</b> - {accountName} <br/>
        <b>Account Type Name</b> - {accountTypeName}<br/>
        <b>Created Date</b> - {formatDate(new Date(props.record.createdAt))} <br/>
        <b>Updated Date</b> - {formatDate(new Date(props.record.updatedAt))} <br/>
        <b>Name</b> - {isEditing?
          <input value={name} onChange={(event)=>setName(event.target.value)}>
          </input>:<>{name}</>} <br/>
        <b>Start Date</b> - {isEditing?
          <DatePicker selected={new Date(startDate)}  
          className='form-control'
          onChange={(date)=>setStartDate(date)}/>:
          formatDate(new Date(startDate))} <br/>
        <b>Expense Name</b> - {isEditing?
        <select onChange={(event)=>setExpenseName(event.target.value)} value={expenseName}>
          {expenseOptions.map(item=>(
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
          </select>
        :expenseName} <br/>
        <b>Category Name</b> - {isEditing?
        <select onChange={(event)=>setCategoryName(event.target.value)} value={categoryName}>
          {categoryOptions.map(item=>(
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
          </select>
        :categoryName} <br/>
        <b>Sub Category Name</b> - {isEditing?
        <select onChange={(event)=>setSubCategoryName(event.target.value)} value={subCategoryName}>
          {subCategoryOptions.map(item=>(
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
          </select>
        :subCategoryName} <br/>

        <b>Cost</b> - {isEditing?
          <input value={cost} onChange={(event)=>setCost(event.target.value)}>
          </input>:<>{cost}</>} <br/>
          
        <b>Active</b> - {isEditing?
        <select onChange={(event)=>setActive(event.target.value)} value={String(active)}>
          {options.map(item=>(
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
          </select>
        :String(active)} <br/>
        <b>Hidden</b> - {isEditing?
        <select onChange={(event)=>setHidden(event.target.value)} value={String(hidden)}>
          {options.map(item=>(
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
          </select>
        :String(hidden)} <br/>
        <b>Completed</b> - {isEditing?
        <select onChange={(event)=>setCompleted(event.target.value)} value={String(completed)}>
          {options.map(item=>(
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
          </select>
        :String(completed)} <br/>
        <b>Description</b>
        {isEditing?
				<textarea rows="15" cols="30" required='required' Name='text' id='description' placeholder='Please add the description' value={description} 
						onChange={(event) => setDescription(event.target.value)}>
				</textarea>:
                <>{description}</>
			    }
          <br/>
      </SlidingPane>
    </div>
  );
};

export default TransactionDescription;