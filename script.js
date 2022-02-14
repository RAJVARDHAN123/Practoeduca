var passwordInput = document.getElementById("password-container");
var emailInput = document.getElementById("email-container");

function load() {
    if (window.localStorage.getItem('pass') != '') {
        window.open('/Home/', '_self')
    }
}

function FindeEmail() {
    const dbRef = firebase.database().ref();
    dbRef.child("users").child(Decode(emailInput.value)).get().then((snapshot) => {
            if (snapshot.exists()) {
                Toast("errorEmail");
                emailAccept = false
            } else {
                emailAccept = true;
            }
        })
        .catch((error) => {
            return error;
        });
}

function checklog() {
    const dbRef = firebase.database().ref();
    dbRef.child("users").child(Decode(emailInput.value)).get().then((snapshot) => {
            if (snapshot.exists()) {
                firebase.database().ref('/users/' + Decode(emailInput.value) + '/password').on('value', (snapshot) => {
                    if (snapshot.val() == passwordInput.value) {

                        firebase.database().ref('/users/' + Decode(emailInput.value) + '/username').on('value', (snapshot) => {
                            window.localStorage.setItem("user", snapshot.val());
                            var username = snapshot.val();

                            firebase.database().ref('/users/' + Decode(emailInput.value) + '/password').on('value', (snapshot) => {
                                window.localStorage.setItem("pass", snapshot.val());
                                var pass = snapshot.val();

                                firebase.database().ref('/users/' + Decode(emailInput.value) + '/email').on('value', (snapshot) => {
                                    window.localStorage.setItem("email", snapshot.val());
                                    var email = snapshot.val();

                                    window.localStorage.setItem("email", email);
                                    window.localStorage.setItem("pass", pass);
                                    window.localStorage.setItem("user", username);
                                    window.open('/Home/', '_self');
                                })
                            })
                        })

                    } else {
                        Toast("errorEmailPass");
                    }
                })
            } else {
                Toast("errorEmail2");
            }
        })
        .catch((error) => {
            return error;
        });
}