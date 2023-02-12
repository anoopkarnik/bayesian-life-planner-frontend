import { bgcolor } from "@mui/system";
import React, { Component, useState,useContext } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { addJournalDescription } from "../../api/JournalAPI";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';

const JournalDescription = (props) => {


    const [text,setText] = useState(props.record.text);
    const [isEditing,setIsEditing] = useState(false);
    const {user, setUser} = useContext(UserContext);
	  const {config} = useContext(ConfigContext);

    const onUpdateText= async() =>{
        await props.refreshFunction(user.id,config,'Bearer '+ user.accessToken)
        await addJournalDescription(config, 'Bearer '+user.accessToken,props.record.id,text);
        setIsEditing(false);
    };

  return (
    <div>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Journal Text"
        onRequestClose={props.hide}
        width="500px"
      >
        <b>Name</b> - {props.record.name} <br/>
        <b>Hidden </b> - {props.record.hidden} <br/>
        <br/><br/><br/><br/>
        <div className="text-center"> 
            <b>Text</b>
            <div >
                {isEditing?
				          <textarea rows="15" cols="30" required='required' 
                  Name='text' id='text' placeholder='Please add the text'
                  value={text} 
                	onChange={(event) => setText(event.target.value)}>
                  
                  </textarea>:
                <>{text}</>
			    }
            </div>
            <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsEditing(!isEditing)}>Edit Text</button>
            &emsp;<button onClick={onUpdateText} className='btn btn-secondary mt-3'>Update Text</button>
        </div>
      </SlidingPane>
    </div>
  );
};

export default JournalDescription;