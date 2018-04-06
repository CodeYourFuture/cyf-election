/**
* CYF JS core 3 election project
*/

/**
 * 1 - Convert candidates object to array
 */
function candidatesObjToArray(candidates) {

  
    const Array = Object.values(candidates)

    return Array
//  const Array = Object.keys(candidates).map(i => candidates[i])   another way
// return Array


}

/**
 * 2 - Remove any voters who have voted for more than 2 people, or have voted for the same person twice.
*/
function filterInvalidVoters(allVoters) {

     return allVoters.filter(function (element){

        return element.votingCard.length <3 && element.votingCard[0] !== element.votingCard[1]
        
      });      
      }

/**
 * 3 - Add up all the votes cast by the voting population. Note that for two adjacent votes in the vote array,
 * the right vote counts for half of the left vote.
 */
function runElection(voters, candidates) {
           for (var i = 0; i < voters.length; i++) {
              for (var x = 1; x <= Object.values(candidates).length; x++) {
                   if (voters[i].votingCard[0] === x)
                       candidates[x].numVotes += 1;
                   if (voters[i].votingCard[1] === x)
                       candidates[x].numVotes += 0.5;
               };
           };
        
               return candidates;
        };
       




/**
 * 4 - After an election has been run, return the winner
 *
 * Desired return value: {name: "Tamara Faiza", age: 46, party: "Pizza Party", numVotes: 3}
 */
function getWinner(candidates) {
    var max = 0
    var min = 0
    var winner = {}
    
        for (var x = 1; x <= Object.values(candidates).length; x++) {
          
        if (candidates[x].numVotes>max){
            min = max;
            max = candidates[x].numVotes
            winner = candidates[x]
        }
  }
        if (min === max ){
            return null
        } else {
            return winner
        }
    }

    
/**
 * 5 - Return a message including the name of the winner, and how many votes
 * he/she received
 */
function winnerMessage(winner) {
    //'Tamara Faiza has won the election with 3.5 votes!'
   var message = winner.name + " has won the election with " + winner.numVotes + " votes!"
return message

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
    4: {name: 'Nour al-Din', age: 32, votingCard: [4,1], party: 'Pizza Party', numVotes: 0}
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

