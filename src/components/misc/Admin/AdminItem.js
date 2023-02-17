import React,{useState,useContext} from 'react'
import { TiDelete } from 'react-icons/ti';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';

const AdminItem = (props) => {

	const [isEditing,setIsEditing] = useState(false);
	const [name,setName] = useState(props.record.name);
	const {user,setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

	const onEdit = async() =>{
        if(isEditing){
            await props.editFunction(config,'Bearer '+user.accessToken,props.record.id,name)
		    await props.refreshFunction(config,'Bearer '+user.accessToken)
        }
        setIsEditing(!isEditing);
	}

	const onDelete = async() =>{
        await props.deleteFunction(config,'Bearer '+user.accessToken,props.record.id)
		await props.refreshFunction(config,'Bearer '+user.accessToken)
	}

    
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
			<div onDoubleClick={onEdit} data-toggle="tooltip" data-placement="top" title="Double click to edit the name">
					{isEditing?
						<input required='required' Name='text' 
							id='name' placeholder='name' value={name} 
							onChange={(event) => setName(event.target.value)}>
						</input>:
						<>{props.record.name}</>
					}
				<TiDelete size='1.5em' onClick={onDelete} data-toggle="tooltip" data-placement="top" title="Delete this record"></TiDelete>
			</div>
    </li>
  )
}

export default AdminItem