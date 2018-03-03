class Voter {
    constructor(name, age, votingCard) {

        this.name = name;
        this.age = age;
        this.votingCard = votingCard;
    }
    valid() {
       return this.votingCard.length < 3 && this.votingCard[0] !== this.votingCard[1]
    }
}
module.exports = {
    Voter
}