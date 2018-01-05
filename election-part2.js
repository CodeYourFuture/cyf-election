// Importing the functions from what you did in part 1.
const {
    candidatesObjToArray,
    filterInvalidVoters,
    runElection,
    getWinner,
    winnerMessage,
} = require('./election');

/**
 * 1 - Write a Voter class modelling a member of the population 
 * who votes in the election.
 */
class Voter {
    constructor(name,age,votingCard){
        this.name = name;
        this.age = age;
        this.votingCard = votingCard
    }
}

let voter1 = new Voter('Jane Finnegan', 19, [1,3]);
let voter2 = new Voter('Norman Beracha', 35, [3,4]);
let voter3 = new Voter('Salome Kadek', 22, [2,1,3]);
let voter4 = new Voter('Wei Li', 19, [1,2]);
let voter5 = new Voter('Sam MacKinnon', 59, [1,4]);

/**
 * 2 - Write a Candidate class modelling a candidate 
 * in the election. Candidates are also voters (they 
 * can vote for themselves, or anyone else).
 * However they have some extra properties.
 */
var candidates = class Candidates {
    constructor(name,age,votingCard,party){
        this.name = name;
        this.age = age;
        this.votingCard = votingCard;
        this.party = party;
    }

}


/**
 * 3 - Write an Election class which models the election.
 */
var election = class Election{
    constructor(Voter,Condidate){
        this.Voter=Voter;
        this.Condidate=Candidates;
    }
}


// Include your votingPopulation array here.
let votingPopulation = [
    {name: 'Jane Finnegan', age: 19, votingCard: [1,3]},
    {name: 'Norman Beracha', age: 35, votingCard: [3,4]},
    {name: 'Salome Kadek', age: 22, votingCard: [2,1,3]},
    {name: 'Wei Li', age: 19, votingCard: [1,2]},
    {name: 'Sam MacKinnon', age: 59, votingCard: [1,4]}
];


// Include your candidates object here.
let candidates = {
    1: {name: 'Tamara Faiza', age: 46, votingCard: [1,1], party: 'Pizza Party', numVotes: 0},
    2: {name: 'Aylin Duke', age: 39, votingCard: [2,2], party: 'Foam Party', numVotes: 0},
    3: {name: 'Clay Roderick', age: 54, votingCard: [3,4], party: 'Flat Earth Party', numVotes: 0},
    4: {name: 'Nour al-Din', age: 32, votingCard: [4,1], party: 'Pizza Party', numVotes: 0}
};


let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

let validVoters = filterInvalidVoters(allVoters);

let election = new Election(validVoters, candidates);

election.runElection(); // Example of how runElection() can be called.

console.log(election.printWinnerMessage()); // Example of how the winner message can be printed.
