import axios from 'axios';

export const getBudget = async(backend_url,bearerToken,id) =>{
  const res = await fetch(backend_url+'/api/budget/'+id,{
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

export const getBudgetPlans = async(backend_url,bearerToken) =>{
    const res = await fetch(backend_url+'/api/budget/planAmount',{
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
export const getMonthlyBudget = async(expenseType,backend_url,bearerToken) =>{
  const res = await fetch(backend_url+'/api/budget/monthly?expenseType='+expenseType,{
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
export const createBudget = async(backend_url,bearerToken,name,cost,expenseName,
  categoryName,subCategoryName) =>{
  const res = await fetch(backend_url+'/api/budget/monthly', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':bearerToken
    },
    body: JSON.stringify({name,cost,expenseName,
      categoryName,subCategoryName}),
  })
  const data = await res.json()
  // refreshTransactionsPage();
  return data
}
export const deleteBudget = async(backend_url,bearerToken,id) =>{
  await axios.delete(backend_url+'/api/budget/monthly?id='+id,{
    headers:{Authorization:bearerToken}
  })
}
export const updateCost = async(id,backend_url,bearerToken,cost) =>{
await fetch(backend_url+'/api/budget/monthly?id='+id+'&cost='+cost, {
  method: 'PATCH',
  headers:{
    'Authorization':bearerToken
  }
})
}
export const addIncome = async(backend_url,bearerToken,name,income) =>{
  const res = await fetch(backend_url+'/api/transactions/income', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':bearerToken
    },
    body: JSON.stringify({name,income}),
  })
  const data = await res.json()
  // refreshTransactionsPage();
  return data
}
export const updatePlanPercentage= async(id,backend_url,bearerToken,planPercentage) =>{
  await fetch(backend_url+'/api/budget/plan?id='+id+'&plan_percentage='+planPercentage, {
    method: 'PATCH',
    headers:{
      'Authorization':bearerToken
    }
  })
  }

  export const getIncomes = async(backend_url,bearerToken) =>{
    const res = await fetch(backend_url+'/api/budget/income', {
      method: 'GET',
      headers: {
        'Authorization':bearerToken
      }
    })
    if(res.status===200 | res.status ===201){
      var data = await res.json()
    }
    else{
      var data=[];
    }
    return data
}

export const deleteIncome = async(backend_url,bearerToken,id) =>{
  await axios.delete(backend_url+'/api/budget/income?id='+id,{
    headers:{Authorization:bearerToken}
  })
}

export const modifyBudgetParams= async(backend_url,bearerToken,id,
  createdAt,updatedAt,name,startDate,categoryName,expenseName,
  subCategoryName,description,cost,active,hidden,completed,userId)=>{
  await fetch(backend_url+'/api/budget/modifyParams', {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':bearerToken
      },
      body: JSON.stringify({id,createdAt,updatedAt,name,startDate,
        categoryName,expenseName,
        subCategoryName,description,cost,active,hidden,completed,userId}),
    })
}