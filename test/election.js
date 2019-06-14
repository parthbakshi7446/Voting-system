var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts){

    it("initializes with two candidates", function(){
        return Election.deployed().then(function(instance){
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count,2);
        })
    })

    it("intializes the values of the candidate", function(){
        return Election.deployed().then(function(instance){
            mainInstance=instance;
            return mainInstance.candidate_list(1);
        }).then(function(candi){
            assert.equal(candi[0],1,"id for candidate 1");
            assert.equal(candi[1],"candidate 1","name for candidate 1");
            assert.equal(candi[2],0,"votecount for candidate 1");
            return mainInstance.candidate_list(2);
        }).then(function(candi){
            assert.equal(candi[0],2,"id for candidate 1");
            assert.equal(candi[1],"candidate 2","name for candidate 1");
            assert.equal(candi[2],0,"votecount for candidate 1");
        })
    })

    it("allows a user to cast a vote", function(){
        return Election.deployed().then(function(instance){
            voteInstance=instance;
            candid=1;
            count=voteInstance.candidate_list(candid);
            return voteInstance.vote(candid,{from: accounts[0]})
        }).then(function(){
            return voteInstance.voter_list(accounts[0])
        }).then(function(voted){
            assert(voted,"voter is marked as voted")
            return voteInstance.candidate_list(candid)
        }).then(function(candidate){
            var count1=candidate[2];
            assert.equal(1,count1,"check increment of vote count");
        })
    })

    it("throws an exception for invalid candidates", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.vote(99, { from: accounts[1] })
        }).then(assert.fail).catch(function(error) {
          assert(error.message.toString().indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidate_list(1);
        }).then(function(candidate1) {
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidate_list(2);
        }).then(function(candidate2) {
          var voteCount = candidate2[2];
          assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
        });
      });

      it("throws an exception for double voting", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          candidateId = 2;
          electionInstance.vote(candidateId, { from: accounts[1] });
          return electionInstance.candidate_list(candidateId);
        }).then(function(candidate) {
          var voteCount = candidate[2];
          assert.equal(voteCount, 1, "accepts first vote");
          // Try to vote again
          return electionInstance.vote(candidateId, { from: accounts[1] });
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidate_list(1);
        }).then(function(candidate1) {
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidate_list(2);
        }).then(function(candidate2) {
          var voteCount = candidate2[2];
          assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
        });
      });
})