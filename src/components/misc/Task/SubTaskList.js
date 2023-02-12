import React,{useState,useContext} from 'react'
import SubTaskItem from './SubTaskItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import AddSubTaskForm from './AddSubTaskForm';

const SubTaskList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [showAddSubTask, setShowAddSubTask] = useState(false);

  
  const refreshSubTask = async() =>{
    await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
    setShowAddSubTask(!showAddSubTask)
  }

    
  return (
    <ul className='list-group'>
      <div>
      {props.records.map((record) => (
          <SubTaskItem record={record} 
          refreshFunction={props.refreshFunction}/>
      ))}</div>
      
       <h3 onClick={()=>{setShowAddSubTask(!showAddSubTask)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Sub Task</div></h3>
      {showAddSubTask?<AddSubTaskForm refreshFunction={refreshSubTask} 
      taskId={props.taskId}
       />:null}
    </ul>
  )
}

export default SubTaskList;