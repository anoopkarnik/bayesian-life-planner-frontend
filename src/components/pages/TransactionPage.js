import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { 
   getTransactions, createTransaction,deleteTransaction } from '../api/TransactionAPI';
import { getTotalAccounts,getTotalCategories,getTotalSubCategories,
  getTotalExpenses  } from '../api/AdminAPI';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';
import { getTotalTransactions } from '../api/AdminAPI';
import TransactionsList from '../misc/Transaction/TransactionsList';
import AddTransactionForm from '../misc/Transaction/AddTransactionForm';
import TopBoxData from '../utils/TopBoxData';
import TopMultiSelect from '../utils/TopMultiSelect';
import { getAccounts } from '../api/AccountAPI';
import DatePick from '../utils/DatePick';
import DateToString from '../utils/DateToString';
import {startOfWeek,endOfWeek,startOfMonth,endOfMonth,
startOfQuarter,endOfQuarter,startOfYear,endOfYear} from "date-fns";
import Multiselect from 'multiselect-react-dropdown';

const TransactionPage = (props) => {

  const totalExpenses = "Total Expenses (based on below displayed transactions)";
  const startDateKey = "Start Date";
  const endDateKey = "End Date";
  const [showAddTransaction,setShowAddTransaction] = useState(false)
  const [accountTypes, setAccountTypes] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [subCategoryTypes, setSubCategoryTypes] = useState([]);
  const [accountOptions, setAccountOptions] = useState([]);
  const [expenseOptions, setExpenseOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [dateFrom,setDateFrom] = useState('');
  const [dateTo,setDateTo] = useState('');
  const [transactions,setTransactions] = useState([]);
  const [expenses,setExpenses] = useState('');
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const timePeriods = [
    {value:'This Week',label:'This Week'},
    {value:'This Month',label:'This Month'},
    {value:'This Quarter',label:'This Quarter'},
    {value:'This Year',label:'This Year'}]

    useEffect(() => {
      refreshTransactionsPage(config,'Bearer '+user.accessToken);
    }, []);


  const refreshTransactionsPage = async(backend_url,bearerToken) =>{
    const {expenses,expenseOptions} = await getTotalExpenses(backend_url,bearerToken);
    const {accounts,accountOptions} = await getTotalAccounts(backend_url,bearerToken);
    const {categories,categoryOptions} = await getTotalCategories(backend_url,bearerToken);
    const {subCategories,subCategoryOptions} = await getTotalSubCategories(backend_url,bearerToken);
    var date = new Date()
    var dateFrom = DateToString(new Date())
    var dateTo = DateToString(new Date(date.setMonth(date.getMonth()+1)))
    setExpenseTypes(expenses);
    setAccountTypes(accounts);
    setCategoryTypes(categories);
    setSubCategoryTypes(subCategories);
    setExpenseOptions(expenseOptions);
    setAccountOptions(accountOptions);    
    setCategoryOptions(categoryOptions);    
    setSubCategoryOptions(subCategoryOptions);    
    setDateFrom(dateFrom);
    setDateTo(dateTo);
    await refreshTransactions(backend_url,bearerToken,expenses,accounts,
      categories,subCategories,dateFrom,dateTo)
  }


  const refreshTransactions = async(backend_url=config,bearerToken,
    expenses=expenseTypes,accounts=accountTypes,
    categories=categoryTypes,subCategories=subCategoryTypes,
    dateFrom=dateFrom,dateTo=dateTo)=>{
        const {expense,transactions} = await getTransactions(backend_url,
          bearerToken,expenses,accounts,categories,subCategories,
          dateFrom,dateTo)
          setExpenses(expense);
          setTransactions(transactions);
  };


  const handleTimePeriodChange = async(event) =>{
    if(event.target.value=="This Week"){
      setDateFrom(startOfWeek(new Date(),{weekStartsOn:1}));
      setDateTo(endOfWeek(new Date(),{weekStartsOn:1}))
      refreshTransactions(config,'Bearer '+user.accessToken,
      expenseTypes,accountTypes,categoryTypes,subCategoryTypes,
      startOfWeek(new Date(),{weekStartsOn:1}),
      endOfWeek(new Date(),{weekStartsOn:1}))
  
    }
    else if (event.target.value=="This Month"){
      setDateFrom(startOfMonth(new Date()));
      setDateTo(endOfMonth(new Date()))
      refreshTransactions(config,'Bearer '+user.accessToken,
      expenseTypes,accountTypes,categoryTypes,subCategoryTypes,
      startOfMonth(new Date()),endOfMonth(new Date()))
  
    }
    else if (event.target.value=="This Quarter"){
      setDateFrom(startOfQuarter(new Date()));
      setDateTo(endOfQuarter(new Date()))
      refreshTransactions(config,'Bearer '+user.accessToken,
      expenseTypes,accountTypes,categoryTypes,subCategoryTypes,
      startOfQuarter(new Date()),endOfQuarter(new Date()))
  
    }
    else if (event.target.value=="This Year"){
      setDateFrom(startOfYear(new Date()));
      setDateTo(endOfYear(new Date()))
      refreshTransactions(config,'Bearer '+user.accessToken,
      expenseTypes,accountTypes,categoryTypes,subCategoryTypes,
      startOfYear(new Date()),endOfYear(new Date()))  
    }
    console.log(dateTo);
    console.log(dateFrom);
  }

  const onSelectExpenseTypes = async(event)=>{
    const selectedValues = []
    for(let i =0;i<event.length;i++){
      selectedValues.push(event[i].name)
    }
    setExpenseTypes(selectedValues)
    refreshTransactions(config,'Bearer '+user.accessToken,
    selectedValues,accountTypes,categoryTypes,subCategoryTypes,
    dateFrom,dateTo)

  }

  const onSelectAccountTypes = async(event)=>{
    const selectedValues = []
    for(let i =0;i<event.length;i++){
      selectedValues.push(event[i].name)
    }
    setAccountTypes(selectedValues)
    refreshTransactions(config,'Bearer '+user.accessToken,
    expenseTypes,selectedValues,categoryTypes,subCategoryTypes,
    dateFrom,dateTo)

  }

  const onSelectCategoryTypes = async(event)=>{
    const selectedValues = []
    for(let i =0;i<event.length;i++){
      selectedValues.push(event[i].name)
    }
    setCategoryTypes(selectedValues)
    refreshTransactions(config,'Bearer '+user.accessToken,
    expenses,accountTypes,selectedValues,subCategoryTypes,
    dateFrom,dateTo)

  }

  const onSelectSubCategoryTypes = async(event)=>{
    const selectedValues = []
    for(let i =0;i<event.length;i++){
      selectedValues.push(event[i].name)
    }
    setSubCategoryTypes(selectedValues)
    refreshTransactions(config,'Bearer '+user.accessToken,
    expenseTypes,accountTypes,categoryTypes,selectedValues,
    dateFrom,dateTo)

  }



    return (
      <div>
      <div className='row mt-3'>
				<div className='col-sm'>
					<TopBoxData name={totalExpenses} value={expenses} />
				</div>
			</div>
      <h3 className='mt-3 text-center'>Transactions</h3>
      <div className='row mt-3'>
        <div className='col-sm'>
          <label>Expense Types</label>
          <Multiselect 
            options={expenseOptions} selectedValues={expenseOptions}
            onSelect={onSelectExpenseTypes} 
            onRemove={onSelectExpenseTypes} 
            displayValue="name" showCheckbox/>
        </div>
        <div className='col-sm'>
          <label>Account Types</label>
          <Multiselect 
            options={accountOptions} selectedValues={accountOptions}
            onSelect={onSelectAccountTypes} 
            onRemove={onSelectAccountTypes} 
            displayValue="name" showCheckbox/>
        </div>
        <div className='col-sm'>
          <label>Category Types</label>
          <Multiselect 
            options={categoryOptions} selectedValues={categoryOptions}
            onSelect={onSelectCategoryTypes} 
            onRemove={onSelectCategoryTypes} 
            displayValue="name" showCheckbox/>
        </div>
      </div>
      <div className='row mt-3'>
      <div className='col-sm'>
          <label>Sub Category Types</label>
          <Multiselect 
            options={subCategoryOptions} selectedValues={subCategoryOptions}
            onSelect={onSelectSubCategoryTypes} 
            onRemove={onSelectSubCategoryTypes} 
            displayValue="name" showCheckbox/>
        </div>
        <div className='col-sm'>
          <label>Time Period</label>
        <select required='required' onChange={handleTimePeriodChange} className='form-control'>
          <option value="" selected disabled hidden> Choose Time Period</option>
            {timePeriods.map((timePeriod)=>(
            <option value={timePeriod.value}>{timePeriod.label}</option>   
            ))}
        </select>
        </div>

      </div>
      <div className='row mt-3'>
				<div className='col-sm'>
					<TransactionsList name="Transactions" records={transactions} deleteFunction={deleteTransaction} 
          refreshFunction={refreshTransactions} 
          backend_url={props.backend_url} expenseTypes={expenseTypes} 
          accountTypes={accountTypes} categoryTypes={categoryTypes} 
          subCategoryTypes={subCategoryTypes}
          dateFrom={dateFrom} dateTo={dateTo}/>
				</div>
		  </div>
      <h3 onClick={()=>{setShowAddTransaction(!showAddTransaction)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Transaction</div></h3>
      {showAddTransaction?<AddTransactionForm createTransaction={createTransaction} backend_url={props.backend_url} expenseOptions={expenseOptions} accountOptions={accountOptions} categoryOptions={categoryOptions} subCategoryOptions={subCategoryOptions}/>:null}
    </div>
    );
}

export default TransactionPage