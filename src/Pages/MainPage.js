import React, { Component ,  useCallback } from 'react'
import PropTypes from 'prop-types';
import ProgressBar from "../components/ProgressBar";
import { useHistory, Link } from 'react-router-dom';
import { render } from 'react-dom';





    
export class MainPage extends Component {
 
    

    render() {
        
        
        
        return (
                   
           

     <div> 
                
                       
                 <Link to="/Host" > <button  className="Host_Button"  > Host</button> </Link>
    
      <div className="ProjList">

      
   {/*    <label >Contract Name : "{basic_Crowdfund.contractName}"<br></br><br></br><br></br></label>  
      <label >The Network ID : {this.state.NetID} <br></br><br></br><br></br></label>  
      <label >'Requirement' State : {this.state.Requirement}  <br></br><br></br><br></br></label>  
      <label >Fundraising {Annex} List ID <br></br><br></br><br></br></label>   */}
     
     
      </div>     
    <div className="ProjectListBox">
     <p className="ProjLabel" >Project 1</p>
     <ProgressBar/>
     </div>
    
     <div className="ProjectListBox">
     <p className="ProjLabel" >Project 2</p>
     <ProgressBar/>
     </div>

            </div>
        ) 

     
    } 
}

export default MainPage
