import Toolbar from "./components/Toolbar";
import Web3 from 'web3';
import "./App.css";
import basic_Crowdfund from '../src/abis/basic_Crowdfund.json' //This path is not the default please find other ways => Update : Done 
import React, { Component } from 'react';


var Annex = "Project";
var Contract = require('web3-eth-contract');




class App extends Component {

  

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    
    const networkData = basic_Crowdfund.networks[networkId]
    this.setState({ NetID : networkId})
    const basicCrowdfund = new web3.eth.Contract(basic_Crowdfund.abi, networkData.address)
    const Req = await basicCrowdfund.methods.Requirement().call()
    this.setState({Requirement : Req}) 
    //Just Trying out Contract Calls Please Check and If necessary delete it!


  }


  constructor(props) {
    super(props);
    this.state = {
      NeeetID : 22000,
      NetID : 0,
      Requirement : null
    };
  }
   

  
  render() {
    return (
      <div>
        <div className="App">      
    <Toolbar account={this.state.account}/>   
    
    <button  className="Host_Button" >Host</button>


    <form>
      <div className="ProjList">


       
      <label >Contract Name : "{basic_Crowdfund.contractName}"<br></br><br></br><br></br></label>  
      <label >The Network ID : {this.state.NetID} <br></br><br></br><br></br></label>  
      <label >'Requirement' State : {this.state.Requirement}  <br></br><br></br><br></br></label>  
      <label >Fundraising {Annex} List ID <br></br><br></br><br></br></label>  

      </div>
    </form> 
    
    
                    </div>
      </div>
    );
  }
}

export default App;




