import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { UserContext } from './context/UserContext';
import SigninPage from './components/pages/SigninPage';
import SignupPage from './components/pages/SignupPage';
import { ConfigContext } from './context/ConfigContext';
import { ActiveContext } from './context/ActiveContext';
import React,{useEffect, useState} from 'react'
import Layout from './components/layout/Layout';
import AdminPage from './components/pages/AdminPage';
import TaskPage from './components/pages/TaskPage';
import HabitPage from './components/pages/HabitPage';
import JournalPage from './components/pages/JournalPage';
import StatsPage from './components/pages/StatsPage';
import BadHabitPage from './components/pages/BadHabitPage';
import SkillPage from './components/pages/SkillPage';
import GoalPage from './components/pages/GoalPage';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch } from '@mui/material';
import ProfilePage from './components/pages/ProfilePage';


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
	const [config,setConfig] = useState('http://localhost:8083')
  const [showActive,setShowActive] = useState(true);

	const setUserInfo = (data) =>{
		localStorage.setItem("user", JSON.stringify(data));
		setUser(data);
	}
  return (
    <BrowserRouter>
      <ConfigContext.Provider value={{config,setConfig}}>
        <ActiveContext.Provider value={{showActive,setShowActive}}>
        <UserContext.Provider value={{user,setUser: setUserInfo}}>
          <Layout>
          <FormGroup>
            <FormControlLabel control={<Switch defaultChecked onChange={()=>setShowActive(!showActive)} />} label="active" />
          </FormGroup>
            <Routes>
              <Route path="/" element={<SigninPage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/task" element={<TaskPage/>}/>
              <Route path="/habit" element={<HabitPage/>}/>
              <Route path="/badHabit" element={<BadHabitPage/>}/>
              <Route path="/journal" element={<JournalPage/>}/>
              <Route path="/stats" element={<StatsPage/>}/>
              <Route path="/skills" element={<SkillPage/>}/>
              <Route path="/goals" element={<GoalPage/>}/>
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/admin" element={<AdminPage/>}/>
            </Routes>
          </Layout>
        </UserContext.Provider>
        </ActiveContext.Provider>
      </ConfigContext.Provider>
    </BrowserRouter>
  );
}

export default App;
