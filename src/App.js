import Toolbar from "./components/Toolbar";
import Web3 from 'web3';
import "./App.css";
import basic_Crowdfund from '../src/abis/basic_Crowdfund.json' //This path is not the default please find other ways => Update : Done 


import React, { Component } from 'react';


var Annex = "Project";




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
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = basic_Crowdfund.networks[networkId]
    
    

  }
   

  
  render() {
    return (
      <div>
        <div className="App">      
    <Toolbar/>   
    
 
      

    
    

    <form>
      <div className="ProjList">

      <label >Contract Name is "{basic_Crowdfund.contractName}"<br></br><br></br><br></br></label>  
      <label >Fundraising {Annex} 2 <br></br><br></br><br></br></label>  
      <label >Fundraising {Annex} 3 <br></br><br></br><br></br></label>  
      <label >Fundraising {Annex} 4 <br></br><br></br><br></br></label>  

      </div>
    </form> 
   
    
                    </div>
      </div>
    );
  }
}

export default App;



