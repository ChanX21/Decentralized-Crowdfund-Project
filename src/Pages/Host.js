import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Host.css';
import Project_List from '../abis/Project_List.json';







export class Host extends Component {
  


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
    const ProjList = new web3.eth.Contract(Project_List.abi, networkData.address)
    
  }
  
  constructor(props) {
    super(props);
    this.state = {
      Title : '',
      Budget :0,
      Deadline:0,
      NetID :0 ,
      account : ''
    };
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleChangeOnlyNumbers = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    if (!Number(val)) {
      alert("Only Number Allowed");
      return;
  }
  this.setState({
    [nam]: val
  });

   
  }
 
   
  mySubmitHandler = async (event) => {
    event.preventDefault();
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    
    const networkData =  Project_List.networks[networkId]
    this.setState({ NetID : networkId})
    const ProjList = new web3.eth.Contract(Project_List.abi, networkData.address)
    
   

  
   // const Proj = await ProjList.methods.createProject(700,399,'Great Project').send({from: this.state.account})
    const Proj2 = await ProjList.methods.createProject(this.state.Budget, this.state.Deadline,this.state.Title).send({from: this.state.account})
    
    
    alert("You are submitting To Host a Project " + this.state.Title +" " + this.state.Budget +" " + this.state.Deadline );
    
 }    
  
 



    render() {

    
     

        return (
            <div>
            
          
           
            
              <div className="container">
                
                
     <form onSubmit={this.mySubmitHandler} >
        <label>
          Title  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" name="Title"  onChange={this.handleChange} />
        </label> <br/>
        <label>
          Budget   &nbsp;&nbsp;&nbsp;&nbsp;
          <input  type="text" name="Budget" style={{left : '64px'}} onChange={this.handleChangeOnlyNumbers} />
        </label> <br/>
        <label>
          Deadline   &nbsp;&nbsp;
          <input  type="text" name="Deadline" style={{left : '56px'}} onChange={this.handleChangeOnlyNumbers} />
        </label>
       
        <input
        type='submit'
      />
       
       
      </form>
      
               
              </div>
            
          </div>

  
        )
    }
}

export default Host


/* Goals   &nbsp;&nbsp;
<input  type="text" name="Deadline" style={{left : '111px'}}  /><br/>
&nbsp;&nbsp;   <input  type="text" name="Deadline" style={{left : '192px'}}/>
</label> */