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
