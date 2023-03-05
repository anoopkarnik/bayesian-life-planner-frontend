import { bgcolor } from "@mui/system";
import React, { Component, useState,useContext } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { modifyHabitParams } from "../../api/HabitAPI";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import {AiFillEdit} from 'react-icons/ai';
import DatePicker from "react-datepicker";
import { modifyHabitSchedule } from "../../api/HabitAPI";


const HabitDescription = (props) => {

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
    const [active, setActive] =useState(props.record.active);
    const [hidden, setHidden] = useState(props.record.hidden);
    const [completed,setCompleted] = useState(props.record.completed);
    const [dueDate,setDueDate] = useState(props.record.dueDate);
    const [timeTaken,setTimeTaken] = useState(props.record.timeTaken);
    const [timeOfDay,setTimeOfDay] = useState(props.record.timeOfDay);
    const [streak,setStreak] = useState(props.record.streak);
    const [totalTimes,setTotalTimes] = useState(props.record.totalTimes);
    const [totalTimeSpent,setTotalTimeSpent] = useState(props.record.totalTimeSpent);
    const options = [
      {value:'true' ,label:'True'},
      {value:'false',label:'False'},
      {value:null,label:null}
    ]

    const [scheduleType,setScheduleType] = useState(props.record.scheduleType);
    const [every,setEvery] = useState(1);
    const [isScheduleEditing, setIsScheduleEditing] = useState(false);
    const [daysOfWeek,setDaysOfWeek] = useState([]);
    const [showDays, setShowDays] = useState(false);

    const [scheduleTypes,setScheduleTypes] = useState(['onetime','daily','weekly',
    'monthly','yearly']);
    const weekDays = [
      {value:'MONDAY',label:'M'},
      {value:'TUESDAY',label:'T'},
      {value:'WEDNESDAY',label:'W'},
      {value:'THURSDAY',label:'T'},
      {value:'FRIDAY',label:'F'},
      {value:'SATURDAY',label:'S'},
      {value:'SUNDAY',label:'S'},
    ]
    const handleScheduleTypeChange = async(event) =>{
      console.log(event.target.value)
      setScheduleType(event.target.value);
      if(event.target.value==="weekly"){
        setShowDays(true);
      }
      else{
        setShowDays(false);
      }
    }
  
    const onhandleWeekDayChange = (e) =>{
      const {value,checked} = e.target;
      if(checked){
        setDaysOfWeek((prev) => [...prev,value])
      }
      else{
        setDaysOfWeek((prev)=> prev.filter((x)=> x!==value));
      }
    }
    const {showActive} = useContext(ActiveContext);
    const onUpdate = async() =>{
        // await props.refreshFunction(config,'Bearer '+ user.accessToken)
        await modifyHabitParams(config, 'Bearer '+user.accessToken,
        props.record.id,name,startDate,description,active,hidden,completed,
        dueDate,timeTaken,streak,totalTimes,totalTimeSpent,timeOfDay);
        setIsEditing(false);
    };

    const onUpdateScheduleType = async() =>{
      // await props.refreshFunction(config,'Bearer '+ user.accessToken)
      await modifyHabitSchedule(config, 'Bearer '+user.accessToken,
      props.record.id,scheduleType,every,daysOfWeek);
      setIsScheduleEditing(false);
  };

  return (
    <div>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Habit Description"
        onRequestClose={props.hide}
        width="500px"
      >
          <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsEditing(!isEditing)}>Edit Item</button>
        &emsp;<button onClick={onUpdate} className='btn btn-secondary mt-3'>Update</button><br/><br/>
        <b>Habit Type</b> - {props.record.habitTypeName} <br/>
        <b>Created Date</b> - {formatDate(new Date(props.record.createdAt))} <br/>
        <b>Updated Date</b> - {formatDate(new Date(props.record.updatedAt))} <br/>
        <b>Schedule Type</b> - {props.record.scheduleType} <br/>
        <b>Every </b> - {props.record.every} <br/>
        <b>Week Days</b> - {props.record.daysOfWeek.length==0?"All days":String(props.record.daysOfWeek)} <br/>
        <b>Streak</b> - {isEditing?
          <input value={streak} onChange={(event)=>setStreak(event.target.value)}>
          </input>:<>{streak}</>} <br/>
        <b>Total Times</b> - {isEditing?
          <input value={totalTimes} onChange={(event)=>setTotalTimes(event.target.value)}>
          </input>:<>{totalTimes}</>} <br/>
        <b>Total Time Spent</b> - {isEditing?
          <input value={totalTimeSpent} onChange={(event)=>setTotalTimeSpent(event.target.value)}>
          </input>:<>{totalTimeSpent}</>} <br/>
        <b>Time Taken</b> - {isEditing?
          <input value={timeTaken} onChange={(event)=>setTimeTaken(event.target.value)}>
          </input>:<>{timeTaken}</>} <br/>
        <b>Time Of Day</b> - {isEditing?
          <input value={timeOfDay} onChange={(event)=>setTimeOfDay(event.target.value)}>
          </input>:<>{timeOfDay}</>} <br/>
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
			    }<br/>
        <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsScheduleEditing(!isScheduleEditing)}>Edit Schedule</button>
        &emsp;
        <button onClick={onUpdateScheduleType} className='btn btn-secondary mt-3'>Update</button><br/><br/>
        {isScheduleEditing?<>
          <div className='row'>
				    <div className='col-sm'>
              <select required='required' onChange={handleScheduleTypeChange} className='form-control'>
						   <option value="" selected disabled hidden> Choose Schedule Type</option>
                        {scheduleTypes.map((schedule)=>(
                        <option value={schedule}>{schedule}</option>   
                        ))}
              </select>
            </div>
				    <div className='col-sm'>
					    <input required='required' Name='text' className='form-control'
					      id='every' placeholder='every' value={every} 
					      onChange={(event) => setEvery(event.target.value)}></input>
				    </div>
			    </div>
          {showDays?<>
			      <div className='row'>
				      <div className='col-sm'>
					      {weekDays.map((x,i)=>(
						      <label key={i}>
							    <input type="checkbox" name="day" value={x.value} 
							      onChange={onhandleWeekDayChange}/>
							      {' '}
							    {x.label}
						      </label>
					      ))}
				      </div>
			      </div></>:null}
            </>:null}
      </SlidingPane>
    </div>
  );
};

export default HabitDescription;