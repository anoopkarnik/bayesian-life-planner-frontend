import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createRootStats } from '../../api/StatsAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";



const AddStatsForm = (props) => {

	const [name, setName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const [description, setDescription] = useState('');
	const [value, setValue] = useState(0);
	const {config} = useContext(ConfigContext);
	const [active, setActive] = useState(true);
	const handleRadio= async(event) =>{
		const active = event.target.value === 'true' ? true: false;
		console.log('handle', active);
		setActive(active);
	  }

	const onSubmit =async () =>{
		console.log(name,description,value);
		await createRootStats(config, 'Bearer '+user.accessToken,name,
		props.name,value,description,active);
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

export default AddStatsForm;