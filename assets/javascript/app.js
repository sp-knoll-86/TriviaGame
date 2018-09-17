$(document).ready(function () {
    // variables for wins / losses / skipped
    var rightAnswer = 0;
    var wrongAnswer = 0;
    var noAnswer = 0;
    // variable to track the question
    var questionCounter = 0;
    // variable to track user selection
    var userAnswer = [];
    // timeout for in between questions
    var betweenTimeout = 3000;
    // array of objects for questions and answers
    var triviaQuestions = [
        {
            question: "Who scored the most points in their career?",
            answers: ["Raef Lafrentz", "Wilt Chamberlain", "Danny Manning", "Wayne Simien"],
            correct: 2,
        },
        {
            question: "What year did KU most recently win a National Championship?",
            answers: ["1952", "2008", "1988", "2012"],
            correct: 1,
        },
        {
            question: "Who made the most 3-point baskets in a single season?",
            answers: ["Sviatoslav Mykhailiuk", "Kirk Hinrich", "Terry Brown", "Brandon Rush"],
            correct: 0,
        },
    ];

    // variable to set time allowed
    var answerTime = 10;
    var timeChange;

    // different timer functions to be called when starting new question
    function runTimer() {
        timeChange = setInterval(decrement, 1000);
    }

    function decrement() {
        answerTime--;
        $("#time").html("Time Left: " + answerTime);
        if (answerTime === 0) {
            stopTime();
            userAnswer.length = 0;
            var userChoice = $("#answers input:radio[name=optionsRadios]:checked").val();
            userAnswer.push(userChoice);
            console.log(userChoice);
            nextQuestion();
        }
    }

    function resetTime() {
        answerTime = 10;
        $("#time").html("Time Left: " + answerTime);
    }

    function stopTime() {
        clearInterval(timeChange);
    }

    // function to clear the fields to be called when moving on to the next question or end of the game
    function clearDiv() {
        var clearQuestion = $("#question");
        clearQuestion.empty();
        var clearAnswer = $("#answers");
        clearAnswer.empty();
        var clearSubmit = $("#submit");
        clearSubmit.empty();
        var clearStart = $("#start");
        clearStart.empty();
    }

    // display start button and begin game
    function buttonStart() {
        $("#start").append("<button class='btn btn-secondary btn-lg' id='startButton'>" + 'start' + "</button>");
        $("#startButton").on("click", function (event) {
            event.preventDefault();
            var startGame = $("#start");
            startGame.empty();
            displayQuestion();
        })
    }

    // function to display questions and selections
    function displayQuestion() {
        clearDiv();
        $("#question").text(triviaQuestions[questionCounter].question);
        var possibleAnswers = $("#answers");
        for (i = 0; i < triviaQuestions[questionCounter].answers.length; i++) {
            possibleAnswers.append("<label><input type='radio' name='optionsRadios' id='radioAnswer' value='" + [i] + "'><div>" + triviaQuestions[questionCounter].answers[i] + "</div></input></label><br>");
        };
        $("#submit").append("<button class='btn btn-secondary btn-lg' id='submitButton'>" + 'submit' + "</button>")
        submit();
    }

    // function to submit user answer
    function submit() {
        $("#submit").on("click", function (event1) {
            event1.preventDefault();
            userAnswer.length = 0;
            var userChoice = $("#answers input:radio[name=optionsRadios]:checked").val();
            userAnswer.push(userChoice);
            console.log(userChoice);
            nextQuestion();
        })
    }

    // function to check is answer was right or wrong
    function selectedAnswer() {
        clearDiv();
        var correctAnswer = triviaQuestions[questionCounter].correct;
        if (userAnswer[0] == correctAnswer) {
            $("#question").append("<p>" + "That is correct. Well done!" + "</p>");
            rightAnswer++;
        }
        else if (userAnswer[0] == undefined) {
            $("#question").append("<p>" + "Out of time. The correct answer was: " + triviaQuestions[questionCounter].answers[correctAnswer] + "</p>");
            noAnswer++;
        }
        else {
            $("#question").append("<p>" + "That is incorrect. The correct answer was: " + triviaQuestions[questionCounter].answers[correctAnswer] + "</p>");
            wrongAnswer++;
        }
    }

    // function to go to the next question
    function nextQuestion() {
        selectedAnswer();
        questionCounter++;
        if (questionCounter === question.length) {
            setTimeout(endGame, betweenTimeout);
        }
        else {
            setTimeout(displayQuestion, betweenTimeout);
        }
    }

    // reset the game
    function reset() {
        questionCounter = 0;
        rightAnswer = 0;
        wrongAnswer = 0;
        noAnswer = 0;
        userAnswer = [];
    }

    // function to end the game
    function endGame() {
        clearDiv();
        $("#question").append("<p>" + "Correct Answers: " + rightAnswer + "</p><br><p>" + "Incorrect Answers: " + wrongAnswer + "</p><br></p>" + "No Answers: " + noAnswer + "</P>");
        $("#submit").append("<button class='btn btn-secondary btn-lg' id='submitButton'>" + 'restart' + "</button>");
        $("#submitButton").on("click", function(event2) {
            event2.preventDefault();
            reset();
            clearDiv();
            buttonStart();
        })
    }
    buttonStart();
})