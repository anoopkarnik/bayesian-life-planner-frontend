import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createTopic } from '../../api/TopicAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import SlidingPane from "react-sliding-pane";
import { topicTypeOptions } from '../../../variables';
import Select from 'react-select'



const AddTopicForm = (props) => {

	const [name, setName] = useState('');
	const [description,setDescription] = useState('')
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	

	const onSubmit =async () =>{
		await createTopic(config, 'Bearer '+user.accessToken,name,
		props.name,description);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.name);
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
					<textarea rows="15" cols="30" required='required' 
					Name='text' 
					className='form-control'
					id='description' placeholder='description' value={description} 
					onChange={(event) => setDescription(event.target.value)}/>
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

export default AddTopicForm;