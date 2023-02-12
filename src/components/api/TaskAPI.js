import axios from 'axios';

export const getTasks = async(backend_url,bearerToken,userId,taskTypeName) =>{
    const res = await fetch(backend_url+'/api/task?userId='+userId+'&taskTypeName='+taskTypeName,{
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

export const createTask = async(backend_url,bearerToken,userId,name,startDate,
  timeTaken,dueDate,every,scheduleType,taskTypeName,daysOfWeek)=>{
    if (scheduleType=="weekly"){
      const res = await fetch(backend_url+'/api/task', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({userId,name,startDate,
            timeTaken,dueDate,every,scheduleType,taskTypeName,daysOfWeek}),
        })
        const data = await res.json()
      return data
    }
    else{
      const res = await fetch(backend_url+'/api/task', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({userId,name,startDate,
            timeTaken,dueDate,every,scheduleType,taskTypeName}),
        })
        const data = await res.json()
      return data
      }
      
    }

export const completeTask = async(backend_url,bearerToken,id,userId)=>{
    await fetch(backend_url+'/api/task?userId='+userId+'&id='+id, {
        method: 'PATCH',
        headers:{
          'Authorization':bearerToken
        }
      })
}

export const addTaskDescription = async(backend_url,bearerToken,id,description)=>{
  await fetch(backend_url+'/api/task/description', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,description}),
    })
}

export const deleteTask = async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/task?id='+id,{
        headers:{Authorization:bearerToken}
      })
}

export const getSubTasks = async(backend_url,bearerToken,userId,taskId) =>{
  const res = await fetch(backend_url+'/api/subTask?userId='+userId+'&taskId='+taskId,{
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

export const createSubTask = async(backend_url,bearerToken,userId,name,startDate,
  timeTaken,dueDate,every,scheduleType,taskId,daysOfWeek)=>{
    if (scheduleType=="weekly"){
      const res = await fetch(backend_url+'/api/subTask', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({userId,name,startDate,
            timeTaken,dueDate,every,scheduleType,taskId,daysOfWeek}),
        })
        const data = await res.json()
        return data
    }
    else{
      const res = await fetch(backend_url+'/api/subTask', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({userId,name,startDate,
            timeTaken,dueDate,every,scheduleType,taskId}),
        })
        const data = await res.json()
        return data
      }

  }

export const completeSubTask = async(backend_url,bearerToken,id,userId)=>{
  await fetch(backend_url+'/api/subTask?userId='+userId+'&id='+id, {
      method: 'PATCH',
      headers:{
        'Authorization':bearerToken
      }
    })
}

export const addSubTaskDescription = async(backend_url,bearerToken,id,description)=>{
  await fetch(backend_url+'/api/subTask/description', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,description}),
    })
}

export const deleteSubTask = async(backend_url,bearerToken,id) =>{
  await axios.delete(backend_url+'/api/subTask?id='+id,{
      headers:{Authorization:bearerToken}
    })
}