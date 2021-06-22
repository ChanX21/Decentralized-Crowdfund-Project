pragma solidity ^0.5.1;


contract Project {
 
  // The address of the creator of the smart contract
 
  struct ProjProp 
     
     
     {
        address payable creator;
        uint budget;
        uint deadline;
         string  title;
       
    }
    
  struct Contribution {
      
        uint amount;
        address contributor;
    }
    
    
 address public fundingHub;

    mapping (address => uint) public contributors;
    mapping (uint => Contribution) public contributions;

    uint public totalFunding;
    uint public contributionsCount;
    uint public contributorsCount;
   

    ProjProp public properties;

    event LogContributionReceived(address projectAddress, address contributor, uint amount);
    event LogPayoutInitiated(address projectAddress, address owner, uint totalPayout);
    event LogRefundIssued(address projectAddress, address contributor, uint refundAmount);
    event LogFundingGoalReached(address projectAddress, uint totalFunding, uint totalContributions);
    event LogFundingFailed(address projectAddress, uint totalFunding, uint totalContributions);

    event LogFailure(string message);
    

constructor  ( address payable _creator, uint _Budget , uint _deadline, string memory _title ) public {

        
        if (_Budget <= 0) {
          emit  LogFailure("Project funding goal must be greater than 0");
            revert();
        }
       
        if (block.number >= _deadline) {
          emit LogFailure("Project deadline must be greater than the current block");
            revert();
        }

//               if (int(_creator) >= 0) {
//           emit  LogFailure("Project must include a valid creator address");
//           revert();
 //      }

        fundingHub = msg.sender;
        
     


        
        properties = ProjProp({
            budget : _Budget,
            deadline: _deadline,
            title: _title,
            creator : _creator
        });

        totalFunding = 0;
        contributionsCount = 0;
        contributorsCount = 0;
    }
    
    modifier onlyFundingHub {
        if (fundingHub != msg.sender) revert();
        _;
    }

    modifier onlyFunded {
        if (totalFunding < properties.deadline) {
           revert();
        }
        _;
    }
    
    
    
       function getProject() public returns (string memory, uint, uint, address, uint, uint, uint, address ) {
        return (properties.title,
                properties.deadline,
                properties.budget,
                properties.creator,
                totalFunding,
                contributionsCount,
                contributorsCount,
                 address(this)
                );
    }
    
    function getContribution(uint _id) public returns (uint, address) {
        Contribution memory c = contributions[_id];
        return (c.amount, c.contributor);
    }

    
    function fund(address payable _contributor) public payable returns (bool successful) {

        // Check amount is greater than 0
        if (msg.value <= 0) {
         emit   LogFailure("Funding contributions must be greater than 0 wei");
           revert();
        }

        // Check funding only comes thru fundingHub
        if (msg.sender != fundingHub) {
         emit   LogFailure("Funding contributions can only be made through FundingHub contract");
          revert();
        }

        // 1. Check that the project dealine has not passed
        if (block.number > properties.deadline) {
          emit  LogFundingFailed(address(this), totalFunding, contributionsCount);
            if (!_contributor.send(msg.value)) {
              emit  LogFailure("Project deadline has passed, problem returning contribution");
               revert();
            } 
            return false;
        }

        // 2. Check that funding goal has not already been met
        if (totalFunding >= properties.deadline) {
           emit LogFundingGoalReached(address(this), totalFunding, contributionsCount);
            if (!_contributor.send(msg.value)) {
              emit  LogFailure("Project deadline has passed, problem returning contribution");
               revert();
            }
            payout();
            return false;
        }

        // determine if this is a new contributor
        uint prevContributionBalance = contributors[_contributor];

        // Add contribution to contributions map
        Contribution memory c = contributions[contributionsCount];
        c.contributor = _contributor;
        c.amount = msg.value;

        // Update contributor's balance
        contributors[_contributor] += msg.value;

        totalFunding += msg.value;
        contributionsCount++;

        // Check if contributor is new and if so increase count
        if (prevContributionBalance == 0) {
            contributorsCount++;
        }

      emit  LogContributionReceived(address(this), _contributor, msg.value);

        // Check again to see whether the last contribution met the fundingGoal 
        if (totalFunding >= properties.deadline) {
          emit  LogFundingGoalReached(address(this), totalFunding, contributionsCount);
            payout();
        }

        return true;
    }
    
    
     function payout() public payable onlyFunded returns (bool successful) {
        uint amount = totalFunding;

        // prevent re-entrancy
        totalFunding = 0;

        if (properties.creator.send(amount)) {
            return true;
        } else {
            totalFunding = amount;
            return false;
        }

        return true;
    }
    
      function refund() public payable returns (bool successful) {

        // Check that the project dealine has passed
        if (block.number < properties.deadline) {
          emit  LogFailure("Refund is only possible if project is past deadline");
           revert();
        }

        // Check that funding goal has not already been met
        if (totalFunding >= properties.deadline){
           emit LogFailure("Refund is not possible if project has met goal");
           revert();
        }

        uint amount = contributors[msg.sender];
        
        //prevent re-entrancy attack
        contributors[msg.sender] = 0;

        if (msg.sender.send(amount)) {
        emit    LogRefundIssued(address(this), msg.sender, amount);
            return true;
        } else {
            contributors[msg.sender] = amount;
         emit   LogFailure("Refund did not send successfully");
            return false;
        }
        return true;
    }



}