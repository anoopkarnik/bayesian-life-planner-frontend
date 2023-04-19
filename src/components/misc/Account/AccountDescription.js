import { bgcolor } from "@mui/system";
import React, { Component, useState,useContext } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import {AiFillEdit} from 'react-icons/ai';
import DatePicker from "react-datepicker";
import { modifyAccountParams } from "../../api/AccountAPI";

const AccountDescription = (props) => {

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



    const [text,setText] = useState(props.record.text);
    const [isEditing,setIsEditing] = useState(false);
    const {user, setUser} = useContext(UserContext);
	  const {config} = useContext(ConfigContext);
    const [name,setName] = useState(props.record.name);
    const [startDate,setStartDate] = useState(props.record.startDate);
    const [active, setActive] =useState(props.record.active);
    const [hidden, setHidden] = useState(props.record.hidden);
    const [completed,setCompleted] = useState(props.record.completed);
    const [description, setDescription] = useState(props.record.description);
    const [liquidity,setLiquidity] = useState(props.record.liquidity);
    const [freeLiquidity,setFreeLiquidity] = useState(props.record.freeLiquidity);
    const [balance,setBalance] = useState(props.record.balance)
    const [accountTypeName,setAccountTypeName] = useState(props.record.accountTypeName);
    const options = [
      {value:'true' ,label:'True'},
      {value:'false',label:'False'},
      {value:null,label:null}
    ]

    const onUpdate= async() =>{
        // await props.refreshFunction(config,'Bearer '+ user.accessToken)
        await modifyAccountParams(config, 'Bearer '+user.accessToken,props.record.id,
        props.record.createdAt,props.record.updatedAt,name,startDate,
        accountTypeName,description,balance,liquidity,freeLiquidity,
        active,hidden,completed,user.id);
        setIsEditing(false);
    };

  return (
    <div>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Account Text"
        onRequestClose={props.hide}
        width="500px"
      >
        <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsEditing(!isEditing)}>Edit Item</button>
        &emsp;<button onClick={onUpdate} className='btn btn-secondary mt-3'>Update</button><br/><br/>
        <b>Account Type Name</b> - {accountTypeName} <br/>
        <b>Created Date</b> - {formatDate(new Date(props.record.createdAt))} <br/>
        <b>Updated Date</b> - {formatDate(new Date(props.record.updatedAt))} <br/>
        <b>Name</b> - {isEditing?
          <input value={name} onChange={(event)=>setName(event.target.value)}>
          </input>:<>{name}</>} <br/>
        <b>Liquidity</b> - {isEditing?
        <select onChange={(event)=>setLiquidity(event.target.value)} value={String(liquidity)}>
          {options.map(item=>(
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
          </select>
        :String(liquidity)} <br/>
        <b>Free Liquidity</b> - {isEditing?
        <select onChange={(event)=>setFreeLiquidity(event.target.value)} value={String(freeLiquidity)}>
          {options.map(item=>(
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
          </select>
        :String(freeLiquidity)} <br/>
        <b>Balance</b> - {isEditing?
          <input value={balance} onChange={(event)=>setBalance(event.target.value)}>
          </input>:<>{balance}</>} <br/>
        <b>Start Date</b> - {isEditing?
          <DatePicker selected={new Date(startDate)}  
          className='form-control'
          onChange={(date)=>setStartDate(date)}/>:
          formatDate(new Date(startDate))} <br/>
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

export default AccountDescription;