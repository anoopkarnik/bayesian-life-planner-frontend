import React,{useState,useEffect, useContext} from 'react'
import {useNavigate } from 'react-router-dom';
import { ConfigContext } from '../../context/ConfigContext';
import { useAuth } from '../../context/UserContext';
import { signin } from '../api/AuthenticationAPI';

const SigninPage = (props) => {

  const navigate = useNavigate();

	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const {config} = useContext(ConfigContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
	const {setUser} = useAuth();


    const onSubmit = async()=>{
      const user = await signin(config,name,password)
	  setUser(user);
	  setLoggedIn(true);
      navigate('/task');
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
    </div>
  )
}

export default SigninPage