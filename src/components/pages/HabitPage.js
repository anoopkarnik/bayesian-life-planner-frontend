import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getTotalHabits
 } from '../api/AdminAPI';
import HabitList from '../misc/Habit/HabitList';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';


const HabitPage = (props) => {

	
    const [habits,setHabits] = useState([]);
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
        refreshHabitPage(config,'Bearer '+user.accessToken);
      }, []);

    const refreshHabitPage = async(backend_url,bearerToken) =>{
      const {habit,habitOptions} = await getTotalHabits(backend_url,bearerToken);
      setHabits(habit);
    }

  return (
    chunkArray(habits, 3).map(
      habits =>
        <div className="row mt-3">
          {habits.map(habit =>
            <div className="col-sm">
              <HabitList habit={habit} refreshFunction={refreshHabitPage}/>
            </div>
          )}
        </div>
    )
  );
}

export default HabitPage