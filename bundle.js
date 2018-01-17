(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Importing the functions from what you did in part 1.
const {
    candidatesObjToArray,
    filterInvalidVoters,
    runElection,
    getWinner,
    winnerMessage,
} = require('./election');

/**
 * 1 - Write a Voter class modelling a member of the population who votes in the election.
 */
class Voter {
	constructor(name,age,votingCard){
  	this.name = name;
    this.age = age;
    this.votingCard = votingCard;
  }

}
/**
 * 2 - Write a Candidate class modelling a candidate in the election. Candidates are also voters (they can vote for themselves, or anyone else).
 * However they have some extra properties.
 */

class Candidate extends Voter {
	constructor(name, age, votingCard, party, numVotes) {
		super(name, age, votingCard)
		this.party = party
		this.numVotes = 0
	}
}


/**
 * 3 - Write an Election class which models the election.
 */
class Election {
	constructor(validVoters, candidates) {
		this.validVoters = validVoters
		this.candidates = candidates
		this.winner = null
	}

	runElection() {
		this.candidates = runElection(this.validVoters, this.candidates);
		this.getWinner();
	}

	getWinner() {
		this.winner = getWinner(this.candidates);
	}

	printWinnerMessage() {
		return winnerMessage(this.winner);
	}
}




// Include your votingPopulation array here.
let votingPopulation = [
	new Voter('Jane Finnegan', 19, [1,3]), 
  new Voter('Norman Beracha', 35, [3,4]), 
  new Voter('Salome Kadek', 22, [2, 1, 3]), 
  new Voter('Wei Li', 19, [1,2]), 
  new Voter('Sam MacKinnon', 59, [1,4])
];

// Include your candidates object here.
let candidates = {
	1: new Candidate('Tamara Faiza', 46, [1,1], 'Pizza Party'),
	2: new Candidate('Aylin Duke', 39, [2,2], 'Foam Party'),
	3: new Candidate('Clay Roderick', 54, [3,4], 'Flat Earth Party'),
	4: new Candidate('Nour al-Din', 32, [4,1], 'Pizza Party')
}



let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

let validVoters = filterInvalidVoters(allVoters);

let election = new Election(validVoters, candidates);

election.runElection(); // Example of how runElection() can be called.

// console.log(election.printWinnerMessage()); // Example of how the winner message can be printed.




// adding voters and candidates





const addVoters = votingPop => {
  let votersTable = document.querySelector(".voting-table .voters-table");

  for(let voter = 0; voter < votingPop.length; voter++) {
    let votersTableRow = document.createElement("tr");

    let voterId = document.createElement("td");
    let votersIdTextNode = document.createTextNode(voter + 1);

    let votersName = document.createElement("td");
    let votersTextNode = document.createTextNode(votingPop[voter].name);

    
    voterId.appendChild(votersIdTextNode);
    votersName.appendChild(votersTextNode);
    votersTableRow.appendChild(voterId);
    votersTableRow.appendChild(votersName);

    votersTable.appendChild(votersTableRow);
  }
}
addVoters(votingPopulation);


// candidates
const addCandidates = allcandidates => {
  let candidatesTable = document.querySelector(".candidates-table .voters-table");

  for(const candid in allcandidates) {
    let candidTableRow = document.createElement("tr");
    let candidateName = document.createElement("td");
    let candidatesNameTextNode = document.createTextNode(allcandidates[candid].name);

    let candidatesAge= document.createElement("td");
    let candidatesAgeTextNode = document.createTextNode(allcandidates[candid].age);


    candidateName.appendChild(candidatesNameTextNode);
    candidatesAge.appendChild(candidatesAgeTextNode);
    candidTableRow.appendChild(candidateName);
    candidTableRow.appendChild(candidatesAge);

    candidatesTable.appendChild(candidTableRow);
  }
}
addCandidates(candidates);



/* ----------- Running the Election ----------- */

let runButton = document.querySelector(".run-button");
let winnerParagraph = document.querySelector(".winner-message p");

runButton.addEventListener("click", function listener() {
  election.runElection();
  winnerParagraph.innerHTML = election.printWinnerMessage();
  this.removeEventListener("click", listener);
});

},{"./election":2}],2:[function(require,module,exports){
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


},{}]},{},[1]);
