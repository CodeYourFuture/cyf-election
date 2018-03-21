// Importing the functions from what you did in part 1.

//  const {
//     candidatesObjToArray,
//     filterInvalidVoters,
//     runElection,
//     getWinner,
//     winnerMessage,
// } = require('./election'); 
function candidatesObjToArray(candidates) {
    var arrOfKeys = Object.keys(candidates);
    var arrOfCandidates = arrOfKeys.map(function (key) { return candidates[key] });
    return arrOfCandidates;
}
/**
 * 2 - Remove any voters who have voted for more than 2 people, or have voted for the same person twice.
*/
function filterInvalidVoters(allVoters) {
    const filteredByLength = allVoters.filter(item => item.votingCard.length < 3);
    const filteredByClash = filteredByLength.filter(item => item.votingCard[0] !== item.votingCard[1])
    return filteredByClash;
}
/**
 * 3 - Add up all the votes cast by the voting population. Note that for two adjacent votes in the vote array,
 * the right vote counts for half of the left vote.
 */
//refactored Version of runElection
function runElection(validVoters, candidates) {
    for (let i = 0; i < candidates.length; i++) {
        validVoters.forEach(function (item) {
            //console.log(can);
            if (item.votingCard[0] === i) {
                candidates[i].numVotes += 1
            }
            if (item.votingCard[1] === i)
                candidates[i].numVotes += 0.5;
        })
    }
    return candidates;
}
/**
 * 4 - After an election has been run, return the winner
 *
 * Desired return value: {name: "Tamara Faiza", age: 46, party: "Pizza Party", numVotes: 3}
 */
function getWinner(candidates) {
    candidates.sort(function(a,b) {return b.numVotes-a.numVotes})
    //check if two candidates have the same numVotes we have to return null-draw
        if (candidates[0].numVotes===candidates[1].numVotes) {return null;}
        return candidates[0]; //Hila Waraich won with 26.5 votes
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

/* 1 - Write a Voter class modelling a member of the population who votes in the election.
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
    constructor(name, age, party, votingCard) {
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
        //console.log(validVoters, "validVoters in class");
        this.candidates = candidates;
        this.winner = 'winner has not been chosen yet';
    }
    runElection() {

        this.candidates = runElection(this.validVoters, this.candidates)


    } getWinner() {
        //console.log("getwinner is getting called")
        this.winner = getWinner(this.candidates);

    } printWinnerMessage() {
        //console.log("this is bug message",this.winner)
        if (this.winner === null) { return "The election was a draw"; }
        return this.winner.name + " has won the election with " + this.winner.numVotes + " votes!";
    }
}
// Example of how the winner message can be printed.

/* 
fetch('http://www.mocky.io/v2/5a55224b2d000088425b1ed8')
    .then(function (response) { return response.json() })
    .then(function (json) { console.log(json); }) */

//list of Candidates
let listCan = document.querySelectorAll(".candidates li");
// listCan[0].textContent=candidates["1"].name;
// listCan[1].textContent=candidates["2"].name;
// listCan[2].textContent=candidates["3"].name;
// listCan[3].textContent=candidates["4"].name;

//listCan.forEach((item,i,candidates)=>item[i].textContent=candidates[i+1].name); //?????solved
listCan.forEach((item, i, listCan) => item.textContent = candidates[i + 1].name)
// for (let i = 0; i < listCan.length; i++) {
//     listCan[i].textContent = candidates[i + 1].name;
// }
//list of Voters
let listVote = document.querySelectorAll(".voters li");
listVote.forEach((item, i, listVote) => item.textContent = votingPopulation[i].name);

//run Election Buttun
let runButt = document.getElementById("runBut");
runButt.addEventListener("click", () => fetchElectionData().then(message=>alert(message)));

function fetchElectionData() {
    var data;
    //return 2;
     return fetch('https://s3-eu-west-1.amazonaws.com/lorenzomixedstuff/electionList.json').then(res => res.json()).then(function (jsonData) {
        data = jsonData;
        candidates = data.candidates.map(function (item) { return new Candidate(item.name, item.age, item.party, item.votingCard) });
        voters = data.voters;
        let allVoters = voters.concat(candidates);
        let validVoters = filterInvalidVoters(allVoters);

        let election = new Election(validVoters, candidates);
        election.runElection(); // Example of how runElection() can be called.
        election.getWinner(); //need to modify it so it becomes a sort only selects max numVotes
        var message = election.printWinnerMessage();
         return message;
    }
    )
}


