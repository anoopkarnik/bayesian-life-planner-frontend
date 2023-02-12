import React,{useState,useContext} from 'react'
import AdminItem from './AdminItem'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';

const AdminList = (props) => {

  const [newName,setNewName] = useState('');
  const [key,setKey] = useState('Add '+props.name)
  const {user, setUser} = useContext(UserContext);
  const {config} = useContext(ConfigContext);


  const onCreate = async() =>{
    await props.createFunction(config,'Bearer '+user.accessToken,newName,user.id)
    await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
    setKey('Add '+props.name);
}

    
  return (
    <ul className='list-group'>
      <h3>{props.name}</h3>
      <div>
      {props.records.map((record) => (
          <AdminItem name={props.name} record={record} 
          createFunction={props.createFunction} 
          deleteFunction={props.deleteFunction} 
          refreshFunction={props.refreshFunction} 
          editFunction={props.editFunction}/>
      ))}</div>
      <div>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
			    <div onDoubleClick={onCreate} >
						<input required='required' Name='text' 
							id={key} placeholder={key} value={newName} 
							onChange={(event) => setNewName(event.target.value)}>
						</input>
			    </div>
        </li>
      </div>
    </ul>
  )
}

export default AdminList;