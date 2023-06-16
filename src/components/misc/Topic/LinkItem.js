import React, { Component, useState,useContext } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import {AiFillEdit} from 'react-icons/ai';
import { removeLinkFromTopic,modifyLinkParams } from "../../api/TopicAPI";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { AiOutlineMinusCircle,AiOutlinePlusCircle } from "react-icons/ai";

const LinkItem= (props) => {

    const {user, setUser} = useContext(UserContext);
	  const {config} = useContext(ConfigContext);
    const [showDetails, setShowDetails] = useState(false)
    const [isEditing,setIsEditing] = useState(false);
    const [name,setName] = useState(props.record.name)
    const [url,setUrl] = useState(props.record.url)
    const [manualSummary,setManualSummary] = useState(props.record.manualSummary)

    
    const onDelete = async() =>{
      await removeLinkFromTopic(config,'Bearer '+user.accessToken,props.id,props.topicId)
      await props.refreshFunction(config,'Bearer '+user.accessToken,props.topicId)
    }

    const onEdit = async() =>{
      if (isEditing===false){
        setIsEditing(true)
      }
      else
      {
        await modifyLinkParams(config,'Bearer '+user.accessToken,props.id,name,url,manualSummary)
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
				}
				{isEditing?
          <input value={name} onChange={(event)=>setName(event.target.value)}>
          </input>:<><a href={url} target="_blank">{name}</a></>} <br/>		
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
      	<b>URL - </b>{isEditing?
          <input value={url} onChange={(event)=>setUrl(event.target.value)}>
          </input>:<><a href={url} target="_blank">{url}</a></>} <br/>
        <b>Manual Summary</b><br/>
        {isEditing?
				<textarea rows="15" cols="30" required='required' Name='Manual Summary' id='text' placeholder='Please add the Manual Summary' value={manualSummary} 
						onChange={(event) => setManualSummary(event.target.value)}>
				</textarea>:
                <>{manualSummary}</>
			    }
			</>:
		null}
	</div>
  );
};

export default LinkItem;