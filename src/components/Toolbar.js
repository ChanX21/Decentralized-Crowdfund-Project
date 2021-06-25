import './toolbar.css';
import React from 'react';
import Logo from '../Logo.png';
import Identicon from 'identicon.js';
import { useHistory, Link } from 'react-router-dom';


// var account = "0x64efC29cC6E3c5663e54C48A290A9321371C88a2"; //hardcoded please change => Update Changed


const toobar = props => {
        return (
                <header className='HeadTool'>
                <nav>
               
                <div className='toolbar'>
                <Link to="/" >
                       <img src={Logo} alt="Logo" width="420"/>
                       </Link>      
                        <div className="AccountAlign">
                         <large >{props.account}</large>     
                              
                        </div>

                       
                       

                </div>
                
               </nav>
               
               <div className="Paragraph">
            

               </div>
               

                </header>
                
                
        )
}


export default toobar;
