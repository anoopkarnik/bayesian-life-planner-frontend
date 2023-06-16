import React, { Component, useState,useContext } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import {AiFillEdit} from 'react-icons/ai';
import { removeSubTopicFromTopic,modifySubTopicParams } from "../../api/TopicAPI";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { AiOutlineMinusCircle,AiOutlinePlusCircle } from "react-icons/ai";

const SubTopic = (props) => {

    const {user, setUser} = useContext(UserContext);
	  const {config} = useContext(ConfigContext);
    const [showDetails, setShowDetails] = useState(false)
    const [isEditing,setIsEditing] = useState(false);
    const [name,setName] = useState(props.record.name)
    const [text,setText] = useState(props.record.text)
    
    const onDelete = async() =>{
      await removeSubTopicFromTopic(config,'Bearer '+user.accessToken,props.id,props.topicId)
      await props.refreshFunction(config,'Bearer '+user.accessToken,props.topicId)
    }

    const onEdit = async() =>{
      if (isEditing===false){
        setIsEditing(true)
      }
      else
      {
        await modifySubTopicParams(config,'Bearer '+user.accessToken,props.id,name,text)
        setIsEditing(false)
      }
    }

    const onShow = async() => {
      setShowDetails(!showDetails)
    }



  return (
<div>
    	<li className='list-group-item d-flex justify-content-between align-items-center'>
		<div>
				{showDetails?
					<AiOutlineMinusCircle size='1em' onClick={onShow}/>:
					<AiOutlinePlusCircle size='1em' onClick={onShow}/>
				}&emsp;
				{isEditing?
          <input value={name} onChange={(event)=>setName(event.target.value)}>
          </input>:<>{name}</>} <br/>
				
			</div>
			<div>

				<span className='badge-primary badge-pill mr-3'>

				</span>
			
				<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
				<AiFillEdit size='1.5em' onClick={onEdit}/>
			</div>
      </li>
      {showDetails?
			<>
        <b>Text</b><br/>
        {isEditing?
				<textarea rows="15" cols="30" required='required' Name='text' id='text' placeholder='Please add the text' value={text} 
						onChange={(event) => setText(event.target.value)}>
				</textarea>:
                <>{text}</>
			    }
			</>:
		null}

	</div>
  );
};

export default SubTopic;