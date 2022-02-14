let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".fa-search");
var buttonReturn = document.getElementById('returnto');

window.localStorage.setItem('school name', 'DBS');

function load() {
    if (window.localStorage.getItem('email') == '') {
        window.open('/', '_self')
    }
}

buttonReturn.addEventListener("click", () => {
    window.open('/Home/', '_self');
})

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDTZlc11hoFoV5EJnCwAVWcSx52vvEWX4o",
    authDomain: "practoeduca4535.firebaseapp.com",
    databaseURL: "https://practoeduca4535-default-rtdb.firebaseio.com/",
    projectId: "practoeduca4535",
    storageBucket: "practoeduca4535.appspot.com",
    messagingSenderId: "879047101871",
    appId: "1:879047101871:web:7898febee0d6b93d0ab35a"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
var chatMsgs = firebase.database().ref().child('Chat' + '/' + window.localStorage.getItem('school name'));

// Bind elements
const inputName = document.getElementById('input-name');
const btnLogin = document.getElementById('btn-login');
const inputMsg = document.getElementById('input-message');
const btnSendMsg = document.getElementById('btn-sendMsg');
const chatWrap = document.getElementById('chat-wrap');
const pageChat = document.getElementById('page-chat');
var userName = "";

// App start here
var app = {
    // Initialize the app
    init: function() {
        this.getName();
        this.fireListen();
    },
    // Look for user name in local storage
    getName: function() {
        userName = localStorage.getItem('username');
        window.scrollTo(0, document.body.scrollHeight);
        pageChat.classList.remove("d-none");
    },
    // Get chat message from database & listen to update
    fireListen: function() {
        chatMsgs.on('value', function(chatMsgs) {
            var displayMsgs = document.createElement('div');
            chatMsgs.forEach(function(chatMsg) {
                // console.log(chatMsg.val());
                var message = chatMsg.val().message;
                var sender = chatMsg.val().sender;
                var time = chatMsg.val().time;
                var profile = chatMsg.val().profile;
                var displayMsg = app.displayMsg(message, sender, time, profile);
                displayMsgs.append(displayMsg);
            });
            chatWrap.innerHTML = "";
            chatWrap.append(displayMsgs);
            app.scrollBtm();
        });
    },
    // Writing data to firebase, add new item with .push, replace entire list with .set
    writeMessage: function(sender, message, time) {
        firebase.database().ref('Chat' + '/' + window.localStorage.getItem('school name') + '/').push({
            sender: sender,
            message: message,
            profile: window.localStorage.getItem('profile'),
            time: time
        });
    },
    // Send message when click on submit button
    sendMsg: function() {

        var date = new Date();

        if (inputMsg.value) { // Only send when input is not empty
            this.writeMessage(userName, inputMsg.value, date.toLocaleString('en-US', { hour12: true }));
            inputMsg.value = "";
        }
    },
    // Scroll to bottom
    scrollBtm: function() {
        window.scrollTo(0, document.body.scrollHeight);
    },
    // Construct chat bubble
    displayMsg: function(message, sender, time, image) {
        var displayMsg = document.createElement('span');
        var displaySender = document.createElement('span');
        var displayTime = document.createElement('span');
        var displayImage = document.createElement('img');
        displayMsg.innerHTML = message;
        displaySender.innerHTML = sender;
        displayTime.innerHTML = time;
        displayImage.src = image;
        displaySender.classList.add('sender');
        displayTime.classList.add("time");
        displayImage.classList.add("friend-profile");
        if (userName === sender) {
            displayMsg.prepend(displayTime);
            displayMsg.prepend(displayImage);
            displayMsg.classList.add("you", "first", "align-right");
        } else {
            displayMsg.classList.add("friend", "last");
            displayTime.classList.add("friend", "time");
            displaySender.classList.add("friend", "sender");
            displayImage.classList.add("friend-profile");
            displayMsg.prepend(displaySender);
            displayMsg.prepend(displayImage);
            displayMsg.prepend(displayTime);
            // notifyMe(sender, message);
        };
        return displayMsg;
    }
};

app.init();

// following are the code to change sidebar button(optional)
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("fa-bars", "fa-times");
    } else {
        closeBtn.classList.replace("fa-times", "fa-bars");
    }
}

$(document).on("keypress", "input", function(e) {
    if (e.which == 13) {
        var inputVal = $(this).val();
        if (inputVal !== "") {
            app.sendMsg();
        }
    }
});

function signOut() {
    database.ref('Users' + '/' + window.localStorage.getItem('access token')).remove();

    window.localStorage.setItem('username', "");
    window.localStorage.setItem('email', "");
    window.localStorage.setItem('school name', "");
    window.localStorage.setItem('access token', "");
    window.localStorage.setItem('profile', "");
    window.localStorage.setItem('type', "");
}