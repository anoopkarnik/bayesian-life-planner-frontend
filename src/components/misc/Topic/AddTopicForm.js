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
	const [paragraph,setParagraph] = useState('')
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);
	const [topicTypeEnum,setTopicTypeEnum] = useState('')
	const [items,setItems] = useState([])
	const [showParagraph, setShowParagraph] = useState(false)
	const [showItems,setShowItems] = useState(false)
	const [item,setItem] = useState('')
	
	useEffect(()=>{

	},[items])

	const onTopicTypeChange = async(event) => {
		setTopicTypeEnum(event.value);
		if(event.value==='TOPIC_PARAGRAPH'){
			setShowParagraph(true)
		}
		else if(event.value==='TOPIC_LIST'){
			setShowItems(true)
		}
		else if(event.value==='TOPIC_URL'){
			setShowItems(true)
		}

	}

	const addItems = async() =>{
		setItems(items =>[...items,item])
	}

	const onSubmit =async () =>{
		await createTopic(config, 'Bearer '+user.accessToken,name,
		props.name,topicTypeEnum,paragraph,items);
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
				<div className='col-sm'>
						<Select className='form-control' options={topicTypeOptions}
							onChange={onTopicTypeChange} />
					</div>
			</div>
			{showParagraph?
			<div className='row'>
				<div className='col-sm'>
					<textarea rows="15" cols="30" required='required' 
					Name='text' 
					className='form-control'
					id='paragraph' placeholder='paragraph' value={paragraph} 
					onChange={(event) => setParagraph(event.target.value)}/>
				</div>
			</div>:null}
			{showItems?<div>
			{items.map((item,index)=>(
				<div className='row'>
					<>{index}. {item}</>
				</div>
			))}
			<div className='row'>
					<textarea rows="3" cols="30" required='required' 
						Name='text' 
						className='form-control'
						id='item' placeholder='item' value={item} 
						onChange={(event) => setItem(event.target.value)}/>
			</div>
			<div className='row'>
				<div className='col-sm text-center'>
					<div onClick={addItems} type='submit' className='btn btn-secondary mt-3'>
						Add Item
					</div>
				</div>
			</div></div>:null}
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