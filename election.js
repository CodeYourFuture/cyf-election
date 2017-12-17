


let candidates = {
    1: {name: 'Tamara Faiza', age: 46, votingCard: [1,1], party: 'Pizza Party', numVotes: 0},
    2: {name: 'Aylin Duke', age: 39, votingCard: [2,2], party: 'Foam Party', numVotes: 0},
    3: {name: 'Clay Roderick', age: 54, votingCard: [3,4], party: 'Flat Earth Party', numVotes: 0},
    4: {name: 'Nour al-Din', age: 32, votingCard: [4,1], party: 'Pizza Party', numVotes: 0}
};

/**
 * 1 - Convert candidates object to array
 */
function candidatesObjToArray(candidates) {
return Object.keys(candidates).map(candidate => candidates[candidate]) // map the function with the parameter candidate and return candidates times candidate
}


function candidatesObjToArray(candidates) {
    var candidatesArr = Object.keys(candidates).map(function(x){return candidates[x]; });
   return candidatesArr;
   console.log(candidatesArr);
    
};
var canArr = candidatesObjToArray(candidates);
console.log(canArr[1]);
/**
 * 2 - Remove any voters who have voted for more than 2 people, or have voted for the same person twice.
*/

let votingPopulation = [
    {name: 'Jane Finnegan', age: 19, votingCard: [1,3]},
    {name: 'Norman Beracha', age: 35, votingCard: [3,4]},
    {name: 'Salome Kadek', age: 22, votingCard: [2,1,3]},
    {name: 'Wei Li', age: 19, votingCard: [1,2]},
    {name: 'Sam MacKinnon', age: 59, votingCard: [1,4]}
];

let allVoters = votingPopulation.concat(candidatesObjToArray(candidates)); 
function filterInvalidVoters(allVoters) {
       
    var voting = allVoters.filter(function(x){
        if( x.votingCard.length == 2 &&  
            x.votingCard[0] != x.votingCard[1]) {
                   return x;
               }
    });

       return voting;
}

function filterInvalidVoters(voters) {
   
//return Object.keys(voters).map(function 







 

/**
 * 3 - Add up all the votes cast by the voting population. Note that for two adjacent votes in 
 * the vote array,the right vote counts for half of the left vote.
 */
let validVoters = filterInvalidVoters(allVoters);
console.log(validVoters);

function runElection(validVoters, candidates) {
        
    for (var i = 0 ; i<validVoters.length;i++){
        var mona = validVoters[i].votingCard    
        for(var j =1 ; j<mona.length; j++){
            if(mona[0]= j){
                canArr[j-1].numVotes +=1
             }
             if(mona[1]= j) {
                canArr[j-1].numVotes +=0.5
            }
        } 

        // if(mona[0]=1){canArr[0].numVotes +=1}
        // else{ 
        //     if(mona[0]=2){canArr[1].numVotes +=1}
        // else{
        //     if(mona[0]=3){canArr[2].numVotes +=1}
        // else{
        //     if(mona[0]=4){canArr[3].numVotes +=1}
        // } console.log(canArr[0].numVotes);
        // }
        //  }
         
    }
    return candidates;
    
    }
   
    console.log(candidates);
    console.log(canArr[0]);
    console.log(canArr[0].name);
    console.log(canArr[0].numVotes);
    /**
/**
 * 4 - After an election has been run, return the winner
 *
 * Desired return value: {name: "Tamara Faiza", age: 46, party: "Pizza Party", numVotes: 3}
 */
function getWinner(candidates) {
     var maxVote = 0;
     var theWinner;
     for (var i = 1; i < canArr.length; i++) {
         if (candidates[i].numVotes > maxVote) {
             maxVote = candidates[i].numVotes;
             theWinner = candidates[i];
         }
     }
     return theWinner;
  }


/**
 * 5 - Return a message including the name of the winner, and how many votes
 * he/she received
 */
function winnerMessage(winner) {
    return theWinner.name + "has won in this election with " + theWinner.numVotes +"votes."
}

// A sample population of a small number of voters, stored as an array


// The election candidates, stored as an object where each object key is the candidate ID, and the object
// value is the candidate object itself.




let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));




 

candidates = runElection(validVoters, candidates);

let winner = getWinner(candidates);

module.exports = {
  candidatesObjToArray,
  filterInvalidVoters,
  runElection,
  getWinner,
  winnerMessage
};




