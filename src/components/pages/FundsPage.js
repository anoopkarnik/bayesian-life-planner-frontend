import React,{useState,useEffect,useContext} from 'react'
import { getFunds,getFundSummary } from '../api/FundAPI';
import TopBoxData from '../misc/Fund/TopBoxData';
import FundItem from '../misc/Fund/FundItem';
import AddFundForm from '../misc/Fund/AddFundForm';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';

const FundsPage = (props) => {

	
    const [funds, setFunds] = useState([]);
    const [fundSummary, setFundSummary] = useState('');
    const [showAddFund, setShowAddFund] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const {config} = useContext(ConfigContext);


    useEffect(() => {
        refreshBudgetsPage(config,'Bearer '+user.accessToken);
      }, []);

const refreshBudgetsPage = async(backend_url,bearerToken) =>{
  var fund_list = await getFunds(config,'Bearer '+user.accessToken);
  var fund_summary = await getFundSummary(config,'Bearer '+user.accessToken);
  setFunds(fund_list)
  setFundSummary(fund_summary)

}

  return (
    <div>
      <div className='row mt-3'>
				<div className='col-sm'>
          <TopBoxData name="Portfolio Amount (in Rs)" value={fundSummary.totalAmount}/>
				</div>
        <div className='col-sm'>
          <TopBoxData name="Amount Available to invest in funds (in Rs)" value={fundSummary.amountAvailable}/>
				</div>
        <div className='col-sm'>
          <TopBoxData name="Amount Allocated in funds (in Rs)" value={fundSummary.amountAllocated}/>
				</div>
      </div>
      <div className='row mt-3'>
				<div className='col-sm'>
          <TopBoxData name="Financial Independence Amount (in Rs)" value={fundSummary.financialIndependenceAmount}/>
				</div>
        <div className='col-sm'>
          <TopBoxData name="Financial Independence Percentage" value={fundSummary.financialIndependencePercentage}/>
				</div>
        <div className='col-sm'>
          <TopBoxData name="Time left for Financial Independence (in years)" value={fundSummary.timeLeft}/>
				</div>
      </div>
      <h3 className='mt-3 text-center'>Funds</h3>
      <div className='row mt-3'>
				<div className='col-sm'>
        {funds.map((fund)=>(
					<FundItem item={fund}
          refreshFunction={refreshBudgetsPage} 
          backend_url={props.backend_url}/>
        ))}
				</div>
		  </div>
      <h3 onClick={()=>{setShowAddFund(!showAddFund)}} className='mt-3 text-center'><div className='btn btn-secondary btn-lg'>Add Fund</div></h3>
      {showAddFund?<AddFundForm backend_url={props.backend_url}/>:null}
    </div>
  )
}

export default FundsPage