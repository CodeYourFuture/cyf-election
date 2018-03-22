// // Importing the functions from what you did in part 1.
// const {
//     candidatesObjToArray,
//     filterInvalidVoters,
//     runElection,
//     getWinner,
//     winnerMessage,
// } = require('./election');
function candidatesObjToArray(candidates) {
    var arrayCandidates = Object.keys(candidates).map(function (key) {  // first method
        return candidates[key];
    });
    // var arrayCandidates = Object.values(candidates);   // second method
    return arrayCandidates;
};

function filterInvalidVoters(allVoters) {
    var arrayVoters = allVoters.filter(function (item) {
        if (item.votingCard.length < 3 && item.votingCard[0] !== item.votingCard[1]) {
            return item;
        };
    });
    return arrayVoters;
}

function runElection(voters, candidates) {
    for (var i = 0; i < voters.length; i++) {
        for (var j = 1; j <= Object.keys(candidates).length; j++) {
            if (voters[i].votingCard[0] === j)
                candidates[j].numVotes += 1;
            if (voters[i].votingCard[1] === j)
                candidates[j].numVotes += 0.5;
        };
    };
    return candidates;
};

function getWinner(candidates) {
    var winVotes = 0;
    var notWin = 0;
    var winner = {};
    Object.values(candidates).forEach(function (item) {
        if (item.numVotes >= winVotes) {
            notWin = winVotes;
            winVotes = item.numVotes;
            winner = item;
        };
    });
    if (notWin === winVotes) {
        return null
    } else {
        return winner
    };
};

function winnerMessage(winner) {
    var winner = getWinner(candidates)
    if (winner !== null) {
        var message = winner.name + " has won the election with " + winner.numVotes + " votes!";
        return message
    } else {
        return "The election was a draw"
    };
};

function createList(array) {        // Function to create list of Voters and Candidates
    var ul = document.createElement('ul');
    for (i = 0; i < array.length; i++) {
        var li = document.createElement("li");
        var textNode = document.createTextNode(array[i].name);
        li.appendChild(textNode);
        ul.appendChild(li);
        console.log(li);
    };
    document.body.appendChild(ul);
};

/**
 * 1 - Write a Voter class modelling a member of the population who votes in the election.
 */
class Voter {
    constructor(name, age, votingCard) {
        this.name = name,
            this.age = age,
            this.votingCard = votingCard
    };
};

/**
 * 2 - Write a Candidate class modelling a candidate in the election. Candidates are also voters (they can vote for themselves, or anyone else).
 * However they have some extra properties.
 */
class Candidate extends Voter {
    constructor(name, age, votingCard, party, numVotes) {
        super(name, age, votingCard);
        this.party = party;
        this.numVotes = 0;
    };
};

/**
 * 3 - Write an Election class which models the election.
 */
class Election {
    constructor(validVoters, candidates) {
        this.validVoters = validVoters;
        this.candidates = candidates;
        this.winner = '';
    };
    runElection() {
        this.candidates = runElection(this.validVoters, this.candidates)
    };
    getWinner() {
        this.winner = getWinner(this.candidates)
    };
    printWinnerMessage() {
        return winnerMessage(this.winner)
    };
};


// Include your votingPopulation array here.
let votingPopulation = [
    new Voter('Jane Finnegan', 19, [1, 3]),
    new Voter('Norman Beracha', 35, [3, 4]),
    new Voter('Salome Kadek', 22, [2, 1, 3]),
    new Voter('Wei Li', 19, [1, 2]),
    new Voter('Sam MacKinnon', 59, [1, 4])
];
// console.log(votingPopulation);
// Include your candidates object here.
let candidates = {
    1: new Candidate('Tamara Faiza', 46, [1, 1], 'Pizza Party'),
    2: new Candidate('Aylin Duke', 39, [2, 2], 'Foam Party'),
    3: new Candidate('Clay Roderick', 54, [3, 4], 'Flat Earth Party'),
    4: new Candidate('Nour al-Din', 32, [4, 1], 'Pizza Party')
};
// console.log(candidates);

let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

let validVoters = filterInvalidVoters(allVoters);

let election = new Election(validVoters, candidates);

election.runElection(); // Example of how runElection() can be called.

createList(votingPopulation);

createList(candidatesObjToArray(candidates));

var button = document.createElement('button');
button.setAttribute('id', 'run-election-btn');
var text = document.createTextNode('Run Election');
button.appendChild(text);
button.addEventListener('click', runElection);
document.body.appendChild(button);

console.log(election.printWinnerMessage()); // Example of how the winner message can be printed.
