import React, { Component, useState,useContext } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { addStatsDescription } from "../../api/StatsAPI";
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';

const StatsDescription = (props) => {


    const [description,setDescription] = useState(props.record.description);
    const [isEditing,setIsEditing] = useState(false);
    const {user, setUser} = useContext(UserContext);
	  const {config} = useContext(ConfigContext);

    const onUpdateDescription= async() =>{
        await props.refreshFunction(user.id,config,'Bearer '+ user.accessToken)
        await addStatsDescription(config, 'Bearer '+user.accessToken,props.record.id,description);
        setIsEditing(false);
    };

  return (
    <div>
      <SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Stats Description"
        onRequestClose={props.hide}
        width="500px"
      >
        <b>Name</b> - {props.record.name} <br/>
        <br/><br/><br/><br/>
        <div className="text-center"> 
            <b>Description</b>
            <div >
                {isEditing?
				          <textarea rows="15" cols="30" required='required' 
                  Name='description' id='text' placeholder='Please add the description'
                  value={description} 
                	onChange={(event) => setDescription(event.target.value)}>
                  
                  </textarea>:
                <>{description}</>
			    }
            </div>
            <button className='btn btn-secondary mt-3' 
                onClick={()=>setIsEditing(!isEditing)}>Edit Description</button>
            &emsp;<button onClick={onUpdateDescription} className='btn btn-secondary mt-3'>Update Description</button>
        </div>
      </SlidingPane>
    </div>
  );
};

export default StatsDescription;