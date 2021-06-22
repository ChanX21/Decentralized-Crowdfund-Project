import React, { Component ,  useCallback } from 'react'
import PropTypes from 'prop-types';
import ProgressBar from "../components/ProgressBar";
import { render } from 'react-dom';
import Project_List from '../abis/Project_List.json';
import {
    BrowserRouter as Router,
    useHistory,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  import ProjDetails from './ProjDetails';
  import App from '../App';
  import Web3 from 'web3';




var Array = [{ Title:"Project to Build a House ", id : 1},{ Title:"Need Construction Money", id : 2},{ Title:"Please Help", id : 3}];
var id = [1,2,3];
var ListArr = [];



export class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          NumProjs : 0,
          NumOfBlocks : 0
        };
      }
     
      
       
    

    render() {
        
        
        const List = this.props
        const ProjectListArray = this.props.List
         


    
        

      console.log(ProjectListArray)
      // console.log(List["Result"])

        const j=0;   
     
        return (
                   
           
       
     <div> 
                
                       
     <Link to="/Host" > <button  className="Host_Button"  >Host</button> </Link>
    
      <div className="ProjList">

      
     
     
       
               <ul>   

 
                   {ProjectListArray.map( (i) => {
                      return <Link to={"/"+i.id} style={{ textDecoration: 'none', color: 'black' }}><div className="ProjectListBox">
                             <p className="ProjLabel" >{i[0]} &ensp;&ensp;   Budget:{i[2]}&ensp;  Deadline:{i[1]} &ensp;</p>
                             <ProgressBar/>
                             
                            </div></Link>
                                   ;
                                  })}
    
                </ul>
                <label>{this.state.ProjectListArray}</label>

           </div>   
        <Switch>
         
        </Switch>
        
        </div>
        ) 

     
    } 
}



export default MainPage
