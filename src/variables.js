
export const url =() =>{
    var url = 'https://bayesian-life-planner-backend.anoopkarnik.net'
    // var url = 'http://localhost:8083'
    return url
}

export const credentials =() =>{
    var username = ''
    var password = 'password'
    return {username:username,password:password}
}

export const ruleEngineOptions= [
        {label:'Criteria',value:'Criteria'},
        {label:'Criteria Set',value:'Criteria Set'},
        {label:'Rule',value:'Rule'},
        {label:'Rule Set',value:'Rule Set'}
    ]
export const criteriaOptions = [
		{value:'TASK', label: 'Task'},
		{value:'HABIT', label:'Habit'},
		{value:'BAD_HABIT',label:'Bad Habit'},
		{value:'SKILL',label:'Skill'},
		{value:'STAT',label:'Stat'},
		{value:'ACCOUNT',label:'Account'},
		{value:'FUND',label:'Fund'},
        {value:'BUDGET',label:'Budget'}
	  ]

export const taskOptions = [
    { value: 'TASK_COMPLETED', label: 'Completed' }
]
export const habitOptions = [
    { value: 'HABIT_TOTAL_TIMES', label: 'Total Times' },
    { value: 'HABIT_STREAK', label: 'Streak' },
    { value: 'HABIT_TOTAL_TIME_SPENT', label: 'Total Time Spent' },
    { value: 'HABIT_TOTAL_TIME_WEEKLY', label: 'Total Times Weekly' },
    { value: 'HABIT_TOTAL_TIME_MONTHLY', label: 'Total Times Monthly' }
]
export const badHabitOptions = [
    { value: 'BAD_HABIT_WEEKLY', label: 'Weekly times repeated' },
    { value: 'BAD_HABIT_MONTHLY', label: 'Monthly times repeated' },
    { value: 'BAD_HABIT_YEARLY', label: 'Yearly times repeated' },
    { value: 'BAD_HABIT_LAST_TIME', label: 'Last time completed' }
]

export const statOptions = [
    { value: 'STAT_HIGHER_PREFERRED', label: 'Higher is acceptable' },
    { value: 'STAT_LOWER_PREFERRED', label: 'Lower is accepatable' }
]

export const skillOptions = [
    { value: 'SKILL_COMPLETED', label: 'Skill is Completed' },
    { value: 'SKILL_TOTAL_TIME_SPENT', label: 'Total time spent for skill' }
]

export const fundOptions = [
    { value: 'FUND_REACHED', label: 'Fund Reached' }
]

export const accountOptions = [
    { value: 'ACCOUNT_REACHED', label: 'Account Reached' }
]

export const budgetOptions = [
    { value: 'BUDGET_HIGHER_PREFERRED', label: 'Higher is acceptable' },
    { value: 'BUDGET_LOWER_PREFERRED', label: 'Lower is acceptable' }
]
