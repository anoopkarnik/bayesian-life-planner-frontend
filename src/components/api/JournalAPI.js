import axios from 'axios';

export const getJournal = async(backend_url,bearerToken,id) =>{
  const res = await fetch(backend_url+'/api/journal/'+id,{
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

export const getJournals = async(backend_url,bearerToken,journalTypeName) =>{
    const res = await fetch(backend_url+'/api/journal?journalTypeName='+journalTypeName,{
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

export const createJournal= async(backend_url,bearerToken,name,
  journalTypeName,text,hidden)=>{

      const res = await fetch(backend_url+'/api/journal', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,
            journalTypeName,text,hidden}),
        })
        const data = await res.json()
      return data
    }


export const modifyJournalParams = async(backend_url,bearerToken,id,
  name,startDate,description,active,hidden,completed,
  text)=>{
  await fetch(backend_url+'/api/journal/modifyParams', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,
        name,startDate,description,active,hidden,completed,
        text}),
    })
}

export const deleteJournal = async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/journal?id='+id,{
        headers:{Authorization:bearerToken}
      })
}
