import React,{useState,useContext,useEffect} from 'react'
import GoalItem from './GoalItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import AddGoalForm from './AddGoalForm';
import { getGoals } from '../../api/GoalAPI';

const GoalList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showGoal, setShowGoal] = useState(false);
    const [showAddGoal, setShowAddGoal] = useState(false);
    const {showActive} = useContext(ActiveContext);

    useEffect(() => {
      refreshGoal(config,'Bearer '+user.accessToken,props.goal,showActive)
    }, [showActive]);

    const refreshGoal = async(backend_url,bearerToken,goal,currentActive) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      if (currentActive==null){
        currentActive=showActive;
      }
      const record = await getGoals(config,bearerToken,props.goal,currentActive);
      setRecords(record);
      setShowAddGoal(false)

    }

    const onshowAddGoal = async() =>{
      setShowAddGoal(true);
    }
  
    const onHideAddGoal= async() =>{
      setShowAddGoal(false);
    }	


    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowGoal(!showGoal)} className='btn btn-secondary btn-lg'>{props.goal}</h3>
      {showGoal?<>
      <div>
      {records.map((record) => (
          <GoalItem record={record} 
          refreshFunction={refreshGoal}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddGoal(!showAddGoal)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Goal</div></h3>
      {showAddGoal?<AddGoalForm refreshFunction={refreshGoal} 
      name={props.goal} open={onshowAddGoal} hide={onHideAddGoal}
       />:null}</>:null}
    </ul>
  )
}

export default GoalList;