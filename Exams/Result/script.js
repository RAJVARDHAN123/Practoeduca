var addressown = window.location.hash;
const newAddress = addressown.substring(1);
var address = `Response${newAddress}/`;
var rawMAIN = addressown.slice(2, 8);;
var title = `Quiz/${rawMAIN}/title`;
var currentQuestion = 1;
var totalQuestion = 0;
var correct_percentage, incorrect_percentage;

function load() {
    if (window.localStorage.getItem('email') == '') {
        window.open('/', '_self')
    }

    var stuCountRef = firebase.database().ref(address + "owner");
    stuCountRef.on("value", (snapshot) => {
        document.getElementById('exam-teacher').textContent = snapshot.val();
        firebase.database().ref(title).on("value", (snapshot) => {
            document.getElementById('exam-name').textContent = snapshot.val();
            firebase.database().ref(address + 'totalQuestion').on("value", (snapshot) => {
                totalQuestion = snapshot.val();
                document.getElementById("tot-ques").textContent = totalQuestion;
                firebase.database().ref(address + 'correctAnswers').on("value", (snapshot) => {
                    correct_percentage = snapshot.val() / totalQuestion * 100;
                    document.getElementById('correct-percentage').textContent = correct_percentage + '%';
                    document.getElementById('answers-in').textContent = snapshot.val();
                    firebase.database().ref(address + 'wrongAnswers').on("value", (snapshot) => {
                        incorrect_percentage = snapshot.val() / totalQuestion * 100;
                        document.getElementById('incorrect-percentage').textContent = incorrect_percentage + '%';
                        document.getElementById('answers').textContent = snapshot.val();
                        find();
                    })
                })
            })
        })
    });

}

function find() {
    if (totalQuestion >= currentQuestion) {
        firebase.database().ref(address + currentQuestion + "/answerWas").on("value", (snapshot) => {
            if (snapshot.val() == "Correct") {
                var question, answer;
                firebase.database().ref(address + currentQuestion + "/question").on("value", (snapshot) => {
                    question = snapshot.val();
                    firebase.database().ref(address + currentQuestion + "/answer").on("value", (snapshot) => {
                        answer = snapshot.val();
                        var assign = '<div class="correct-question"><div class="correct"><div class="question-no" style="font-weight: 600;">Question ' + currentQuestion + '</div><div class="correct-mark" style="font-weight: 600;"><i style="color: #8CD19E;" class="fas fa-check-circle"></i> Correct</div></div><br><div class="question"><h5 style="font-weight: 500;">Question</h5><h4 style="margin-top: -15px; font-weight: 600;" id="question">' + question + '</h4></div><div class="response"><div class="your"><h5 style="font-weight: 500;">Your Response</h5><h4 style="margin-top: -15px; font-weight: 600;">' + answer + '</h4></div></div></div>';
                        $("body").append(assign);
                        answer = null;
                        question = null;
                        currentQuestion += 1;
                        find();
                    })
                })
            } else if (snapshot.val() == "Wrong") {
                var questionIN, answerIN, correctIN;
                firebase.database().ref(address + currentQuestion + "/question").on("value", (snapshot) => {
                    questionIN = snapshot.val();
                    firebase.database().ref(address + currentQuestion + "/answer").on("value", (snapshot) => {
                        answerIN = snapshot.val();
                        firebase.database().ref(address + currentQuestion + "/correctAnswer").on("value", (snapshot) => {
                            correctIN = snapshot.val();
                            var assign = '<div class="incorrect-question"><div class="incorrect"><div class="question-no" style="font-weight: 600;">Question ' + currentQuestion + '</div><div class="incorrect-mark" style="font-weight: 600;"><i style="color: #EC0B7E;" class="fas fa-times-circle"></i> Incorrect</div></div><br><div class="question"><h5 style="font-weight: 500;">Question</h5><h4 style="margin-top: -15px; font-weight: 600;" id="question"> ' + questionIN + '</h4></div><div class="response"><div class="your"><h5 style="font-weight: 500;" class="red-lebel">Your Response</h5><h4 style="margin-top: -15px; font-weight: 600;" id="response">' + answerIN + '</h4></div></div><div class="answer"><h5 style="font-weight: 500;">Correct Answer</h5><h4 style="margin-top: -15px; font-weight: 600;">' + correctIN + '</h4></div></div>'
                            $("body").append(assign);
                            correctIN = null;
                            questionIN = null;
                            answerIN = null;
                            currentQuestion += 1;
                            find();
                        })
                    })
                })
            }

        })
    } else if (totalQuestion < currentQuestion) {
        document.getElementById('overlay').style.display = "none";
        document.getElementById('l-container').style.display = "none";
        document.getElementById('correct-answer-bar').style.width = correct_percentage + '%';
        document.getElementById('incorrect-answer-bar').style.width = incorrect_percentage + '%';
    }
}

function doCapture() {
    window.scrollTo(0, 0);
    html2canvas(document.getElementById("capture")).then(function(canvas) {
        download(canvas.toDataURL("image/jpeg", 0.9), "Exam")
    });
}

function download(source) {
    const fileName = source.split('/').pop();
    var el = document.createElement("a");
    el.setAttribute("href", source);
    el.setAttribute("download", "Exam");
    document.body.appendChild(el);
    el.click();
    el.remove();
}