import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';
import RuleEngineList from '../misc/RuleEngine/RuleEngine/RuleEngineList';

const RuleEnginePage = (props) => {

	
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    
    return (
      <div>
        <div>
          <div className='row mt-3'>
            <div className="col-sm">
              <RuleEngineList name="Criteria Set"/>
            </div>
            <div className="col-sm">
            <RuleEngineList name="Rule"/>
            </div>
          </div>
          <div className='row mt-3'>
            <div className="col-sm">
            <RuleEngineList name="Rule Set"/>
            </div>
          </div>
        </div>
      </div>
    );
}

export default RuleEnginePage