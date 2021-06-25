
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


const percentage = 90; //variable use in the future


//Blockchain details fetch() 


export default class ProjDetails extends Component {
   
  
    render() {

        const Details = this.props
        const ProjDetailsArray = this.props.Details
        const idNumber = this.props
        console.log(ProjDetailsArray)

      return (
        <div>
        <div style={{position:'relative' ,width: '350px', height: '200px' ,top:'270px',left:'18%' }} > 
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
           pathColor: `rgba(0, 0, 0, 1)`,
           textColor: 'black',
           trailColor: '#d6d6d6',
           backgroundColor: '#3e98c7',
         })}
         
         value={percentage} text={`${percentage}%`} />;
         </div>

         <div className='TitleBox'></div>

        <label className='TitleText' style={{    position: 'relative',top: '-175px', left: '8%' }}></label>
        
        

       {/* <label>ID: {id}</label> */}

     </div>
      )
    }
  }

