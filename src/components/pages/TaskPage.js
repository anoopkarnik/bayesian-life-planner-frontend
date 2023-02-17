import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getTasks,createTask,completeTask,deleteTask
 } from '../api/TaskAPI';
import TaskList from '../misc/Task/TaskList';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';
import { getTotalTasks } from '../api/AdminAPI';

const TaskPage = (props) => {

	
    const [tasks,setTasks] = useState([]);
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);

    function chunkArray(arr, size) {
      var groupedArray = [];
      for(var i = 0; i < arr.length; i += size) {
        groupedArray.push(arr.slice(i, i+size));
      }
      return groupedArray ;
    }

    useEffect(() => {
        refreshTaskPage(config,'Bearer '+user.accessToken);
      }, []);

    const refreshTaskPage = async(backend_url,bearerToken) =>{
      const {task,taskOptions} = await getTotalTasks(backend_url,bearerToken);
      setTasks(task);
    }

    return (
      chunkArray(tasks, 3).map(
        tasks =>
          <div className="row mt-3">
            {tasks.map(task =>
              <div className="col-sm">
                <TaskList task={task} refreshFunction={refreshTaskPage}/>
              </div>
            )}
          </div>
      )
    );
}

export default TaskPage