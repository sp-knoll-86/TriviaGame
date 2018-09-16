$(document).ready(function () {
    // variables for wins / losses / skipped
    var correctAnswer = 0;
    var wrongAnswer = 0;
    var noAnswer = 0;
    // variable to track the question
    var questionCounter = 0;
    // variable to track user selection
    var userAnswer = [];
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
    function submit(event1) {
        $("#submit").on("click", function () {
            // event1.preventDefault();
            userAnswer.length = 0;
            var userChoice = $("#answers input:radio[name=optionsRadios]:checked").val();
            userAnswer.push(userChoice);
            console.log(userChoice);
            nextQuestion();
        })
    }

    // function to go to the next question
    function nextQuestion() {
        questionCounter++;
        // if (questionCounter === question.length) {
            displayQuestion();
        // }
    }

    // function to end the game
    function endGame() {

    }


    buttonStart();
})