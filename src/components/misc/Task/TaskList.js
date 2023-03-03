import React,{useState,useContext,useEffect} from 'react'
import TaskItem from './TaskItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import AddTaskForm from './AddTaskForm';
import { getTasks } from '../../api/TaskAPI';

const TaskList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showTask, setShowTask] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);
    const {showActive} = useContext(ActiveContext);

    useEffect(() => {
      refreshTask(config,'Bearer '+user.accessToken,props.task,showActive);
    }, [showActive]);

    const refreshTask = async(backend_url,bearerToken,task,showActive) =>{
      await props.refreshFunction(backend_url,bearerToken)
      const record = await getTasks(backend_url,bearerToken,props.task,showActive);
      setRecords(record);
      setShowAddTask(false);
    }

    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowTask(!showTask)} className='btn btn-secondary btn-lg'>{props.task}</h3>
      {showTask?<>
      <div>
      {records.map((record) => (
          <TaskItem record={record} 
          refreshFunction={refreshTask}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddTask(!showAddTask)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Task</div></h3>
      {showAddTask?<AddTaskForm refreshFunction={refreshTask} 
      name={props.task}
       />:null}</>:null}
    </ul>
  )
}

export default TaskList;