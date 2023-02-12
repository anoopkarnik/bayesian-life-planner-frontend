import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getTotalStats
 } from '../api/AdminAPI';
import StatsList from '../misc/Stats/StatsList';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';

const StatsPage = (props) => {

	
    const [stats,setStats] = useState([]);
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
        refreshStatsPage(user.id,config,'Bearer '+user.accessToken);
      }, []);

    const refreshStatsPage = async(userId,backend_url,bearerToken) =>{
      const {stats,statsOptions} = await getTotalStats(backend_url,bearerToken,userId);
      setStats(stats);
    }

  return (
    chunkArray(stats, 3).map(
      stats =>
        <div className="row mt-3">
          {stats.map(stat =>
            <div className="col-sm">
              <StatsList stat={stat} refreshFunction={refreshStatsPage}/>
            </div>
          )}
        </div>
    )
  );
}

export default StatsPage