import axios from 'axios';

export const getTasks = async(backend_url,bearerToken,taskTypeName) =>{
    const res = await fetch(backend_url+'/api/task?taskTypeName='+taskTypeName,{
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
  timeTaken,dueDate,every,scheduleType,taskTypeName,daysOfWeek)=>{
    if (scheduleType=="weekly"){
      const res = await fetch(backend_url+'/api/task/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,startDate,
            timeTaken,dueDate,every,scheduleType,taskTypeName,daysOfWeek}),
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
            timeTaken,dueDate,every,scheduleType,taskTypeName}),
        })
        const data = await res.json()
      return data
      }
      
    }

export const createChildTask = async(backend_url,bearerToken,name,startDate,
      timeTaken,dueDate,every,scheduleType,taskTypeName,daysOfWeek,
      parentTaskName)=>{
        if (scheduleType=="weekly"){
          const res = await fetch(backend_url+'/api/task/child', {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':bearerToken
              },
              body: JSON.stringify({name,startDate,
                timeTaken,dueDate,every,scheduleType,taskTypeName,daysOfWeek,
                parentTaskName}),
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
                timeTaken,dueDate,every,scheduleType,taskTypeName,parentTaskName}),
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