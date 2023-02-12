import axios from 'axios';

export const getJournals = async(backend_url,bearerToken,userId,journalTypeName) =>{
    const res = await fetch(backend_url+'/api/journal?userId='+userId+'&journalTypeName='+journalTypeName,{
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

export const createJournal= async(backend_url,bearerToken,userId,name,
  journalTypeName,text,hidden)=>{

      const res = await fetch(backend_url+'/api/journal', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({userId,name,
            journalTypeName,text,hidden}),
        })
        const data = await res.json()
      return data
    }


export const addJournalDescription = async(backend_url,bearerToken,id,text)=>{
  await fetch(backend_url+'/api/journal/description', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,text}),
    })
}

export const deleteJournal = async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/journal?id='+id,{
        headers:{Authorization:bearerToken}
      })
}
