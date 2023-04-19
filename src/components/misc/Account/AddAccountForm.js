import React, { useState,useContext,useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { createAccount } from '../../api/AccountAPI';
import { ConfigContext } from '../../../context/ConfigContext';
import SlidingPane from "react-sliding-pane";



const AddAccountForm = (props) => {

	const [name, setName] = useState('');
	const [balance, setBalance] = useState('');
	const [liquidity, setLiquidity] = useState('');
	const [freeLiquidity, setFreeLiquidity] = useState('');
	const {user, setUser} = useContext(UserContext);
	const {config} = useContext(ConfigContext);

	const onSubmit =async() =>{
		await createAccount(config,'Bearer '+user.accessToken,name,balance,
			props.name,liquidity,freeLiquidity);
		props.refreshFunction(config,'Bearer '+user.accessToken)
	}

	return (
		<SlidingPane
        isOpen={props.open}
        className='' 
        overlayClassName="blur"
        title="Account Text"
		from="bottom"
        onRequestClose={props.hide}
        width="500px"
      >
		<form className='text-center'>
			<div className='row'>
				<div className='col-sm'>
					<input required='required' Name='name' className='form-control'
					id='name' placeholder='name' value={name} 
					onChange={(event) => setName(event.target.value)}></input>
				</div>
				<div className='col-sm'>
					<input required='required' Name='balance' className='form-control'
					id='balance' placeholder='balance' value={balance} 
					onChange={(event) => setBalance(event.target.value)}></input>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm'>
				<label for='Liquidity'></label>
                    <select required='required' onChange={(event) => setLiquidity(event.target.value)} className='form-control'>
						<option value="" selected disabled hidden> Partial Liquidity </option>
                        <option value="true">true</option>   
						<option value="false">false</option>
                    </select>
                </div>
				<div className='col-sm'>
				<label for='Liquidity'></label>
                    <select required='required' onChange={(event) => setFreeLiquidity(event.target.value)} className='form-control'>
						<option value="" selected disabled hidden> Full Liquidity </option>
                        <option value="true">true</option>   
						<option value="false">false</option>
                    </select>
                </div>
			</div>
			<div className='row'>
				<div className='col-sm text-center'>
					<div onClick={onSubmit} type='submit' className='btn btn-secondary mt-3'>
						Save
					</div>
				</div>
			</div>
		</form>
		</SlidingPane>
	);
};

export default AddAccountForm;