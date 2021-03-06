import Toolbar from "./components/Toolbar";
import ProgressBar from "./components/ProgressBar";
import Web3 from 'web3';
import "./App.css";
import Project_List from '../src/abis/Project_List.json';
import {Link, Switch, Route ,Router} from "react-router-dom";
import React, { Component } from 'react';
import Host from './Pages/Host';
import MainPage from './Pages/MainPage';
import ProjDetails from './Pages/ProjDetails';


var Annex = "Project";
var Contract = require('web3-eth-contract');
var Select = 0;


var ID = [1,2,3];

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
    const networkData =  Project_List.networks[networkId]
    this.setState({ NetID : networkId})
    const ProjList = new web3.eth.Contract(Project_List.abi , networkData.address)

    //To Get the block count in the Log
    console.log("This is a Marker :) ")
    const BlockCount = web3.eth.getBlock()
    console.log(BlockCount)
    var varb =0
    const promiseB = BlockCount.then(function(result) {
      varb = result.number;
      return result.number;
    });  


  
    
    const Req = await ProjList.methods.numOfProjects().call()
    
    for (var i=(Req-1); i>=0; i--) {
      const FundraisingProjects = await ProjList.methods.GetProject(i).call()
      FundraisingProjects.id = -( i - (Req-1))
      this.setState({
        ListOfProjects: [...this.state.ListOfProjects, FundraisingProjects]
      })
      
    }


    ID = this.state.ListOfProjects.id
   // const Proj = await ProjList.methods.createProject(700,399,'Great Project').send({from: this.state.account})
    //const Proj2 = await ProjList.methods.createProject(500,199,'Super Project').send({from: this.state.account})
    
    const Var2 = await ProjList.methods.GetProject(Select).call()
    
    this.setState({Block : varb}) 
    this.setState({NumOfProjects : Req}) 
   /*  this.setState({ProjectTitle : Var2[0]}) 
    this.setState({ProjectDeadline : Var2[1]}) 
    this.setState({ProjectBudget : Var2[2]})  */
    //Just Trying out Contract Calls Please Check and If necessary delete it!
    // Check Success !


  }


  constructor(props) {
    super(props);
    this.state = {
      NeeetID : 22000,
      NetID : 0,
      ListOfProjects :[],
      NumOfProjects : null,
      ProjectTitle : null,
      ProjectBudget : null,
      ProjectDeadline : null,
      Block : null
    };
  }
   

  
  render() {
    
    return (
      <div>
        <div className="App">    
        
          
      <Toolbar account={this.state.account}/>   
        <Switch>
           
            <Route exact path='/'  component={() => <MainPage List={this.state.ListOfProjects}  />}/> 
            <Route exact path='/Host' component={Host}/>             
            <Route exact path="/:ID" children={() => <ProjDetails Details={this.state.ListOfProjects} />} />
            
            
            </Switch>
            
            
            <br /> <br /> <br />  <br /> <br /> <br />
            <label>Number of Projects is {this.state.NumOfProjects}</label> <br/> 
            <label>Block Number : {this.state.Block}</label> <br/>

            
           
             
       </div>
      </div>
    );
  }
}

export default App;



