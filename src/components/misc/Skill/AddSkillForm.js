import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createRootSkill } from '../../api/SkillAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";



const AddSkillForm = (props) => {

	const [name, setName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const [timeTaken, setTimeTaken] = useState('');
	const {config} = useContext(ConfigContext);

	const onSubmit =async () =>{
		await createRootSkill(config, 'Bearer '+user.accessToken,user.id,name,
		props.name,timeTaken);
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken);
	}


	return (
		<form className='text-center'>
			<div className='row'>
				<div className='col-sm'>
					<input required='required' Name='name' className='form-control'
					id='name' placeholder='name' value={name} 
					onChange={(event) => setName(event.target.value)}></input>
				</div>
				<div className='col-sm'>
					<input required='required' Name='Time Taken' className='form-control'
					id='timeTaken' placeholder='timeTaken' value={timeTaken} 
					onChange={(event) => setTimeTaken(event.target.value)}></input>
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

export default AddSkillForm;