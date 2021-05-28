import Toolbar from "./components/Toolbar";



import React from 'react';








function App() {

  var Annex = " Budget";
  return (

    
    <div className="App">      
    <Toolbar/>   
    
 
      

    


    <form>
      <div className="ProjList">

      <label >Project 1 {Annex}<br></br><br></br><br></br></label>  
      <label >Project 2 {Annex}<br></br><br></br><br></br></label>  
      <label >Project 3 {Annex}<br></br><br></br><br></br></label>  
      <label >Project 4 {Annex}<br></br><br></br><br></br></label>  

      </div>
    </form> 
   
    
    </div>
  );
}



export default App;
