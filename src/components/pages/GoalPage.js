import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getTotalGoals
 } from '../api/AdminAPI';
import GoalList from '../misc/Goal/GoalList';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';

const GoalPage = (props) => {

	
    const [goals,setGoals] = useState([]);
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
        refreshGoalPage(config,'Bearer '+user.accessToken);
      }, []);

    const refreshGoalPage = async(backend_url,bearerToken) =>{
      const {goals,goalOptions} = await getTotalGoals(backend_url,bearerToken);
      setGoals(goals);
    }

  return (
    chunkArray(goals, 3).map(
      goals =>
        <div className="row mt-3">
          {goals.map(goal =>
            <div className="col-sm">
              <GoalList goal={goal} refreshFunction={refreshGoalPage}/>
            </div>
          )}
        </div>
    )
  );
}

export default GoalPage