import React,{useState,useContext,useEffect} from 'react'
import SkillItem from './SkillItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import AddSkillForm from './AddSkillForm';
import { getSkills } from '../../api/SkillAPI';

const SkillList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showSkill, setShowSkill] = useState(false);
    const [showAddSkill, setShowAddSkill] = useState(false);
    const {showActive} = useContext(ActiveContext);

    useEffect(() => {
      refreshSkill(config,'Bearer '+user.accessToken,props.skill,showActive)
    }, [showActive]);

    const refreshSkill = async(backend_url,bearerToken,skill,showActive) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getSkills(config,bearerToken,props.skill,showActive);
      setRecords(record);
      setShowAddSkill(false)

    }

    const onshowAddSkill = async() =>{
      setShowAddSkill(true);
    }
  
    const onHideAddSkill= async() =>{
      setShowAddSkill(false);
    }	


    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowSkill(!showSkill)} className='btn btn-secondary btn-lg'>{props.skill}</h3>
      {showSkill?<>
      <div>
      {records.map((record) => (
          <SkillItem record={record} 
          refreshFunction={refreshSkill}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddSkill(!showAddSkill)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Skill</div></h3>
      {showAddSkill?<AddSkillForm refreshFunction={refreshSkill} 
      name={props.skill} open={onshowAddSkill} hide={onHideAddSkill}
       />:null}</>:null}
    </ul>
  )
}

export default SkillList;