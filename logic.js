let answer = ["T","R","U","C","K"];
let spaces = ["_","_","_","_","_"];
let wrongGuesses = 0;
let rightGuesses = 0;


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
		wrongGuesses ++;
		console.log("Wrong!");
	}else{
		rightGuesses ++;
		console.log("WRONG");
	}
	console.log(rightGuesses + "Right"+ wrongGuesses + "Wrong");
}
check("T");
check("A");
check("R");