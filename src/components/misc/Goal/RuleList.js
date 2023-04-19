import React,{useState,useContext,useEffect} from 'react'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { getAllCompletedRules,getAllWorkRules } from '../../api/RuleAPI';
import AddCompletedRuleForm from './AddCompletedRuleForm';
import AddWorkRuleForm from './AddWorkRuleForm';
import RuleItem from './RuleItem';
import { TiDelete } from 'react-icons/ti';



const RuleList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [completedRecords, setCompletedRecords] = useState([]);
    const [workRecords, setWorkRecords] = useState([]);
    const [showCompletedRule, setShowCompletedRule] = useState(false);
    const [showAddCompletedRule,setShowAddCompletedRule] = useState(false);
    const [showWorkRule, setShowWorkRule] = useState(false);
    const [showAddWorkRule,setShowAddWorkRule] = useState(false);

    const refreshGoalDescription = async(backend_url,bearerToken,id) => {
      const completedRecord = await getAllCompletedRules(config,'Bearer '+user.accessToken,
      props.id);
      const workRecord = await getAllWorkRules(config,'Bearer '+user.accessToken,
      props.id);
      setCompletedRecords(completedRecord);
      setWorkRecords(workRecord);
      setShowAddCompletedRule(false);
      setShowAddWorkRule(false);
    }

    useEffect(() => {
      refreshGoalDescription(config,'Bearer '+user.accessToken,
      props.id);
    }, []);

    
  return (
    <div>
    <ul className='list-group'>
      <h3 onClick={()=>setShowCompletedRule(!showCompletedRule)} 
      className='btn btn-secondary btn-lg'>Completion Rules</h3>
      <div className='row mt-3'>
      </div>
      {showCompletedRule?<>
      <div>
          {completedRecords.map((record)=>(
            <RuleItem record={record} 
            refreshFunction={refreshGoalDescription}/>
          ))}</div>  
        <div className='row mt-3'>
        </div>
        <h3 onClick={()=>{setShowAddCompletedRule(!showAddCompletedRule)}} 
        className='mt-3 text-center'>
          <div className='btn btn-secondary btn-lg'>Add Completion Rule</div></h3>
      {showAddCompletedRule?<AddCompletedRuleForm 
      refreshFunction={refreshGoalDescription} 
      id={props.id}
       />:null}</>:null}
    </ul>
    <ul className='list-group'>
      <h3 onClick={()=>setShowWorkRule(!showWorkRule)} 
      className='btn btn-secondary btn-lg'>Work Rules</h3>
      <div className='row mt-3'>
      </div>
      {showWorkRule?<>
      <div>
          {workRecords.map((record)=>(
            <RuleItem record={record} 
            refreshFunction={refreshGoalDescription}/>
          ))}</div>  
        <div className='row mt-3'>
        </div>
        <h3 onClick={()=>{setShowAddWorkRule(!showAddWorkRule)}} 
        className='mt-3 text-center'>
          <div className='btn btn-secondary btn-lg'>Add Work Rule</div></h3>
      {showAddWorkRule?<AddWorkRuleForm refreshFunction={refreshGoalDescription} 
      id={props.id}
       />:null}</>:null}
    </ul>
    </div>
  )
}

export default RuleList;