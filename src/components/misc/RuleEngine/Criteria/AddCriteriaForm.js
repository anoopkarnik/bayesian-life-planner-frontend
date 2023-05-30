import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { createCriteria } from '../../../api/RuleEngineAPI';
import { ConfigContext } from '../../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";
import Select from 'react-select'
import { getAllTypes,getAllNames } from '../../../api/RuleEngineAPI';
import { budgetOptions,accountOptions,fundOptions,skillOptions,
statOptions,taskOptions,habitOptions,badHabitOptions } from '../../../../variables';


const AddCriteriaForm = (props) => {

	const [name, setName] = useState('');
	const [active, setActive] = useState('true');
	const [criteriaType, setCriteriaType] = useState(props.name);
	const [condition, setCondition] = useState('');
	const [category, setCategory] = useState('');
	const [value, setValue] = useState('');
	const [categoryName, setCategoryName] = useState('')
	const [weightage, setWeightage] = useState('');
	const { user, setUser } = useContext(UserContext);
	const { config } = useContext(ConfigContext);
	const [conditionOptions, setConditionOptions] = useState([])
	const [categoryOptions, setCategoryOptions] = useState([])
	const [categoryNameOptions, setCategoryNameOptions] = useState([])
	const [showCategory,setShowCategory] = useState(false);
	const [showCategoryName, setShowCategoryName] = useState(false)

	useEffect(() => {
		refreshCriteriaForm(config, 'Bearer ' + user.accessToken, props.name)
	},[])

	const refreshCriteriaForm = async (backend_url,bearerToken,name) => {
		await updateConditions();
		const categories = await getAllTypes(backend_url,bearerToken,name)
		setCategoryOptions(categories);

	}
	const updateConditions = async () => {
		if (criteriaType === 'TASK') {
			setConditionOptions(taskOptions);
			setShowCategoryName(true)
		}
		else if (criteriaType === 'ACCOUNT') {
			setConditionOptions(accountOptions);
		}
		else if (criteriaType === 'BAD_HABIT') {
			setConditionOptions(badHabitOptions);
			setShowCategoryName(true)
		}
		else if (criteriaType === 'BUDGET') {
			setConditionOptions(budgetOptions);
			setShowCategoryName(true)
		}
		else if (criteriaType === 'FUND') {
			setConditionOptions(fundOptions)
		}
		else if (criteriaType === 'HABIT') {
			setConditionOptions(habitOptions)
			setShowCategoryName(true)
		}
		else if (criteriaType === 'SKILL') {
			setConditionOptions(skillOptions)
			setShowCategoryName(true)
		}
		else if (criteriaType === 'STAT') {
			setConditionOptions(statOptions)
			setShowCategoryName(true)
		}
		setShowCategory(true);
	}

	const onSubmit = async () => {
		await createCriteria(config, 'Bearer ' + user.accessToken, name, criteriaType,
			condition, category, weightage, value, categoryName);
		props.refreshFunction(config, 'Bearer ' + user.accessToken)
	}

	const onCategoryChange = async (event) => {
		setCategory(event.value);
		const data = await getAllNames(config, 'Bearer ' + user.accessToken, criteriaType,event.value)
		setCategoryNameOptions(data);
	}

	return (
		<SlidingPane
			isOpen={props.open}
			className=''
			overlayClassName="blur"
			title="Criteria Text"
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
						<Select className='form-control' options={conditionOptions}
							onChange={(event) => setCondition(event.value)} />
					</div>
				</div>

				<div className='row'>
					{showCategory?
					<div className='col-sm'>
						<Select className='form-control' options={categoryOptions}
							onChange={onCategoryChange} />
					</div>:null}
					{showCategoryName?
					<div className='col-sm'>
						<Select className='form-control' options={categoryNameOptions}
							onChange={(event) => setCategoryName(event.value)} />
					</div>:null}
				</div>
				<div className='row'>
					<div className='col-sm'>
						<input required='required' Name='value' className='form-control'
							id='value' placeholder='value' value={value}
							onChange={(event) => setValue(event.target.value)}></input>
					</div>
					<div className='col-sm'>
						<input required='required' Name='weightage' className='form-control'
							id='weightage' placeholder='weightage' value={weightage}
							onChange={(event) => setWeightage(event.target.value)}></input>
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

export default AddCriteriaForm;