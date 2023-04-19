import React,{useState,useContext,useEffect} from 'react'
import AccountItem from './AccountItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';

import AddAccountForm from './AddAccountForm';
import { getAccounts } from '../../api/AccountAPI';

const AccountList = (props) => {

    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showAccount, setShowAccount] = useState(false);
    const [showAddAccount, setShowAddAccount] = useState(false);

    useEffect(() => {
      refreshAccount(config,'Bearer '+user.accessToken,props.account)
    }, []);

    const refreshAccount = async(backend_url,bearerToken,account) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getAccounts(config,bearerToken,props.account);
      setRecords(record);
      setShowAddAccount(false)

    }

    const onshowAddAccount = async() =>{
      setShowAddAccount(true);
    }
  
    const onHideAddAccount= async() =>{
      setShowAddAccount(false);
    }	


    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowAccount(!showAccount)} className='btn btn-secondary btn-lg'>{props.account}</h3>
      {showAccount?<>
      <div>
      {records.map((record) => (
          <AccountItem record={record} 
          refreshFunction={refreshAccount}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddAccount(!showAddAccount)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Account</div></h3>
      {showAddAccount?<AddAccountForm refreshFunction={refreshAccount} 
      name={props.account} open={showAddAccount} hide={onHideAddAccount}
       />:null}</>:null}
    </ul>
  )
}

export default AccountList;