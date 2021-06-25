pragma solidity ^0.5.1;
import "./2_ProjectPage.sol";


contract Project_List {

   address payable owner = msg.sender;
    uint public numOfProjects;
     Project public DeployedProject;
     uint a = 20 ;
     uint b =490;

    mapping (uint => address) public projects;

    event LogProjectCreated(uint id, string title, address addr, address creator);
    event LogContributionSent(address projectAddress, address contributor, uint amount);

    event LogFailure(string message);

    modifier onlyOwner {
        if (owner != msg.sender) revert();
        _;
    }
    
    constructor () public {
        owner = msg.sender;
        numOfProjects = 0;
    }

    /**
    * Create a new Project contract
    * [0] -> new Project contract address
    */
    function createProject(uint _fundingGoal, uint _deadline, string memory _title) public payable returns (Project projectAddress) {

        if (_fundingGoal <= 0) {
           emit LogFailure("Project funding goal must be greater than 0");
            revert();
        }

        if (block.number >= _deadline) {
          emit  LogFailure("Project deadline must be greater than the current block");
            revert();
        }

        Project p = new Project( msg.sender,_fundingGoal, _deadline, _title);
        DeployedProject = p;
        projects[numOfProjects] = address(p);
        numOfProjects++;
        emit LogProjectCreated(numOfProjects, _title,address(p), msg.sender);
        
        Project deployedProject = Project(address(p));
       
        deployedProject.getProject();
        return p;
    }
    
    
    /**
    * Allow senders to contribute to a Project by it's address. Calls the fund() function in the Project 
    * contract and passes on all value attached to this function call
    * [0] -> contribution was sent 
    */
    
/**
function contribute(address _projectAddress) public payable returns (bool successful) { 

        // Check amount sent is greater than 0
        if (msg.value <= 0) {
          emit  LogFailure("Contributions must be greater than 0 wei");
            revert();
        }

        Project deployedProject = Project(_projectAddress);

        // Check that there is actually a Project contract at that address
        if (deployedProject.fundingHub() == address(0)) {
        emit    LogFailure("Project contract not found at address");
            revert();
        }

        // Check that fund call was successful
     if (deployedProject.fund.value(msg.value)(msg.sender)) {
         emit  LogContributionSent(_projectAddress, msg.sender, msg.value);
            return true;
    } else {
            LogFailure("Contribution did not send successfully");
            return false;
        }
    } 
    
    */
    function GetProject(uint ProjIndex) public  returns (  string memory, uint, uint, address, uint, uint, uint, address  ) {
        Project LocalProjectObj ;
        address TargetedProjAddress;
        TargetedProjAddress = projects[ProjIndex];
        LocalProjectObj = Project(TargetedProjAddress);
        
        return (LocalProjectObj.getProject());
        
       // return (DeployedProject.getProject());
      
    }
    
function contribute(address _projectAddress) public payable returns (bool successful) { 

        // Check amount sent is greater than 0
        if (msg.value <= 0) {
           emit LogFailure("Contributions must be greater than 0 wei");
            revert();
        }

        Project deployedProject = Project(_projectAddress);

        // Check that there is actually a Project contract at that address
        if (deployedProject.fundingHub() == address(0)) {
          emit   LogFailure("Project contract not found at address");
            revert();
        }

        // Check that fund call was successful
        if (deployedProject.fund.value(msg.value)(msg.sender)) {
         emit   LogContributionSent(_projectAddress, msg.sender, msg.value);
            return true;
        } else {
         emit   LogFailure("Contribution did not send successfully");
            return false;
        }
    }
    
    
    function kill() public  onlyOwner {
        selfdestruct( owner);
    }

    /** 
    * Don't allow Ether to be sent blindly to this contract
    */
    function() external {
        revert();
    }
}


