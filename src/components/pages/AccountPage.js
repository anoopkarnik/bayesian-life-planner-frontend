import React,{useState,useEffect,useContext} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { getAccounts,getTotalAccountBalances,deleteAccount,
  createAccount,updateBalance } from '../api/AccountAPI';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { useAsyncError } from 'react-router-dom';
import { getTotalAccounts } from '../api/AdminAPI';
import AccountList from '../misc/Account/AccountList';
import TopBoxData from '../utils/TopBoxData';

const AccountPage = (props) => {

	
    const [accounts,setAccounts] = useState([]);
    const [accountOptions,setAccountOptions] = useState([]);
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);

    function chunkArray(arr, size) {
      var groupedArray = [];
      for(var i = 0; i < arr.length; i += size) {
        groupedArray.push(arr.slice(i, i+size));
      }
      return groupedArray ;
    }

    useEffect(() => {
        refreshAccountPage(config,'Bearer '+user.accessToken);
      }, []);

    const refreshAccountPage = async(backend_url,bearerToken) =>{
      const {accounts,accountOptions} = await getTotalAccounts(backend_url,bearerToken);
      const accountBalances = await getTotalAccountBalances(backend_url,bearerToken)
      setAccounts(accounts);
      setAccountOptions(accountBalances);
    }

    return (
      <div>
        <div className='row mt-3'>
			    {accountOptions.map((account)=>(
				    <div className='col-sm'>
					    <TopBoxData name={account.name} value={account.balance}/>
				    </div>))}
        </div>
        <div>
          {chunkArray(accounts, 3).map(accounts =>
            <div className="row mt-3">
              {accounts.map(account =>
                <div className="col-sm">
                  <AccountList account={account} refreshFunction={refreshAccountPage}/>
                </div>
              )}  
            </div>    
            )}
        </div>
      </div>
    );
}

export default AccountPage