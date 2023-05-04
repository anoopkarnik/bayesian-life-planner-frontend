import React,{useState,useEffect,useContext} from 'react'
import {useNavigate } from 'react-router-dom';
import { ConfigContext } from '../../context/ConfigContext';
import { UserContext } from '../../context/UserContext';
import { modifyPassword, modifyProfileParams } from '../api/AuthenticationAPI';

const ProfilePage = (props) => {

  const navigate = useNavigate();


  	const {user} = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const [oldPassword, setOldPassword] = useState('');
	const [newPassword1,setNewPassword1] = useState('');
	const [newPassword2,setNewPassword2] = useState('');
	const [showModifyPassword,setShowModifyPassword] = useState(false);
	const [showModifyParams, setShowModifyParams] = useState(false);
	const [panNo, setPanNo] = useState(user.panNo)

	const {config} = useContext(ConfigContext);

    const onSubmit = async()=>{
      await modifyPassword(config,'Bearer '+user.accessToken,name,
	  oldPassword,newPassword1)
	  setShowModifyPassword(false);
    } 

	const onSubmitParams = async()=>{
		await modifyProfileParams(config,'Bearer '+user.accessToken,panNo)
		setShowModifyParams(false);
	} 

  return (
    <div>
    <h3> Profile Page </h3>
	<b>User Name</b> - {name} <br/>
	<b>User Email</b> - {user.email} <br/>
	<b>User PAN No</b> - {panNo} <br/>
	<button className='btn btn-secondary mt-3' 
                onClick={()=>setShowModifyPassword(!showModifyPassword)}>Modify Password</button>
	<button className='btn btn-secondary mt-3' 
                onClick={()=>setShowModifyParams(!showModifyParams)}>Modify Profile</button>
    {showModifyParams?
		<form className='text-center' onSubmit={onSubmitParams}>			
		<div className='row'>
		  <div className='col-sm'>
			  <input
				  required='required'
				  Name='text'
				  className='form-control'
				  id='panNo'
				  placeholder='Pan No'
				  value={panNo}
				  onChange={(event) => setPanNo(event.target.value)}
			  ></input>
		  </div>
		</div>
		<div className='row'>
				<div className='col-sm text-center'>
					<div onClick={onSubmitParams} className='btn btn-secondary mt-3'>
						Update Profile
					</div >
				</div>
			</div>
  		</form>:null}
	{showModifyPassword?
		<form className='text-center' onSubmit={onSubmit}>			
      		<div className='row'>
				<div className='col-sm'>
					<input
						required='required'
						Name='text'
						type="password"
						className='form-control'
						id='oldPassword'
						placeholder='Current Password'
						value={oldPassword}
						onChange={(event) => setOldPassword(event.target.value)}
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
						id='newPassword1'
						placeholder='New Password'
						value={newPassword1}
						onChange={(event) => setNewPassword1(event.target.value)}
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
						id='newPassword2'
						placeholder='Confirm Password'
						value={newPassword2}
						onChange={(event) => setNewPassword2(event.target.value)}
					></input>
				</div>
      		</div>
			{newPassword1===newPassword2?
			<div className='row'>
				<div className='col-sm text-center'>
					<div onClick={onSubmit} className='btn btn-secondary mt-3'>
						Update Password
					</div >
				</div>
			</div>:
			<div className='row'>
				<div className='col-sm text-center'>
					passwords Don't Match
				</div>
			</div>}
		</form>:null}
    </div>
  )
}

export default ProfilePage;