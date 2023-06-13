import React, { Component, useState,useContext, useEffect } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { addTopicToSkill, getSkill, getTopicsFromSkill, modifySkillParams } from "../../api/SkillAPI";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import {AiFillEdit} from 'react-icons/ai';
import DatePicker from "react-datepicker";
import { getTopic } from "../../api/TopicAPI";
import SkillTopicItem from "./SkillTopicItem";

const SkillDescription = (props) => {

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
    const [topicId, setTopicId] = useState('');
    const options = [
      {value:'true' ,label:'True'},
      {value:'false',label:'False'},
      {value:null,label:null}
    ]
    const {showActive} = useContext(ActiveContext);
    const [skill, setSkill] = useState({})
    const [showAddTopic,setShowAddTopic] = useState(false)
    const [topics,setTopics] = useState([])
    const [topicOptions,setTopicOptions] = useState([])
    const [addTopicText,setAddTopicText] = useState('Show Add Topic')

    useEffect(()=>{
      getSkill()
      updateTopics()
    },[])

    const updateTopics = async() =>{
      const topics = await getTopicsFromSkill(config,'Bearer '+user.accessToken,props.record.id)
      setTopics(topics)
    }

    const getSkill = async(config,bearerToken,id) =>{
      const record = await getSkill(config,bearerToken,id)
      setName(record.name)
      setDescription(record.description)
      setStartDate(record.startDate)
      setActive(record.active)
      setHidden(record.hidden)
      setCompleted(record.completed)
      setDueDate(record.dueDate)
      setTimeTaken(record.timeTaken)
    }

    const onUpdate = async() =>{
        // await props.refreshFunction(config,'Bearer '+ user.accessToken)
        await modifySkillParams(config, 'Bearer '+user.accessToken,props.record.id,
        name,startDate,description,active,hidden,completed,
        dueDate,timeTaken);
        setIsEditing(false);
    };

    const addTopic = async() =>{
      if (showAddTopic===false){
        setShowAddTopic(true)
        setAddTopicText('Add Topic')
        const topics = await getTopic(config, 'Bearer '+user.accessToken,props.record.skillTypeName);
        setTopicOptions(topics);
      }
      else{
        setShowAddTopic(false)
        await addTopicToSkill(config, 'Bearer '+user.accessToken,props.record.id,topicId)
      }

    }

  return (
    <div>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Skill Description"
        onRequestClose={props.hide}
        width="500px"
      >
        <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsEditing(!isEditing)}>Edit Item</button>
        &emsp;<button onClick={onUpdate} className='btn btn-secondary mt-3'>Update</button>
        <br/><br/>

        <b>Skill Type</b> - {props.record.skillTypeName} <br/>
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
        <button className='btn btn-secondary mt-3' 
                onClick={addTopic}>{addTopicText}</button><br/>
        {showAddTopic?
        <select onChange={(event)=>setTopicId(event.target.value)} value={String(topicId)}>
          {topicOptions.map(item=>(
            <option key={item.name} value={item.id}>
              {item.name}
            </option>
          ))}
          </select>:false}
          <br/>
        <b>Topics</b> <br/>
        {topics?.map((topic,index)=>(
          <SkillTopicItem record={topic} name={topic.name} index={index} topicId={topic.id} skillId={props.record.id}/>
        ))}
        <br/>
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

export default SkillDescription;