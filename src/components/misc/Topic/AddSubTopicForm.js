import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createTopic } from '../../api/TopicAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import SlidingPane from "react-sliding-pane";
import { topicTypeOptions } from '../../../variables';
import Select from 'react-select'
import { addSubTopicToTopic } from '../../api/TopicAPI';



const AddSubTopicForm = (props) => {

	const [name, setName] = useState('');
	const [text,setText] = useState('')
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [previousKey, setPreviousKey] = useState('')
	

	const onSubmit =async () =>{
		await addSubTopicToTopic(config, 'Bearer '+user.accessToken,props.topicId,name,text);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.topicId);
	}

	const keyboardEvent = async(event) =>{
		
		if(event.key === 'Enter' && previousKey=== 'Control'){
			await onSubmit()
		  }
		else if(event.key ==='Control' && previousKey==='Enter'){
			await onSubmit()
		}
		setPreviousKey(event.key)
	}

	return (
		<form className='text-center'>
			<div className='row' >
				<div className='col-sm'>
					<input required='required' Name='name' className='form-control'
					id='name' placeholder='name' value={name} 
					onChange={(event) => setName(event.target.value)}></input>
				</div>
			</div>
			<div className='row' onKeyDown={keyboardEvent}>
				<div className='col-sm'>
					<textarea rows="15" cols="30" required='required' 
					Name='text' 
					className='form-control'
					id='text' placeholder='text' value={text} 
					onChange={(event) => setText(event.target.value)}/>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm text-center'>
					<div onClick={onSubmit}  type='submit' className='btn btn-secondary mt-3'>
						Save
					</div>
				</div>
			</div>
		</form>
	);
};

export default AddSubTopicForm;