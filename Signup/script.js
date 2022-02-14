// Variables

// For password Input
var passwordInput = document.getElementById("password-container");
// For email Input
var emailInput = document.getElementById("email-container");
// For name Input
var userInput = document.getElementById("Name-container");

// To accept email and password
var emailAccept = false,
    passAccept = false;

// Mail
var mail;

// Verification code
var Code = generateID(4);

// Letters of Code
// Code letter 1
var Code1 = Code[0];
// Code letter 2
var Code2 = Code[1];
// Code letter 3
var Code3 = Code[2];
// Code letter 4
var Code4 = Code[3];

// Random Code Generator
function generateID(numbers) {
    var chars = "0123456789";
    var RawID = "";
    for (var i = 0; i < numbers; i++) {
        RawID += chars[Math.floor(Math.random() * chars.length)];
    }
    return RawID;
}

// Email Validator
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
        return true;
    } else if (mail.value == "") {
        return null;
    } else {
        Toast("errorEmail2");
        return false;
    }
}

// Validate Password (is Password contains atleast one special character and letters should be between 7 to 15)
function CheckPassword() {
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (paswd.test(passwordInput.value)) {
        passAccept = true;
        return true;
    } else if (passwordInput.value == "") {
        passAccept = false;
        return null;
    } else {
        passAccept = false;
        Toast("passError");
        return false;
    }
}

// Checcking is email already exist or not with checking the validation of email
function FindeEmail() {
    const dbRef = firebase.database().ref();
    if (ValidateEmail(emailInput) == true) {
        dbRef
            .child("users")
            .child(Decode(emailInput.value))
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    emailAccept = false;
                    Toast("errorEmail");
                } else {
                    dbRef
                        .child(Decode(window.localStorage.getItem("Email")))
                        .child("Students")
                        .child(Decode(emailInput.value))
                        .get()
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                emailAccept = false;
                                Toast("errorEmail");
                            } else {
                                emailAccept = true;
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } else if (emailInput == null) {
        emailAccept = false;
        return null;
    } else {
        Toast("errorEmail2");
    }
}

// Updating user to database
function User(email, pass, username) {
    firebase.database().ref("/users/" + Decode(email)).update({
        username: username,
        email: email,
        password: pass,
        isBlocked: "no",
        isNotification: "no"
    });
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("pass", pass);
    window.localStorage.setItem("user", username);
}

// Sending mail for verifation
function Signup() {
    if (emailAccept == true && passAccept == true && userInput.value !== "") {
        SendMail();
        document.getElementById("Verification").removeAttribute("hidden");
        document.getElementById("Detailing").style.display = "none";
    } else {
        Toast("SubmitError");
    }
}

// For verification input (auto input changer)
inputCode("data-number-code-form", "data-number-code-input");

// Mail sender
function SendMail() {
    Email.send({
        SecureToken: "71cd6de4-a026-4610-b408-aef7236a1b97",
        To: emailInput.value,
        From: "EXAMEJECT <exameject@gmail.com>",
        Subject: "Verification Code To Signup To Practoeduca",
        Body: `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <title>Verification Examejec</title>
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <style type="text/css">
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
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" type="text/css">
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Varela+Round);
            </style>
            <!--<![endif]-->
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
                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="background:#ffffff;font-size:0px;padding:10px 25px 10px 0px;padding-top:10px;padding-right:25px;padding-bottom:10px;padding-left:1px;word-break:break-word;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width:574px;"><img alt="Practoeduca" height="auto" src="https://0w7ko.mjt.lu/tplimg/0w7ko/b/1zs9m/07wyq.png" style="border:none;border-radius:px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                            width="574"></td>
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
                                <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
                                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="left" style="font-size:0px;padding:0px 25px 0px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                        <div style="font-family:Arial, sans-serif;font-size:30px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                            <h3 class="text-build-content" data-testid="QjREbOo97Qg" style="margin-top: 10px; font-weight: normal;"><span style="color:#000000;font-family:Varela Round;font-size:18px;"><b>We're excited to have you get started. First, you need to enter this verification code to confirm your account. Please do not share it with anyone.</b></span></h3>
                                                            <h3 class="text-build-content" style="text-align:center;; font-weight: normal;" data-testid="QjREbOo97Qg"><span style="color:#000000;font-family:Varela Round;font-size:30px;"><b>` + Code + `</b></span></h3>
                                                            <h3 class="text-build-content" data-testid="QjREbOo97Qg" style="; font-weight: normal;"><span style="color:#000000;font-family:Varela Round;font-size:18px;"><b>If you have any questions, just reply to this email—we're always happy to help out.</b></span></h3>
                                                            <h3 class="text-build-content" data-testid="QjREbOo97Qg" style="; font-weight: normal;">&nbsp;</h3>
                                                            <h3 class="text-build-content" data-testid="QjREbOo97Qg" style="; font-weight: normal;"><span style="color:#000000;font-family:Varela Round;font-size:18px;"><b>Cheers,</b></span></h3>
                                                            <h3 class="text-build-content" data-testid="QjREbOo97Qg" style="margin-bottom: 10px; font-weight: normal;"><span style="color:#000000;font-family:Varela Round;font-size:18px;"><b>Practoeduca Team</b></span></h3>
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
                <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#f3f3f3" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="background:#f3f3f3;background-color:#f3f3f3;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f3f3f3;background-color:#f3f3f3;width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-left:0px;padding-right:0px;text-align:center;">
                                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:198px;" ><![endif]-->
                                    <div class="mj-column-per-33 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="font-size:0px;padding:10px 25px 10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;">
                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="width:49px;"><img alt="" height="auto" src="https://0w7ko.mjt.lu/tplimg/0w7ko/b/1zs9m/07xl0.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                            width="49"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:402px;" ><![endif]-->
                                    <div class="mj-column-per-67 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="center" style="font-size:0px;padding:10px 10px 10px 10px;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;word-break:break-word;">
                                                        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="padding:4px;vertical-align:middle;">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FF0000;border-radius:50%;width:25;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style="padding:0px 0px 0px 0px;font-size:0;height:25;vertical-align:middle;width:25;"><img height="25" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/youtube.png" style="border-radius:50%;display:block;" width="25"></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso | IE]></td><td><![endif]-->
                                                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="padding:4px;vertical-align:middle;">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:50%;width:25;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style="padding:0px 0px 0px 0px;font-size:0;height:25;vertical-align:middle;width:25;">
                                                                                        <a href="https://discord.gg/asA2nB3VD8" target="_blank"><img height="25" src="https://0w7ko.mjt.lu/tplimg/0w7ko/b/1pspz/04q5w.png" style="border-radius:50%;display:block;" width="25"></a>
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
                <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#f3f3f3" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="background:#f3f3f3;background-color:#f3f3f3;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f3f3f3;background-color:#f3f3f3;width:100%;">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;padding-left:0px;padding-right:0px;text-align:center;">
                                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:0px;word-break:break-word;">
                                                        <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                            <p class="text-build-content" data-testid="1PGDYhTjv" style="margin: 10px 0; margin-top: 10px;"><span style="color:#000000;font-family:Varela Round;font-size:14px;"><b>The Practoeduca app helps you create your own quizzes, create accounts for kids and more, if you have any issue regarding, feel free to ask.</b></span></p>
                                                            <p class="text-build-content" data-testid="1PGDYhTjv" style="margin: 10px 0;"><span style="color:#000000;font-family:Varela Round;font-size:13px;">&nbsp;</span></p>
                                                            <p class="text-build-content" data-testid="1PGDYhTjv" style="margin: 10px 0; margin-bottom: 10px;"><span style="color:#000000;font-family:Varela Round;font-size:14px;"><b>contact</b></span><span style="color:#55575d;font-family:Varela Round;font-size:14px;"><b> </b></span><a class="link-build-content"
                                                                    style="color:inherit;; text-decoration: none;" href="mailto:exameject@gmail.com"><span style="color:#851E3E;font-family:Varela Round;font-size:14px;"><b><u>exameject@gmail.com</u></b></span></a></p>
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
                <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                            <tr></tr>
                        </tbody>
                    </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
            </div>
        </body>
        
        </html>`
    }).then((message) => {
        if (message == "OK") {
            Toast("doneMail");
        }
    });
}

// Verification for updating user
function Verify() {
    if (
        document.getElementById("code-no. 1").value == Code1 &&
        document.getElementById("code-no. 2").value == Code2 &&
        document.getElementById("code-no. 3").value == Code3 &&
        document.getElementById("code-no. 4").value == Code4
    ) {
        User(emailInput.value, passwordInput.value, userInput.value);
        document.getElementById("Verification").style.display = "none";
        document.getElementById("AccountSuccesful").removeAttribute("hidden");
    } else {
        Toast("VerifyMail");
        document.getElementById("code-no. 1").value = null;
        document.getElementById("code-no. 2").value = null;
        document.getElementById("code-no. 3").value = null;
        document.getElementById("code-no. 4").value = null;
    }
}

// Changing input in pressing enter

$("#Name-container").on("keypress", function(e) {
    if (e.which == 13) {
        $("#email-container").focus();
    }
});

$("#email-container").on("keypress", function(e) {
    if (e.which == 13) {
        $("#password-container").focus();
    }
});

$("#password-container").on("keypress", function(e) {
    if (e.which == 13) {
        Signup();
    }
});