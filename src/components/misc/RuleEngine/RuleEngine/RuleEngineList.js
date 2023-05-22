import React,{useState,useContext,useEffect} from 'react'
import RuleEngineItem from './RuleEngineItem';
import { UserContext } from '../../../../context/UserContext';
import { ConfigContext } from '../../../../context/ConfigContext';

import AddRuleEngineForm from './AddRuleEngineForm';
import { FiExternalLink } from 'react-icons/fi';
import { getAllCriteriaSet,getAllRule,getAllRuleSet } from '../../../api/RuleEngineAPI';

const RuleEngineList = (props) => {

    const {user} = useContext(UserContext);
    const [showDescription, setShowDescription] =useState(false);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showRuleEngine, setShowRuleEngine] = useState(false);
    const [showAddRuleEngine, setShowAddRuleEngine] = useState(false);

    const onshowAddRuleEngine = async() =>{
      setShowAddRuleEngine(true);
    }
  
    const onHideAddRuleEngine= async() =>{
      setShowAddRuleEngine(false);
    }	

    useEffect(() => {
      refreshRuleEngine(config,'Bearer '+user.accessToken)
    }, []);

    const refreshRuleEngine = async(backend_url,bearerToken) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      if(props.name==="Criteria Set"){
        const record = await getAllCriteriaSet(config,'Bearer '+user.accessToken)
        setRecords(record);
      }
      else if(props.name==="Rule"){
        const record = await getAllRule(config,'Bearer '+user.accessToken)
        setRecords(record);
      }
      else if(props.name==="Rule Set"){
        const record = await getAllRuleSet(config,'Bearer '+user.accessToken)
        setRecords(record);
      }
      setShowAddRuleEngine(false)

    }
    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowRuleEngine(!showRuleEngine)} className='btn btn-secondary btn-lg'>{props.name}&ensp;&ensp;</h3>
      {showRuleEngine?<>
      <div>
      {records.map((record) => (
          <RuleEngineItem record={record} name={props.name}
          refreshFunction={refreshRuleEngine}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddRuleEngine(!showAddRuleEngine)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add {props.name}</div></h3>
      {showAddRuleEngine?<AddRuleEngineForm refreshFunction={refreshRuleEngine} 
      name={props.name} open={showAddRuleEngine} hide={onHideAddRuleEngine}
       />:null}
       </>:null}
    </ul>
  )
}

export default RuleEngineList;