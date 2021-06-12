import './ProgressBar.css';
import React from 'react';



var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}



var PercentNum = 60;

var dynamicWidth = 648; // '1080' is the max

const toobar = props => {
        return (
                <header >
            
            <div id="myProgress">
                   <div id="myBar" style = {  { width : dynamicWidth }}> {PercentNum}%
              </div></div>

                </header>
                
                
        )
}


export default toobar;
