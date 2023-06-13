import axios from 'axios';

export const getStat = async(backend_url,bearerToken,id) =>{
  const res = await fetch(backend_url+'/api/stats/'+id,{
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

export const getStats = async(backend_url,bearerToken,statsTypeName) =>{
    const res = await fetch(backend_url+'/api/stats?statsTypeName='+statsTypeName,{
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

export const createRootStats= async(backend_url,bearerToken,name,
  statsTypeName,value,description,active)=>{

      const res = await fetch(backend_url+'/api/stats/root', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,
            statsTypeName,value,description,active}),
        })
        const data = await res.json()
      return data
    }

export const createChildStats= async(backend_url,bearerToken,name,
      statsTypeName,value,description,parentStatsName,active)=>{
    
          const res = await fetch(backend_url+'/api/stats/child', {
            method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization':bearerToken
              },
              body: JSON.stringify({name,
                statsTypeName,value,description,parentStatsName,active}),
            })
            const data = await res.json()
          return data
        }


export const modifyStatsParams = async(backend_url,bearerToken,id,
  name,startDate,description,active,hidden,completed,
  value)=>{
  await fetch(backend_url+'/api/stats/modifyParams', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,
        name,startDate,description,active,hidden,completed,
        value}),
    })
}
export const addStatsValue = async(backend_url,bearerToken,id,value)=>{
  await fetch(backend_url+'/api/stats/value', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,value}),
    })
}

export const deleteStats = async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/stats?id='+id,{
        headers:{Authorization:bearerToken}
      })
}
