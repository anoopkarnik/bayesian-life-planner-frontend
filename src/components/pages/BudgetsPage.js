import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import TopBoxPercentage from '../utils/TopBoxPercentage';
import { getBudgetPlans,createBudget,addIncome, getIncomes,deleteIncome } from '../api/BudgetAPI';
import BudgetList from '../misc/Budgets/BudgetList';
import AddBudgetForm from '../misc/Budgets/AddBudgetForm';
import { getTotalAccounts,getTotalCategories,getTotalExpenses,
  getTotalSubCategories} from '../api/AdminAPI';
import AddIncomeForm from '../misc/Budgets/AddIncomeForm';
import { UserContext } from '../../context/UserContext';
import IncomeItem from '../misc/Budgets/IncomeItem';
import { ConfigContext } from '../../context/ConfigContext';

const BudgetsPage = (props) => {

	
    const [budgetPlans, setBudgetPlans] = useState([]);
    const [accountOptions, setAccountOptions] = useState([]);
    const [expenseOptions, setExpenseOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [subAccountOptions, setSubAccountOptions] = useState([]);
    const [showAddBudget, setShowAddBudget] = useState(false);
    const [showAddIncome, setShowAddIncome] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const [incomes, setIncomes] = useState([])
    const {config} = useContext(ConfigContext);

    useEffect(() => {
        refreshBudgetsPage(config,'Bearer '+user.accessToken);
      }, []);

const refreshBudgetsPage = async(backend_url,bearerToken) =>{
  var budget_plans = await getBudgetPlans(config,'Bearer '+user.accessToken);
  var income = await getIncomes(config,'Bearer '+user.accessToken);
  const {expenses,expenseOptions} = await getTotalExpenses(config,'Bearer '+user.accessToken);
  const {accounts,accountOptions} = await getTotalAccounts(config,'Bearer '+user.accessToken);
  const {categories,categoryOptions} = await getTotalCategories(config,'Bearer '+user.accessToken);
  const {subCategories,subCategoryOptions} = await getTotalSubCategories(config,'Bearer '+user.accessToken);
  setBudgetPlans(budget_plans);
  setExpenseOptions(expenseOptions);
  setAccountOptions(accountOptions);    
  setCategoryOptions(categoryOptions);    
  setSubCategoryOptions(subCategoryOptions);    
  setIncomes(income);
}

  return (
    <div>
      <div className='row mt-3'>
      <h3 className='mt-3 text-center'>Budget Percentages</h3>
			{budgetPlans.map((budgetPlan)=>(
				<div className='col-sm'>
					<TopBoxPercentage refreshFunction={refreshBudgetsPage} name={budgetPlan.expenseName} value1={budgetPlan.transactionPercentage} 
          id={budgetPlan.id} value2={budgetPlan.planPercentage} />
				</div>
			))}
      <h3 className='mt-3 text-center'>Monthly Income</h3>
      <div className='row mt-3'>
      <ul className='list-group'>
        {incomes.map((income)=>
          <div className='col-sm'>
            <IncomeItem id={income.id} name={income.name} 
            deleteFunction={deleteIncome} income={income.income}
            refreshFunction={refreshBudgetsPage}/>
          </div>
        )}
      </ul>
				
		  </div>
      <h3 className='mt-3 text-center'>Budget</h3>
      <ul className='list-group'>
      {budgetPlans.map((budgetPlan)=>(
				<div className='row mt-3'>
					<BudgetList refreshFunction={refreshBudgetsPage} name={budgetPlan.expenseName} 
          value1={budgetPlan.transactionTotal} 
          value2={budgetPlan.planTotal} value3={budgetPlan.allottedTotal} 
          accountOptions={accountOptions}/>
				</div>
			))}
      </ul>
	  </div>
    <div className='row'>
      <div className='col-sm'></div>
      <div onClick={()=>{setShowAddBudget(!showAddBudget)}} className='mt-3 col-sm btn btn-secondary btn-lg'>Add Budget</div>
      <div className='col-sm'></div>
      <div onClick={()=>{setShowAddIncome(!showAddIncome)}} className='mt-3 col-sm btn btn-secondary btn-lg'>Add Monthly Income</div>
      <div className='col-sm'></div>
    </div>
    <div className='mt-3'></div>
      {showAddBudget?<AddBudgetForm createBudget={createBudget} expenseOptions={expenseOptions} accountOptions={accountOptions} categoryOptions={categoryOptions} subCategoryOptions={subCategoryOptions}/>:null}
      {showAddIncome?<AddIncomeForm createIncome={addIncome}/>:null}
    </div>
  )
}

export default BudgetsPage