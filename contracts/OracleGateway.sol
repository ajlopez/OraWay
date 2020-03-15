pragma solidity >=0.5.0 <0.6.0;

contract OracleGateway {
    address public owner;
    mapping (bytes32 => bool) public topics;
    
    constructor() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function addTopic(bytes32 topic) public onlyOwner {
        topics[topic] = true;
    }
}

