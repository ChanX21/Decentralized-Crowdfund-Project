pragma solidity ^0.5.1;


contract basic_Crowdfund {
 
address public Creator ;  // The address of the creator of the smart contract
address[] public Approvers; // Approvers are the addresses of the backers and has voting powers
uint   public minimumContribution; // minimumContribution needed to become an approver
uint public Requirement = 0; // test variable


// below function is a constructor where the contract is initialised 

constructor (uint minimum) public {
    
          Creator = msg.sender;
          minimumContribution = minimum;
          
    
}


// below is the minimum contribute required to participate as a donor 


function contribute (uint contribution) public {
    
    require  (contribution > minimumContribution);
   Requirement = 1; //Simulation not actual money
   Approvers.push(msg.sender);
    
}





}