import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createTopic } from '../../api/TopicAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import SlidingPane from "react-sliding-pane";
import { topicTypeOptions } from '../../../variables';
import Select from 'react-select'
import { addLinkToTopic } from '../../api/TopicAPI';



const AddLinkForm = (props) => {

	const [name, setName] = useState('');
	const [url,setUrl] = useState('')
	const [manualSummary, setManualSummary] = useState('')
	const [aiSummary,setAiSummary] = useState('')
	const [transcript,setTranscript] = useState('')
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	

	const onSubmit =async () =>{
		await addLinkToTopic(config, 'Bearer '+user.accessToken,props.topicId,name,url,
		manualSummary,aiSummary,transcript);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.topicId);
	}


	return (
		<form className='text-center'>
			<div className='row'>
				<div className='col-sm'>
					<input required='required' Name='name' className='form-control'
					id='name' placeholder='name' value={name} 
					onChange={(event) => setName(event.target.value)}></input>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm'>
					<input required='required' Name='url' className='form-control'
					id='url' placeholder='url' value={url} 
					onChange={(event) => setUrl(event.target.value)}></input>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm'>
					<textarea rows="15" cols="30" required='required' 
					Name='Manual Summary' 
					className='form-control'
					id='Manual Summary' placeholder='Manual Summary' value={manualSummary} 
					onChange={(event) => setManualSummary(event.target.value)}/>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm text-center'>
					<div onClick={onSubmit} type='submit' className='btn btn-secondary mt-3'>
						Save
					</div>
				</div>
			</div>
		</form>
	);
};

export default AddLinkForm;