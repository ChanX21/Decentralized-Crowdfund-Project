import React, { Component ,  useCallback } from 'react'
import PropTypes from 'prop-types';
import ProgressBar from "../components/ProgressBar";
import { useHistory, Link } from 'react-router-dom';
import { render } from 'react-dom';



var Array = ["Hello","Today","Nice"];
    
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
      <ul>   


      {Array.map( i => {
        return <div className="ProjectListBox">
        <p className="ProjLabel" >{i}</p>
        <ProgressBar/>
        </div>
        ;
      })}
    
     </ul>

         
            </div>
        ) 

     
    } 
}

export default MainPage
