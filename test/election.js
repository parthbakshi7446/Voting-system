var Election = artifacts.require("./Election.sol");

contract("Election", function(){

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
})