import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getTotalBadHabits
 } from '../api/AdminAPI';
import BadHabitList from '../misc/BadHabit/BadHabitList';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';

const BadHabitPage = (props) => {

	
    const [badHabits,setBadHabits] = useState([]);
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
        refreshBadHabitPage(config,'Bearer '+user.accessToken);
      }, []);

    const refreshBadHabitPage = async(backend_url,bearerToken) =>{
      const {badHabits,badHabitOptions} = await getTotalBadHabits(backend_url,bearerToken);
      setBadHabits(badHabits);
    }

  return (
    chunkArray(badHabits, 3).map(
      badHabits =>
        <div className="row mt-3">
          {badHabits.map(badHabit =>
            <div className="col-sm">
              <BadHabitList badHabit={badHabit} refreshFunction={refreshBadHabitPage}/>
            </div>
          )}
        </div>
    )
  );
}

export default BadHabitPage