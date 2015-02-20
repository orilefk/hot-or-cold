
$(document).ready(function(){

	/* Variables */
	var randomNumber;
	var guessFlag;
	var guessCount;
	var userChoice;
	var found = false;

	/* Starts a new game on page load */
	newGame();

	$("form").submit(function(e) {
		e.preventDefault();
		if (!found) {
			userChoice = $("#userGuess").val();
			console.log("User Choice = "+ userChoice);
			clearText();
			setFocus();
			guessFlag = checkChoice(userChoice);
			if (!guessFlag) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userChoice + "</li>");
				guessFlag = checkTemperature(Math.abs(randomNumber - userChoice));
			};
		}
		else {
			setFeedback("You already won! Stop being greedy! Go outside! Or start a new game.");
		};
	});
	
	/* Display information modal box */
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/* Hide information modal box */
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
  	/* New game button */
  	$(".new").click(function(e) {
  		e.preventDefault();
  		newGame();
  	});

  	/* Create a new game */
  	function newGame() {
  		guessFlag = true;
  		guessCount = 0;
  		found = false;
  		$("#guessList li").remove();
  		setFeedback("Take a guess!");
  		setCount(guessCount);
  		randomNumber = generateNumber();
  		setFocus();
  		clearText();
  	}
  	/* Generate Random Number */
  	function generateNumber() {
  		var generatedNumber = Math.floor((Math.random()*100)+1);
  		console.log("Generated Random Number = "+ generatedNumber);
  		return generatedNumber;
  	}
  	/* Set the focus on the input */
  	function setFocus() {
  		document.getElementById("userGuess").focus();
  	}
  	/* Clear the input box */
  	function clearText() {
  		$("#userGuess").val('');
  	}
  	/* Set the guess count */
  	function setCount(count) {
  		$("#count").text(guessCount);
  	}
  	/* Prompt for user guess */
  	function getChoice() {
  		var userChoice = prompt("Guess the Number", "Your Guess");
  		console.log("User Choice = "+ userChoice);
  		return userChoice;
  	}
  	/* Make sure the input is valid*/
  	function checkChoice(userChoice) {
  		if (isNaN(userChoice)) {
  			setFeedback("Sorry, you have to type a number between 0 and 100!");
  			return true;
  		}
  		else if (userChoice < 1 || userChoice >100) {
  			setFeedback("Sorry, your guess has to be between 1 and 100!");
  			return true;
  		}
  		else if ($.trim(userChoice) == '') {
  			setFeedback("You gotta guess something!");
  			return true;
  		}
  		else {
  			return false;
  		};
  	}
  	/* Tell the user how close they are to the number */
  	function checkTemperature(guessDifference) {
  		if (guessDifference == 0) {
  			setFeedback("You got it! Go you! Go Celebrate!");
  			found = true;
  			return false;
  		}
  		else if (guessDifference <= 5) {
  			setFeedback("You're hotter than a bonfire! so close. Keep going. Almost...There..!");
  			return true;
  		}
  		else if (guessDifference <= 10) {
  			setFeedback("You're pretty damn hot!");
  			return true;
  		}
  		else if (guessDifference >= 10 && guessDifference <= 30) {
  			setFeedback("You're closeish, but not super close!");
  			return true;
  		}
  		else if (guessDifference >= 30 && guessDifference <= 40) {
  			setFeedback("You're pretty far away :/");
  			return true;
  		}
  		else {
  			setFeedback("Go get a jacket you must be FREEZING!");
  			return true;
  		}
  	}
  	/* Set feedback */
  	function setFeedback(feedback) {
  		$("#feedback").text(feedback);
  	}


});



