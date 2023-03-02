import axios from 'axios';

export const getAllCompletedRules = async(backend_url,bearerToken,goalId) =>{
  const res = await fetch(backend_url+'/api/rule/completed?goalId='+goalId,{
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
export const getAllWorkRules = async(backend_url,bearerToken,goalId) =>{
  const res = await fetch(backend_url+'/api/rule/work?goalId='+goalId,{
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
export const createCompletedRule = async(backend_url,bearerToken,ruleType,name,
  id,goalId,value,conditionType,weightage)=>{
    const ruleCategory = "CompletedRules"
      const res = await fetch(backend_url+'/api/rule', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({ruleType,name,id, goalId,
            value,conditionType,weightage,ruleCategory}),
        })
}
export const createWorkRule = async(backend_url,bearerToken,ruleType,name,
  id,goalId,value,conditionType,weightage)=>{
      const ruleCategory = "WorkRules"
      const res = await fetch(backend_url+'/api/rule', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({ruleType,name,id, goalId,
            value,conditionType,weightage,ruleCategory}),
        })
}
export const deleteRule = async(backend_url,bearerToken,ruleType,id)=>{
  await axios.delete(backend_url+'/api/rule?id='+id+'&ruleType='+ruleType,{
    headers:{Authorization:bearerToken}
  })
}
export const getAllTypes = async(backend_url,bearerToken,type) =>{
  const res = await fetch(backend_url+'/api/rule/types?type='+type,{
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
export const getAllNames= async(backend_url,bearerToken,type,name) =>{
  const res = await fetch(backend_url+'/api/rule/names?type='+type+'&name='+name,{
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