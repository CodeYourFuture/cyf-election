/**
* CYF JS core 3 election project
*/

/**
 * 1 - Convert candidates object to array
 */
function candidatesObjToArray(candidates) {

    var arr = [];
    for(var item in candidates){
            arr.push(candidates[item]);
    }
    return arr;

}

/**
 * 2 - Remove any voters who have voted for more than 2 people, or have voted for the same person twice.
*/
function filterInvalidVoters(voters) {
    TrueVoters = voters.filter(function(voter) {
        for (var i = 0; i < voter.votingCard.length; i++) {
            if (voter.votingCard.length > 2 || voter.votingCard[i] === voter.votingCard[i + 1]) {
                return 0
            } else {
                return 1
            }
        }
    });
   return TrueVoters;
}
    

/**
 * 3 - Add up all the votes cast by the voting population. Note that for two adjacent votes in the vote array,
 * the right vote counts for half of the left vote.
 */
function runElection(Voters, candidates) {
    var castWeight = 1;
    for (var i = 0; i < Voters.length; i++) {
        var Cast = Voters[i].votingCard
        for (var j = 0; j < Cast.length; j++){
            if (Cast[j] === Cast[0]) {
                candidates[Cast[j]].numVotes += castWeight;
            } else {
                candidates[Cast[j]].numVotes += castWeight/2;
            }
        }
    }
    return candidates;
}


/**
 * 4 - After an election has been run, return the winner
 *
 * Desired return value: {name: "Tamara Faiza", age: 46, party: "Pizza Party", numVotes: 3}
 */
function getWinner(candidates) {
    var arr =[];
    for (var i = 1; i < 5; i++) {
        arr.push(candidates[i].numVotes);
    }
    var max = arr.reduce((a, b) =>Math.max(a, b));
    
    return candidates[arr.indexOf(max)+1];
      
        
       }
    
    

/**
 * 5 - Return a message including the name of the winner, and how many votes
 * he/she received
 */
function winnerMessage(winner) {
    if(winner === null){
        return "The election was a draw";
      } else {
        return winner.name + " has won the election with " + winner.numVotes + " votes!";
    }
}

// A sample population of a small number of voters, stored as an array
let votingPopulation = [
    {name: 'Jane Finnegan', age: 19, votingCard: [1,3]},
    {name: 'Norman Beracha', age: 35, votingCard: [3,4]},
    {name: 'Salome Kadek', age: 22, votingCard: [2,1,3]},
    {name: 'Wei Li', age: 19, votingCard: [1,2]},
    {name: 'Sam MacKinnon', age: 59, votingCard: [1,4]}
];

// The election candidates, stored as an object where each object key is the candidate ID, and the object
// value is the candidate object itself.
let candidates = {
    1: {name: 'Tamara Faiza', age: 46, votingCard: [1,1], party: 'Pizza Party', numVotes: 0},
    2: {name: 'Aylin Duke', age: 39, votingCard: [2,2], party: 'Foam Party', numVotes: 0},
    3: {name: 'Clay Roderick', age: 54, votingCard: [3,4], party: 'Flat Earth Party', numVotes: 0},
    4: {name: 'Nour al-Din', age: 32, votingCard: [4,3], party: 'Pizza Party', numVotes: 0}
};

let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

let validVoters = filterInvalidVoters(allVoters);

candidates = runElection(validVoters, candidates);

let winner = getWinner(candidates);

module.exports = {
  candidatesObjToArray,
  filterInvalidVoters,
  runElection,
  getWinner,
  winnerMessage
}

