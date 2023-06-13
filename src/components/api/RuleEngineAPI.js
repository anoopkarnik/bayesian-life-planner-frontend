import axios from 'axios';

export const getCriteria = async(backend_url,bearerToken,id) =>{
  const res = await fetch(backend_url+'/api/criteria/'+id,{
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
export const getCriteriaSet = async(backend_url,bearerToken,id) =>{
  const res = await fetch(backend_url+'/api/criteriaSet/'+id,{
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
export const getRule = async(backend_url,bearerToken,id) =>{
  const res = await fetch(backend_url+'/api/rule/'+id,{
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
export const getRuleSet = async(backend_url,bearerToken,id) =>{
  const res = await fetch(backend_url+'/api/ruleSet/'+id,{
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

export const getAllCriteria = async(backend_url,bearerToken,criteriaType) =>{
  const res = await fetch(backend_url+'/api/ruleEngine/criteria?type='+criteriaType,{
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
export const getAllCriteriaSet = async(backend_url,bearerToken) =>{
  const res = await fetch(backend_url+'/api/ruleEngine/criteriaSet',{
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
export const getAllRule = async(backend_url,bearerToken) =>{
  const res = await fetch(backend_url+'/api/ruleEngine/rule',{
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
export const getAllRuleSet = async(backend_url,bearerToken) =>{
  const res = await fetch(backend_url+'/api/ruleEngine/ruleSet',{
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
export const createCriteria = async(backend_url,bearerToken,name,criteriaType,
  condition,category,weightage,value,categoryName)=>{
      const res = await fetch(backend_url+'/api/ruleEngine/criteria', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,criteriaType,
            condition,category,weightage,value,categoryName}),
        })
}
export const createCriteriaSet = async(backend_url,bearerToken,name)=>{
      const res = await fetch(backend_url+'/api/ruleEngine/criteriaSet', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name}),
        })
}
export const createRule = async(backend_url,bearerToken,name)=>{
      const res = await fetch(backend_url+'/api/ruleEngine/rule', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name}),
        })
}
export const createRuleSet = async(backend_url,bearerToken,name)=>{
      const res = await fetch(backend_url+'/api/ruleEngine/ruleSet', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name}),
        })
}
export const deleteCriteria = async(backend_url,bearerToken,id)=>{
  await axios.delete(backend_url+'/api/ruleEngine/criteria?id='+id,{
    headers:{Authorization:bearerToken}
  })
}
export const deleteCriteriaSet = async(backend_url,bearerToken,id)=>{
  await axios.delete(backend_url+'/api/ruleEngine/criteriaSet?id='+id,{
    headers:{Authorization:bearerToken}
  })
}
export const deleteRule = async(backend_url,bearerToken,id)=>{
  await axios.delete(backend_url+'/api/ruleEngine/rule?id='+id,{
    headers:{Authorization:bearerToken}
  })
}
export const deleteRuleSet = async(backend_url,bearerToken,id)=>{
  await axios.delete(backend_url+'/api/ruleEngine/ruleSet?id='+id,{
    headers:{Authorization:bearerToken}
  })
}
export const modifyCriteriaParams= async(backend_url,bearerToken,id,
  name,criteriaType,condition,category,weightage,value,categoryName)=>{
  await fetch(backend_url+'/api/ruleEngine/criteria', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,
        name,criteriaType,condition,category,weightage,value,categoryName}),
    })
}
export const modifyCriteriaSetParams= async(backend_url,bearerToken,id,
  name)=>{
  await fetch(backend_url+'/api/ruleEngine/criteriaSet', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,name}),
    })
}
export const modifyRuleParams= async(backend_url,bearerToken,id,
  name)=>{
  await fetch(backend_url+'/api/ruleEngine/rule', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,name}),
    })
}
export const modifyRuleSetParams= async(backend_url,bearerToken,id,
  name)=>{
  await fetch(backend_url+'/api/ruleEngine/ruleSet', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,name}),
    })
}
export const getAllTypes = async(backend_url,bearerToken,type) =>{
  const res = await fetch(backend_url+'/api/ruleEngine/types?type='+type,{
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
  const res = await fetch(backend_url+'/api/ruleEngine/names?type='+type+'&name='+name,{
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

export const removeCriteriaFromCriteriaSet= async(backend_url,bearerToken,
  criteriaSetId,criteriaId)=>{
  await fetch(backend_url+'/api/ruleEngine/removeCriteria', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({criteriaSetId,criteriaId}),
    })
}

export const removeCriteriaSetFromRule= async(backend_url,bearerToken,ruleId,
  criteriaSetId)=>{
  await fetch(backend_url+'/api/ruleEngine/removeCriteriaSet', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({ruleId,criteriaSetId}),
    })
}

export const removeRuleFromRuleSet= async(backend_url,bearerToken,ruleSetId,
  ruleId)=>{
  await fetch(backend_url+'/api/ruleEngine/removeRule', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({ruleSetId,ruleId}),
    })
}

export const addCriteriaToCriteriaSet= async(backend_url,bearerToken,
  criteriaSetId,criteriaId)=>{
  await fetch(backend_url+'/api/ruleEngine/addCriteria', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({criteriaSetId,criteriaId}),
    })
}

export const addCriteriaSetToRule= async(backend_url,bearerToken,ruleId,
  criteriaSetId)=>{
  await fetch(backend_url+'/api/ruleEngine/addCriteriaSet', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({ruleId,criteriaSetId}),
    })
}

export const addRuleToRuleSet= async(backend_url,bearerToken,ruleSetId,
  ruleId)=>{
  await fetch(backend_url+'/api/ruleEngine/addRule', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({ruleSetId,ruleId}),
    })
}


