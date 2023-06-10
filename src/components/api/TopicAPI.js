import axios from 'axios';

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
  skillTypeName,topicTypeEnum,paragraph,items)=>{
    var res = null;

    if (topicTypeEnum==="TOPIC_PARAGRAPH"){
      res = await fetch(backend_url+'/api/topic/create', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,
            skillTypeName,topicTypeEnum,paragraph}),
        })
      }
    else if (topicTypeEnum==="TOPIC_URL"){
      res = await fetch(backend_url+'/api/topic/create', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':bearerToken
          },
          body: JSON.stringify({name,
            skillTypeName,topicTypeEnum,items}),
        })
      }
      else if (topicTypeEnum==="TOPIC_LIST"){
        res = await fetch(backend_url+'/api/topic/create', {
          method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':bearerToken
            },
            body: JSON.stringify({name,
              skillTypeName,topicTypeEnum,items}),
          })
        }
  }


export const updateTopicParagraph = async(backend_url,bearerToken,id,
  paragraph)=>{
  await fetch(backend_url+'/api/topic/updateParagraph', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,paragraph}),
    })
}

export const addTopicItem= async(backend_url,bearerToken,id,
  itemName)=>{
  await fetch(backend_url+'/api/topic/updateItem', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,itemName}),
    })
}

export const deleteTopicItem= async(backend_url,bearerToken,id,
  itemId)=>{
  await fetch(backend_url+'/api/topic/deleteItem', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,itemId}),
    })
}

export const deleteTopic= async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/topic/'+id,{
        headers:{Authorization:bearerToken}
      })
}
