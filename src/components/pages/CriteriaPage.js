import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';
import TopBoxData from '../utils/TopBoxData';
import CriteriaList from '../misc/RuleEngine/Criteria/CriteriaList';

const CriteriaPage = (props) => {

	
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);

    const criteriaOptions = [
      {value:'TASK', label: 'Task'},
      {value:'HABIT', label:'Habit'},
      {value:'BAD_HABIT',label:'Bad Habit'},
      {value:'SKILL',label:'Skill'},
      {value:'STAT',label:'Stat'},
      {value:'ACCOUNT',label:'Account'},
      {value:'FUND',label:'Fund'},
      {value:'BUDGET_PLAN',label:'Budget Plan'},
      {value:'TRANSACTION',label:'Transaction'},
      {value:'MONTHLY_BUDGET',label:'Monthly Budget'}
    ]

    function chunkArray(arr, size) {
      var groupedArray = [];
      for(var i = 0; i < arr.length; i += size) {
        groupedArray.push(arr.slice(i, i+size));
      }
      return groupedArray ;
    }


    return (
      chunkArray(criteriaOptions , 2).map(
        criteriaOptions  =>
          <div className="row mt-3">
            {criteriaOptions.map(record =>
              <div className="col-sm">
                <CriteriaList record={record}/>
              </div>
            )}
          </div>
      )
    );
}

export default CriteriaPage