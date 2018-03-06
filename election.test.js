const {
    candidatesObjToArray,
    filterInvalidVoters,
    runElection,
    getWinner,
    winnerMessage,
} = require('./election')

test('Convert candidates object to Array', () =>
    expect(candidatesObjToArray(candidates)).toEqual(
        Object.keys(candidates).map(candidate => candidates[candidate])
    ))

test('Remove invalid voters', () => {
    expect(filterInvalidVoters(allVoters)).toEqual([
        {name: 'Jane Finnegan', age: 19, votingCard: [1, 3]},
        {name: 'Norman Beracha', age: 35, votingCard: [3, 4]},
        {name: 'Wei Li', age: 19, votingCard: [1, 2]},
        {name: 'Sam MacKinnon', age: 59, votingCard: [1, 4]},
        {name: 'Clay Roderick', age: 54, votingCard: [3, 4], party: 'Flat Earth Party', numVotes: 0},
        {name: 'Nour al-Din', age: 32, votingCard: [4, 1], party: 'Pizza Party', numVotes: 0}
    ])
})

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
test('getWinner should return the winning candidate', () => {
    const candidatesAfterElection = {
        1: {name:"Tamara Faiza",age:46,votingCard:[1,1],party:"Pizza Party",numVotes:3.0},
        2: {name:"Aylin Duke",age:39,votingCard:[2,2],party:"Foam Party",numVotes:0.5},
        3: {name:"Clay Roderick",age:54,votingCard:[3,4],party:"Flat Earth Party",numVotes:3.0},
        4: {name:"Nour al-Din",age:32,votingCard:[4,1],party:"Pizza Party",numVotes:2.5}
    };

    expect(getWinner(candidatesAfterElection)).toEqual(null)
})

test('winnerMessage should return a message with the name of the winner and number of votes received', () => {
    const winner = {
        name: 'Tamara Faiza',
        age: 46,
        votingCard: [1, 1],
        party: 'Pizza Party',
        numVotes: 3.5,
    }
    expect(winnerMessage(winner)).toEqual(
        'Tamara Faiza has won the election with 3.5 votes!'
    )
})

const allVoters = [
    {name: 'Jane Finnegan', age: 19, votingCard:[1,3]},
    {name: 'Norman Beracha', age: 35, votingCard: [3,4]},
    {name: 'Salome Kadek', age: 22, votingCard: [2,1,3]},
    {name: 'Wei Li', age: 19, votingCard: [1,2]},
    {name: 'Sam MacKinnon', age: 59, votingCard: [1,4]},
    {name: 'Tamara Faiza', age: 46, votingCard: [1,1], party: 'Pizza Party', numVotes: 0},
    {name: 'Aylin Duke', age: 39, votingCard: [2,2], party: 'Foam Party', numVotes: 0},
    {name: 'Clay Roderick', age: 54, votingCard: [3,4], party: 'Flat Earth Party', numVotes: 0},
    {name: 'Nour al-Din', age: 32, votingCard: [4,1], party: 'Pizza Party', numVotes: 0}
];

// The election candidates, stored as an object where each object key is the candidate ID, and the object
// value is the candidate object itself.
const candidates = {
    1: {name: 'Tamara Faiza', age: 46, votingCard: [1,1], party: 'Pizza Party', numVotes: 0},
    2: {name: 'Aylin Duke', age: 39, votingCard: [2,2], party: 'Foam Party', numVotes: 0},
    3: {name: 'Clay Roderick', age: 54, votingCard: [3,4], party: 'Flat Earth Party', numVotes: 0},
    4: {name: 'Nour al-Din', age: 32, votingCard: [4,1], party: 'Pizza Party', numVotes: 0}
};
