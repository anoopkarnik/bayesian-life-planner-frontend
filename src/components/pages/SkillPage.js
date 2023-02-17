import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getTotalSkills
 } from '../api/AdminAPI';
import SkillList from '../misc/Skill/SkillList';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';

const SkillPage = (props) => {

	
    const [skills,setSkills] = useState([]);
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
        refreshSkillPage(config,'Bearer '+user.accessToken);
      }, []);

    const refreshSkillPage = async(backend_url,bearerToken) =>{
      const {skills,skillOptions} = await getTotalSkills(backend_url,bearerToken);
      setSkills(skills);
    }

  return (
    chunkArray(skills, 3).map(
      skills =>
        <div className="row mt-3">
          {skills.map(skill =>
            <div className="col-sm">
              <SkillList skill={skill} refreshFunction={refreshSkillPage}/>
            </div>
          )}
        </div>
    )
  );
}

export default SkillPage