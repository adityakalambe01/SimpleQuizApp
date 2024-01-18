
var questions = [{
    question: "Who invented Java Programming?",
    choices: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"],
    correctAnswer: 1
}, {
    question: "Which statement is true about Java?",
    choices: ["Java is a sequence-dependent programming language", "Java is a code dependent programming language", "Java is a platform-dependent programming language", " Java is a platform-independent programming language"],
    correctAnswer: 3
}, {
    question: "Which component is used to compile, debug and execute the java programs?",
    choices: ["JRE", "JIT", "JDK","JVM"],
    correctAnswer: 2
}, {
    question: "Which one of the following is not a Java feature?",
    choices: ["Object-oriented", "Use of pointers", "Portable", "Dynamic and Extensible"],
    correctAnswer: 1
}, {
    question: "Which of these cannot be used for a variable name in Java?",
    choices: [" identifier & keyword", "identifier", "keyword", "none of the mentioned"],
    correctAnswer: 2
}, {
    question: "What is the extension of java code files?",
    choices: [".js", ".txt", ".class", ".java"],
    correctAnswer: 3	
	
}, {
    question: "Which environment variable is used to set the java path?",
    choices: ["MAVEN_Path", "JavaPATH", "JAVA", "JAVA_HOME"],
    correctAnswer: 3	
}, {
    question: "Which of the following is not an OOPS concept in Java?",
    choices: ["Polymorphism", "Inheritance", "Compilation", "Encapsulation"],
    correctAnswer: 2
}, {
    question: "What is not the use of “this” keyword in Java?",
    choices: ["Referring to the instance variable when a local variable has the same name", "Passing itself to the method of the same class", "Passing itself to another method", "Calling another constructor in constructor chaining"],
    correctAnswer: 1

}, {
    question: "Which of the following is a type of polymorphism in Java Programming?",
    choices: ["Multiple polymorphism", "Compile time polymorphism", "Multilevel polymorphism", "Execution time polymorphism"],
    correctAnswer: 1

}, {
    question: "What is Truncation in Java?",
    choices: ["Floating-point value assigned to a Floating type", "Floating-point value assigned to an integer type", "Integer value assigned to floating type", "Integer value assigned to floating type"],
    correctAnswer: 1

	}, {
    question: "What is the extension of compiled java classes?",
    choices: [".txt", ".js", ".class", ".java"],
    correctAnswer: 2
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}