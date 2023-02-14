import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createChildSkill } from '../../api/SkillAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";



const AddChildSkillForm = (props) => {

	const [name, setName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const [timeTaken, setTimeTaken] = useState('');
	const {config} = useContext(ConfigContext);

	const onSubmit =async () =>{
		await createChildSkill(config, 'Bearer '+user.accessToken,user.id,name,
		props.type,timeTaken,props.name);
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken);
	}


	return (
		<form className='text-center'>
			<div className='row'>
				<div className='col-6'>
					<input required='required' Name='name' className='form-control'
					id='name' placeholder='name' value={name} 
					onChange={(event) => setName(event.target.value)}></input>
				</div>
				<div className='col-3'>
					<input required='required' Name='Time Taken' className='form-control'
					id='time' placeholder='time' value={timeTaken} 
					onChange={(event) => setTimeTaken(event.target.value)}></input>
				</div>
				<div className='col-3 text-center'>
					<div onClick={onSubmit} type='submit' className='btn btn-secondary form-control'>
						Save
					</div>
				</div>
			</div>
		</form>
	);
};

export default AddChildSkillForm;