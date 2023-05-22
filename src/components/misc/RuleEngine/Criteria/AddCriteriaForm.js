import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { createCriteria } from '../../../api/RuleEngineAPI';
import { ConfigContext } from '../../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";
import Select from 'react-select'
import { getAllTypes,getAllNames } from '../../../api/RuleEngineAPI';



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
		}
		else if (criteriaType === 'ACCOUNT') {
			setConditionOptions(accountOptions);
		}
		else if (criteriaType === 'BAD_HABIT') {
			setConditionOptions(badHabitOptions);
		}
		else if (criteriaType === 'BUDGET') {
			setConditionOptions(budgetOptions);
		}
		else if (criteriaType === 'FUND') {
			setConditionOptions(fundOptions)
		}
		else if (criteriaType === 'HABIT') {
			setConditionOptions(habitOptions)
		}
		else if (criteriaType === 'SKILL') {
			setConditionOptions(skillOptions)
		}
		else if (criteriaType === 'STAT') {
			setConditionOptions(statOptions)
		}
	}
	const taskOptions = [
		{ value: 'TASK_COMPLETED', label: 'Completed' }
	]
	const habitOptions = [
		{ value: 'HABIT_TOTAL_TIMES', label: 'Total Times' },
		{ value: 'HABIT_STREAK', label: 'Streak' },
		{ value: 'HABIT_TOTAL_TIME_SPENT', label: 'Total Time Spent' },
		{ value: 'HABIT_TOTAL_TIME_WEEKLY', label: 'Total Times Weekly' },
		{ value: 'HABIT_TOTAL_TIME_MONTHLY', label: 'Total Times Monthly' }
	]
	const badHabitOptions = [
		{ value: 'BAD_HABIT_WEEKLY', label: 'Weekly times repeated' },
		{ value: 'BAD_HABIT_MONTHLY', label: 'Monthly times repeated' },
		{ value: 'BAD_HABIT_YEARLY', label: 'Yearly times repeated' },
		{ value: 'BAD_HABIT_LAST_TIME', label: 'Last time completed' }
	]

	const statOptions = [
		{ value: 'STAT_HIGHER_PREFERRED', label: 'Higher is acceptable' },
		{ value: 'STAT_LOWER_PREFERRED', label: 'Lower is accepatable' }
	]

	const skillOptions = [
		{ value: 'SKILL_COMPLETED', label: 'Skill is Completed' },
		{ value: 'SKILL_TOTAL_TIME_SPENT', label: 'Total time spent for skill' }
	]

	const fundOptions = [
		{ value: 'FUND_REACHED', label: 'Fund Reached' }
	]

	const accountOptions = [
		{ value: 'ACCOUNT_REACHED', label: 'Account Reached' }
	]

	const budgetOptions = [
		{ value: 'DELIGHT_BUDGET_MAINTAINED', label: 'Delight Budget is Maintained' },
		{ value: 'LIVING_BUDGET_MAINTAINED', label: 'Living Budget is Maintained' },
		{ value: 'GROWTH_BUDGET_MAINTAINED', label: 'Growth Budget is Maintained' },
	]

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
					<div className='col-sm'>
						<Select className='form-control' options={categoryOptions}
							onChange={onCategoryChange} />
					</div>
					<div className='col-sm'>
						<Select className='form-control' options={categoryNameOptions}
							onChange={(event) => setCategoryName(event.value)} />
					</div>
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