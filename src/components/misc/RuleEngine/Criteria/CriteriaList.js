import React,{useState,useContext,useEffect} from 'react'
import CriteriaItem from './CriteriaItem';
import { UserContext } from '../../../../context/UserContext';
import { ConfigContext } from '../../../../context/ConfigContext';

import AddCriteriaForm from './AddCriteriaForm';
import { FiExternalLink } from 'react-icons/fi';
import { getAllCriteria } from '../../../api/RuleEngineAPI';

const CriteriaList = (props) => {

    const {user} = useContext(UserContext);
    const [showDescription, setShowDescription] =useState(false);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showCriteria, setShowCriteria] = useState(false);
    const [showAddCriteria, setShowAddCriteria] = useState(false);

    const onshowAddCriteria = async() =>{
      setShowAddCriteria(true);
    }
  
    const onHideAddCriteria= async() =>{
      setShowAddCriteria(false);
    }	

    useEffect(() => {
      refreshCriteria(config,'Bearer '+user.accessToken,props.record.value)
    }, []);

    const refreshCriteria = async(backend_url,bearerToken,value) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getAllCriteria(config,'Bearer '+user.accessToken,value)
      setRecords(record);
      setShowAddCriteria(false)

    }
    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowCriteria(!showCriteria)} className='btn btn-secondary btn-lg'>{props.record.value}&ensp;&ensp;</h3>
      {showCriteria?<>
      <div>
      {records.map((record) => (
          <CriteriaItem record={record} 
          refreshFunction={refreshCriteria}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddCriteria(!showAddCriteria)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Criteria</div></h3>
      {showAddCriteria?<AddCriteriaForm refreshFunction={refreshCriteria} 
      name={props.record.value} open={showAddCriteria} hide={onHideAddCriteria}
       />:null}
       </>:null}
    </ul>
  )
}

export default CriteriaList;