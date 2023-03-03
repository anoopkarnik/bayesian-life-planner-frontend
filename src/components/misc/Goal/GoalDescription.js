import React, { Component, useState,useContext,useEffect } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { modifyGoalParams } from "../../api/GoalAPI";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import RuleList from "./RuleList";
import { getAllCompletedRules,getAllWorkRules } from '../../api/RuleAPI';
import {AiFillEdit} from 'react-icons/ai';
import DatePicker from "react-datepicker";

const GoalDescription = (props) => {
  

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
    const [showRules,setShowRules] = useState(false);
    const [showAddRule,setShowAddRule] = useState(false);
    const [completedRecords, setCompletedRecords] = useState([]);
    const [workRecords, setWorkRecords] = useState([]);
    const [name,setName] = useState(props.record.name);
    const [startDate,setStartDate] = useState(props.record.startDate);
    const [active, setActive] =useState(props.record.active);
    const [hidden, setHidden] = useState(props.record.hidden);
    const [completed,setCompleted] = useState(props.record.completed);
    const [dueDate,setDueDate] = useState(props.record.dueDate);
    const [timeTaken,setTimeTaken] = useState(props.record.timeTaken);
    const options = [
      {value:'true' ,label:'True'},
      {value:'false',label:'False'},
      {value:null,label:null}
    ]
    if(startDate!==null){
      const total_completion_time = new Date(dueDate) - new Date(startDate)
      const time_left = new Date(dueDate) - new Date()
      var expected_level = time_left*100/total_completion_time;
    }
    else{
      var expected_level=0
    }
    const onUpdate= async() =>{
        // await props.refreshFunction(config,'Bearer '+ user.accessToken,props.type)
        await modifyGoalParams(config, 'Bearer '+user.accessToken,
        props.record.id,name,startDate,description,active,hidden,completed,
        dueDate,timeTaken);
        setIsEditing(false);
    };

    const refreshRules = async(backend_url,bearerToken,id) => {
      const completedRecord = await getAllCompletedRules(config,'Bearer '+user.accessToken,
      props.record.id);
      const workRecord = await getAllWorkRules(config,'Bearer '+user.accessToken,
      props.record.id);
      setCompletedRecords(completedRecord);
      setWorkRecords(workRecord);
    }

    useEffect(() => {
      refreshRules(config,'Bearer '+user.accessToken,
      props.record.id);
    }, []);




  return (
    <div>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Goal Description"
        onRequestClose={props.hide}
        width="500px"
      >
        <h4>Goal Success</h4>
        <b>1. Best Case Scenario </b><br/>
        Current Level = Working Level = Expected Level <br/>
        <b>2. Current Level &gt; Expected Level &gt; Working Level</b> <br/>
        Reduce Work Rules<br/>
        <b>3. Expected Level &gt; Working Level &gt; Current Level</b> <br/>
        Increase Work Rules so that working level go below current level<br/>
      
        <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsEditing(!isEditing)}>Edit Item</button>
        &emsp;<button onClick={onUpdate} className='btn btn-secondary mt-3'>Update</button><br/><br/>
        <b>Goal Type</b> - {props.record.goalTypeName} <br/>
        <b>Created Date</b> - {formatDate(new Date(props.record.createdAt))} <br/>
        <b>Updated Date</b> - {formatDate(new Date(props.record.updatedAt))} <br/>
        <b>Current Level</b> - Lv {Math.round(props.record.completedPercentage)} <br/>
        <b>Aggregated SubGoals Level</b> - Lv {Math.round(props.childCompletedPercentage)} <br/>
        <b>Working Level</b> - Lv {Math.round(props.record.workPercentage)} <br/>
        <b>Expected Level</b> - Lv {Math.round(expected_level)} <br/>
        <b>Name</b> - {isEditing?
          <input value={name} onChange={(event)=>setName(event.target.value)}>
          </input>:<>{name}</>} <br/>
        <b>Start Date</b> - {isEditing?
          <DatePicker selected={new Date(startDate)}  
          className='form-control'
          onChange={(date)=>setStartDate(date)}/>:
          formatDate(new Date(startDate))} <br/>
        <b>Due Date</b> - {isEditing?
          <DatePicker selected={new Date(dueDate)}  
          className='form-control'
          onChange={(date)=>setDueDate(date)}/>:
          formatDate(new Date(dueDate))} <br/>
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
        <RuleList record={props.record} completedRecords={completedRecords} 
        workRecords={workRecords} type={props.type}/>
      </SlidingPane>
    </div>
  );
};

export default GoalDescription;