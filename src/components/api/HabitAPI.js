import axios from 'axios';

export const getHabits = async(backend_url,bearerToken,habitTypeName,active) =>{
    const res = await fetch(backend_url+'/api/habit?habitTypeName='+habitTypeName+'&active='+active,{
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

export const createRootHabit= async(backend_url,bearerToken,name,startDate,
  timeOfDay,dueDate,every,scheduleType,habitTypeName,daysOfWeek,active)=>{
    if (scheduleType=="weekly"){
      const res = await fetch(backend_url+'/api/habit/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,startDate,
            timeOfDay,dueDate,every,scheduleType,habitTypeName,daysOfWeek,
          active}),
        })
        const data = await res.json()
      return data
    }
    else{
      const res = await fetch(backend_url+'/api/habit/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,startDate,
            timeOfDay,dueDate,every,scheduleType,habitTypeName,active}),
        })
        const data = await res.json()
      return data
      }
      
    }

export const createChildHabit= async(backend_url,bearerToken,name,startDate,
    timeOfDay,dueDate,every,scheduleType,habitTypeName,daysOfWeek,
    parentHabitName,active)=>{
    if (scheduleType=="weekly"){
          const res = await fetch(backend_url+'/api/habit/child', {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':bearerToken
              },
              body: JSON.stringify({name,startDate,
                timeOfDay,dueDate,every,scheduleType,habitTypeName,
                daysOfWeek, parentHabitName, active}),
            })
            const data = await res.json()
          return data
        }
        else{
          const res = await fetch(backend_url+'/api/habit/child', {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':bearerToken
              },
              body: JSON.stringify({name,startDate,
                timeOfDay,dueDate,every,scheduleType,habitTypeName,
              parentHabitName,active}),
            })
            const data = await res.json()
          return data
      }  
 }

export const completeHabit = async(backend_url,bearerToken,id)=>{
    await fetch(backend_url+'/api/habit?id='+id, {
        method: 'PATCH',
        headers:{
          'Authorization':bearerToken
        }
      })
}

export const modifyHabitParams= async(backend_url,bearerToken,id,
  name,startDate,description,active,hidden,completed,
  dueDate,timeTaken,streak,totalTimes,totalTimeSpent,timeOfDay)=>{
  await fetch(backend_url+'/api/habit/modifyParams', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,
        name,startDate,description,active,hidden,completed,
        dueDate,timeTaken,streak,totalTimes,totalTimeSpent,timeOfDay}),
    })
}

export const modifyHabitSchedule= async(backend_url,bearerToken,id,
  oldScheduleType,scheduleType,every,daysOfWeek)=>{
  await fetch(backend_url+'/api/habit/modifyScheduleType', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,oldScheduleType,
        scheduleType,every,daysOfWeek}),
    })
}

export const deleteHabit = async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/habit?id='+id,{
        headers:{Authorization:bearerToken}
      })
}
