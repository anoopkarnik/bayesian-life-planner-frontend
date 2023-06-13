import React,{useState,useContext,useEffect} from 'react'
import HabitItem from './HabitItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import { CurrentDateContext } from '../../../context/CurrentDateContext';
import AddHabitForm from './AddHabitForm';
import { getHabits } from '../../api/HabitAPI';

const HabitList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const {currentDate} = useContext(CurrentDateContext);
    const [records, setRecords] = useState([]);
    const [showHabit, setShowHabit] = useState(false);
    const [showAddHabit, setShowAddHabit] = useState(false);
    const {showActive} = useContext(ActiveContext);

    useEffect(() => {
      refreshHabit(config,'Bearer '+user.accessToken,props.habit,showActive,currentDate)
    }, [showActive,currentDate]);

    const refreshHabit = async(backend_url,bearerToken,habit,showCurrentActive,currentDate) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getHabits(config,bearerToken,habit,showCurrentActive,currentDate);
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