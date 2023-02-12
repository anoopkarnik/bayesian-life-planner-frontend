import React,{useState,useContext} from 'react'

import { useNavigate } from 'react-router-dom'
import {AiOutlineLogout} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";
import { UserContext } from '../../context/UserContext';
import { useConfig } from '../../context/ConfigContext';

const Topbar = () => {
  const navigate = useNavigate();
  const {user,setUser} = useContext(UserContext);

  const logout = async() =>{
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <div className='row'>
      <div className='col-sm'></div>
      <div className='col-sm'>
        <h1 className='mt-3 text-center'>Bayesian Life Planner</h1>
      </div>
      <div className='col-sm text-end'>
        <div><h2> {user.name}  <CgProfile/><AiOutlineLogout onClick={logout} data-toggle="tooltip" data-placement="top" title="Logout/Go to Signin Page"/></h2></div>
      </div>
    </div>
  )
}

export default Topbar