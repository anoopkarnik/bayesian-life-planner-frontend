import React,{useState,useEffect, useContext} from 'react'
import {useNavigate } from 'react-router-dom';
import { ConfigContext } from '../../context/ConfigContext';
import { useAuth } from '../../context/UserContext';
import { signin } from '../api/AuthenticationAPI';
import { credentials } from '../../variables';
const SigninPage = (props) => {

  const navigate = useNavigate();

	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const {config} = useContext(ConfigContext);

    const [name, setName] = useState(credentials.username);
    const [password, setPassword] = useState(credentials.password);
	const {setUser} = useAuth();

    const onSubmit = async()=>{
		try{
      		const user = await signin(config,name,password)
	  		setUser(user);
	  		setLoggedIn(true);
      		navigate('/task');
		}
		catch{
			alert("Username/Password not found")
		}
    }
    const onSignup = async()=>{
      navigate('/signup');
    } 

  return (
    <div>
    <h3> Login </h3>
    <form className='text-center' onSubmit={onSubmit}>
			<div className='row'>
				<div className='col-sm'>
					<input
						required='required'
						Name='text'
						className='form-control'
						id='name'
						placeholder='Name'
						value={name}
						onChange={(event) => setName(event.target.value)}
					></input>
				</div>
      </div>
      <div className='row'>
				<div className='col-sm'>
					<input
						required='required'
						Name='text'
						type="password"
						className='form-control'
						id='password'
						placeholder='Password'
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					></input>
				</div>
      </div>
			<div className='row'>
				<div className='col-sm text-center'>
					<div onClick={onSubmit} className='btn btn-secondary mt-3'>
						Login
					</div >
				</div>
        <div className='col-sm text-center'>
					<div onClick={onSignup} className='btn btn-secondary mt-3'>
						Signup
					</div >
				</div>
			</div>
		</form>
		<br/>
		<h4>Select Existing Profiles</h4>
		<div className='col-sm'>
	<div className='btn btn-outline-dark  mt-3' onClick={()=>setName("God")}>
		 God</div>
	<div className='btn btn-outline-dark mt-3' onClick={()=>setName("HarryPotter")}>
		Harry Potter</div>
	<div className='btn btn-outline-dark  mt-3' onClick={()=>setName("MarkZuckerburg")}>
		Mark Zuckerburg</div>
	<div className='btn btn-outline-dark  mt-3' onClick={()=>setName("ARRahman")}>
		 AR Rahman</div>
	<div className='btn btn-outline-dark  mt-3' onClick={()=>setName("MichaelJackson")}>
		 Michael Jackson</div>
	<div className='btn btn-outline-dark  mt-3' onClick={()=>setName("GeorgeRRMartin")}>
		 George RR Martin</div>
	<div className='btn btn-outline-dark  mt-3' onClick={()=>setName("MotherTeresa")}>
		 Mother Teresa</div>
	<div className='btn btn-outline-dark  mt-3' onClick={()=>setName("APJAbdulKalam")}>
		 APJ Abdul Kalam</div>
	<div className='btn btn-outline-dark  mt-3' onClick={()=>setName("JackieChan")}>
		 Jackie Chan</div>
		 </div>
		 
    </div>
  )
}

export default SigninPage