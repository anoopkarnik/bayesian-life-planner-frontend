import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createChildSkill } from '../../api/SkillAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import SlidingPane from "react-sliding-pane";



const AddChildSkillForm = (props) => {

	const [name, setName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const [timeTaken, setTimeTaken] = useState('');
	const {config} = useContext(ConfigContext);
	const [active, setActive] = useState(true);
	const {showActive} = useContext(ActiveContext);
	const handleRadio= async(event) =>{
		const active = event.target.value === 'true' ? true: false;
		console.log('handle', active);
		setActive(active);
	  }

	const onSubmit =async () =>{
		await createChildSkill(config, 'Bearer '+user.accessToken,name,
		props.type,timeTaken,props.name,active);
		await props.refreshFunction(config,'Bearer '+user.accessToken,props.type,showActive);
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
			<div className='row'>
				<div className='col-sm' onChange={(event) => setActive(event.target.value)}>
        			Active <br/>
					<label>
						<input type="radio" value="true" name="active"
						onChange={handleRadio}/> 
						Yes
					</label>
					<t/>
					<label>
						<input type="radio" value="false" name="active"
						onChange={handleRadio}/> 
						No
					</label>
      			</div>
			</div>
		</form>
	);
};

export default AddChildSkillForm;