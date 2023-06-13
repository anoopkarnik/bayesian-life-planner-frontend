import axios from 'axios';

export const getAccount = async(backend_url,bearerToken,id) =>{
  const res = await fetch(backend_url+'/api/accounts/'+id,{
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

export const getAccounts = async(backend_url,bearerToken,accountTypeName) =>{
    const res = await fetch(backend_url+'/api/accounts?accountTypeName='+accountTypeName,{
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
      var data=[];
    }  
    return data
}

export const getTotalAccountBalances = async(backend_url,bearerToken) =>{
  const res = await fetch(backend_url+'/api/accounts/balances',{
    method: 'GET',
    headers:{
      'Authorization':bearerToken
    }
  })
  const data = await res.json()
  var names = new Array();
  var options = new Array();
  for(var j =0;j<data.length;j++){
    names.push(data[j]['name'])
    options.push(data[j])
  }
  return options
}


export const deleteAccount = async(backend_url,bearerToken,id) =>{
    await axios.delete(backend_url+'/api/accounts?id='+id,{
      headers:{Authorization:bearerToken}
    })
  }

export const createAccount = async(backend_url,bearerToken,name,balance,accountName,
    liquidity,freeLiquidity) =>{
    const res = await fetch(backend_url+'/api/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({name,balance,accountName,liquidity,
      freeLiquidity}),
    })
    const data = await res.json()
    return data
}

export const updateBalance = async(id,backend_url,bearerToken,balance) =>{
  await fetch(backend_url+'/api/accounts?id='+id+'&cost='+balance, {
    method: 'PATCH',
    headers:{
      'Authorization':bearerToken
    }
  })
}

export const modifyAccountParams= async(backend_url,bearerToken,id,
  createdAt,updatedAt,name,startDate,accountTypeName,description,
  balance,liquidity,freeLiquidity,active,hidden,completed,userId,
  nomineeName,maturityDate,stockCode,schemeCode)=>{
  await fetch(backend_url+'/api/accounts/modifyParams', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,
        createdAt,updatedAt,name,startDate,accountTypeName,description,
        balance,liquidity,freeLiquidity,active,hidden,completed,userId,
        nomineeName,maturityDate,stockCode,schemeCode}),
    })
}

export const modifyAccountTypeParams= async(backend_url,bearerToken,id,description) =>{
  await fetch(backend_url+'/api/commons/accounts/modifyParams', {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'Authorization':bearerToken
    },
    body: JSON.stringify({id,description}),
  })
}