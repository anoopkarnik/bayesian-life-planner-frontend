import React, { Component, useState,useContext, useEffect } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import {AiFillEdit} from 'react-icons/ai';
import { BiPlus } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { getTopicDescription ,addLinkToTopic,addSubTopicToTopic,
removeLinkFromTopic,removeSubTopicFromTopic} from "../../api/TopicAPI";
import { TiDelete } from "react-icons/ti";
import SubTopic from "./SubTopic";
import LinkItem from "./LinkItem";
import AddSubTopicForm from "./AddSubTopicForm";
import AddLinkForm from "./AddLinkForm";
import { modifyTopicParams } from "../../api/TopicAPI";

const TopicDescription = (props) => {

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


    const [isEditing,setIsEditing] = useState(false);
    const {user, setUser} = useContext(UserContext);
	  const {config} = useContext(ConfigContext);
    const [name,setName] = useState('');
    const [summary,setSummary] = useState('');
    const [description,setDescription] = useState('');
    const [links, setLinks] = useState([]);
    const [subTopics,setSubTopics] = useState([])
    const [showSubTopics,setShowSubTopics] = useState(false)
    const [showLinks, setShowLinks] = useState(false)
    const [showAddSubTopic,setShowAddSubTopic] = useState(false)
    const [showAddLink,setShowAddLink] = useState(false)
    const [previousKey, setPreviousKey] = useState('')
    const {showActive} = useContext(ActiveContext);

    useEffect(()=>{
      getTopic(config,'Bearer '+user.accessToken,props.record.id)
    },[])


    const getTopic = async(config,bearerToken,id) =>{
      const record = await getTopicDescription(config,bearerToken,id)
      setName(record.name)
      setSummary(record.summary)
      setDescription(record.description)
      setLinks(record.linkResponses)
      setSubTopics(record.subTopicResponses)
      setShowAddSubTopic(false)
      setShowAddLink(false)
    }

    const onUpdate = async() =>{
      if(isEditing){
        await modifyTopicParams(config, 'Bearer '+user.accessToken,
        props.record.id,name,summary,description);
        setIsEditing(false);
      }
      else{
        setIsEditing(true);
      }
  };
  const keyboardEvent = async(event) =>{
		if(event.key === 's' && previousKey=== 'Control'){
			setShowAddSubTopic(!showAddSubTopic)
		  }
		else if(event.key ==='Control' && previousKey==='s'){
			setShowAddSubTopic(!showAddSubTopic)
		}
    if(event.key === 'l' && previousKey=== 'Control'){
			setShowAddLink(!showAddLink)
		  }
		else if(event.key ==='Control' && previousKey==='l'){
			setShowAddLink(!showAddLink)
		}
    if(event.key === 'e' && previousKey=== 'Control'){
			setIsEditing(!isEditing)
		  }
		else if(event.key ==='Control' && previousKey==='e'){
			setIsEditing(!isEditing)
		}
    if(event.key === 'Enter' && previousKey=== 'Control'){
			await onUpdate()
		  }
		else if(event.key ==='Control' && previousKey==='Enter'){
			await onUpdate()
		}
    
		setPreviousKey(event.key)
	}

  return (
    <div onKeyDown={keyboardEvent}>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Topic Description"
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
        <div>
          <b>Summary</b> <br/> {isEditing?
            <textarea rows="15" cols="30" required='required' Name='text' id='summary' placeholder='Please edit the summary' value={summary} 
              onChange={(event) => setSummary(event.target.value)}>
            </textarea>:<>{String(summary)}</>} <br/>
        </div>
        <div>
          <b>Description</b> <br/> {isEditing?
            <textarea rows="15" cols="30" required='required' Name='text' id='description' placeholder='Please edit the description' value={description} 
              onChange={(event) => setDescription(event.target.value)}>
            </textarea>:<>{description}</>} <br/>
        </div>
        <br/><br/><br/>
  
        <div>
        <h3 onClick={()=>setShowAddSubTopic(!showAddSubTopic)} className='btn btn-secondary btn-lg'>Sub Topics&ensp;&ensp;<BiPlus size='2em' /></h3>
          {subTopics?.map((subTopic,index)=>(
            <SubTopic topicId={props.record.id} id={subTopic.id} record={subTopic} index={index} refreshFunction={getTopic}/>
            ))}
          {showAddSubTopic?<AddSubTopicForm topicId={props.record.id} refreshFunction={getTopic}/>:null}
      	</div>
        <div>
          <h3 onClick={()=>setShowAddLink(!showAddLink)} className='btn btn-secondary btn-lg'>Links&ensp;&ensp;<BiPlus size='2em'/></h3>
          {links?.map((link,index)=>(
            <LinkItem topicId={props.record.id} id={link.id} record={link} index={index} refreshFunction={getTopic}/>
            ))}
            {showAddLink?<AddLinkForm topicId={props.record.id} refreshFunction={getTopic}/>:null}
      	</div> 
      </SlidingPane>
    </div>
  );
};

export default TopicDescription;