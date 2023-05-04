import React,{useState,useContext,useEffect} from 'react'
import AccountItem from './AccountItem';
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';

import AddAccountForm from './AddAccountForm';
import { getAccounts } from '../../api/AccountAPI';
import AccountTypeDescription from './AccountTypeDescription';
import { FiExternalLink } from 'react-icons/fi';

const AccountList = (props) => {

    const {user} = useContext(UserContext);
    const [showDescription, setShowDescription] =useState(false);
    const {config} = useContext(ConfigContext);
    const [records, setRecords] = useState([]);
    const [showAccount, setShowAccount] = useState(false);
    const [showAddAccount, setShowAddAccount] = useState(false);

    useEffect(() => {
      refreshAccount(config,'Bearer '+user.accessToken,props.record.name)
    }, []);

    const refreshAccount = async(backend_url,bearerToken,account) =>{
      // await props.refreshFunction(backend_url,bearerToken,habit)
      const record = await getAccounts(config,bearerToken,props.record.name);
      setRecords(record);
      setShowAddAccount(false)

    }

    const onshowAddAccount = async() =>{
      setShowAddAccount(true);
    }
  
    const onHideAddAccount= async() =>{
      setShowAddAccount(false);
    }	

    const onShowDescription = async() =>{
      setShowDescription(true);
    }
  
    const onHideDescription = async() =>{
      setShowDescription(false);
    }	


    
  return (
    <ul className='list-group'>
      <h3 onClick={()=>setShowAccount(!showAccount)} className='btn btn-secondary btn-lg'>{props.record.name}&ensp;&ensp;<FiExternalLink size='1em' onClick={onShowDescription}/></h3>
			{
				showDescription?<AccountTypeDescription refreshFunction={props.refreshFunction}
				open={showDescription} hide={onHideDescription} 
				record={props.record}/>:null
			}
      {showAccount?<>
      <div>
      {records.map((record) => (
          <AccountItem record={record} 
          refreshFunction={refreshAccount}/>
      ))}</div>
       <h3 onClick={()=>{setShowAddAccount(!showAddAccount)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Account</div></h3>
      {showAddAccount?<AddAccountForm refreshFunction={refreshAccount} 
      name={props.record.name} open={showAddAccount} hide={onHideAddAccount}
       />:null}</>:null}
    </ul>
  )
}

export default AccountList;