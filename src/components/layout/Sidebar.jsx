import React from 'react';
import {AiOutlineTransaction,AiFillShopping} from "react-icons/ai";
import {MdAccountBalance,MdAccountBalanceWallet,MdAddTask,MdAlarmAdd} from "react-icons/md";
import {BsFillJournalBookmarkFill,BsFilePersonFill, BsBookshelf, BsHddRack} from "react-icons/bs";
import {FaBars, FaMoneyBill, FaAdn, FaMoneyBillWave} from "react-icons/fa";
import {GiSkills,GiStairsGoal} from "react-icons/gi"
import { NavLink} from 'react-router-dom';
import { useState } from 'react';
import {BiCalendarMinus,BiLibrary} from "react-icons/bi";
import { BsGearWideConnected } from 'react-icons/bs';
import { ImBooks } from 'react-icons/im';


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
      path:"/skills",
      name:"Skill Trees",
      icon:<BiLibrary/>
    },
    {
      path:"/goals",
      name:"Goals",
      icon:<GiStairsGoal/>
    },
    {
      path:"/transactions",
      name:"Transactions",
      icon:<FaMoneyBillWave/>
    },
    {
      path:"/accounts",
      name:"Accounts",
      icon:<MdAccountBalanceWallet/>
    },
    {
      path:"/budget",
      name:"Budget",
      icon:<BsHddRack/>
    },
    {
      path:"/funds",
      name:"Funds",
      icon:<BsBookshelf/>
    },
    {
      path:"/criteria",
      name:"Criteria",
      icon:<BsHddRack/>
    },
    {
      path:"/ruleEngine",
      name:"Rule Engine",
      icon:<BsGearWideConnected/>
    },
    {
      path:"/topic",
      name:"Topic",
      icon:<ImBooks/>
    },
    {
      path:"/admin",
      name:"Configure",
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