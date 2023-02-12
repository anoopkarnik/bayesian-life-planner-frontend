import React,{useState,useContext,useEffect} from 'react'
import BadHabitItem from './BadHabitItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import AddBadHabitForm from './AddBadHabitForm';
import { getBadHabits } from '../../api/BadHabitAPI';

const BadHabitList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showBadHabit, setShowBadHabit] = useState(false);
    const [showAddBadHabit, setShowAddBadHabit] = useState(false);

    useEffect(() => {
      refreshBadHabit(user.id,config,'Bearer '+user.accessToken,props.habit)
    }, []);

    const refreshBadHabit = async(userId,backend_url,bearerToken,habit) =>{
      // await props.refreshFunction(userId,backend_url,bearerToken,habit)
      const record = await getBadHabits(config,bearerToken,userId,props.habit);
      setRecords(record);
      setShowAddBadHabit(false)

    }


    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowBadHabit(!showBadHabit)} className='btn btn-secondary btn-lg'>{props.habit}</h3>
      {showBadHabit?<>
      <div>
      {records.map((record) => (
          <BadHabitItem record={record} 
          refreshFunction={refreshBadHabit}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddBadHabit(!showAddBadHabit)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Bad Habit</div></h3>
      {showAddBadHabit?<AddBadHabitForm refreshFunction={refreshBadHabit} 
      name={props.habit}
       />:null}</>:null}
    </ul>
  )
}

export default BadHabitList;