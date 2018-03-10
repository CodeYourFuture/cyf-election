// Importing the functions from what you did in part 1.
function candidatesObjToArray(candidates) {
    var arrOfKeys = Object.keys(candidates);
    var arrOfCandidates = arrOfKeys.map(function (key) { return candidates[key]; });
    return arrOfCandidates;
}
/**
 * 2 - Remove any voters who have voted for more than 2 people, or have voted for the same person twice.
*/
function filterInvalidVoters(allVoters) {
    return allVoters.filter(item => item.votingCard.length < 3 && item.votingCard[0] !== item.votingCard[1]
    )
}
/**
 * 3 - Add up all the votes cast by the voting population. Note that for two adjacent votes in the vote array,
 * the right vote counts for half of the left vote.
 */
//refactored Version of runElection
function runElection(validVoters, candidates) { 
    //console.log(validVoters,"validVoters")
    //console.log(candidates,"candidates")
    for (let i = 1; i < Object.values(candidates).length; i++) {
        validVoters.forEach(function (item) {
            if (item.votingCard[0] === i) {
                candidates[i].numVotes += 1
            }
            if (item.votingCard[1] === i)
             candidates[i].numVotes += 0.5;
        })
    }
    //console.log("after runElec",candidates)
    return candidates;
}
/**
 * 4 - After an election has been run, return the winner
 *
 * Desired return value: {name: "Tamara Faiza", age: 46, party: "Pizza Party", numVotes: 3}
 */
function getWinner(candidates) {
    let winner = { numVotes: 0.0 };
    try {
        Object.values(candidates).forEach(function (item) {
            /* console.log(item.name,item.numVotes);
            console.log(winner.name,winner.numVotes);
            console.log(); */
            if (item.numVotes == winner.numVotes) {
                throw "Duplicate";
            }
            else if (item.numVotes > winner.numVotes) {
                winner = item;
            }
        })
    } catch (error) {
        return null;
    }
    return winner;
}
/**
 * 5 - Return a message including the name of the winner, and how many votes
 * he/she received
 */
function winnerMessage(winner) {
    var winner = getWinner(candidates)
    if (winner !== null) {
        var mes = winner.name + " has won the election with " + winner.numVotes + " votes!";
        return mes;
    }
    else return "The election was a draw";
}
/* const {
    candidatesObjToArray,
    filterInvalidVoters,
    runElection,
    getWinner,
    winnerMessage,
} = require('./election'); */

/**
 * 1 - Write a Voter class modelling a member of the population who votes in the election.
 */
class Voter {
    constructor(name, age, votingCard) {
        this.name = name;
        this.age = age;
        this.votingCard = votingCard;
    }
}
let votingPopulation = [
    new Voter('Jane Finnegan', 19, [1, 3]),
    new Voter('Norman Beracha', 35, [3, 4]),
    new Voter('Salome Kadek', 22, [2, 1, 3]),
    new Voter('Wei Li', 19, [1, 2]),
    new Voter('Sam MacKinnon', 59, [1, 4])
]
/**
 * 2 - Write a Candidate class modelling a candidate in the election. Candidates are also voters (they can vote for themselves, or anyone else).
 * However they have some extra properties.
 */
class Candidate extends Voter {
    constructor(name, age, votingCard, party) {
        super(name, age, votingCard);
        this.party = party;
        this.numVotes = 0;
    }
}
let candidates = {
    1: new Candidate('Tamara Faiza', 46, 'Pizza Party', [1, 1]),
    2: new Candidate('Aylin Duke', 39, 'Foam Party', [2, 2]),
    3: new Candidate('Clay Roderick', 54, 'Flat Earth Party', [3, 4]),
    4: new Candidate('Nour al-Din', 32, 'Pizza Party', [4, 1])
}
/**
 * 3 - Write an Election class which models the election.
 */
class Election {
    constructor(validVoters, candidates) {
        this.validVoters = validVoters;
        this.candidates = candidates;
        this.winner = 'winner has not been chosen yet';
    }
    runElection() {
        //console.log("runElec is getting called");
        this.candidates = runElection(this.validVoters, this.candidates)
       // console.log("runElec is getting called after",this.candidates);

    } getWinner() {
        //console.log("getwinner is getting called")
        this.winner = getWinner(this.candidates);

    } printWinnerMessage() {
        //console.log("this is bug message",this.winner)
        if (this.winner === null) { return "The election was a draw"; }
        return this.winner.name + " has won the election with " + this.winner.numVotes + " votes!";
    }

}
// Include your votingPopulation array here.
//let votingPopulation = [];


// Include your candidates object here.
//let candidates = {};


let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

let validVoters = filterInvalidVoters(allVoters);

let election = new Election(validVoters, candidates);

election.runElection(); // Example of how runElection() can be called.
election.getWinner();
console.log(election.printWinnerMessage()); // Example of how the winner message can be printed.

/* window.onload = function () {
    candidateList=document.getElementsByClassName("candidates");
    updatehtml();

}
function updatehtml(){
    candidateList.
} */
/* 
fetch('http://www.mocky.io/v2/5a55224b2d000088425b1ed8')
    .then(function (response) { return response.json() })
    .then(function (json) { console.log(json); }) */

/* let listCan=document.querySelectorAll("candidates");
for (let i=0;i<candidatesObjToArray(candidates).length;i++){
    listCan.textContent = candidatesObjToArray(candidates)[i];
} */

