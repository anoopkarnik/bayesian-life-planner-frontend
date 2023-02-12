import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createJournal } from '../../api/JournalAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";



const AddJournalForm = (props) => {

	const [name, setName] = useState('');
	const {user, setUser} = useContext(UserContext);
	const [text, setText] = useState('');
	const [hidden, setHidden] = useState(false);
	const {config} = useContext(ConfigContext);

	const onSubmit =async () =>{
		console.log(name,text,hidden);
		await createJournal(config, 'Bearer '+user.accessToken,user.id,name,
		props.name,text,hidden);
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken);
	}

	const handleRadio= async(event) =>{
		const hidden = event.target.value === 'true' ? true: false;
		console.log('handle', hidden);
		setHidden(hidden);
	  }



	return (
		<SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Journal Text"
		from="bottom"
        onRequestClose={props.hide}
        width="500px"
      >
		<form className='text-center'>
			<div className='row'>
				<div className='col-sm'>
					<input required='required' Name='name' className='form-control'
					id='name' placeholder='name' value={name} 
					onChange={(event) => setName(event.target.value)}></input>
				</div>
				<div className='col-sm' onChange={(event) => setHidden(event.target.value)}>
        			Hidden <br/>
					<label>
						<input type="radio" value="true" name="hidden"
						onChange={handleRadio}/> 
						Yes
					</label>
					<t/>
					<label>
						<input type="radio" value="false" name="hidden"
						onChange={handleRadio}/> 
						No
					</label>
      			</div>
			</div>
			<div className='row'>
				<div className='col-sm'>
					<textarea rows="15" cols="30" required='required' 
					Name='text' 
					className='form-control'
					id='text' placeholder='text' value={text} 
					onChange={(event) => setText(event.target.value)}>
						<>{text}</>
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
		</SlidingPane>
	);
};

export default AddJournalForm;