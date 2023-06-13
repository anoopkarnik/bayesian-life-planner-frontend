import { bgcolor } from "@mui/system";
import React, { Component, useState,useContext } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { UserContext } from "../../../../context/UserContext";
import { ConfigContext } from "../../../../context/ConfigContext";
import {AiFillEdit} from 'react-icons/ai';
import DatePicker from "react-datepicker";
import { getCriteria, modifyCriteriaParams } from "../../../api/RuleEngineAPI";

const CriteriaDescription = (props) => {

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
    const [criteriaType,setCriteriaType] = useState(props.record.criteriaType);
    const [condition,setCondition] = useState(props.record.condition);
    const [category,setCategory] = useState(props.record.category);
    const [value,setValue] = useState(props.record.value);
    const [categoryName,setCategoryName] = useState(props.record.categoryName)
    const [weightage, setWeightage] = useState(props.record.weightage);
    const options = [
      {value:'true' ,label:'True'},
      {value:'false',label:'False'},
      {value:null,label:null}
    ]


    const onUpdate= async() =>{
        // await props.refreshFunction(config,'Bearer '+ user.accessToken)
        await modifyCriteriaParams(config, 'Bearer '+user.accessToken,props.record.id,
        name,criteriaType,condition,category,weightage,value,categoryName);
        setIsEditing(false);
    };


  return (
    <div>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Criteria Text"
        onRequestClose={props.hide}
        width="500px"
      >
        <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsEditing(!isEditing)}>Edit Item</button>
        &emsp;<button onClick={onUpdate} className='btn btn-secondary mt-3'>Update</button><br/><br/>
        <b>Criteria Type </b> - {criteriaType} <br/>
        <b>Created Date</b> - {formatDate(new Date(props.record.createdAt))} <br/>
        <b>Updated Date</b> - {formatDate(new Date(props.record.updatedAt))} <br/>
        <b>Name</b> - {isEditing?
          <input value={name} onChange={(event)=>setName(event.target.value)}>
          </input>:<>{name}</>} <br/>
        <b>Active</b> - {isEditing?
        <select onChange={(event)=>setActive(event.target.value)} value={String(active)}>
          {options.map(item=>(
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
          </select>
        :String(active)} <br/>
        <b>Condition</b> - {isEditing?
          <input value={condition} onChange={(event)=>setCondition(event.target.value)}>
          </input>:<>{condition}</>} <br/>
        <b>Category</b> - {isEditing?
          <input value={category} onChange={(event)=>setCategory(event.target.value)}>
          </input>:<>{category}</>} <br/>
        <b>Value</b> - {isEditing?
          <input value={value} onChange={(event)=>setValue(event.target.value)}>
          </input>:<>{value}</>} <br/>
        <b>Category Name</b> - {isEditing?
          <input value={categoryName} onChange={(event)=>setCategoryName(event.target.value)}>
          </input>:<>{categoryName}</>} <br/>
        <b>Weightage</b> - {isEditing?
          <input value={weightage} onChange={(event)=>setWeightage(event.target.value)}>
          </input>:<>{weightage}</>} <br/>
      </SlidingPane>
    </div>
  );
};

export default CriteriaDescription;