let answeredQuestions = [
];

let currentQuestion = '';
let total = 0;
let currentAmount = 0;
let maxScore = 1000;
let score = 0;

let currentPlayer = '';
const players = [
	{id: 1, name: "player 1", score: 0},
	{id: 2, name: "player 2", score: 0}
];
const choices = ['A','B','C'];

//start with player 1
currentPlayer = players.find(x => x.id = 1);

$(document).ready(function(){
	$(document).on("click",".category", (e) => {displayQuestion(e)});
	$(document).on("click","#hideOne",() => hideOption());
	console.log(currentPlayer);
});

const displayQuestion = (e) => {
	e.preventDefault();
	const button = e.target;
	currentAmount = $(button).data("amount");
	const category = $(button).data("category");
	$(button).hide();

	const questions = window[category];

	let randomQuestionIndex = Math.floor(Math.random() * questions.length);
	const alreadyAnswered = answeredQuestions.find(x => x.name === category);
	if (alreadyAnswered){
		let invalidQuestion = true;		
		while (invalidQuestion){
			randomQuestionIndex = Math.floor(Math.random() * questions.length);			
			invalidQuestion = alreadyAnswered.questions.some(x => x === randomQuestionIndex)
		}
		alreadyAnswered.questions.push(randomQuestionIndex);
	}else{
		answeredQuestions.push({
			name: category,
			questions: [randomQuestionIndex]
		})
	}

	currentQuestion = questions[randomQuestionIndex]
	$('#question').html(currentQuestion.question);
	$('#choiceA').html(`A: ${currentQuestion.choiceA}`);
	$('#choiceB').html(`B: ${currentQuestion.choiceB}`);
	$('#choiceC').html(`C: ${currentQuestion.choiceC}`);
}

const hideOption = () => {
	const availableToHide = choices.filter(x => x != currentQuestion.correct);
	const hideIndex = Math.floor(Math.random() * availableToHide.length);
	$(`#choice${availableToHide[hideIndex]}`).html('');	
}

// // const doubleScore = () => {
// 	const availableToDouble = choices.filter(x => != currentQuestion.correct);
// 	const 
// }

const checkAnswer = (answer) => {
	if (answer === currentQuestion.correct){
		currentPlayer.score += currentAmount;
	}else{
		currentPlayer.score -= currentAmount;
		switchPlayers();
	}

	showScores();

	reset();
}

const showScores = () => {
	players.forEach( x => {
		$(`#score${x.id}`).html(x.score);
	});
}

const switchPlayers = () => {
	let currentId = 1
	if (currentPlayer.id === 1){
		currentId = 2;
	}
	currentPlayer = players.find(x => x.id === currentId);
}

if (score >= maxScore) {
	alert('Congrats you win!!!');
}

const reset = () => {
	$('#question').html('');
	$('#choiceA').html('');
	$('#choiceB').html('');
	$('#choiceC').html('');
}

