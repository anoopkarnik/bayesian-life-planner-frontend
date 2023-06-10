import React,{useState,useContext,useEffect} from 'react'
import TopicItem from './TopicItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import AddTopicForm from './AddTopicForm';
import { getTopics } from '../../api/TopicAPI';
import { getTopic } from '../../api/TopicAPI';

const TopicList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showTopic, setShowTopic] = useState(false);
    const [showAddTopic, setShowAddTopic] = useState(false);
    const {showActive} = useContext(ActiveContext);

    useEffect(() => {
      refreshTopic(config,'Bearer '+user.accessToken,props.skill)
    }, []);

    const refreshTopic = async(backend_url,bearerToken,skill) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getTopic(config,bearerToken,skill);
      setRecords(record);
      setShowAddTopic(false)

    }

    const onshowAddTopic = async() =>{
      setShowAddTopic(true);
    }
  
    const onHideAddTopic= async() =>{
      setShowAddTopic(false);
    }	


    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowTopic(!showTopic)} className='btn btn-secondary btn-lg'>{props.skill}</h3>
      {showTopic?<>
      <div>
      {records.map((record) => (
          <TopicItem record={record} 
          refreshFunction={refreshTopic}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddTopic(!showAddTopic)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Topic</div></h3>
      {showAddTopic?<AddTopicForm refreshFunction={refreshTopic} 
      name={props.skill} open={onshowAddTopic} hide={onHideAddTopic}
       />:null}</>:null}
    </ul>
  )
}

export default TopicList;