function runElection(validVoters, candidates) { 
    return candidates.map(item=>item.runElection()); //?map?????
}

function getWinner(candidates) {
    let winner = { numVotes: 0.0 };
    try {
        Object.values(candidates).forEach(function (item) {
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
const { Election } = require("./electionclass.js")
test('running the election should add votes to the candidates', () => {
    const validVoters = [
        {name: 'Jane Finnegan', age: 19, votingCard: [1,3]},
        {name: 'Norman Beracha', age: 35, votingCard: [3,4]},
        {name: 'Wei Li', age: 19, votingCard: [1,2]},
        {name: 'Sam MacKinnon', age: 59, votingCard: [1,4]},
        {name: 'Clay Roderick', age: 54, votingCard: [3,4], party: 'Flat Earth Party', numVotes: 0},
        {name: 'Nour al-Din', age: 32, votingCard: [4,1], party: 'Pizza Party', numVotes: 0}
    ]

    expect(runElection(validVoters, candidates)).toEqual({
        1: {name:"Tamara Faiza",age:46,votingCard:[1,1],party:"Pizza Party",numVotes:3.5},
        2: {name:"Aylin Duke",age:39,votingCard:[2,2],party:"Foam Party",numVotes:0.5},
        3: {name:"Clay Roderick",age:54,votingCard:[3,4],party:"Flat Earth Party",numVotes:2.5},
        4: {name:"Nour al-Din",age:32,votingCard:[4,1],party:"Pizza Party",numVotes:2.5}
    })
})

test('getWinner should return the winning candidate', () => {
    const candidatesAfterElection = {
        1: {name:"Tamara Faiza",age:46,votingCard:[1,1],party:"Pizza Party",numVotes:3.5},
        2: {name:"Aylin Duke",age:39,votingCard:[2,2],party:"Foam Party",numVotes:0.5},
        3: {name:"Clay Roderick",age:54,votingCard:[3,4],party:"Flat Earth Party",numVotes:2.5},
        4: {name:"Nour al-Din",age:32,votingCard:[4,1],party:"Pizza Party",numVotes:2.5}
    };

    expect(getWinner(candidatesAfterElection)).toEqual({
        name: 'Tamara Faiza',
        age: 46,
        votingCard: [1, 1],
        party: 'Pizza Party',
        numVotes: 3.5,
    })
})