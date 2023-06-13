import React, { Component, useState,useContext, useEffect } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import {AiFillEdit} from 'react-icons/ai';
import DatePicker from "react-datepicker";
import { updateTopicParagraph,addTopicItem,deleteTopicItem, getTopicDescription } from "../../api/TopicAPI";
import { TiDelete } from "react-icons/ti";
import Item from "./Item";

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
    const [name,setName] = useState(props.record.name);
    const [paragraph,setParagraph] = useState(props.record.paragraph);
    const [items,setItems] = useState(props.record.itemResponses)
    const {showActive} = useContext(ActiveContext);
    const [item,setItem] = useState('')
    const [buttonName,setButtonName] = useState('Edit Paragraph')
    const [record,setRecord] = useState('')

    useEffect(()=>{
      getTopic(config,'Bearer '+user.accessToken,props.record.id)
    },[])


    const getTopic = async(config,bearerToken,id) =>{
      const record = await getTopicDescription(config,bearerToken,id)
      setItems(record.itemResponses)
      setName(record.name)
      setParagraph(record.paragraph)
    }

    const addItem = async() =>{
      await addTopicItem(config,'Bearer '+user.accessToken,props.record.id,item)
      await getTopic(config,'Bearer '+user.accessToken,props.record.id)
    }

    const editParagraph = async() =>{
      if (isEditing===false){
        setIsEditing(true)
        setButtonName('Update Paragraph')
      }
      else{
        await updateTopicParagraph(config,'Bearer '+user.accessToken,props.record.id,paragraph)
        setIsEditing(false)
        setButtonName('Edit Paragraph')
      }
    }


  return (
    <div>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Topic Description"
        onRequestClose={props.hide}
        width="500px"
      >
        <b>Created Date</b> - {formatDate(new Date(props.record.createdAt))} <br/>
        <b>Updated Date</b> - {formatDate(new Date(props.record.updatedAt))} <br/>
        <b>Name</b> - <>{name}</> <br/>
        {paragraph===null?null:<div>
        <b>Paragraph</b> <br/> {isEditing?
            <textarea rows="15" cols="30" required='required' Name='text' id='paragraph' placeholder='Please edit the paragraph' value={paragraph} 
              onChange={(event) => setParagraph(event.target.value)}>
          </textarea>:<>{paragraph}</>} <br/>
                <button className='btn btn-secondary mt-3' 
                      onClick={editParagraph}>{buttonName}</button> 	
                </div>}
          {paragraph===null?
          <div>
        <b> Items</b><br/>
        {items.map((item,index)=>(
          <Item topicId={props.record.id} itemId={item.id} text={item.text} index={index} topicType={props.record.topicTypeEnum} refreshFunction={getTopic}/>
          ))}
          <br/>
           <input value={item} onChange={(event)=>setItem(event.target.value)}>
          </input>
          <br/>
          <button className='btn btn-secondary mt-3' 
                onClick={addItem}>Add Item</button> 	
      	</div>:null}
    
        
      </SlidingPane>
    </div>
  );
};

export default TopicDescription;