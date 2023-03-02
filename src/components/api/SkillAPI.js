import axios from 'axios';

export const getSkills = async(backend_url,bearerToken,skillTypeName,active) =>{
    const res = await fetch(backend_url+'/api/skill?skillTypeName='+skillTypeName+'&active='+active,{
        method: 'GET',
        headers:{
          'Authorization':bearerToken
        }
      })
      if(res.status===200 | res.status===201){
        var data = await res.json()
      }
      else{
        var data=[];
      }  
      return data
}

export const createRootSkill = async(backend_url,bearerToken,name,
  skillTypeName,timeTaken,active)=>{

      const res = await fetch(backend_url+'/api/skill/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,
            skillTypeName,timeTaken,active}),
        })
        const data = await res.json()
      return data
    }

export const createChildSkill = async(backend_url,bearerToken,name,
      skillTypeName,timeTaken,parentSkillName,active)=>{
    
          const res = await fetch(backend_url+'/api/skill/child', {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':bearerToken
              },
              body: JSON.stringify({name,
                skillTypeName,timeTaken,parentSkillName,active}),
            })
            const data = await res.json()
          return data
        }

export const modifySkillParams = async(backend_url,bearerToken,id,
  name,startDate,description,active,hidden,completed,
  dueDate,timeTaken)=>{
  await fetch(backend_url+'/api/skill/modifyParams', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,
        name,startDate,description,active,hidden,completed,
        dueDate,timeTaken}),
    })
}

export const deleteSkill= async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/skill?id='+id,{
        headers:{Authorization:bearerToken}
      })
}
export const completeSkill = async(backend_url,bearerToken,id) =>{
  await fetch(backend_url+'/api/skill/complete?id='+id,{
      method: 'PUT',
      headers:{
        'Authorization':bearerToken
      }
    })
}
