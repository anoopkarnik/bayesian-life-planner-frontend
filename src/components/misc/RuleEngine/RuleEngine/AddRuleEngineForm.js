import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { createCriteriaSet,createRule,createRuleSet } from '../../../api/RuleEngineAPI';
import { ConfigContext } from '../../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";
import Select from 'react-select'
import { getAllTypes,getAllNames } from '../../../api/RuleEngineAPI';



const AddRuleEngineForm = (props) => {

	const [name, setName] = useState('');
	const { user, setUser } = useContext(UserContext);
	const { config } = useContext(ConfigContext);


	const onSubmit = async () => {
		if (props.name==="Criteria Set"){
			await createCriteriaSet(config, 'Bearer ' + user.accessToken, name);
		}
		else if(props.name==="Rule"){
			await createRule(config, 'Bearer ' + user.accessToken, name);
		}
		else if(props.name==="Rule Set"){
			await createRuleSet(config, 'Bearer ' + user.accessToken, name);
		}
		props.refreshFunction(config, 'Bearer ' + user.accessToken)
	}

	return (
		<SlidingPane
			isOpen={props.open}
			className=''
			overlayClassName="blur"
			title="RuleEngine Text"
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
					<div className='col-sm'>
						<div onClick={onSubmit} type='submit' className='btn btn-secondary mt-3'>
							Save
						</div>
					</div>
				</div>
			</form>
		</SlidingPane>
	);
};

export default AddRuleEngineForm;