import axios from 'axios';

export const getSkills = async(backend_url,bearerToken,userId,skillTypeName) =>{
    const res = await fetch(backend_url+'/api/skill?userId='+userId+'&skillTypeName='+skillTypeName,{
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

export const createRootSkill = async(backend_url,bearerToken,userId,name,
  skillTypeName,timeTaken)=>{

      const res = await fetch(backend_url+'/api/skill/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({userId,name,
            skillTypeName,timeTaken}),
        })
        const data = await res.json()
      return data
    }

export const createChildSkill = async(backend_url,bearerToken,userId,name,
      skillTypeName,timeTaken,parentSkillName)=>{
    
          const res = await fetch(backend_url+'/api/skill/child', {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':bearerToken
              },
              body: JSON.stringify({userId,name,
                skillTypeName,timeTaken,parentSkillName}),
            })
            const data = await res.json()
          return data
        }

export const addSkillDescription = async(backend_url,bearerToken,id,description)=>{
  await fetch(backend_url+'/api/skill/description', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,description}),
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
