import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getTotalHabits
 } from '../api/AdminAPI';
import HabitList from '../misc/Habit/HabitList';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';
import HabitSubPage from './HabitSubPage';
import DatePicker from "react-datepicker";
import { CurrentDateContext } from '../../context/CurrentDateContext';


const HabitPage = (props) => {

	
    const [habits,setHabits] = useState([]);
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const {currentDate,setCurrentDate} = useContext(CurrentDateContext)


  return (
    <div>
        <DatePicker selected={currentDate}  
          className='form-control'
          onChange={(date)=>setCurrentDate(date)}/>
      <HabitSubPage/>
    </div>
  )
}

export default HabitPage