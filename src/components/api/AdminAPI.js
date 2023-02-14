import axios from 'axios';

export const getTotalTasks = async(backend_url,bearerToken,userId) =>{
  const res = await fetch(backend_url+'/api/commons/task?userId='+userId,{
    method: 'GET',
    headers:{
      'Authorization':bearerToken
    }
  })
  const data = await res.json()
  var names = new Array();
  var options = new Array();
  for(var j =0;j<data.length;j++){
    names.push(data[j]['name'])
    options.push(data[j])
  }
  return {task:names,taskOptions:options}
}
export const getTotalHabits = async(backend_url,bearerToken,userId) =>{
  const res = await fetch(backend_url+'/api/commons/habit?userId='+userId,{
    method: 'GET',
    headers:{
      'Authorization':bearerToken
    }
  })
  const data = await res.json()
  var names = new Array();
  var options = new Array();
  for(var j =0;j<data.length;j++){
    names.push(data[j]['name'])
    options.push(data[j])
  }
  return {habit:names,habitOptions:options}
}
export const getTotalJournals = async(backend_url,bearerToken,userId) =>{
  const res = await fetch(backend_url+'/api/commons/journal?userId='+userId,{
    method: 'GET',
    headers:{
      'Authorization':bearerToken
    }
  })
  if(res.status===200 | res.status===201){
    const data = await res.json()
    var names = new Array();
    var options = new Array();
    for(var j =0;j<data.length;j++){
      names.push(data[j]['name'])
      options.push(data[j])
  }
  }
  else{
    var names = new Array();
    var options = new Array();
  }  
  return {journal:names,journalOptions:options}
}
export const getTotalStats = async(backend_url,bearerToken,userId) =>{
  const res = await fetch(backend_url+'/api/commons/stats?userId='+userId,{
    method: 'GET',
    headers:{
      'Authorization':bearerToken
    }
  })
  if(res.status===200 | res.status===201){
    const data = await res.json()
    var names = new Array();
    var options = new Array();
    for(var j =0;j<data.length;j++){
      names.push(data[j]['name'])
      options.push(data[j])
  }
  }
  else{
    var names = new Array();
    var options = new Array();
  }  
  return {stats:names,statsOptions:options}
}
export const getTotalSkills = async(backend_url,bearerToken,userId) =>{
  const res = await fetch(backend_url+'/api/commons/skill?userId='+userId,{
    method: 'GET',
    headers:{
      'Authorization':bearerToken
    }
  })
  if(res.status===200 | res.status===201){
    const data = await res.json()
    var names = new Array();
    var options = new Array();
    for(var j =0;j<data.length;j++){
      names.push(data[j]['name'])
      options.push(data[j])
  }
  }
  else{
    var names = new Array();
    var options = new Array();
  }  
  return {skills:names,skillOptions:options}
}
export const createTaskType = async(backend_url,bearerToken,name,userId) =>{
    const res = await fetch(backend_url+'/api/commons/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({name,userId}),
    })
    const data = await res.json()
    return data
}
export const createHabitType = async(backend_url,bearerToken,name,userId) =>{
  const res = await fetch(backend_url+'/api/commons/habit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':bearerToken
    },
    body: JSON.stringify({name,userId}),
  })
  const data = await res.json()
  return data
}
export const createJournalType = async(backend_url,bearerToken,name,userId) =>{
  const res = await fetch(backend_url+'/api/commons/journal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':bearerToken
    },
    body: JSON.stringify({name,userId}),
  })
  const data = await res.json()
  return data
}
export const createStatsType = async(backend_url,bearerToken,name,userId) =>{
  const res = await fetch(backend_url+'/api/commons/stats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':bearerToken
    },
    body: JSON.stringify({name,userId}),
  })
  const data = await res.json()
  return data
}
export const createSkillType = async(backend_url,bearerToken,name,userId) =>{
  const res = await fetch(backend_url+'/api/commons/skill', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':bearerToken
    },
    body: JSON.stringify({name,userId}),
  })
  const data = await res.json()
  return data
}

export const deleteTaskType= async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/commons/task?id='+id,{
      headers:{Authorization:bearerToken}
    })
}
export const deleteHabitType= async(backend_url,bearerToken,id) =>{
  await axios.delete(backend_url+'/api/commons/habit?id='+id,{
    headers:{Authorization:bearerToken}
  })
}
export const deleteJournalType= async(backend_url,bearerToken,id) =>{
  await axios.delete(backend_url+'/api/commons/journal?id='+id,{
    headers:{Authorization:bearerToken}
  })
}
export const deleteStatsType= async(backend_url,bearerToken,id) =>{
  await axios.delete(backend_url+'/api/commons/stats?id='+id,{
    headers:{Authorization:bearerToken}
  })
}
export const deleteSkillType= async(backend_url,bearerToken,id) =>{
  await axios.delete(backend_url+'/api/commons/skill?id='+id,{
    headers:{Authorization:bearerToken}
  })
}

export const editTaskType = async(backend_url,bearerToken,id,name) =>{
  await fetch(backend_url+'/api/commons/task?id='+id+'&name='+name, {
    method: 'PATCH',
    headers:{
      'Authorization':bearerToken
    }
  })
}
export const editHabitType = async(backend_url,bearerToken,id,name) =>{
  await fetch(backend_url+'/api/commons/habit?id='+id+'&name='+name, {
    method: 'PATCH',
    headers:{
      'Authorization':bearerToken
    }
  })
}
export const editJournalType = async(backend_url,bearerToken,id,name) =>{
  await fetch(backend_url+'/api/commons/journal?id='+id+'&name='+name, {
    method: 'PATCH',
    headers:{
      'Authorization':bearerToken
    }
  })
}
export const editStatsType = async(backend_url,bearerToken,id,name) =>{
  await fetch(backend_url+'/api/commons/stats?id='+id+'&name='+name, {
    method: 'PATCH',
    headers:{
      'Authorization':bearerToken
    }
  })
}
export const editSkillType = async(backend_url,bearerToken,id,name) =>{
  await fetch(backend_url+'/api/commons/skill?id='+id+'&name='+name, {
    method: 'PATCH',
    headers:{
      'Authorization':bearerToken
    }
  })
}
