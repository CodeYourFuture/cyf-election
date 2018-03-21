function filterInvalidVoters(allVoters) {
    return allVoters.filter(item => item.valid())
}
const { Voter } = require("./voter")
test("return only valid voters",()=> {
    let votingPopulation = [
        new Voter('Jane Finnegan', 19, [1, 3]),
        new Voter('Norman Beracha', 35, [3, 4]),
        new Voter('Salome Kadek', 22, [2, 1, 3]),
        new Voter('Wei Li', 19, [1, 2]),
        new Voter('Sam MacKinnon', 59, [1, 4])
    ]
    expect(filterInvalidVoters(votingPopulation)).toEqual([
            new Voter('Jane Finnegan', 19, [1, 3]),
            new Voter('Norman Beracha', 35, [3, 4]),
            new Voter('Wei Li', 19, [1, 2]),
            new Voter('Sam MacKinnon', 59, [1, 4])]
    )
}
)
test('if it has a name', () => {
    let voter = new Voter("mahsa", "18", [1, 2, 3]);
    expect(voter.name).toEqual(
        "mahsa"
    )
})

test("if the voting card is valid",()=>{
    let voter=new Voter("mahsa", "18", [1, 2]);
    expect(voter.valid()).toEqual(true);
})
test("if the voting card is invalid",()=>{
    let voter=new Voter("mahsa", "18", [1, 2,3]);
    expect(voter.valid()).toEqual(false);
})