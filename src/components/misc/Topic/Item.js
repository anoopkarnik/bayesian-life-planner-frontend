import React, { Component, useState,useContext } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import {AiFillEdit} from 'react-icons/ai';
import DatePicker from "react-datepicker";
import { deleteTopicItem } from "../../api/TopicAPI";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

const Item = (props) => {

    const {user, setUser} = useContext(UserContext);
	  const {config} = useContext(ConfigContext);
    
    const onDelete = async() =>{
      await deleteTopicItem(config,'Bearer '+user.accessToken,props.topicId,props.itemId)
    }



  return (
    <div>
				<div className='row'>
          <div className="col-sm">

            {props.topicType=="TOPIC_URL"?
            <a href={props.text} target="_blank">{props.index}. {props.text}</a>:
            <div>{props.index}. {props.text} {props.topicType}</div>}
          </div>
          <div className="col">
            <TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
          </div>
				</div>
    </div>
  );
};

export default Item;