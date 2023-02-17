import { bgcolor } from "@mui/system";
import React, { Component, useState,useContext } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { addHabitDescription } from "../../api/HabitAPI";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';

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

    const onUpdateDescription = async() =>{
        await props.refreshFunction(config,'Bearer '+ user.accessToken)
        await addHabitDescription(config, 'Bearer '+user.accessToken,props.record.id,description);
        setIsEditing(false);
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
        <b>Name</b> - {props.record.name} <br/>
        <b>Start Date</b> - {formatDate(new Date(props.record.startDate))} <br/>
        <b>Schedule Type</b> - {props.record.scheduleType} <br/>
        <b>Habit Type</b> - {props.record.habitTypeName} <br/>
        <b>Due Date</b> - {formatDate(new Date(props.record.dueDate))} <br/>
        <b>Time Taken</b> - {props.record.timeTaken} mins <br/>
        <b>Streak</b> - {props.record.streak} <br/>
        <b>Total Times</b> - {props.record.totalTimes} <br/>
        <b>Created Date</b> - {formatDate(new Date(props.record.createdAt))} <br/>
        <b>Updated Date</b> - {formatDate(new Date(props.record.updatedAt))} <br/>
        <br/><br/><br/><br/>
        <div className="text-center"> 
            <b>Description</b>
            <div >
                {isEditing?
				<textarea rows="15" cols="30" required='required' Name='text' id='description' placeholder='Please add the description' value={description} 
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

export default HabitDescription;