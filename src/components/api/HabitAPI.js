import axios from 'axios';

export const getHabits = async(backend_url,bearerToken,userId,habitTypeName) =>{
    const res = await fetch(backend_url+'/api/habit?userId='+userId+'&habitTypeName='+habitTypeName,{
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

export const createHabit= async(backend_url,bearerToken,userId,name,startDate,
  timeTaken,dueDate,every,scheduleType,habitTypeName,daysOfWeek)=>{
    if (scheduleType=="weekly"){
      const res = await fetch(backend_url+'/api/habit', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({userId,name,startDate,
            timeTaken,dueDate,every,scheduleType,habitTypeName,daysOfWeek}),
        })
        const data = await res.json()
      return data
    }
    else{
      const res = await fetch(backend_url+'/api/habit', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({userId,name,startDate,
            timeTaken,dueDate,every,scheduleType,habitTypeName}),
        })
        const data = await res.json()
      return data
      }
      
    }

export const completeHabit = async(backend_url,bearerToken,id,userId)=>{
    await fetch(backend_url+'/api/habit?userId='+userId+'&id='+id, {
        method: 'PATCH',
        headers:{
          'Authorization':bearerToken
        }
      })
}

export const addHabitDescription = async(backend_url,bearerToken,id,description)=>{
  await fetch(backend_url+'/api/habit/description', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,description}),
    })
}

export const deleteHabit = async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/habit?id='+id,{
        headers:{Authorization:bearerToken}
      })
}
