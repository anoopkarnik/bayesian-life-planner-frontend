export const signup = async(backend_url,name,email,password,role) =>{
    const res = await fetch(backend_url+'/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name,email,password,role}),
    })
    const data = await res.json()
    return data
}

export const signin = async(backend_url,name,password) =>{
  const res = await fetch(backend_url+'/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name,password}),
  })
  const data = await res.json()
  return data
}

export const modifyPassword = async(backend_url,bearerToken,name,
  oldPassword,newPassword)=>{
  await fetch(backend_url+'/auth/changePassword', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({name,oldPassword,newPassword}),
    })
}