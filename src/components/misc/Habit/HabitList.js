import React,{useState,useContext,useEffect} from 'react'
import HabitItem from './HabitItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import AddHabitForm from './AddHabitForm';
import { getHabits } from '../../api/HabitAPI';

const HabitList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showHabit, setShowHabit] = useState(false);
    const [showAddHabit, setShowAddHabit] = useState(false);

    useEffect(() => {
      refreshHabit(user.id,config,'Bearer '+user.accessToken,props.habit)
    }, []);

    const refreshHabit = async(userId,backend_url,bearerToken,habit) =>{
      // await props.refreshFunction(userId,backend_url,bearerToken,habit)
      const record = await getHabits(config,bearerToken,userId,props.habit);
      setRecords(record);
      setShowAddHabit(false)

    }


    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowHabit(!showHabit)} className='btn btn-secondary btn-lg'>{props.habit}</h3>
      {showHabit?<>
      <div>
      {records.map((record) => (
          <HabitItem record={record} 
          refreshFunction={refreshHabit}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddHabit(!showAddHabit)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Habit</div></h3>
      {showAddHabit?<AddHabitForm refreshFunction={refreshHabit} 
      name={props.habit}
       />:null}</>:null}
    </ul>
  )
}

export default HabitList;