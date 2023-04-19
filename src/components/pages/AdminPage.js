import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getTotalTasks,getTotalHabits,createTaskType,
  createHabitType,deleteTaskType,deleteHabitType,
  editTaskType,editHabitType,getTotalJournals,createJournalType,
  deleteJournalType,editJournalType,getTotalStats,createStatsType,
  editStatsType,deleteStatsType,getTotalSkills,createSkillType,
  editSkillType,deleteSkillType, getTotalGoals,createGoalType,
  editGoalType,deleteGoalType, getTotalBadHabits,editBadHabitType,
  createBadHabitType,deleteBadHabitType, getTotalAccounts, getTotalCategories, getTotalSubCategories, getTotalExpenses, createAccountType, deleteAccountType, editAccountType, createCategoryType, deleteCategoryType, editCategoryType, createSubCategoryType, deleteSubCategoryType, editSubCategoryType, createExpenseType, deleteExpenseType, editExpenseType
 } from '../api/AdminAPI';
import AdminList from '../misc/Admin/AdminList';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';

const AdminPage = (props) => {

    const [taskOptions, setTaskOptions] = useState([]);
    const [habitOptions,setHabitOptions] = useState([]);
    const [badHabitOptions,setBadHabitOptions] = useState([]);
    const [journalOptions, setJournalOptions] = useState([]);
    const [statsOptions, setStatsOptions] = useState([]);
    const [skillOptions,setSkillOptions] = useState([]);
    const [goalOptions,setGoalOptions] = useState([]);
    const [accountOptions,setAccountOptions] = useState([]);
    const [categoryOptions,setCategoryOptions] = useState([]);
    const [subCategoryOptions,setSubCategoryOptions] = useState([]);
    const [expenseOptions,setExpenseOptions] = useState([]);
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);


    useEffect(() => {
        refreshAdminPage(config,'Bearer '+user.accessToken);
      }, []);

    const refreshAdminPage = async(backend_url,bearerToken) =>{
      const {task,taskOptions} = await getTotalTasks(backend_url,bearerToken);
      const {habit,habitOptions} = await getTotalHabits(backend_url,bearerToken);
      const {journal,journalOptions} = await getTotalJournals(backend_url,bearerToken);
      const {stats,statsOptions} = await getTotalStats(backend_url,bearerToken);
      const {skill,skillOptions} = await getTotalSkills(backend_url,bearerToken);
      const {goal,goalOptions} = await getTotalGoals(backend_url,bearerToken);
      const {badHabits, badHabitOptions} = await getTotalBadHabits(backend_url,bearerToken);
      const {account,accountOptions} = await getTotalAccounts(backend_url,bearerToken);
      const {categories,categoryOptions} = await getTotalCategories(backend_url,bearerToken);
      const {subCategories,subCategoryOptions} = await getTotalSubCategories(backend_url,bearerToken);
      const {expenses,expenseOptions} = await getTotalExpenses(backend_url,bearerToken);
      setTaskOptions(taskOptions);  
      setHabitOptions(habitOptions);
      setJournalOptions(journalOptions);
      setStatsOptions(statsOptions);
      setSkillOptions(skillOptions);
      setGoalOptions(goalOptions);
      setBadHabitOptions(badHabitOptions);
      setAccountOptions(accountOptions);
      setCategoryOptions(categoryOptions);
      setSubCategoryOptions(subCategoryOptions);
      setExpenseOptions(expenseOptions);
    }


  
  return (
    <div>

      <div className='row mt-3'>
        <div className='col-sm'>
					<AdminList name="Task Types" records={taskOptions} 
          createFunction={createTaskType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteTaskType} editFunction={editTaskType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Habit Types" records={habitOptions} 
          createFunction={createHabitType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteHabitType} editFunction={editHabitType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Journal Types" records={journalOptions} 
          createFunction={createJournalType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteJournalType} editFunction={editJournalType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Stats Types" records={statsOptions} 
          createFunction={createStatsType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteStatsType} editFunction={editStatsType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Skill Types" records={skillOptions} 
          createFunction={createSkillType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteSkillType} editFunction={editSkillType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Goal Types" records={goalOptions} 
          createFunction={createGoalType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteGoalType} editFunction={editGoalType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Bad Habit Types" records={badHabitOptions} 
          createFunction={createBadHabitType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteBadHabitType} 
          editFunction={editBadHabitType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Account Types" records={accountOptions} 
          createFunction={createAccountType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteAccountType} 
          editFunction={editAccountType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Category Types" records={categoryOptions} 
          createFunction={createCategoryType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteCategoryType} 
          editFunction={editCategoryType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Sub Category Types" records={subCategoryOptions} 
          createFunction={createSubCategoryType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteSubCategoryType} 
          editFunction={editSubCategoryType}/>
				</div>
        <div className='col-sm'>
					<AdminList name="Expense Types" records={expenseOptions} 
          createFunction={createExpenseType} 
          refreshFunction={refreshAdminPage} 
          deleteFunction={deleteExpenseType} 
          editFunction={editExpenseType}/>
				</div>
		  </div>
    </div>
  )
}

export default AdminPage