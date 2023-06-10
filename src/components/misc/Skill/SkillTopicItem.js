import React, { Component, useState,useContext, useEffect } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { removeTopicFromSkill} from "../../api/SkillAPI";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import {AiFillEdit} from 'react-icons/ai';
import DatePicker from "react-datepicker";
import { getTopic } from "../../api/TopicAPI";
import { TiDelete } from "react-icons/ti";
import TopicDescription from "../Topic/TopicDescription";
import { FiExternalLink } from "react-icons/fi";

const SkillTopicItem = (props) => {

    const [skillId,setSkillId] = useState(props.skillId)
    const [topicId,setTopicId] = useState(props.topicId)
	const [showDescription, setShowDescription] =useState(false);
    const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
    const [record,setRecord] = useState('')

    const onDelete = async() =>{
        await removeTopicFromSkill(config,'Bearer '+ user.accessToken,skillId,topicId)
    }


	const onShowDescription = async() =>{
		setShowDescription(true);
	}

	const onHideDescription = async() =>{
		setShowDescription(false);
	}

  return (
<div>
    	<li className='list-group-item d-flex justify-content-between align-items-center'>
		<div>
				{props.index+1}. {props.name}
				
			</div>
			<div>

				<span className='badge-primary badge-pill mr-3'>

				</span>
			
				<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
				<FiExternalLink size='1em' onClick={onShowDescription}/>
				&nbsp;&nbsp;
				{
					showDescription?<TopicDescription
					open={showDescription} hide={onHideDescription} 
					record={props.record}/>:null
				}
			</div>
    	</li>

	</div>
  );
};

export default SkillTopicItem;