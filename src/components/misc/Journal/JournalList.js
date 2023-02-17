import React,{useState,useContext,useEffect} from 'react'
import JournalItem from './JournalItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import AddJournalForm from './AddJournalForm';
import { getJournals } from '../../api/JournalAPI';

const JournalList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showJournal, setShowJournal] = useState(false);
    const [showAddJournal, setShowAddJournal] = useState(false);

    useEffect(() => {
      refreshJournal(config,'Bearer '+user.accessToken,props.journal)
    }, []);

    const refreshJournal = async(backend_url,bearerToken,journal) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getJournals(config,bearerToken,props.journal);
      setRecords(record);
      setShowAddJournal(false)

    }

    const onshowAddJournal = async() =>{
      setShowAddJournal(true);
    }
  
    const onHideAddJournal= async() =>{
      setShowAddJournal(false);
    }	


    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowJournal(!showJournal)} className='btn btn-secondary btn-lg'>{props.journal}</h3>
      {showJournal?<>
      <div>
      {records.map((record) => (
          <JournalItem record={record} 
          refreshFunction={refreshJournal}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddJournal(!showAddJournal)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Journal</div></h3>
      {showAddJournal?<AddJournalForm refreshFunction={refreshJournal} 
      name={props.journal} open={showAddJournal} hide={onHideAddJournal}
       />:null}</>:null}
    </ul>
  )
}

export default JournalList;