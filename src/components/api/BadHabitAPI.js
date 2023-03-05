import axios from 'axios';

export const getBadHabits = async(backend_url,bearerToken,habitTypeName,active) =>{
    const res = await fetch(backend_url+'/api/badHabit?habitTypeName='+habitTypeName+'&active='+active,{
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

export const createRootBadHabit= async(backend_url,bearerToken,name,startDate,
  badHabitTypeName,active)=>{
      const res = await fetch(backend_url+'/api/badHabit/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,startDate,badHabitTypeName,active}),
        })
        const data = await res.json()
      return data     
    }

export const createChildBadHabit= async(backend_url,bearerToken,name,startDate,
      badHabitTypeName,parentBadHabitName,active)=>{
  const res = await fetch(backend_url+'/api/badHabit/child', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':bearerToken
        },
        body: JSON.stringify({name,startDate,badHabitTypeName,
          parentBadHabitName,active}),
        })
  const data = await res.json()
  return data     
}

export const carriedOutBadHabit = async(backend_url,bearerToken,id)=>{
    await fetch(backend_url+'/api/badHabit?id='+id, {
        method: 'PATCH',
        headers:{
          'Authorization':bearerToken
        }
      })
}

export const modifyBadHabitParams = async(backend_url,bearerToken,id,
  name,startDate,description,active,hidden,completed,
  totalTimes)=>{
  await fetch(backend_url+'/api/badHabit/modifyParams', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,
        name,startDate,description,active,hidden,completed,
        totalTimes}),
    })
}

export const deleteBadHabit = async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/badHabit?id='+id,{
        headers:{Authorization:bearerToken}
      })
}
