import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createChildStats } from '../../api/StatsAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";



const AddChildStatsForm = (props) => {

	const [name, setName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const [description, setDescription] = useState('');
	const [value, setValue] = useState(0);
	const {config} = useContext(ConfigContext);

	const onSubmit =async () =>{
		console.log(name,description,value);
		await createChildStats(config, 'Bearer '+user.accessToken,name,
		props.type,value,description,props.name);
		await props.refreshFunction(config,'Bearer '+user.accessToken);
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
					<input required='required' Name='value' className='form-control'
					id='value' placeholder='value' value={value} 
					onChange={(event) => setValue(event.target.value)}></input>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm'>
					<textarea rows="15" cols="30" required='required' 
					Name='description' 
					className='form-control'
					id='description' placeholder='description' value={description} 
					onChange={(event) => setDescription(event.target.value)}>
						<>{description}</>
					</textarea>
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

export default AddChildStatsForm;