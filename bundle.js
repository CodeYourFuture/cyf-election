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
	constructor(name, age, votingCard) {
		this.name = name
		this.age = age
		this.votingCard = votingCard
	}
}

/**
 * 2 - Write a Candidate class modelling a candidate in the election. Candidates are also voters (they can vote for themselves, or anyone else).
 * However they have some extra properties.
 */

class Candidate extends Voter {
	constructor(name, age, votingCard, party, id) {
		super(name, age, votingCard)
		this.party = party
		this.numVotes = 0
    this.id = id
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


//Include your votingPopulation array here.
let votingPopulation = [];

// Include your candidates array here.
let candidates = [];

let allVoters, validVoters,  election;

/*--------------------FETCHING DATA ---------------------------*/
const fetchElectionData = () => {
  return fetch("https://www.mocky.io/v2/5a55224b2d000088425b1ed8")
    .then(response => response.json())
    .then(data => addPeopleToElection(data))
    .then(getAllVoters)
    // .then(() => console.log(allVoters))
    .then(getValidVoters)
    // .then(() => console.log(validVoters))
    .then(createElection)
    .then(votersPopulation => addVoters(votingPopulation))
    .then(candPopulation => addCandidates(candidates))
    .then(goElection)
    .catch(err => console.log(err));
}


const addPeopleToElection = data => {
  data.voters.forEach(person => {
    votingPopulation.push(new Voter(person.name, person.age, person.votingCard));
  });
  data.candidates.forEach(person => {
    candidates.push(new Candidate(person.name, person.age, person.votingCard, person.party, person.id));
  });
}


const getAllVoters = () => {
  allVoters = votingPopulation.concat(candidates);
}

const getValidVoters = () => {
  validVoters = filterInvalidVoters(allVoters);
}

const createElection = () => {
  election = new Election(validVoters, candidates);
}



/* ---------------------------------- Add Data to HTML start -----------------------------------*/

// Add voters to Voters Table
const addVoters = votersPopulation => {
  let votersTable = document.querySelector(".vot-table .voters-table");

  for(let i = 0; i < votersPopulation.length; i++) {
    let votersTableRow = document.createElement("tr");

    let votersDataLeft = document.createElement("td");
    let votersTextLeft = document.createTextNode(i + 1);

    let votersDataRight = document.createElement("td");
    let votersTextRight = document.createTextNode(votersPopulation[i].name);

    votersDataLeft.classList.add("voters-table-left");
    votersDataRight.classList.add("voters-table-right");
    votersDataLeft.appendChild(votersTextLeft);
    votersDataRight.appendChild(votersTextRight);
    votersTableRow.appendChild(votersDataLeft);
    votersTableRow.appendChild(votersDataRight);

    votersTable.appendChild(votersTableRow);
  }
}

// Add candidates to Candidates Table
const addCandidates = candPopulation => {
  let candidatesTable = document.querySelector(".candidates-table .voters-table");

  for(const person in candPopulation) {
    let candidatesTableRow = document.createElement("tr");

    let candidatesDataLeft = document.createElement("td");
    let candidatesTextLeft = document.createTextNode(candPopulation[person].name);

    let candidatesDataRight = document.createElement("td");
    let candidatesTextRight = document.createTextNode(candPopulation[person].age);

    candidatesDataLeft.classList.add("voters-table-left");
    candidatesDataRight.classList.add("voters-table-right");
    candidatesDataLeft.appendChild(candidatesTextLeft);
    candidatesDataRight.appendChild(candidatesTextRight);
    candidatesTableRow.appendChild(candidatesDataLeft);
    candidatesTableRow.appendChild(candidatesDataRight);

    candidatesTable.appendChild(candidatesTableRow);
  }
}


/* ---------------------------------- Add Data to HTML end ------------------------------------*/


/* ----------- Run Election ----------- */
const goElection = () => {
  let runButton = document.querySelector(".run-button");
  let winnerParagraph = document.querySelector(".winner-message p");

  runButton.addEventListener("click", function handler() {
    election.runElection();
    winnerParagraph.innerHTML = election.printWinnerMessage();
    this.removeEventListener("click", handler);
  });
}


// let handler = () => {
//   election.runElection();
//   winnerParagraph.innerHTML = election.printWinnerMessage();
//   this.removeEventListener("click", handler);
// }
// runButton.addEventListener("click", handler);

fetchElectionData();



},{"./election":2}],2:[function(require,module,exports){
/**
* CYF JS core 3 election project
*/

/**
 * 1 - Convert candidates object to array
 */
function candidatesObjToArray(candidates) {
  return Object.keys(candidates).map(function (candidate) { return candidates[candidate]; });
}

/**
 * 2 - Remove any voters who have voted for more than 2 people, or have voted for the same person twice.
*/
function filterInvalidVoters(voters) {
  var correctVoter = voters.filter(function(voter){
    if(voter.votingCard.length <= 2){
      if(voter.votingCard[0] != voter.votingCard[1]){
        return voter;
      }
    }
  });
  return correctVoter;
}


/**
 * 3 - Add up all the votes cast by the voting population. Note that for two adjacent votes in the vote array,
 * the right vote counts for half of the left vote.
 */
function runElection(voters, candidates) {
  var voteScore = 1;

  voters.forEach(function(voter){
    for(var person = 1; person <= candidates.length; person++){
      if(voter.votingCard[0] === person){
        candidates[person -1].numVotes += voteScore;
      } else if(voter.votingCard[1] === person){
        candidates[person -1].numVotes += voteScore / 2;
      }
    }
  });
  
  return candidates;
}

/**
 * 4 - After an election has been run, return the winner
 *
 * Desired return value: {name: "Tamara Faiza", age: 46, party: "Pizza Party", numVotes: 3}
 */
function getWinner(candidates) {
  var arrOfVotes = Object.keys( candidates ).map(function ( key ) { return candidates[key].numVotes; });
  var maxVote = Math.max.apply( null, arrOfVotes );
  var winner = [];

  for (var property in candidates) {
    if(candidates[property].numVotes === maxVote){
      winner.push(candidates[property]);
    }
  }

  if(winner.length >= 2){
    return null;
  } else {
    return winner[0];
  }
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

},{}]},{},[1]);
