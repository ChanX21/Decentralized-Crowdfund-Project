import './toolbar.css';
import React from 'react';
import Logo from '../Logo.png';



const toobar = props => {
        return (
                <header className='HeadTool'>
                <nav>
                <div className='toolbar'>
                       
                       <img src={Logo} alt="Logo" width="420"/>
                       
                </div>
                               
               </nav>
               
               <div className="Paragraph">
            

               </div>
               

                </header>
                
                
        )
}


export default toobar;
