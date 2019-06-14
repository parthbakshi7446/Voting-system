pragma solidity ^0.5.0;

contract Election {
    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }
    mapping(address => bool) public voter_list;

    mapping(uint => Candidate) public candidate_list;

    uint public candidatesCount;

    constructor() public{
        addCandidate("candidate 1");
        addCandidate("candidate 2");
    }

    function addCandidate(string memory _name ) private {
        candidatesCount++;
        candidate_list[candidatesCount] = Candidate(candidatesCount,_name,0);

    }

    function vote (uint _candidateID) public {
        
        require(!voter_list[msg.sender]);
        require(_candidateID > 0 && _candidateID <= candidatesCount);

        voter_list[msg.sender] = true;

        candidate_list[_candidateID].voteCount ++;
    }

}

