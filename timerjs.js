$(document).ready(function(){
	console.log("Document Loaded")
	init()

	// List of questions to answer
	const questions = [
	{
		id: '001',
		question: "What is a noun? ",
		ans1 : "A noun is a noun.",
		ans2 : "A noun is a name of person, animal, place or things.",
		ans3 : "A noun is a tree house.",
		ans4 : "Obi is a type of fish",
		currect_ans : "A noun is a name of person, animal, place or things.",
	},
	{
		id: '002',
		question: "What is a pronoun? ",
		ans1 : "A noun is the brother of a noun.",
		ans2 : "A pronoun describes an Igbo person.",
		ans3 : "Words used instead of a noun",
		ans4 : "Obi is a type of fish",
		currect_ans : "Words used instead of a noun",
	},
	{
		id: "003",
		question: "10 + 12",
		ans1 : "16",
		ans2 : "43",
		ans3 : "22",
		ans4 : "13",
		currect_ans : "22",
	}
	];

	/*
	* @var current_question_indes
	* Initialize the start index to -1 as it increments with Change question to start at 
	* index of 0 for the first iteration.
	*/
	let current_question_index = -1; 

	/*
	* @var current_question
	* Type of object. Holds a single object of the current question on the DOM
	*/
	let current_question = {};

	/*
	* @var answered_questions
	* An array to hold all the answered question.
	* Each object has three fields (question_id, selected_option, correct: boolean)
	* The last parameter is a boolean. Which is true when the user selects the correct answer.
	*/
	let answered_questions = [];

	/*
	* @var step_back
	* This is set to true when the user goes back to a previous question.
	*/ 
	let step_back = false;

	/*
	* @var timer_interval
	* This hold the controler for the timer and is flushed when the last question is answered of 
	* the last question times out.
	*/ 
	let timer_interval;

	/*
	*@var started
	*Indicates the user has started the test and starts timer.
	*/ 
	let started = false;

	/*
	*@func startTimer
	* Start the timer and load the first question when the user click the start button;
	*/ 
	function startTimer(){
		timer = 60;
		timer_interval = setInterval(function (argument) {
			if (timer < 1) {
				submitAnswer()
			}
			timer -= 1;
			$('.counter').html(timer)
		},900)
	}

	/*
	* @func changeQuestion
	* Change the current question on the DOM. 
	* accepts one integer parameter. 1 for previous question and 2 for next question.
	*/
	function changeQuestion(position = 2){
		if (current_question_index == (questions.length - 1)) {
			console.log(answered_questions)
			$('.modal1').removeClass('hide')
			$('.backdrop').removeClass('hide')
			displayScore()
			clearInterval(timer_interval)
			$('.counter').html("0")
		}
		if(position == 1){
			if(current_question_index == 0){
				console.log('Questions Index cannot be less than 0 or greater than ' + questions.length);
				return;
			}
			step_back = true;
			current_question_index -= 1;
		}else if(position == 2){
			current_question_index += 1;
		}

		Object.assign(current_question,questions[current_question_index]);

		$('#question').html(current_question.question)
		$('#ansa').html(current_question.ans1)
		$('#ansb').html(current_question.ans2)
		$('#ansc').html(current_question.ans3)
		$('#ansd').html(current_question.ans4)

	}

	/*
	* @func displayModal
	* Calculate the percentage score and display in the modal
	*/
	function displayScore(){
		let answered_correctly = answered_questions.filter(answer => answer.correct === true).length //Get the total number of correct answers
		let percentage_correct = Math.ceil((answered_correctly / questions.length) * 100);
		$('.modal1').html(`You got ${answered_correctly} questions correct. You scored ${percentage_correct}%`)
		console.log(`You got ${answered_correctly} questions correct. You scored ${percentage_correct}%`)
	}
	// changeQuestion(2)
	// startTimer()

	/*
	* Close the question platform
	* You can redirect to another page using Location class
	*/
	$('.backdrop').click(function(argument) {
		$('.container').html('You have finished your assessment. CHEERS!')
	})

	$('.question-control').click(function(){
		if (!started) {
			$('input[type=radio]').prop('disabled',false);
			started = true;
			changeQuestion(2)
			startTimer()
			$('.question-control').text('Submit');
			return;
		}
		submitAnswer()
	})

	function submitAnswer(argument) {
		let selected_index = $('input[name=ans]:checked').val() //Selected check box for answer
		answered_questions[current_question_index] = {
			question_id: current_question.id,
			selected_answer : $('#' + selected_index).text().toLowerCase(),
			correct: $('#' + selected_index).text().toLowerCase() == current_question.currect_ans.toLowerCase()
		}
		clearInterval(timer_interval);
		startTimer()
		changeQuestion(2)
	}

	function init(argument) {
		$('input[type=radio]').prop('disabled',true);
	}

})