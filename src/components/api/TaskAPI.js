import axios from 'axios';

export const getTask = async(backend_url,bearerToken,id) =>{
  const res = await fetch(backend_url+'/api/task/'+id,{
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

export const getTasks = async(backend_url,bearerToken,taskTypeName,active) =>{
    const res = await fetch(backend_url+'/api/task?taskTypeName='+taskTypeName+'&active='+active,{
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

export const createRootTask = async(backend_url,bearerToken,name,startDate,
  timeTaken,dueDate,every,scheduleType,taskTypeName,daysOfWeek,active)=>{
    if (scheduleType=="weekly"){
      const res = await fetch(backend_url+'/api/task/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,startDate,
            timeTaken,dueDate,every,scheduleType,taskTypeName,daysOfWeek,
          active}),
        })
        const data = await res.json()
      return data
    }
    else{
      const res = await fetch(backend_url+'/api/task/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,startDate,
            timeTaken,dueDate,every,scheduleType,taskTypeName,active}),
        })
        const data = await res.json()
      return data
      }
      
    }

export const createChildTask = async(backend_url,bearerToken,name,startDate,
      timeTaken,dueDate,every,scheduleType,taskTypeName,daysOfWeek,
      parentTaskName,active)=>{
        if (scheduleType=="weekly"){
          const res = await fetch(backend_url+'/api/task/child', {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':bearerToken
              },
              body: JSON.stringify({name,startDate,
                timeTaken,dueDate,every,scheduleType,taskTypeName,daysOfWeek,
                parentTaskName,active}),
            })
            const data = await res.json()
          return data
        }
        else{
          const res = await fetch(backend_url+'/api/task/child', {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':bearerToken
              },
              body: JSON.stringify({name,startDate,
                timeTaken,dueDate,every,scheduleType,taskTypeName,
                parentTaskName,active}),
            })
            const data = await res.json()
          return data
          }
          
        }
    

export const completeTask = async(backend_url,bearerToken,id)=>{
    await fetch(backend_url+'/api/task?id='+id, {
        method: 'PATCH',
        headers:{
          'Authorization':bearerToken
        }
      })
}

export const modifyTaskParams= async(backend_url,bearerToken,id,
  name,startDate,description,active,hidden,completed,
  dueDate,timeTaken)=>{
  await fetch(backend_url+'/api/task/modifyParams', {
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

export const modifyTaskSchedule= async(backend_url,bearerToken,id,
  scheduleType,every,daysOfWeek)=>{
  await fetch(backend_url+'/api/task/modifyScheduleType', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,
        scheduleType,every,daysOfWeek}),
    })
}

export const deleteTask = async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/task?id='+id,{
        headers:{Authorization:bearerToken}
      })
}