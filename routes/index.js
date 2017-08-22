const express = require("express");
const router = express.Router();
const fs = require("fs");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toUpperCase().split("\n");
console.log(words);
console.log("hello!");
let word =words[Math.floor(Math.random()*words.length)];
console.log(word);
console.log(word.length);

//logic
let answer = word.split("");
let spaces = [];
for(i=0;i<word.length;i++){
	spaces.push("_");
}
console.log(spaces);
let wrongGuesses = 0;
let rightGuesses = 0;
let data = {
	Right: rightGuesses,
	Wrong: wrongGuesses,
	Word: spaces
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
}


//logic
router.get("/", function(req, res) {
  res.render("game", data);
  

});
router.post("/",function(req,res){
	check(req.body.guess);
	req.session.token = `${word}`;
	res.redirect("/");

})

module.exports = router;
