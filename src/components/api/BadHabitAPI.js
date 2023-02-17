import axios from 'axios';

export const getBadHabits = async(backend_url,bearerToken,habitTypeName) =>{
    const res = await fetch(backend_url+'/api/badHabit?habitTypeName='+habitTypeName,{
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
  habitTypeName)=>{
      const res = await fetch(backend_url+'/api/badHabit/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,startDate,habitTypeName}),
        })
        const data = await res.json()
      return data     
    }

export const createChildBadHabit= async(backend_url,bearerToken,name,startDate,
      habitTypeName,parentBadHabitName)=>{
  const res = await fetch(backend_url+'/api/badHabit/child', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':bearerToken
        },
        body: JSON.stringify({name,startDate,habitTypeName,parentBadHabitName}),
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

export const addBadHabitDescription = async(backend_url,bearerToken,id,description)=>{
  await fetch(backend_url+'/api/badHabit/description', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,description}),
    })
}

export const deleteBadHabit = async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/badHabit?id='+id,{
        headers:{Authorization:bearerToken}
      })
}
