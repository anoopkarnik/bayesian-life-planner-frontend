import axios from 'axios';

export const getGoals = async(backend_url,bearerToken,goalTypeName) =>{
    const res = await fetch(backend_url+'/api/goal?goalTypeName='+goalTypeName,{
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

export const createRootGoal = async(backend_url,bearerToken,name,
  goalTypeName,timeTaken)=>{

      const res = await fetch(backend_url+'/api/goal/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,
            goalTypeName,timeTaken}),
        })
        const data = await res.json()
      return data
    }

export const createChildGoal = async(backend_url,bearerToken,name,
      goalTypeName,timeTaken,parentGoalName)=>{
    
          const res = await fetch(backend_url+'/api/goal/child', {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':bearerToken
              },
              body: JSON.stringify({name,
                goalTypeName,timeTaken,parentGoalName}),
            })
            const data = await res.json()
          return data
        }

export const addGoalDescription = async(backend_url,bearerToken,id,description)=>{
  await fetch(backend_url+'/api/goal/description', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,description}),
    })
}

export const deleteGoal= async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/goal?id='+id,{
        headers:{Authorization:bearerToken}
      })
}
export const completeGoal = async(backend_url,bearerToken,id) =>{
  await fetch(backend_url+'/api/goal/complete?id='+id,{
      method: 'PUT',
      headers:{
        'Authorization':bearerToken
      }
    })
}
