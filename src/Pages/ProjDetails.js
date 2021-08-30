
import React, { Component ,  useCallback } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProjDetails.css'
import {
    BrowserRouter as Router,
    useHistory,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  import App from '../App';
  import { render } from 'react-dom';
  import Project_List from '../abis/Project_List.json';



  
var NewHello2 = null ;
var ProjDetailsArray2 = [] ;




//Blockchain details fetch() 


export default class ProjDetails extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
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
    const ProjList = new web3.eth.Contract(Project_List.abi, networkData.address)
    
  }
  
  constructor(props) {
    super(props);
    this.state = {      
      Contribute :0,
      account : ''    
    };
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
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
  
   

   
    const Proj2 = await ProjList.methods.contribute(ProjDetailsArray2[NewHello2][7]).send({
      from: this.state.account, 
      value: this.state.Contribute
     })
.then(res => 
    console.log('Success', res))
.catch(err => console.log(err)) 
    
    
    alert("You are Contributing  " );
    
 }    
  
   
  
    render() {  



     
      const hello = window.location.href
      const NewHello = hello.slice(22)
      console.log(NewHello)
      NewHello2 = NewHello
      
        const Details = this.props
        const ProjDetailsArray = this.props.Details
        const idNumber = this.props

        ProjDetailsArray2 = ProjDetailsArray
       
        
        
        const percentage = (ProjDetailsArray[NewHello][4]/ProjDetailsArray[NewHello][2])*100
      
      return (
        <div>
        <div style={{position:'relative' ,width: '350px', height: '200px' ,top:'220px',left:'18%' }} > 
         <CircularProgressbar 
         styles={buildStyles({
           // Rotation of path and trail, in number of turns (0-1)
           rotation: 0.25,
       
           // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
           strokeLinecap: 'butt',
       
           // Text size
           textSize: '26px',
       
           // How long animation takes to go from one percentage to another, in seconds
           pathTransitionDuration: 0.5,
       
           // Can specify path transition in more detail, or remove it entirely
           // pathTransition: 'none',
           // pathColor: `rgba(0, 0, 0, ${percentage / 100})`,
           // Colors
           pathColor: `rgba(0, 0, 0, .8)`,
           textColor: 'black',
           trailColor: '#d6d6d6',
           backgroundColor: '#3e98c7',
         })}
         
         value={percentage} text={`${percentage}%`} />
         </div>

         <div className='TitleBox' > {ProjDetailsArray[NewHello][0]} </div>
         
        <label className='TitleText' style={{    position: 'relative',top: '-175px', left: '8%' }}></label>

       <div className='DetailsBox'> Budget: {ProjDetailsArray[NewHello][2]} &nbsp; <br/> 
        Deadline: {ProjDetailsArray[NewHello][1]} <br/>  Fund Raised: {ProjDetailsArray[NewHello][4]}   <br/> 
          Contract Address: <div className = "ContractName"> {ProjDetailsArray[NewHello][7]} </div>  <br/> Contributions: {ProjDetailsArray[NewHello][6]}
        <br/> <br/>Contract Owner: <div className = "ContractName">{ProjDetailsArray[NewHello][3]}</div> </div>
     

      

     <div className="ContributeButton">
     <form onSubmit={this.mySubmitHandler} >
        <label>
           <input  type="number" name="Contribute" className='ContributionInput'  onChange={this.handleChange} />
        </label>
       
        <input type='submit' className="Contributebutton2" value='Contribute' style={{left : '-166px' , width : '5%'}}
            />
       
       
      </form>
      


      </div> 

       {/* <label>ID: {id}</label> */}

     </div>

     
      )
    }
  }

