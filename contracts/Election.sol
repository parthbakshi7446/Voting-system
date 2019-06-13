pragma solidity ^0.5.0;

contract Election {
    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }

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
}