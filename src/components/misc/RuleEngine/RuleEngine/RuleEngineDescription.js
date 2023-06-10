import { bgcolor } from "@mui/system";
import React, { Component, useState,useContext, useEffect } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { UserContext } from "../../../../context/UserContext";
import { ConfigContext } from "../../../../context/ConfigContext";
import {AiFillEdit} from 'react-icons/ai';
import DatePicker from "react-datepicker";
import { modifyCriteriaSetParams, modifyRuleParams, modifyRuleSetParams } from "../../../api/RuleEngineAPI";

const RuleEngineDescription = (props) => {

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
    const [active, setActive] =useState(props.record.active);
    const [children, setChildren] = useState([]);
    const options = [
      {value:'true' ,label:'True'},
      {value:'false',label:'False'},
      {value:null,label:null}
    ]

    useEffect(()=>{
      refreshDescription()
    },[])

    const refreshDescription = async()=>{
      const records =[]
      for (let record of props.record.criteriaList){
        records.push(record.name);
        setChildren((children) =>[
          ...children,record.name
        ])
      }
    }

    const onUpdate= async() =>{
        if (props.name === "Criteria Set") {
          await modifyCriteriaSetParams(config, 'Bearer ' + user.accessToken, props.record.id,name)
        }
        else if (props.name === "Rule") {
          await modifyRuleParams(config, 'Bearer ' + user.accessToken, props.record.id,name)
        }
        else if (props.name === "Rule Set") {
          await modifyRuleSetParams(config, 'Bearer ' + user.accessToken, props.record.id,name)
        }
        await props.refreshFunction(config,'Bearer '+ user.accessToken, props.record.criteriaType)
        setIsEditing(false);
    };

  return (
    <div>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="RuleEngine Text"
        onRequestClose={props.hide}
        width="500px"
      >
        <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsEditing(!isEditing)}>Edit Item</button>
        &emsp;<button onClick={onUpdate} className='btn btn-secondary mt-3'>Update</button><br/><br/>
        <b>Created Date</b> - {formatDate(new Date(props.record.createdAt))} <br/>
        <b>Updated Date</b> - {formatDate(new Date(props.record.updatedAt))} <br/>
        <b>Name</b> - {isEditing?
          <input value={name} onChange={(event)=>setName(event.target.value)}>
          </input>:<>{name}</>} <br/>
        <b>Number of Criteria</b> - {props.record.criteriaList.length} <br/>
      </SlidingPane>
    </div>
  );
};

export default RuleEngineDescription;