class Election {
    constructor(validVoters, candidates) {
        this.validVoters = validVoters;
        this.candidates = candidates;
        this.winner = 'winner has not been chosen yet';
    }
    runElection() {
        this.candidates = runElection(this.validVoters, this.candidates)

    } getWinner() {
        this.winner = getWinner(this.candidates);

    } printWinnerMessage() {
        if (this.winner === null) { return "The election was a draw"; }
        return this.winner.name + " has won the election with " + this.winner.numVotes + " votes!";
    }
}
module.exports = {
    Election
}