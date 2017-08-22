const express = require("express");
const router = express.Router();
const fs = require("fs");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toUpperCase().split("\n");
console.log(words);
console.log("hello!");

//logic
let answer = ["T","R","U","C","K"];
let spaces = ["_","_","_","_","_"];
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
check("T");
check("A");
check("R");

//logic
router.get("/", function(req, res) {
  res.render("game", data);
  

});
router.post("/",function(req,res){
	check(req.body.guess);
	res.redirect("/");
})

module.exports = router;
