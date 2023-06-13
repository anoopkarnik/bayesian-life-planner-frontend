import axios from 'axios';

export const getGoal = async(backend_url,bearerToken,id) =>{
  const res = await fetch(backend_url+'/api/goal/'+id,{
    method: 'GET',
    headers:{
      'Authorization':bearerToken
    }
  }
  )
  if(res.status===200 | res.status===201){
    var data = await res.json()
  }
  else{
    var data={};
  }  
  return data
}

export const getGoals = async(backend_url,bearerToken,goalTypeName,active) =>{
    const res = await fetch(backend_url+'/api/goal?goalTypeName='+goalTypeName+'&active='+active,{
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

export const getRule = async(backend_url,bearerToken,id,ruleType) =>{
  const res = await fetch(backend_url+'/api/goal/rule?id='+id+'&ruleType='+ruleType,{
      method: 'GET',
      headers:{
        'Authorization':bearerToken
      }
    })
    if(res.status===200 | res.status===201){
      var data = await res.json()
    }
    else{
      var data={};
    }  
    return data
}

export const createRootGoal = async(backend_url,bearerToken,name,
  goalTypeName,dueDate,active)=>{

      const res = await fetch(backend_url+'/api/goal/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,
            goalTypeName,dueDate,active}),
        })
        const data = await res.json()
      return data
    }

export const createChildGoal = async(backend_url,bearerToken,name,
      goalTypeName,dueDate,parentGoalName,active)=>{
    
          const res = await fetch(backend_url+'/api/goal/child', {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':bearerToken
              },
              body: JSON.stringify({name,
                goalTypeName,dueDate,parentGoalName,active}),
            })
            const data = await res.json()
          return data
        }

export const modifyGoalParams = async(backend_url,bearerToken,id,
  name,startDate,description,active,hidden,completed,
  dueDate,timeTaken)=>{
  await fetch(backend_url+'/api/goal/modifyParams', {
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

export const addCompletedRule = async(backend_url,bearerToken,id,ruleEngineReference)=>{
  await fetch(backend_url+'/api/goal/addCompletedRule', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,ruleEngineReference}),
    })
}


export const addWorkRule = async(backend_url,bearerToken,id,ruleEngineReference)=>{
  await fetch(backend_url+'/api/goal/addWorkRule', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,ruleEngineReference}),
    })
}
export const deleteCompletedRule= async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/goal/completedRule/'+id,{
        headers:{Authorization:bearerToken}
      })
}
export const deleteWorkRule= async(backend_url,bearerToken,id) =>{
  await axios.delete(backend_url+'/api/goal/workRule/'+id,{
      headers:{Authorization:bearerToken}
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
