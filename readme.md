# Code Your Future JS Core 3 Project

## Installation

Clone this repo using the command

`git clone https://github.com/CodeYourFuture/cyf-election.git`


## Introduction

After a recent referendum, London has gained independence from the rest of the UK. 
A snap election will be held in a month to decide who will be the leader of the new country.
You have been asked to implement an electronic voting system in javascript which allows the 
government to easily register voters into the system, filter out invalid votes and calculate who
the winning candidate is.

The three files you will be working on during this project are the following:

* `election.js` - Contains all of the functions required to carry out the election process. From part 2
onwards this file will be modularised into classes.
* `index.html` - Displays the election results. From part 2 onwards this file will also take user input.
* `voters.json` - The "real" voter data. This file will not appear until the election occurs at part 3.

In order to make the project more manageable, it has been broken down into three parts. They are outlined below.

* Part 1: write the functions required to carry out the election process, and allow the results
with a small amount of sample data to be displayed on a HTML page.
* Part 2: re-organise the functions into three classes: `Voter`, `Candidate` and `Election`, and improve
the voter validation process. Allow new voters to be inputted via a HTML page.
* Part 3 (election time): run the election on a large population stored as a JSON file.

### Voter Data Format

Have a look at the sample voter data provided in
`election.js`. You will notice that the voters are stored as an array of objects,
and that their voting card is an array of integers. Each integer in the `votingCard` array represents a
candidate id where each ID has double the weight of the ID on its right. 

So for example, if my `votingCard` array is `[1,3,2]` I cast 1 vote for candidate 1, I cast 0.5 votes for 
candidate 3 and 0.025 votes for candidate 2.

### Candidate Data Format

Now look at the sample candidate data. Like the voter data, each candidate is stored as an object
but with some different properties. You should also notice that unlike the voter data which is stored as
an *array of objects*, the candidate data is stored as an *object containing objects*. Each object
key represents the ID of the candidate. For example the candidate *Tamara Faiza* has candidate ID 1.

The `numVotes` property in each candidate object represents the number of votes that candidate received in the election.
When a new instance of a candidate is created, their `numVotes` property should always be 0.

---------------------------------------

## Part 1

### Exercise 1

Candidates should also be able to vote in the election, however right now the format of `candidates` isn't such 
that we can just concatenate it onto the `votingPopulation` array. 

Write a function `candidatesObjToArray` which takes
the `candidates` object as input, and returns an array of candidates which can be joined onto `votingPopulation`.

> Hint: You might find the `map` function useful.

### Exercise 2

Before we worry about how to calculate the election results, we need to introduce some
definition of an invalid voting card. Right now we regard a voting card as invalid if it
contains more than two votes, or contains multiple votes for the same candidate.

Write a function `filterInvalidVoters` which
removes any voters who have voted for more than 2 people, or have voted for the same person twice.
This function should input the `allVoters` array, and return an array containing only valid voters.

### Exercise 3

Right now all candidates have `numVotes` set to 0. Write a function `runElection` which takes the `votingPopulation` and
`candidates` as arguments. The function should change the `numVotes` property of each candidate based on the voting cards
of the voters, and return a candidates object with each candidate having an updated `numVotes` value.

### Exercise 4

Write a function `getWinner` which takes the updated candidates object as input, and returns the candidate with the most votes if there is no draw. If there
is a draw, the function should return `null`.

### Exercise 5

Write a function `printWinnerMessage` whose input is the winner previously calculated by `getWinner`. This function should print "The election was a draw" if a draw occurred,
otherwise it should print a message including the winner's name and how many votes he/she received.

### Exercise 6

You have permission from the government to change people's voting cards
because the real election hasn't occurred yet.


If the previous 5 exercises were completed correctly, you should see a message saying that *Tamara Faiza* has won the election with 3.5 votes. Change 
*Nour al-Din*'s voting card from `[4,1]` to `[4,3]` and you should notice that a draw has occurred. 

---------------------------------------

## Part 2

This part builds upon the functions you designed in the previous part. You will change your election system to use classes instead of being a loose
set of functions and objects, however the functionality of the voting system should be the same.

The javascript code for this part should be written in `election-part2.js`.

### Exercise 1

Write a class `Voter` which can be used to create a new voter object. As before, a voter object should have variables for name, age and votingCard.
After creating the class, use the `new` keyword to initialise all of the voters in the `votingPopulation` array. For example, Jane Finnegan should be
initialised as `new Voter('Jane Finnegan', 19, [1,3])`.


### Exercise 2

Write a class `Candidate` which `extends` voter. Since candidates are voters, the candidate object should also have variables for name, age and votingCard.
However a candidate has some extended properties: variables storing the party he/she belongs to and the number of votes received.

After creating the class, use the `new` keyword to initialise all of the candidates in the `candidates` array. For example, Tamara Faiza should be
initialised as `new Candidate('Tamara Faiza', 46, 'Pizza Party', [1,1])`.

> Hint: Recall the `extends` keyword and `super` function from [week 11](https://codeyourfuture.github.io/syllabus-master/js-core-3/week-11/lesson.html).

### Exercise 3

Write a class `Election` which models the election. An election is performed by a group of voters and a group of candidates, so the `Election` class
should input and store an array of valid voters and an array of candidates, with the people in each array being the same as in part 1. The class should also
have a `winner` variable used to store the winner.

The `Election` class should also contain three functions: `runElection()`, `getWinner()` and `printWinnerMessage()`. The `runElection()` function should act the same way as in part 1,
this time altering the voting cards of the `candidates` class variable. The function `getWinner()` should also be as in part 1, this time setting the `winner`
class variable after the winner is calculated. `printWinnerMessage()` should print a message as before including who won, and how many votes he/she received.

An election should be initialised as `let election = new Election(validVoters, candidates);`

### Exercise 4

Design and write a user interface in HTML that allows users to visit `index.html` and view the list of voters and candidates. Users should be able to
press a "Run Election" button, which runs the election and prints the winner message on the page.

### Stretch goals

In the `index.html` page, include an input system that allows users to add and remove voters and candidates.




