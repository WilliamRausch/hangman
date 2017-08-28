const express = require("express");
const router = express.Router();
const fs = require("fs");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toUpperCase().split("\n");
//console.log(words);
//console.log("hello!");
let outcome;
let data2;
let spaces;
let wordCheck;
let word;
let wordsGuessed = [];


spaces = [];
wordCheck = [];

word =words[Math.floor(Math.random()*words.length)];
console.log(word);
console.log(word.length);

//logic
answer = word.split("");

 spaces = [];
 wordCheck = [];
outcome = "HELLO";
for(i=0;i<word.length;i++){
	spaces.push("_");
}
for(i=0;i<word.length;i++){
	wordCheck.push(word[i]);
}
console.log(wordCheck)
console.log(spaces);
let wrongGuesses = 0;
let rightGuesses = 0;
let data = {
	Right: rightGuesses,
	Wrong: wrongGuesses,
	Word: spaces,
	Outcome: outcome
}
function reset(){
console.log("resetting");
spaces = [];
wordCheck = [];
wordsGuessed = [];
word =words[Math.floor(Math.random()*words.length)];
console.log(word);
console.log(word.length);

//logic
answer = word.split("");

 spaces = [];
 wordCheck = [];
outcome = "HELLO";
for(i=0;i<word.length;i++){
	spaces.push("_");
}
for(i=0;i<word.length;i++){
	wordCheck.push(word[i]);
}
console.log(wordCheck)
console.log(spaces);
wrongGuesses = 0;
rightGuesses = 0;
data = {
	Right: 0,
	Wrong: 0,
	Word: spaces,
	Outcome: outcome
}

}


function check(guess){
	let correct = false;
	let count = 0;
	let isUnique = 0;
for(i=0;i<wordsGuessed.length;i++){
	if(guess ==wordsGuessed[i]){
		isUnique = 1;
	}
	else{
		isUnique = false;
	}

}

	wordsGuessed.push(guess);
	//console.log(correct);
	for (i=0;i<answer.length;i++){
		if(guess == answer[i]){
			spaces[i] = guess;
			correct = true;
			//console.log("correct");

		}else{
			count = count + 1;
		}
		console.log(count);
	}

	console.log(spaces);
	if(count == answer.length){
		data.Wrong ++;
		console.log("Wrong!");
	}else{
		data.Right ++;
		console.log("Right!");
	}
	console.log(rightGuesses + "Right"+ wrongGuesses + "Wrong");
	checkforWinner();


}
function checkforWinner(){
  console.log("wordchek = " + wordCheck);
  console.log("spaces = "+ spaces);
	if(data.Wrong>=8){
		console.log("lost");
		outcome = "You Lose!";
		spaces = wordCheck;

	}else if(spaces.toString() === wordCheck.toString()){
		outcome = "Winner!";
	}else{
		console.log("game in progress");
	}


}
console.log(outcome);


//logic
router.get("/", function(req, res) {

  res.render("game", data2);


});
router.post("/",function(req,res){
	let guess = req.body.guess;
	guess = guess.toUpperCase();
	for(i=0;i<wordsGuessed.length;i++){
	if(guess ===wordsGuessed[i]){
		isUnique = 1;
		console.log("new letter");
	}
	else{
		console.log("old letter")
		isUnique = false;
	}

}

	check(guess);
	
	req.session.answer = `${spaces}`;
	req.session.wrongguesses = `${data.Wrong}`;
	req.session.rightguesses = `${data.Right}`;
	req.session.outcome = `${outcome}`;
	req.session.wordsGuessed = `${wordsGuessed}`;
	res.redirect("/");
	data2 = {
		Word:  req.session.answer,
		Wrong: req.session.wrongguesses,
		Right: req.session.rightguesses,
		Outcome: req.session.outcome,
		wordsGuessed: req.session.wordsGuessed
	}
});
router.get("/start", function(req, res) {
	reset();
	req.session.answer = `${spaces}`;
	req.session.wrongguesses = `${data.Wrong}`;
	req.session.rightguesses = `${data.Right}`;
	req.session.outcome = `${outcome}`;
	res.redirect("/");
	data2 = {
		Word:  req.session.answer,
		Wrong: req.session.wrongguesses,
		Right: req.session.rightguesses,
		Outcome: req.session.outcome
	}

});



module.exports = router;
