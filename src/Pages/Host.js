import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Host.css';


var account = "0x64efC29cC6E3c5663e54C48A290A9321371C88a2";

export class Host extends Component {
    

    render() {
        return (
            <div>
            
          
           
            <form >
              <div className="container">
                
                
              <form >
        <label>
          Title  &nbsp;&nbsp;
          <input type="text"  />
        </label> <br/>
        <label>
          Budget
          <input type="text"  />
        </label> <br/>
        <label>
          Deadline
          <input type="text"  />
        </label>
        

       
       
      </form>
               
              </div>
            </form>
          </div>

  
        )
    }
}

export default Host
