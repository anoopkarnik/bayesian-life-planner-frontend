import React, { Component, useState,useContext,useEffect } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { addGoalDescription } from "../../api/GoalAPI";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import RuleList from "./RuleList";
import { getAllCompletedRules,getAllWorkRules } from '../../api/RuleAPI';

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
    const onUpdateDescription= async() =>{
        await props.refreshFunction(config,'Bearer '+ user.accessToken)
        await addGoalDescription(config, 'Bearer '+user.accessToken,props.record.id,description);
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
        <b>Name</b> - {props.record.name} <br/>
        <b>Created Date</b> - {formatDate(new Date(props.record.createdAt))} <br/>
        <b>Updated Date</b> - {formatDate(new Date(props.record.updatedAt))} <br/>
        <b>Due Date</b> - {formatDate(new Date(props.record.dueDate))} <br/>
        <b>Goal Type</b> - {props.record.goalTypeName} <br/>
        <b>Completed</b> - {props.record.completed.toString()} <br/>
        <b>Current Level</b> - Lv {Math.round(props.record.completedPercentage)} <br/>
        <b>Aggregated SubGoals Level</b> - Lv {Math.round(props.childCompletedPercentage)} <br/>
        <b>Expected Level</b> - Lv {Math.round(props.record.workPercentage)} <br/>
        {/* <b>Sub Goals</b> - {props.record.goalResponses}<br/> */}
        <br/><br/>
        <RuleList record={props.record} completedRecords={completedRecords} 
        workRecords={workRecords}/>
        <br/><br/>
        <div className="text-center"> 
            <b>Description</b>
            <div >
                {isEditing?
				          <textarea rows="15" cols="30" required='required' 
                  Name='description' id='text' placeholder='Please add the description'
                  value={description} 
                	onChange={(event) => setDescription(event.target.value)}>
                  
                  </textarea>:
                <>{description}</>
			    }
            </div>
            <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsEditing(!isEditing)}>Edit Description</button>
            &emsp;<button onClick={onUpdateDescription} className='btn btn-secondary mt-3'>Update Description</button>
        </div>
      </SlidingPane>
    </div>
  );
};

export default GoalDescription;