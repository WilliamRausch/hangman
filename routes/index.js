const express = require("express");
const router = express.Router();
const fs = require("fs");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toUpperCase().split("\n");
//console.log(words);
//console.log("hello!");
let word =words[Math.floor(Math.random()*words.length)];
let data2;
console.log(word);
console.log(word.length);

//logic
let answer = word.split("");

let spaces = [];
let wordCheck = [];
let outcome = "HELLO";
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


function check(guess){
	let correct = false;
	let count = 0;
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

	if(data.Wrong>=8){
		console.log("lost");
		outcome = "You Lose!";
		spaces = wordCheck;

	}else if(wordCheck == spaces){
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
	check(req.body.guess);
	
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


})

module.exports = router;
