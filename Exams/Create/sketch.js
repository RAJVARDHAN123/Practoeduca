var id;
var addQ = "No";
var isPublish = "Yes";

// High Functions
function load() {
    if (window.localStorage.getItem('email') == '') {
        window.open('/', '_self')
    }
    id = generateID(6);
    settings.TF('2');
    settings.objective('2');
    settings.subjective('2');
    head.TotalQuestion(questionNo - 1);
    database.ref("Quiz/" + id + "/").update({
        isPublished: "No"
    })
    database.ref("Quiz/" + id + "/").update({
        logo: "No"
    });
    Exameject();
    if (window.localStorage.getItem('pass') == 'null') {
        window.open('/', '_self')
    }
}

function generateID(length) {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}


var database = firebase.database();
//<-------------------------------------------------------------------------------------------------------->\\
// Dropup Items
var questionNo = 1;

function showSelector() {
    if (addQ == "No") {
        setTimeout(() => {
            document.getElementById('questionTypeSelector').classList.remove('hide');
            window.scroll(0, 0);
            addQ = "Yes";
        }, 200);
    }
}

function closeDopupQuestionSelector() {
    document.getElementById('questionTypeSelector').classList.add('hide');
    addQ = "No";
}

function addButton1() {
    document.getElementById('questionTypeSelector').classList.remove('hide');
    document.getElementById('questionSelectorButton1').classList.add('check');
    document.getElementById('questionSelectorButton2').classList.remove('check');
    document.getElementById('questionSelectorButton3').classList.remove('check');
    document.getElementById('question-no-objective').textContent = questionNo;

    isOpenSettings = 'Yes';
    setTimeout(() => {
        document.getElementById('upload-container-container').classList.add('hide');
        document.getElementById('title-d-container').classList.add('hide');
        document.getElementById('question-container-container').classList.add('hide');
        document.getElementById('objective-question-creator-container').classList.remove('hide');
        document.getElementById('questionTypeSelector').classList.add('hide');
    }, 500);
}

function addButton2() {
    document.getElementById('questionTypeSelector').classList.remove('hide');
    document.getElementById('questionSelectorButton1').classList.remove('check');
    document.getElementById('questionSelectorButton2').classList.add('check');
    document.getElementById('questionSelectorButton3').classList.remove('check');
    document.getElementById('question-no-objective').textContent = questionNo;
    isOpenSettings = 'Yes';
    setTimeout(() => {
        document.getElementById('upload-container-container').classList.add('hide');
        document.getElementById('title-d-container').classList.add('hide');
        document.getElementById('question-container-container').classList.add('hide');
        document.getElementById('subjective-question-creator-container').classList.remove('hide');
        document.getElementById('questionTypeSelector').classList.add('hide');
    }, 500);
}

function addButton3() {
    document.getElementById('questionTypeSelector').classList.remove('hide');
    document.getElementById('questionSelectorButton1').classList.remove('check');
    document.getElementById('questionSelectorButton2').classList.remove('check');
    document.getElementById('questionSelectorButton3').classList.add('check');
    document.getElementById('question-no-TF').textContent = questionNo;
    isOpenSettings = 'Yes';
    setTimeout(() => {
        document.getElementById('upload-container-container').classList.add('hide');
        document.getElementById('title-d-container').classList.add('hide');
        document.getElementById('question-container-container').classList.add('hide');
        document.getElementById('TF-question-creator-container').classList.remove('hide');
        document.getElementById('questionTypeSelector').classList.add('hide');
    }, 500);
}

//<-------------------------------------------------------------------------------------------------------->\\
// Title and Description
function setTitle() {
    if (document.getElementById("title-container").value !== "") {
        document.getElementById("title-exam").textContent = document.getElementById("title-container").value + ' | Exameject';
        head.title(document.getElementById("title-container").value);
    } else if (document.getElementById("title-container").value == "") {
        document.getElementById("title-exam").textContent = 'Quiz Maker';
        head.title(document.getElementById("title-container").value);
    }
}

function setDescription() {
    head.description(document.getElementById("discription-container").value);
}

// Teacher's Name
function setTeacherName() {
    if (document.getElementById("Teacher_Name-container").value !== "") {
        head.TeacherName(document.getElementById("Teacher_Name-container").value);
    }
}

//<-------------------------------------------------------------------------------------------------------->\\
// Subjective

// Setting Question and answer of Subjective
function setQuestionAnswerSubjective() {
    checkRed("question-subjective-container");
    checkRed("answer-subjective-container");
    if (checkRed("question-subjective-container") == "All is well!") {
        if (checkRed("answer-subjective-container") == "All is well!") {
            if (document.getElementById('question-no-subjective').textContent >= questionNo) {
                subjective.set();
            }
            subjective.question(document.getElementById("question-subjective-container").value, document.getElementById('question-no-subjective').textContent);
            subjective.answer(document.getElementById("answer-subjective-container").value, document.getElementById('question-no-subjective').textContent);

            var currentQuestion = document.getElementById('question-no-subjective').textContent;
            const QUESTION = document.getElementById("question-container");
            const style = document.createElement("LI");
            style.classList.add("questionLI");
            const question = document.createElement("Div");
            const answer = document.createElement("Div");
            question.innerHTML = document.getElementById('question-no-subjective').textContent + ") " + document.getElementById("question-subjective-container").value;
            answer.innerHTML = "Ans- " + document.getElementById("answer-subjective-container").value;
            var questionT = document.getElementById("question-subjective-container").value;
            var answerT = document.getElementById("answer-subjective-container").value;
            style.prepend(answer);
            style.prepend(question);
            QUESTION.prepend(style);
            style.addEventListener('click', function() {
                style.remove();
                addQ = "No";
                isOpenSettings = 'Yes';
                isPublish = "No";


                document.getElementById('question-no-subjective').textContent = currentQuestion;
                document.getElementById('upload-container-container').classList.add('hide');
                document.getElementById('title-d-container').classList.add('hide');
                document.getElementById('question-container-container').classList.add('hide');
                document.getElementById('subjective-question-creator-container').classList.remove('hide');
                document.getElementById('questionTypeSelector').classList.add('hide');
                document.getElementById("question-subjective-container").value = questionT;
                document.getElementById("answer-subjective-container").value = answerT;
            })

            setTimeout(() => {
                document.getElementById('upload-container-container').classList.remove('hide');
                document.getElementById('title-d-container').classList.remove('hide');
                document.getElementById('question-container-container').classList.remove('hide');
                document.getElementById('subjective-question-creator-container').classList.add('hide');
                document.getElementById('questionTypeSelector').classList.add('hide');
                document.getElementById("question-subjective-container").value = "";
                document.getElementById("answer-subjective-container").value = "";
                document.getElementById('questionSelectorButton1').classList.remove('check');
                document.getElementById('questionSelectorButton2').classList.remove('check');
                document.getElementById('questionSelectorButton3').classList.remove('check');
                if (document.getElementById('question-no-subjective').textContent >= questionNo) {
                    questionNo = questionNo + 1;
                    head.TotalQuestion(questionNo - 1);
                }
                sortQuestion();
                document.getElementById('question-no-objective').textContent = questionNo;
                document.getElementById('question-no-subjective').textContent = questionNo;
                document.getElementById('question-no-TF').textContent = questionNo;
                addQ = "No";
            }, 500);

            isOpenSettings = 'No';
            isPublish = "Yes";
        }
    }
}

//<-------------------------------------------------------------------------------------------------------->\\
//< -----------------------------------------------Objective----------------------------------------------- >\\

//creating variables of question option1
var correctOption = null;
var checkedRadio = null;

/* Adding functions to Inputs */
/* Adding Functions to radio buttons */
//when option1 radio button clicked
$('#option1_correct_option').on('click', function() {
    document.getElementById("option1_correct_option").checked = true;
    document.getElementById("option2_correct_option").checked = false;
    document.getElementById("option3_correct_option").checked = false;
    document.getElementById("option4_correct_option").checked = false;
    checkedRadio = "option1";
});

//when option2 radio button clicked
$('#option2_correct_option').on('click', function() {
    document.getElementById("option1_correct_option").checked = false;
    document.getElementById("option2_correct_option").checked = true;
    document.getElementById("option3_correct_option").checked = false;
    document.getElementById("option4_correct_option").checked = false;
    checkedRadio = "option2";
});

//when option3 radio button clicked
$('#option3_correct_option').on('click', function() {
    document.getElementById("option1_correct_option").checked = false;
    document.getElementById("option2_correct_option").checked = false;
    document.getElementById("option3_correct_option").checked = true;
    document.getElementById("option4_correct_option").checked = false;
    checkedRadio = "option3";
});

//when option4 radio button clicked
$('#option4_correct_option').on('click', function() {
    document.getElementById("option1_correct_option").checked = false;
    document.getElementById("option2_correct_option").checked = false;
    document.getElementById("option3_correct_option").checked = false;
    document.getElementById("option4_correct_option").checked = true;
    checkedRadio = "option4";
});


function Check_Red_Input(id, placeholder) {
    if (document.getElementById(id).value == "") {
        document.getElementById(id).classList.add("fill-it");
        document.getElementById(id).placeholder = "Fill it";
        document.getElementById(id).classList.add("fill-it-label");
        return "Not Filled";
    } else if (document.getElementById(id).value !== "") {
        document.getElementById(id).classList.remove("fill-it-label");
        document.getElementById(id).classList.remove("fill-it");
        document.getElementById(id).placeholder = placeholder;
        return document.getElementById(id).value;
    }
}

// Setting Question answer of Objective

function setQuestionAnswerObjective() {
    //variables
    var option1 = null,
        option2 = null,
        option3 = null,
        option4 = null;

    //----Adding function to radio that is checked----\\

    Check_Red_Input('Option-4-objective-container', "Option 4");
    option4 = Check_Red_Input('Option-4-objective-container', "Option 4");
    Check_Red_Input('Option-3-objective-container', "Option 3");
    option3 = Check_Red_Input('Option-3-objective-container', "Option 3");
    Check_Red_Input('Option-2-objective-container', "Option 2");
    option2 = Check_Red_Input('Option-2-objective-container', "Option 2");
    Check_Red_Input('Option-1-objective-container', "Option 1");
    option1 = Check_Red_Input('Option-1-objective-container', "Option 1");

    if (checkedRadio == "option1") {
        correctOption = option1;
    } else if (checkedRadio == "option2") {
        correctOption = option2;
    } else if (checkedRadio == "option3") {
        correctOption = option3;
    } else if (checkedRadio == "option4") {
        correctOption = option4;
    } else if (checkedRadio == null) {
        document.getElementById('plckit').classList.add('show');
        setTimeout(() => {
            document.getElementById('plckit').classList.remove('show');
        }, 3000);
    }
    checkRed("question-objective-container");
    checkRed("Option-1-objective-container");
    checkRed("Option-2-objective-container");
    checkRed("Option-3-objective-container");
    checkRed("Option-4-objective-container");

    if (checkRed("question-objective-container") == "All is well!" && checkRed("Option-1-objective-container") == "All is well!" && checkRed("Option-2-objective-container") == "All is well!" && checkRed("Option-3-objective-container") == "All is well!" && checkRed("Option-4-objective-container") == "All is well!" && correctOption !== null) {

        if (document.getElementById('question-no-objective').textContent >= questionNo) {
            objective.set();
        }
        objective.question(document.getElementById("question-objective-container").value, document.getElementById('question-no-objective').textContent);
        objective.options(document.getElementById("Option-1-objective-container").value, document.getElementById("Option-2-objective-container").value, document.getElementById("Option-3-objective-container").value, document.getElementById("Option-4-objective-container").value, correctOption, document.getElementById('question-no-objective').textContent);

        var currentQuestion = document.getElementById('question-no-objective').textContent;
        const QUESTION = document.getElementById("question-container");
        const style = document.createElement("LI");
        style.classList.add("questionLI");
        const question = document.createElement("Div");
        const option1D = document.createElement("Div");
        const option2D = document.createElement("Div");
        const option3D = document.createElement("Div");
        const option4D = document.createElement("Div");
        const correct = document.createElement("Div");
        question.innerHTML = document.getElementById('question-no-objective').textContent + ") " + document.getElementById("question-objective-container").value;
        option1D.innerHTML = "a) " + document.getElementById("Option-1-objective-container").value;
        option2D.innerHTML = "b) " + document.getElementById("Option-2-objective-container").value;
        option3D.innerHTML = "c) " + document.getElementById("Option-3-objective-container").value;
        option4D.innerHTML = "d) " + document.getElementById("Option-4-objective-container").value;
        correct.innerHTML = "Ans- " + correctOption;
        var questionT = document.getElementById("question-objective-container").value;
        var option1T = document.getElementById("Option-1-objective-container").value;
        var option2T = document.getElementById("Option-2-objective-container").value;
        var option3T = document.getElementById("Option-3-objective-container").value;
        var option4T = document.getElementById("Option-4-objective-container").value;
        var correctOptionT = checkedRadio;

        style.prepend(correct);
        style.prepend(option4D);
        style.prepend(option3D);
        style.prepend(option2D);
        style.prepend(option1D);
        style.prepend(question);
        QUESTION.prepend(style);
        style.addEventListener('click', function() {
            style.remove();
            if (correctOptionT == "option1") {
                document.getElementById("option1_correct_option").checked = true;
                document.getElementById("option2_correct_option").checked = false;
                document.getElementById("option3_correct_option").checked = false;
                document.getElementById("option4_correct_option").checked = false;
            } else if (correctOptionT == "option2") {
                document.getElementById("option1_correct_option").checked = false;
                document.getElementById("option2_correct_option").checked = true;
                document.getElementById("option3_correct_option").checked = false;
                document.getElementById("option4_correct_option").checked = false;
            } else if (correctOptionT == "option3") {
                document.getElementById("option1_correct_option").checked = false;
                document.getElementById("option2_correct_option").checked = false;
                document.getElementById("option3_correct_option").checked = true;
                document.getElementById("option4_correct_option").checked = false;
            } else if (correctOptionT == "option4") {
                document.getElementById("option1_correct_option").checked = false;
                document.getElementById("option2_correct_option").checked = false;
                document.getElementById("option3_correct_option").checked = false;
                document.getElementById("option4_correct_option").checked = true;
            }

            checkedRadio = correctOptionT;
            document.getElementById('question-no-objective').textContent = currentQuestion;
            document.getElementById('upload-container-container').classList.add('hide');
            document.getElementById('title-d-container').classList.add('hide');
            document.getElementById('question-container-container').classList.add('hide');
            document.getElementById('objective-question-creator-container').classList.remove('hide');
            document.getElementById('questionTypeSelector').classList.add('hide');
            document.getElementById("question-objective-container").value = questionT;
            document.getElementById("Option-1-objective-container").value = option1T;
            document.getElementById("Option-2-objective-container").value = option2T;
            document.getElementById("Option-3-objective-container").value = option3T;
            document.getElementById("Option-4-objective-container").value = option4T;
            addQ = "No";
            isOpenSettings = 'Yes';
            isPublish = "No";
        })

        setTimeout(() => {
            document.getElementById('upload-container-container').classList.remove('hide');
            document.getElementById('title-d-container').classList.remove('hide');
            document.getElementById('question-container-container').classList.remove('hide');
            document.getElementById('objective-question-creator-container').classList.add('hide');
            document.getElementById('questionTypeSelector').classList.add('hide');
            document.getElementById("question-objective-container").value = "";
            document.getElementById("Option-1-objective-container").value = "";
            document.getElementById("Option-2-objective-container").value = "";
            document.getElementById("Option-3-objective-container").value = "";
            document.getElementById("Option-4-objective-container").value = "";
            document.getElementById('questionSelectorButton1').classList.remove('check');
            document.getElementById('questionSelectorButton2').classList.remove('check');
            document.getElementById('questionSelectorButton3').classList.remove('check');

            document.getElementById("option1_correct_option").checked = false;
            document.getElementById("option2_correct_option").checked = false;
            document.getElementById("option3_correct_option").checked = false;
            document.getElementById("option4_correct_option").checked = false;
            checkedRadio = null;
            correctOption = null;
            option1 = null;
            option2 = null;
            option3 = null;
            option4 = null;
            if (document.getElementById('question-no-objective').textContent >= questionNo) {
                questionNo = questionNo + 1;
                head.TotalQuestion(questionNo - 1);
            }
            sortQuestion();
            document.getElementById('question-no-objective').textContent = questionNo;
            document.getElementById('question-no-subjective').textContent = questionNo;
            document.getElementById('question-no-TF').textContent = questionNo;
            addQ = "No";
        }, 500);

        isOpenSettings = 'No';
        isPublish = "Yes";

    }
}

//<-------------------------------------------------------------------------------------------------------->\\
// True/False

var checkedTF = null;

$('#True_button_TF').on('click', function() {
    document.getElementById("True_button_TF").classList.remove("untick");
    document.getElementById("True_button_TF").classList.add("tick");
    document.getElementById("False_button_TF").classList.remove("tick");
    document.getElementById("False_button_TF").classList.add("untick");
    checkedTF = "True";
});

$('#False_button_TF').on('click', function() {
    document.getElementById("False_button_TF").classList.remove("untick");
    document.getElementById("False_button_TF").classList.add("tick");
    document.getElementById("True_button_TF").classList.remove("tick");
    document.getElementById("True_button_TF").classList.add("untick");
    checkedTF = "False";
});



// Setting Question answer of True False

function setQuestionAnswerTF() {
    //variables
    var correctAnswer = null;

    //----Adding function to radio that is checked----\\

    if (checkedTF == "False") {
        correctAnswer = "False";
    } else if (checkedTF == "True") {
        correctAnswer = "True";
    } else if (checkedTF == null) {
        document.getElementById('errorTF').classList.add('show');
        correctAnswer = null;
        setTimeout(() => {
            document.getElementById('errorTF').classList.remove('show');
        }, 3000);
    }
    checkRed("question-TF-container");

    if (checkRed("question-TF-container") == "All is well!" && correctAnswer !== null) {

        if (document.getElementById('question-no-TF').textContent >= questionNo) {
            TF.set();
        }
        TF.question(document.getElementById("question-TF-container").value, document.getElementById('question-no-TF').textContent);
        TF.answer(correctAnswer, document.getElementById('question-no-TF').textContent);

        var currentQuestion = document.getElementById('question-no-TF').textContent;
        const QUESTION = document.getElementById("question-container");
        const style = document.createElement("LI");
        style.classList.add("questionLI");
        const question = document.createElement("Div");
        const option1T = document.createElement("Div");
        const option2T = document.createElement("Div");
        const correctAnswerD = document.createElement("Div");
        question.innerHTML = document.getElementById('question-no-TF').textContent + ") " + document.getElementById("question-TF-container").value;
        option1T.innerHTML = "a) True";
        option2T.innerHTML = "b) False";
        correctAnswerD.innerHTML = "Ans- " + correctAnswer;
        var questionT = document.getElementById("question-TF-container").value;
        var correctOptionT = correctAnswer;

        style.prepend(correctAnswerD);
        style.prepend(option2T);
        style.prepend(option1T);
        style.prepend(question);
        QUESTION.prepend(style);
        style.addEventListener('click', function() {
            style.remove();
            correctAnswer = correctOptionT;
            checkedTF = correctOptionT;
            if (correctAnswer == "True") {
                document.getElementById("True_button_TF").classList.remove("untick");
                document.getElementById("True_button_TF").classList.add("tick");
                document.getElementById("False_button_TF").classList.remove("tick");
                document.getElementById("False_button_TF").classList.add("untick");
            } else if (correctAnswer == "False") {
                document.getElementById("False_button_TF").classList.remove("untick");
                document.getElementById("False_button_TF").classList.add("tick");
                document.getElementById("True_button_TF").classList.remove("tick");
                document.getElementById("True_button_TF").classList.add("untick");
            }

            document.getElementById('question-no-TF').textContent = currentQuestion;
            document.getElementById('upload-container-container').classList.add('hide');
            document.getElementById('title-d-container').classList.add('hide');
            document.getElementById('question-container-container').classList.add('hide');
            document.getElementById('TF-question-creator-container').classList.remove('hide');
            document.getElementById('questionTypeSelector').classList.add('hide');
            document.getElementById("question-TF-container").value = questionT;
            addQ = "No";
            isOpenSettings = 'Yes';
            isPublish = "No";
        })

        setTimeout(() => {
            document.getElementById('upload-container-container').classList.remove('hide');
            document.getElementById('title-d-container').classList.remove('hide');
            document.getElementById('question-container-container').classList.remove('hide');
            document.getElementById('TF-question-creator-container').classList.add('hide');
            document.getElementById('questionTypeSelector').classList.add('hide');
            document.getElementById("question-TF-container").value = "";
            document.getElementById("True_button_TF").classList.remove("tick");
            document.getElementById("True_button_TF").classList.add("untick");
            document.getElementById("False_button_TF").classList.remove("tick");
            document.getElementById("False_button_TF").classList.add("untick");
            document.getElementById('questionSelectorButton1').classList.remove('check');
            document.getElementById('questionSelectorButton2').classList.remove('check');
            document.getElementById('questionSelectorButton3').classList.remove('check');
            checkedTF = null;
            correctAnswer = null;
            if (document.getElementById('question-no-TF').textContent >= questionNo) {
                questionNo = questionNo + 1;
                head.TotalQuestion(questionNo - 1);
            }
            sortQuestion();
            document.getElementById('question-no-objective').textContent = questionNo;
            document.getElementById('question-no-subjective').textContent = questionNo;
            document.getElementById('question-no-TF').textContent = questionNo;
            addQ = "No";
        }, 500);
        isOpenSettings = 'No';
        isPublish = "Yes";

    }
}

//<-------------------------------------------------------------------------------------------------------->\\
// Common Functions

function checkRed(id) {
    if (document.getElementById(id).value == "") {
        document.getElementById(id).classList.add("fill-it");
        return "Oh! no"
    } else {
        document.getElementById(id).classList.remove("fill-it");
        return "All is well!"
    }
}

// Firebase functions
// Head Functions
var head = {
    title: function(title) {
        database.ref("Quiz/" + id + "/").update({
            title: title
        })
    },
    description: function(description) {
        database.ref("Quiz/" + id + "/").update({
            description: description
        })
    },
    TeacherName: function(Name) {
        database.ref("Quiz/" + id + "/").update({
            TeacherName: Name
        })
    },
    Class: function(Class) {
        database.ref("Quiz/" + id + "/").update({
            Class: Class
        })
    },
    TotalQuestion: function(question) {
        database.ref("Quiz/" + id + "/").update({
            TotalQuestion: question
        })
    }
}

var subjective = {
    set: function() {
        database.ref("Quiz/" + id + "/" + questionNo + '/').update({
            questionType: "subjective"
        })
    },
    question: function(question, questionNumber) {
        database.ref("Quiz/" + id + "/" + questionNumber + '/').update({
            question: question
        })
    },
    answer: function(answer, questionNumber) {
        database.ref("Quiz/" + id + "/" + questionNumber + '/').update({
            answer: answer
        })
    }
}

var objective = {
    set: function() {
        database.ref("Quiz/" + id + "/" + questionNo + '/').update({
            questionType: "objective"
        })
    },
    question: function(question, questionNumber) {
        database.ref("Quiz/" + id + "/" + questionNumber + '/').update({
            question: question
        })
    },
    options: function(option1, option2, option3, option4, correct, questionNumber) {
        database.ref("Quiz/" + id + "/" + questionNumber + '/').update({
            correct: correct,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4
        })
    }
}

var TF = {
    set: function() {
        database.ref("Quiz/" + id + "/" + questionNo + '/').update({
            questionType: "True/False"
        })
    },
    question: function(question, questionNumber) {
        database.ref("Quiz/" + id + "/" + questionNumber + '/').update({
            question: question
        })
    },
    answer: function(answer, questionNumber) {
        database.ref("Quiz/" + id + "/" + questionNumber + '/').update({
            answer: answer
        })
    }
}


function sortQuestion() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("question-container");
    switching = true;
    while (switching) {
        switching = false;
        b = list.getElementsByTagName("LI");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}

let buttons = document.querySelectorAll(".ripple-EB");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        e.preventDefault();

        let overlay = document.createElement('span');
        overlay.classList.add("overlay");
        e.target.appendChild(overlay);

        let xValue = e.clientX - e.target.offsetLeft;
        let yValue = e.clientY - e.target.offsetTop

        overlay.style.left = xValue + "px";
        overlay.style.top = yValue + "px";
    });
}

function toast(id) {
    document.getElementById(id).classList.add('show');
    setTimeout(() => {
        document.getElementById(id).classList.remove('show');
    }, 3000);
}

function Exameject() {
    Email.send({
        SecureToken: "71cd6de4-a026-4610-b408-aef7236a1b97",
        To: window.localStorage.getItem('email'),
        From: 'EXAMEJECT <exameject@gmail.com>',
        Subject: 'Print Document Exameject',
        Body: `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <title>Exameject Print Email</title>
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <style type="text/css">

            /* vietnamese */
@font-face {
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/quicksand/v24/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkBgv58m-wi40.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/quicksand/v24/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkBgv58i-wi40.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/quicksand/v24/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkBgv58a-wg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
        
        * {
            font-family: Quicksand;
            font-weight: 900;
        }
        
        @supports (font-variation-settings: "wght" 450) {
            * {
                font-family: Quicksand;
                font-weight: 450;
            }
        }

                #outlook a {
                    padding: 0;
                }
                
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
                
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
                
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
                
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if mso]>
          <noscript>
          <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          </noscript>
          <![endif]-->
            <!--[if lte mso 11]>
          <style type="text/css">
            .mj-outlook-group-fix { width:100% !important; }
          </style>
          <![endif]-->
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                    }
                    .mj-column-per-33 {
                        width: 33% !important;
                        max-width: 33%;
                    }
                    .mj-column-per-67 {
                        width: 67% !important;
                        max-width: 67%;
                    }
                }
            </style>
            <style media="screen and (min-width:480px)">
                .moz-text-html .mj-column-per-100 {
                    width: 100% !important;
                    max-width: 100%;
                }
                
                .moz-text-html .mj-column-per-33 {
                    width: 33% !important;
                    max-width: 33%;
                }
                
                .moz-text-html .mj-column-per-67 {
                    width: 67% !important;
                    max-width: 67%;
                }
            </style>
            <style type="text/css">
                [owa] .mj-column-per-100 {
                    width: 100% !important;
                    max-width: 100%;
                }
                
                [owa] .mj-column-per-33 {
                    width: 33% !important;
                    max-width: 33%;
                }
                
                [owa] .mj-column-per-67 {
                    width: 67% !important;
                    max-width: 67%;
                }
            </style>
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    table.mj-full-width-mobile {
                        width: 100% !important;
                    }
                    td.mj-full-width-mobile {
                        width: auto !important;
                    }
                }
            </style>
        </head>
        
        <body style="word-spacing:normal;background-color:#e5e5e5;">
            <div style="background-color:#e5e5e5;">
                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#00003b" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="background:#00003b;background-color:#00003b;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#00003b;background-color:#00003b;width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
                                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="font-size:0px;padding:0px 0px 0px 0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width:600px;"><img alt="Fevicon" height="auto" src="https://0w7ko.mjt.lu/tplimg/0w7ko/b/s95yi/0pl2m.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                            width="600"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]></td></tr></table><![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-left:0px;padding-right:0px;text-align:center;">
                                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="background:#00003b;font-size:0px;padding:0px 0px 0px 0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width:600px;"><img alt="Print" height="auto" src="https://0w7ko.mjt.lu/tplimg/0w7ko/b/s95yi/0pl4o.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                            width="600"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center" style="font-size:0px;padding:10px 0px 10px 0px;padding-right:0px;padding-left:0px;word-break:break-word;">
                                                        <p style="border-top:solid 7px #E6E6E6;font-size:1px;margin:0px auto;width:100%;"></p>
                                                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 7px #E6E6E6;font-size:1px;margin:0px auto;width:600px;" role="presentation" width="600px" ><tr><td style="height:0;line-height:0;"> &nbsp;
        </td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]></td></tr></table><![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
                                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td style="vertical-align:top;padding:0 0 0 0;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="left" style="font-size:0px;padding:0 0 0 0;padding-top:0px;padding-right:25px;padding-bottom:0px;padding-left:25px;word-break:break-word;">
                                                                        <div style="font-family:Quicksand;, sans-serif;font-size:26px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                                            <h3 class="text-build-content" data-testid="-p7dTMHZmXi7" style="margin-top: 10px; font-weight: normal;"><span style="color:#000000;font-family:Quicksand;;font-size:18px;">Hello, ` + window.localStorage.getItem("username") + `</span></h3>
                                                                            <h3 class="text-build-content" data-testid="-p7dTMHZmXi7" style="; font-weight: normal;"><span style="color:#000000;font-family:Quicksand;;font-size:18px;">Thanks for using Exameject App</span></h3>
                                                                            <h3 class="text-build-content" data-testid="-p7dTMHZmXi7" style="; font-weight: normal;"><span style="color:#000000;font-family:Quicksand;;font-size:18px;">Code for your Exam</span></h3>
                                                                            <h2 class="text-build-content" style="text-align:center;; font-weight: normal;" data-testid="-p7dTMHZmXi7"><span style="color:#000000;font-family:Quicksand;;font-size:24px;"><b>` + id + `</b></span></h2>
                                                                            <h3 class="text-build-content" data-testid="-p7dTMHZmXi7" style="; font-weight: normal;"><span style="color:#000000;font-family:Quicksand;;font-size:18px;">If you want to print your own created exam paper then press the button given below. If it doesn't work<b> </b></span><a class="link-build-content"
                                                                                    style="color:inherit;; text-decoration: none;" target="_blank" href="http://127.0.0.1:5501/Print/Quiz/#/` + id + `"><span style="color:#00f7ff;font-family:Quicksand;;font-size:18px;"><b><u>Click here.</u></b></span></a></h3>
                                                                            <p class="text-build-content" data-testid="-p7dTMHZmXi7" style="margin: 10px 0; margin-bottom: 10px;"><span style="color:#000000;font-family:Quicksand;;font-size:16px;">&nbsp;</span></p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px 10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" bgcolor="#00f7ff" role="presentation" style="border:none;border-radius:14px;cursor:auto;mso-padding-alt:10px 25px 10px 25px;background:#00f7ff;" valign="middle">
                                                                                        <a href="http://127.0.0.1:5501/Print/Quiz/#/` + id + `">
                                                                                            <p style="display:inline-block;background:#00f7ff;color:#ffffff;font-family:Quicksand;, sans-serif;font-size:20px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px
                                                                                            25px 10px 25px;mso-padding-alt:0px;border-radius:14px; "><span style="background-color:transparent;color:#ffffff;font-family:Quicksand;;font-size:20px; "><b>Print</b></span></p>
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left " style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word; ">
                                                                        <div style="font-family:Quicksand;, sans-serif;font-size:16px;letter-spacing:normal;line-height:1;text-align:left;color:#000000; ">
                                                                            <h3 class="text-build-content " data-testid="y-QK7tZu5 " style="margin-top: 10px; font-weight: normal; "><span style="color:#000000;font-family:Quicksand;;font-size:18px; ">Thank you,&nbsp;</span></h3>
                                                                            <h3 class="text-build-content " data-testid="y-QK7tZu5 " style="margin-bottom: 10px; font-weight: normal; "><span style="color:#000000;font-family:Quicksand;;font-size:18px; ">Exameject Team</span></h3>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]></td></tr></table><![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]></td></tr></table><table align="center " border="0 " cellpadding="0 " cellspacing="0 " class=" " role="presentation " style="width:600px; " width="600 " bgcolor="#f3f3f3 " ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly; "><![endif]-->
                <div style="background:#f3f3f3;background-color:#f3f3f3;margin:0px auto;max-width:600px; ">
                    <table align="center " border="0 " cellpadding="0 " cellspacing="0 " role="presentation " style="background:#f3f3f3;background-color:#f3f3f3;width:100%; ">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-left:0px;padding-right:0px;text-align:center; ">
                                    <!--[if mso | IE]><table role="presentation " border="0 " cellpadding="0 " cellspacing="0 "><tr><td class=" " style="vertical-align:top;width:198px; " ><![endif]-->
                                    <div class="mj-column-per-33 mj-outlook-group-fix " style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%; ">
                                        <table border="0 " cellpadding="0 " cellspacing="0 " role="presentation " style="vertical-align:top; " width="100% ">
                                            <tbody>
                                                <tr>
                                                    <td align="center " style="font-size:0px;padding:10px 25px 10px 25px;padding-right:25px;padding-left:25px;word-break:break-word; ">
                                                        <table border="0 " cellpadding="0 " cellspacing="0 " role="presentation " style="border-collapse:collapse;border-spacing:0px; ">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width:148px; "><img alt="Fevicon " height="auto " src="https://0w7ko.mjt.lu/tplimg/0w7ko/b/s95yi/0pmxo.png " style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px; "
                                                                            width="148 "></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]></td><td class=" " style="vertical-align:top;width:402px; " ><![endif]-->
                                    <div class="mj-column-per-67 mj-outlook-group-fix " style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%; ">
                                        <table border="0 " cellpadding="0 " cellspacing="0 " role="presentation " style="vertical-align:top; " width="100% ">
                                            <tbody>
                                                <tr>
                                                    <td align="center " style="font-size:0px;padding:10px 40px 10px 40px;padding-top:10px;padding-right:40px;padding-left:40px;word-break:break-word; ">
                                                        <!--[if mso | IE]><table align="center " border="0 " cellpadding="0 " cellspacing="0 " role="presentation " ><tr><td><![endif]-->
                                                        <table align="center " border="0 " cellpadding="0 " cellspacing="0 " role="presentation " style="float:none;display:inline-table; ">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="padding:4px;vertical-align:middle; ">
                                                                        <table border="0 " cellpadding="0 " cellspacing="0 " role="presentation " style="background:#FF0000;border-radius:3;width:32; ">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style="padding:0px 0px 0px 0px;font-size:0;height:32;vertical-align:middle;width:32; "><img height="32 " src="https://www.mailjet.com/images/theme/v1/icons/ico-social/youtube.png
                                                                                            " style="border-radius:3;display:block; " width="32 "></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso | IE]></td><td><![endif]-->
                                                        <table align="center " border="0 " cellpadding="0 " cellspacing="0 " role="presentation " style="float:none;display:inline-table; ">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="padding:4px;vertical-align:middle; ">
                                                                        <table border="0 " cellpadding="0 " cellspacing="0 " role="presentation " style="border-radius:3;width:32; ">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style="padding:0px 0px 0px 0px;font-size:0;height:32;vertical-align:middle;width:32; ">
                                                                                        <a href="https://discord.gg/asA2nB3VD8 " target="_blank "><img height="32 " src="https://0w7ko.mjt.lu/tplimg/0w7ko/b/s95yi/xu42o.png " style="border-radius:3;display:block;
                                                                                            " width="32 "></a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso | IE]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]></td></tr></table><![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]></td></tr></table><table align="center " border="0 " cellpadding="0 " cellspacing="0 " class=" " role="presentation " style="width:600px; " width="600 " bgcolor="#f3f3f3 " ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly; "><![endif]-->
                <div style="background:#f3f3f3;background-color:#f3f3f3;margin:0px auto;max-width:600px; ">
                    <table align="center " border="0 " cellpadding="0 " cellspacing="0 " role="presentation " style="background:#f3f3f3;background-color:#f3f3f3;width:100%; ">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-left:0px;padding-right:0px;text-align:center; ">
                                    <!--[if mso | IE]><table role="presentation " border="0 " cellpadding="0 " cellspacing="0 "><tr><td class=" " style="vertical-align:top;width:600px; " ><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix " style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%; ">
                                        <table border="0 " cellpadding="0 " cellspacing="0 " role="presentation " style="vertical-align:top; " width="100% ">
                                            <tbody>
                                                <tr>
                                                    <td align="left " style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word; ">
                                                        <div style="font-family:Quicksand;, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000; ">
                                                            <p class="text-build-content " data-testid="zQF-oXzHw " style="margin: 10px 0; margin-top: 10px; "><span style="font-family:Quicksand;; ">The Exameject app helps you create your own quizzes, create forms, create accounts for kids and more, and automatically generates a report by observing at kids' performance.</span></p>
                                                            <p class="text-build-content " style="line-height: 27px; margin: 10px 0; " data-testid="zQF-oXzHw ">&nbsp;</p>
                                                            <p class="text-build-content " data-testid="zQF-oXzHw " style="margin: 10px 0; "><span style="font-family:Quicksand;;font-size:14px; ">Questions ? contact </span><a class="link-build-content " style="color:inherit;;
                                                                                            text-decoration: none; " href="mailto:exameject@gmail.com "><span style="color:#851E3E;font-family:Quicksand;;font-size:14px; "><b><u>exameject@gmail.com</u></b></span></a></p>
                                                            <p class="text-build-content " data-testid="zQF-oXzHw " style="margin: 10px 0; ">&nbsp;</p>
                                                            <p class="text-build-content " data-testid="zQF-oXzHw " style="margin: 10px 0; margin-bottom: 10px; "><span style="color:#000000;font-family:Quicksand;;font-size:14px; ">You are receiving this email because you are using Exameject app.</span></p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]></td></tr></table><![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
        
        </html>`
    })
}

var isOpenSettings = 'No';

var settings = {
    objective: function(marks) {
        database.ref("Quiz/" + id + "/").update({
            objectiveMarks: marks
        })
    },
    subjective: function(marks) {
        database.ref("Quiz/" + id + "/").update({
            subjectiveMarks: marks
        })
    },
    TF: function(marks) {
        database.ref("Quiz/" + id + "/").update({
            TFMarks: marks
        })
    },
    open: function() {
        if (isOpenSettings == 'No') {
            document.getElementById('settings-container').classList.remove('hide');
            isOpenSettings = 'Yes';
            document.getElementById('upload-container-container').classList.add('hide');
            document.getElementById('title-d-container').classList.add('hide');
            document.getElementById('question-container-container').classList.add('hide');
            document.getElementById('closeSettings').classList.remove('hide');
            document.getElementById('closeSettings').classList.add('closeSettings');
            document.getElementById('questionTypeSelector').classList.add('hide');
        }
    },
    close: function() {
        if (isOpenSettings == 'Yes') {
            document.getElementById('settings-container').classList.add('hide');
            isOpenSettings = 'No';
            document.getElementById('upload-container-container').classList.remove('hide');
            document.getElementById('title-d-container').classList.remove('hide');
            document.getElementById('question-container-container').classList.remove('hide');
            document.getElementById('objective-question-creator-container').classList.add('hide');
            document.getElementById('questionTypeSelector').classList.add('hide');
            document.getElementById('closeSettings').classList.add('hide');
            document.getElementById('closeSettings').classList.remove('closeSettings');
        }
    }
}

// Objective Marks
function setOQM() {
    if (document.getElementById("objective-Questions-Marks").value !== "") {
        settings.objective(document.getElementById("objective-Questions-Marks").value);
    } else if (document.getElementById("objective-Questions-Marks").value <= "2" && document.getElementById("objective-Questions-Marks").value >= "5") {
        settings.objective(document.getElementById("objective-Questions-Marks").value);
    }
}

// Subjective Marks
function setSQM() {
    if (document.getElementById("subjectve-Questions-Marks").value !== "") {
        settings.subjective(document.getElementById("subjectve-Questions-Marks").value);
    } else if (document.getElementById("subjectve-Questions-Marks").value <= "2" && document.getElementById("subjectve-Questions-Marks").value >= "5") {
        settings.subjective(document.getElementById("subjectve-Questions-Marks").value);
    }
}

// True False Marks
function setTFQM() {
    if (document.getElementById("True-False-Questions-Marks").value !== "") {
        settings.TF(document.getElementById("True-False-Questions-Marks").value);
    } else if (document.getElementById("True-False-Questions-Marks").value <= "2" && document.getElementById("True-False-Questions-Marks").value >= "5") {
        settings.TF(document.getElementById("True-False-Questions-Marks").value);
    }
}

document.getElementById("objective-Questions-Marks").addEventListener("focusout", () => {
    if (document.getElementById("objective-Questions-Marks").value == "" || document.getElementById("objective-Questions-Marks").value < "2") {
        document.getElementById("objective-Questions-Marks").value = "2";
        settings.objective('2');
    }
});

document.getElementById("subjectve-Questions-Marks").addEventListener("focusout", () => {
    if (document.getElementById("subjectve-Questions-Marks").value == "" || document.getElementById("subjectve-Questions-Marks").value < "2") {
        document.getElementById("subjectve-Questions-Marks").value = "2";
        settings.subjective('2');
    }
});

document.getElementById("True-False-Questions-Marks").addEventListener("focusout", () => {
    if (document.getElementById("True-False-Questions-Marks").value == "" || document.getElementById("True-False-Questions-Marks").value < "2") {
        document.getElementById("True-False-Questions-Marks").value = "2";
        settings.TF('2');
    }
});

var grade = null;

function class1() {
    grade = 1;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class2() {
    grade = 2;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class3() {
    grade = 3;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class4() {
    grade = 4;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class5() {
    grade = 5;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class6() {
    grade = 6;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class7() {
    grade = 7;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class8() {
    grade = 8;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class9() {
    grade = 9;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class10() {
    grade = 10;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class11() {
    grade = 11;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function class12() {
    grade = 12;
    head.Class(grade);

    setTimeout(() => {
        document.getElementById('class-selector-panel').classList.add('hide');
        document.getElementById('selectClass').textContent = grade;
    }, 1000);
}

function selectClass() {
    document.getElementById('class-selector-panel').classList.remove('hide');
}

function overlay() {
    document.getElementById('publish box').classList.add('invisible');
    document.getElementById('class-selector-panel').classList.add('hide');
    document.getElementById('overlay').classList.add('hide');
    if (document.getElementById('publish box').classList !== 'invisible') {
        window.open('/Home/', '_self');
    }
}

function Publish() {
    if (questionNo > 5) {
        if (document.getElementById('title-container').value !== "") {
            document.getElementById("Teacher_Name-container").classList.remove("fill-it");
            if (document.getElementById('Teacher_Name-container').value !== "") {
                document.getElementById("Teacher_Name-container").classList.remove("fill-it");
                document.getElementById('publish box').classList.remove('invisible');
                Exameject();
                document.getElementById('overlay').classList.remove('hide');
                database.ref("Quiz/" + id + "/").update({
                    isPublished: "Yes"
                })
            } else {
                document.getElementById("Teacher_Name-container").classList.add("fill-it");
            }
        } else {
            document.getElementById("title-container").classList.add("fill-it");
        }
    } else {
        if (document.getElementById('title-container').value !== "") {
            document.getElementById("title-container").classList.remove("fill-it");
            if (document.getElementById('Teacher_Name-container').value !== "") {
                document.getElementById("Teacher_Name-container").classList.remove("fill-it");
                document.getElementById('errorPublish').classList.add('show');
                setTimeout(() => {
                    document.getElementById('errorPublish').classList.remove('show');
                }, 3000);
            } else {
                document.getElementById("Teacher_Name-container").classList.add("fill-it");
            }
        } else {
            document.getElementById("title-container").classList.add("fill-it");
        }
    }
}

$('#title-container').on('keypress', function(e) {
    if (e.which == 13) {
        $('#discription-container').focus();
    }
});

$('#discription-container').on('keypress', function(e) {
    if (e.which == 13) {
        $('#Teacher_Name-container').focus();
    }
});

const share = e => {
    if (navigator.share) {
        navigator
            .share({
                title: "Code for exam",
                text: "Code for Exam Exameject is" + id + "\nOpen it in exameject application"
            })
            .then(() => window.open('/Home/', '_self'))
            .catch(error => console.log("error", error));
    }
};
document.getElementById("ShareCode").addEventListener("click", share);

function exit() {
    window.open('/Home/', '_self')
}

//<-------------------------------------------------------------------------------------------------------->\\
const uploadArea = document.querySelector("#uploadArea");

// Select Drop-Zoon Area
const dropZoon = document.querySelector("#dropZoon");

// Loading Text
const loadingText = document.querySelector("#loadingText");

// Slect File Input
const fileInput = document.querySelector("#fileInput");

// Select Preview Image
const previewImage = document.querySelector("#previewImage");

// File-Details Area
const fileDetails = document.querySelector("#fileDetails");

// Uploaded File
const uploadedFile = document.querySelector("#uploadedFile");

// Uploaded File Info
const uploadedFileInfo = document.querySelector("#uploadedFileInfo");

// Uploaded File  Name
const uploadedFileName = document.querySelector(".uploaded-file__name");

// Uploaded File Icon
const uploadedFileIconText = document.querySelector(
    ".uploaded-file__icon-text"
);

// Uploaded File Counter
const uploadedFileCounter = document.querySelector(".uploaded-file__counter");

// url of title
var url_title;

// Images Types
const imagesTypes = ["jpeg", "png"];

// When (drop-zoon) has (dragover) Event
dropZoon.addEventListener("dragover", function(event) {
    // Prevent Default Behavior
    event.preventDefault();

    // Add Class (drop-zoon--over) On (drop-zoon)
    dropZoon.classList.add("drop-zoon--over");
});

// When (drop-zoon) has (dragleave) Event
dropZoon.addEventListener("dragleave", function(event) {
    // Remove Class (drop-zoon--over) from (drop-zoon)
    dropZoon.classList.remove("drop-zoon--over");
});

// When (drop-zoon) has (drop) Event
dropZoon.addEventListener("drop", function(event) {
    // Prevent Default Behavior
    event.preventDefault();

    // Remove Class (drop-zoon--over) from (drop-zoon)
    dropZoon.classList.remove("drop-zoon--over");

    // Select The Dropped File
    const file = event.dataTransfer.files[0];

    // Call Function uploadFile(), And Send To Her The Dropped File :)
    uploadFile(file);
});

// When (drop-zoon) has (click) Event
dropZoon.addEventListener("click", function(event) {
    // Click The (fileInput)
    fileInput.click();
});

function uploadImageStorage(file) {
    const ref = firebase.storage().ref();
    const name = +new Date() + "-" + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
            url_title = url;
            database.ref("Quiz/" + id + "/").update({
                logo: "Yes",
                logoUrl: url
            });
        })
        .catch(console.error);
}

// When (fileInput) has (change) Event
fileInput.addEventListener("change", function(event) {
    // Select The Chosen File
    const file = event.target.files[0];

    // Call Function uploadFile(), And Send To Her The Chosen File :)
    uploadFile(file);
    uploadImageStorage(file);
});

// Upload File Function
function uploadFile(file) {
    // FileReader()
    const fileReader = new FileReader();
    // File Type
    const fileType = file.type;
    // File Size
    const fileSize = file.size;

    // If File Is Passed from the (File Validation) Function
    if (fileValidate(fileType, fileSize)) {
        // Add Class (drop-zoon--Uploaded) on (drop-zoon)
        dropZoon.classList.add("drop-zoon--Uploaded");

        // Show Loading-text
        loadingText.style.display = "block";
        // Hide Preview Image
        previewImage.style.display = "none";

        // Remove Class (uploaded-file--open) From (uploadedFile)
        uploadedFile.classList.remove("uploaded-file--open");
        // Remove Class (uploaded-file__info--active) from (uploadedFileInfo)
        uploadedFileInfo.classList.remove("uploaded-file__info--active");

        // After File Reader Loaded
        fileReader.addEventListener("load", function() {
            // After Half Second
            setTimeout(function() {
                // Add Class (upload-area--open) On (uploadArea)
                uploadArea.classList.add("upload-area--open");

                // Hide Loading-text (please-wait) Element
                loadingText.style.display = "none";
                // Show Preview Image
                previewImage.style.display = "block";

                // Add Class (file-details--open) On (fileDetails)
                fileDetails.classList.add("file-details--open");
                // Add Class (uploaded-file--open) On (uploadedFile)
                uploadedFile.classList.add("uploaded-file--open");
                // Add Class (uploaded-file__info--active) On (uploadedFileInfo)
                uploadedFileInfo.classList.add("uploaded-file__info--active");
            }, 500); // 0.5s

            // Add The (fileReader) Result Inside (previewImage) Source
            previewImage.setAttribute("src", fileReader.result);

            // Add File Name Inside Uploaded File Name
            uploadedFileName.innerHTML = file.name;

            // Call Function progressMove();
            progressMove();
        });

        // Read (file) As Data Url
        fileReader.readAsDataURL(file);
    } else {
        // Else

        this; // (this) Represent The fileValidate(fileType, fileSize) Function
    }
}

// Progress Counter Increase Function
function progressMove() {
    // Counter Start
    let counter = 0;

    // After 600ms
    setTimeout(() => {
        // Every 100ms
        let counterIncrease = setInterval(() => {
            // If (counter) is equle 100
            if (counter === 100) {
                // Stop (Counter Increase)
                clearInterval(counterIncrease);
            } else {
                // Else
                // plus 10 on counter
                counter = counter + 10;
                // add (counter) vlaue inisde (uploadedFileCounter)
                uploadedFileCounter.innerHTML = `${counter}%`;
            }
        }, 100);
    }, 600);
}

// Simple File Validate Function
function fileValidate(fileType, fileSize) {
    // File Type Validation
    let isImage = imagesTypes.filter(
        (type) => fileType.indexOf(`image/${type}`) !== -1
    );

    // If The Uploaded File Type Is 'jpeg'
    if (isImage[0] === "jpeg") {
        // Add Inisde (uploadedFileIconText) The (jpg) Value
        uploadedFileIconText.innerHTML = "jpg";
    } else {
        // else
        // Add Inisde (uploadedFileIconText) The Uploaded File Type
        uploadedFileIconText.innerHTML = isImage[0];
    }

    // If The Uploaded File Is An Image
    if (isImage.length !== 0) {
        // Check, If File Size Is 2MB or Less
        if (fileSize <= 2000000) {
            // 2MB :)
            return true;
        } else {
            // Else File Size
            toast('mdLess');
            return;
        }
    } else {
        // Else File Type
        toast('typeImage');
        return;
    }
}
// :)