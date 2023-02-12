import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getTotalJournals
 } from '../api/AdminAPI';
import JournalList from '../misc/Journal/JournalList';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';

const JournalPage = (props) => {

	
    const [journals,setJournals] = useState([]);
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
        refreshJournalPage(user.id,config,'Bearer '+user.accessToken);
      }, []);

    const refreshJournalPage = async(userId,backend_url,bearerToken) =>{
      const {journal,journalOptions} = await getTotalJournals(backend_url,bearerToken,userId);
      setJournals(journal);
    }

  return (
    chunkArray(journals, 3).map(
      journals =>
        <div className="row mt-3">
          {journals.map(journal =>
            <div className="col-sm">
              <JournalList journal={journal} refreshFunction={refreshJournalPage}/>
            </div>
          )}
        </div>
    )
  );
}

export default JournalPage