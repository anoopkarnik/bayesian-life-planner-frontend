import React from 'react';
import {AiOutlineTransaction,AiFillShopping} from "react-icons/ai";
import {MdAccountBalance,MdAddTask,MdAlarmAdd} from "react-icons/md";
import {BsFillJournalBookmarkFill,BsFilePersonFill} from "react-icons/bs";
import {FaBars, FaMoneyBill, FaAdn} from "react-icons/fa";
import {GiSkills,GiStairsGoal} from "react-icons/gi"
import { NavLink} from 'react-router-dom';
import { useState } from 'react';
import {BiCalendarMinus,BiLibrary} from "react-icons/bi";


const Sidebar = ({children}) => {
  const [isOpen,setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen)
  const menuItem=[
    {
      path:"/task",
      name:"Tasks",
      icon:<MdAddTask/>
    },
    {
      path:"/habit",
      name:"Habits",
      icon:<MdAlarmAdd/>
    },
    {
      path:"/badHabit",
      name:"Bad Habits",
      icon:<BiCalendarMinus/>
    },
    {
      path:"/journal",
      name:"Journal",
      icon:<BsFillJournalBookmarkFill/>
    },
    {
      path:"/stats",
      name:"Stats",
      icon:<GiSkills/>
    },
    {
      path:"/skill",
      name:"Skill Trees",
      icon:<BiLibrary/>
    },
    {
      path:"/goals",
      name:"Goals",
      icon:<GiStairsGoal/>
    },
    {
      path:"/admin",
      name:"Admin",
      icon:<FaAdn/>
    }
  ]
  return (
    <div className='container'>
      <div style={{width:isOpen ?"300px":"50px"}} className="sidebar">
        <div className="top_section">
          <h1 style={{display:isOpen ? "block" : "none"}} className="logo">AKD</h1>
            <div style = {{marginLeft: isOpen ? "50px":"0px"}} className="bars">
              <FaBars onClick={toggle}/>
            </div>
        </div>
        {
          menuItem.map((item,index)=>(
            <NavLink style={{ textDecoration: 'none' }} to={item.path} key={index} className="link" 
            activeclassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{display:isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div><div className='col-2'></div>
      <div className='col-12'>
      <main>{children}</main>
      </div>
     


    </div>
  )
}

export default Sidebar