import axios from 'axios';

export const getTopicDescription = async(backend_url,bearerToken,topicId) =>{
  const res = await fetch(backend_url+'/api/topic/'+topicId,{
      method: 'GET',
      headers:{
        'Authorization':bearerToken
      }
    })
    if(res.status===200 | res.status===201){
      var data = await res.json()
    }
    else{
      var data={};
    }  
    return data
}

export const getTopic = async(backend_url,bearerToken,skillTypeName) =>{
    const res = await fetch(backend_url+'/api/topic?skillTypeName='+skillTypeName,{
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

export const createTopic = async(backend_url,bearerToken,name,
  skillTypeName,description)=>{
        await fetch(backend_url+'/api/topic/create', {
          method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':bearerToken
            },
            body: JSON.stringify({name,
              skillTypeName,description}),
          })
        }
  
export const addLinkToTopic = async(backend_url,bearerToken,topicId,name,url,
  manualSummary,aiSummary,transcript)=>{
  await fetch(backend_url+'/api/topic/addLink', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({topicId,name,url,manualSummary,aiSummary,transcript}),
    })
}

export const addSubTopicToTopic = async(backend_url,bearerToken,topicId,name,text)=>{
  await fetch(backend_url+'/api/topic/addSubTopic', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({topicId,name,text}),
    })
}


export const removeLinkFromTopic = async(backend_url,bearerToken,id,
  topicId)=>{
  await fetch(backend_url+'/api/topic/deleteLink', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,topicId}),
    })
}

export const removeSubTopicFromTopic = async(backend_url,bearerToken,id,
  topicId)=>{
  await fetch(backend_url+'/api/topic/deleteSubTopic', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,topicId}),
    })
}

export const modifyTopicParams = async(backend_url,bearerToken,id,
  name,summary,description)=>{
  await fetch(backend_url+'/api/topic/modifyParams', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,name,summary,description}),
    })
}

export const modifySubTopicParams = async(backend_url,bearerToken,id,
  name,text)=>{
  await fetch(backend_url+'/api/topic/subTopic/modifyParams', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,name,text}),
    })
}

export const modifyLinkParams = async(backend_url,bearerToken,id,
  name,url,manualSummary)=>{
  await fetch(backend_url+'/api/topic/link/modifyParams', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,name,url,manualSummary}),
    })
}

export const deleteTopic= async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/topic/'+id,{
        headers:{Authorization:bearerToken}
      })
}
