import React,{useState,useContext,useEffect} from 'react'
import StatsItem from './StatsItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import AddStatsForm from './AddStatsForm';
import { getStats } from '../../api/StatsAPI';

const StatsList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showStats, setShowStats] = useState(false);
    const [showAddStats, setShowAddStats] = useState(false);

    useEffect(() => {
      refreshStats(config,'Bearer '+user.accessToken,props.stat)
    }, []);

    const refreshStats = async(backend_url,bearerToken,stat) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getStats(config,bearerToken,props.stat);
      setRecords(record);
      setShowAddStats(false)

    }

    const onshowAddStats = async() =>{
      setShowAddStats(true);
    }
  
    const onHideAddStats= async() =>{
      setShowAddStats(false);
    }	


    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowStats(!showStats)} className='btn btn-secondary btn-lg'>{props.stat}</h3>
      {showStats?<>
      <div>
      {records.map((record) => (
          <StatsItem record={record} 
          refreshFunction={refreshStats}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddStats(!showAddStats)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Stats</div></h3>
      {showAddStats?<AddStatsForm refreshFunction={refreshStats} 
      name={props.stat} open={showAddStats} hide={onHideAddStats}
       />:null}</>:null}
    </ul>
  )
}

export default StatsList;