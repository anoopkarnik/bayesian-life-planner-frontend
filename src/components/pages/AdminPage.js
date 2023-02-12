import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getTotalTasks,getTotalHabits,createTaskType,
  createHabitType,deleteTaskType,deleteHabitType,
  editTaskType,editHabitType,getTotalJournals,createJournalType,
  deleteJournalType,editJournalType,getTotalStats,createStatsType,
  editStatsType,deleteStatsType
 } from '../api/AdminAPI';
import AdminList from '../misc/Admin/AdminList';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';

const AdminPage = (props) => {

    const [taskOptions, setTaskOptions] = useState([]);
    const [habitOptions,setHabitOptions] = useState([]);
    const [journalOptions, setJournalOptions] = useState([]);
    const [statsOptions, setStatsOptions] = useState([]);
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);


    useEffect(() => {
        refreshAdminPage(user.id,config,'Bearer '+user.accessToken);
      }, []);

    const refreshAdminPage = async(userId,backend_url,bearerToken) =>{
      const {task,taskOptions} = await getTotalTasks(backend_url,bearerToken,userId);
      const {habit,habitOptions} = await getTotalHabits(backend_url,bearerToken,userId);
      const {journal,journalOptions} = await getTotalJournals(backend_url,bearerToken,userId);
      const {stats,statsOptions} = await getTotalStats(backend_url,bearerToken,userId);
      setTaskOptions(taskOptions);  
      setHabitOptions(habitOptions);
      setJournalOptions(journalOptions);
      setStatsOptions(statsOptions);
    }


  
  return (
    <div>

      <div className='row mt-3'>
        <div className='col-sm'>
					<AdminList name="Task Types" records={taskOptions} 
          createFunction={createTaskType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteTaskType} editFunction={editTaskType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Habit Types" records={habitOptions} 
          createFunction={createHabitType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteHabitType} editFunction={editHabitType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Journal Types" records={journalOptions} 
          createFunction={createJournalType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteJournalType} editFunction={editJournalType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Stats Types" records={statsOptions} 
          createFunction={createStatsType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteStatsType} editFunction={editStatsType}/>
				</div>
		  </div>
    </div>
  )
}

export default AdminPage