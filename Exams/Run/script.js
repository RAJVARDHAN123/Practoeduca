var questionNo = 1;
var TotalQuestion = 0;
var correctAnswers = 0,
    wrongAnswers = 0;

// Verification code
var Code = generateID(20);

var questionH = document.getElementById("question");

var correctAnswer = "";
var correctQuestionAnswer = "";
var correctTrueAnswer = "";
var correctOption = "";

function load() {
    if (window.localStorage.getItem('email') == '') {
        window.open('/', '_self')
    }
    document.getElementById("countdown").style.display = "block";

    var isLogoRef = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/logo");

    isLogoRef.on("value", (snapshot) => {
        if (snapshot.val() == "Yes") {
            var logoRef = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/logoUrl");
            logoRef.on("value", (snapshot) => {
                document.getElementById('logo').src = snapshot.val();
            })
        }
    })

    setTimeout(function() {
        document.getElementById("countdown").style.display = "none";
        GetD();
    }, 3600);
}

// Random Code Generator
function generateID(numbers) {
    var chars = "0123456789";
    var RawID = "";
    for (var i = 0; i < numbers; i++) {
        RawID += chars[Math.floor(Math.random() * chars.length)];
    }
    return RawID;
}

function GetD() {

    var totalQuestionRef = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/TotalQuestion");

    totalQuestionRef.on("value", (snapshot) => {

        TotalQuestion = snapshot.val();

        if (TotalQuestion == questionNo || TotalQuestion > questionNo) {

            document.getElementById('questionNo').textContent = questionNo;
            document.getElementById('transplate').style.display = "none";
            document.getElementById("overlay").style.display = "block";
            document.getElementById("head-question").classList.add("hide");
            document.getElementById("head-question").classList.remove("hide");
            document.getElementById("options").classList.add("hide");
            document.getElementById("input").classList.add("hide");
            document.getElementById("TF").classList.add("hide");

            var questionRef = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/" + questionNo + "/question");

            var questionTypeRef = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/" + questionNo + "/questionType");

            var option1Ref = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/" + questionNo + "/option1");
            var option2Ref = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/" + questionNo + "/option2");
            var option3Ref = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/" + questionNo + "/option3");
            var option4Ref = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/" + questionNo + "/option4");

            var correctOptionRef = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/" + questionNo + "/correct");

            var correctAnswerRef = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/" + questionNo + "/answer");

            questionRef.on("value", (snapshot) => {
                questionH.textContent = snapshot.val();
                document.getElementById("quizPlat").removeAttribute("hidden");

                questionTypeRef.on("value", (snapshot) => {
                    if (snapshot.val() == "objective") {
                        option1Ref.on("value", (snapshot) => {
                            document.getElementById("option1").textContent = snapshot.val();

                            option2Ref.on("value", (snapshot) => {
                                document.getElementById("option2").textContent = snapshot.val();

                                option3Ref.on("value", (snapshot) => {
                                    document.getElementById("option3").textContent = snapshot.val();

                                    option4Ref.on("value", (snapshot) => {
                                        document.getElementById("option4").textContent = snapshot.val();

                                        correctOptionRef.on("value", (snapshot) => {
                                            correctAnswer = snapshot.val();

                                            if (
                                                document.getElementById("option1").textContent ==
                                                correctAnswer
                                            ) {
                                                correctOption = "option1_button";
                                            } else if (
                                                document.getElementById("option2").textContent ==
                                                correctAnswer
                                            ) {
                                                correctOption = "option2_button";
                                            } else if (
                                                document.getElementById("option3").textContent ==
                                                correctAnswer
                                            ) {
                                                correctOption = "option3_button";
                                            } else if (
                                                document.getElementById("option4").textContent ==
                                                correctAnswer
                                            ) {
                                                correctOption = "option4_button";
                                            }

                                            document.getElementById("overlay").style.display = "none";

                                            document.getElementById("head-question").classList.remove("hide");
                                            document.getElementById("options").classList.remove("hide");
                                            document.getElementById("input").classList.add("hide");
                                            document.getElementById("TF").classList.add("hide");
                                        });
                                    });
                                });
                            });
                        });
                    } else if (snapshot.val() == "subjective") {
                        correctAnswerRef.on("value", (snapshot) => {

                            correctQuestionAnswer = snapshot.val();

                            document.getElementById("overlay").style.display = "none";
                            document.getElementById("head-question").classList.remove("hide");
                            document.getElementById("options").classList.add("hide");
                            document.getElementById("TF").classList.add("hide");
                            document.getElementById("input").classList.remove("hide");
                            document.getElementById("options").classList.add("hide");
                            document.getElementById("TF").classList.add("hide");


                        });

                    } else if (snapshot.val() == "True/False") {

                        correctAnswerRef.on("value", (snapshot) => {

                            correctTrueAnswer = snapshot.val();
                            document.getElementById("overlay").style.display = "none";
                            document.getElementById("head-question").classList.remove("hide");
                            document.getElementById("TF").classList.remove("hide");
                            document.getElementById("options").classList.add("hide");
                            document.getElementById("input").classList.add("hide");
                        })

                    }
                });
            });
        } else {

            var teacherRef = firebase.database().ref("/Quiz/" + window.localStorage.getItem("Quiz") + "/" + "/TeacherName");

            var userRef = firebase.database().ref("/users/" + Decode(window.localStorage.getItem("Email")) + "/exams");

            userRef.once("value", (snapshot) => {
                var Exam = snapshot.val();
                update = Exam + 1;
                firebase.database().ref("/users/" + Decode(window.localStorage.getItem("Email")) + "/").update({
                    exams: update
                })

                firebase.database().ref("/users/" + Decode(window.localStorage.getItem("Email")) + "/" + window.localStorage.getItem('Quiz')).update({
                    examID: Code
                })

                teacherRef.once("value", (snapshot) => {

                    var teacher = snapshot.val();

                    firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/").update({
                        totalQuestion: TotalQuestion,
                        correctAnswers: correctAnswers,
                        wrongAnswers: wrongAnswers,
                        owner: teacher
                    })

                    document.getElementById('teacher').innerHTML = teacher;

                    document.getElementById('endlay').classList.remove('hide');
                    document.getElementById('quizPlat').removeAttribute('hidden');
                })

            })
        }
    })
}

function INPUTCHANGED() {
    if (document.getElementById("answer").value == "") {
        document.getElementById("next").style.bottom = "-100px";
    } else {
        document.getElementById("next").style.bottom = "0px";
    }
}

document.getElementById("option1_button").addEventListener("click", () => {
    document.getElementById('transplate').style.display = "block";
    if (document.getElementById("option1").textContent == correctAnswer) {
        document.getElementById("option1_button").classList.add("correct");
        setTimeout(() => {
            document.getElementById("option1_button").classList.remove("correct");

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: document.getElementById("option1").textContent,
                answerWas: "Correct"
            })
            correctAnswers += 1;
            questionNo += 1;
            GetD();
        }, 600);
    } else if (document.getElementById("option1").textContent != correctAnswer) {
        document.getElementById("option1_button").classList.add("shake");
        document.getElementById(correctOption).classList.add("correct");
        setTimeout(() => {
            document.getElementById("option1_button").classList.remove("shake");
            document.getElementById(correctOption).classList.remove("correct");

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: document.getElementById("option1").textContent,
                correctAnswer: correctAnswer,
                answerWas: "Wrong"
            })
            wrongAnswers += 1;
            questionNo += 1;
            GetD();
        }, 600);
    }
});

document.getElementById("option2_button").addEventListener("click", () => {
    document.getElementById('transplate').style.display = "block";
    if (document.getElementById("option2").textContent == correctAnswer) {
        document.getElementById("option2_button").classList.add("correct");
        setTimeout(() => {
            document.getElementById("option2_button").classList.remove("correct");

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: document.getElementById("option2").textContent,
                answerWas: "Correct"
            })
            correctAnswers += 1;

            questionNo = questionNo + 1;
            GetD();
        }, 600);
    } else if (document.getElementById("option2").textContent != correctAnswer) {
        document.getElementById("option2_button").classList.add("shake");
        document.getElementById(correctOption).classList.add("correct");
        setTimeout(() => {
            document.getElementById("option2_button").classList.remove("shake");
            document.getElementById(correctOption).classList.remove("correct");

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: document.getElementById("option2").textContent,
                correctAnswer: correctAnswer,
                answerWas: "Wrong"
            })

            wrongAnswers += 1;
            questionNo += 1;
            GetD();
        }, 600);
    }
});

document.getElementById("option3_button").addEventListener("click", () => {
    document.getElementById('transplate').style.display = "block";
    if (document.getElementById("option3").textContent == correctAnswer) {
        document.getElementById("option3_button").classList.add("correct");
        setTimeout(() => {
            document.getElementById("option3_button").classList.remove("correct");

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: document.getElementById("option3").textContent,
                answerWas: "Correct"
            })
            correctAnswers += 1;

            questionNo = questionNo + 1;
            GetD();
        }, 600);
    } else if (document.getElementById("option3").textContent != correctAnswer) {
        document.getElementById("option3_button").classList.add("shake");
        document.getElementById(correctOption).classList.add("correct");
        setTimeout(() => {
            document.getElementById("option3_button").classList.remove("shake");
            document.getElementById(correctOption).classList.remove("correct");

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: document.getElementById("option3").textContent,
                correctAnswer: correctAnswer,
                answerWas: "Wrong"
            })

            wrongAnswers += 1;
            questionNo = questionNo + 1;
            GetD();
        }, 600);
    }
});

document.getElementById("option4_button").addEventListener("click", () => {
    document.getElementById('transplate').style.display = "block";
    if (document.getElementById("option4").textContent == correctAnswer) {
        document.getElementById("option4_button").classList.add("correct");
        setTimeout(() => {
            document.getElementById("option4_button").classList.remove("correct");

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: document.getElementById("option3").textContent,
                answerWas: "Correct"
            })
            correctAnswers += 1;
            questionNo = questionNo + 1;
            GetD();
        }, 600);
    } else if (document.getElementById("option4").textContent != correctAnswer) {
        document.getElementById("option4_button").classList.add("shake");
        document.getElementById(correctOption).classList.add("correct");
        setTimeout(() => {
            document.getElementById("option4_button").classList.remove("shake");
            document.getElementById(correctOption).classList.remove("correct");


            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: document.getElementById("option4").textContent,
                correctAnswer: correctAnswer,
                answerWas: "Wrong"
            })

            wrongAnswers += 1;

            questionNo = questionNo + 1;
            GetD();
        }, 600);
    }
});

document.getElementById('next').addEventListener('click', () => {
    document.getElementById('transplate').style.display = "block";
    if (document.getElementById('answer').value == correctQuestionAnswer) {
        document.getElementById('answer').classList.add("correct-input");

        setTimeout(() => {
            document.getElementById("answer").classList.remove("correct-input");
            document.getElementById("answer").value = "";

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: correctQuestionAnswer,
                answerWas: "Correct"
            })

            correctAnswers += 1;
            questionNo = questionNo + 1;
            GetD();
        }, 600);

    } else {
        document.getElementById('answer').classList.add("shake-input");
        var setAnswer = document.getElementById("answer").value;
        setTimeout(() => {
            document.getElementById("answer").classList.remove("shake-input");
            document.getElementById("answer").value = correctQuestionAnswer;
            setTimeout(() => {
                document.getElementById("answer").value = "";

                firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                    question: questionH.textContent,
                    answer: setAnswer,
                    correctAnswer: correctQuestionAnswer,
                    answerWas: "Wrong"
                })

                wrongAnswers += 1;
                questionNo = questionNo + 1;
                GetD();
            }, 500)
        }, 600);

    }
})

document.getElementById('True').addEventListener('click', () => {
    document.getElementById('transplate').style.display = "block";
    if (correctTrueAnswer == "True") {
        document.getElementById("TT").textContent = "✔";
        document.getElementById('True').style.animation = "correct 0.5s linear";
        setTimeout(() => {
            document.getElementById("TT").textContent = "True";

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: "True",
                answerWas: "Correct"
            })

            correctAnswers += 1;

            questionNo = questionNo + 1;
            GetD();
        }, 600);
    } else {
        document.getElementById("TT").textContent = "✘";
        document.getElementById('True').style.animation = "shake 0.5s linear";
        document.getElementById('False').style.animation = "correct 0.5s linear";
        setTimeout(() => {
            document.getElementById("TT").textContent = "True";

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: "True",
                correctAnswer: "False",
                answerWas: "Wrong"
            })

            wrongAnswers += 1;
            questionNo = questionNo + 1;
            GetD();
        }, 600);
    }
})

document.getElementById('False').addEventListener('click', () => {
    document.getElementById('transplate').style.display = "block";
    if (correctTrueAnswer == "False") {
        document.getElementById("FF").textContent = "✔";
        document.getElementById('False').style.animation = "correct 0.5s linear";

        setTimeout(() => {

            document.getElementById("FF").textContent = "False";

            document.getElementById('False').style.animation = "none";
            document.getElementById('True').style.animation = "none";
            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: "False",
                answerWas: "Correct"
            })

            correctAnswers += 1;
            questionNo = questionNo + 1;
            GetD();
        }, 600);

    } else {
        document.getElementById("FF").textContent = "✘";
        document.getElementById('False').style.animation = "shake 0.5s linear";
        document.getElementById('True').style.animation = "correct 0.5s linear";

        setTimeout(() => {
            document.getElementById("FF").textContent = "False";
            document.getElementById('False').style.animation = "none";
            document.getElementById('True').style.animation = "none";

            firebase.database().ref("/Response/" + window.localStorage.getItem('Quiz') + "/" + Code + "/" + questionNo + "/").update({
                question: questionH.textContent,
                answer: "False",
                correctAnswer: "True",
                answerWas: "Wrong"
            })

            wrongAnswers += 1;
            questionNo = questionNo + 1;
            GetD();
        }, 600);

    }
})

function result() {
    window.open('/Exams/Result/#/' + window.localStorage.getItem('Quiz') + "/" + Code, "_self")
}

function exit() {
    window.open('/Home', "_self")
}