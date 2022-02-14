document.getElementById('UserName').textContent = window.localStorage.getItem("user");

var emailInput = document.getElementById('mail');
var body = document.getElementById('body').value;

function load() {
    if (window.localStorage.getItem('email') == '') {
        window.open('/', '_self')
    }
}
// Mail sender
function SendMail() {
    Email.send({
        SecureToken: "71cd6de4-a026-4610-b408-aef7236a1b97",
        To: emailInput.value,
        From: "EXAMEJECT <exameject@gmail.com>",
        Subject: "Practoeduca",
        Body: `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <title>Practoeduca</title>
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
            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet" type="text/css">
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
                @import url(https://fonts.googleapis.com/css?family=Quicksand);
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
                                                        <div style="font-family:Arial, sans-serif;font-size:13px;letter-spacing:normal;line-height:1;text-align:left;color:#000000;">
                                                            <h3 class="text-build-content" data-testid="QjREbOo97Qg" style="margin-top: 10px; font-weight: normal;"><span style="color:#000000;font-family:Quicksand;font-size:18px;"><b>` + body + `</b></span></h3>
                                                            <p class="text-build-content" data-testid="QjREbOo97Qg" style="margin: 10px 0;">&nbsp;</p>
                                                            <h3 class="text-build-content" data-testid="QjREbOo97Qg" style="; font-weight: normal;"><span style="color:#000000;font-family:Quicksand;font-size:18px;"><b>Regards,</b></span></h3>
                                                            <h3 class="text-build-content" data-testid="QjREbOo97Qg" style="margin-bottom: 10px; font-weight: normal;"><span style="color:#000000;font-family:Quicksand;font-size:18px;"><b>XYZ</b></span></h3>
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
                                                            <p class="text-build-content" data-testid="1PGDYhTjv" style="margin: 10px 0; margin-top: 10px;"><span style="color:#000000;font-family:Quicksand;font-size:14px;"><b>The Practoeduca app helps you create your own quizzes, create accounts for kids and more, if you have any issue regarding, feel free to ask.</b></span></p>
                                                            <p class="text-build-content" data-testid="1PGDYhTjv" style="margin: 10px 0;"><span style="color:#000000;font-family:Quicksand;font-size:13px;">&nbsp;</span></p>
                                                            <p class="text-build-content" data-testid="1PGDYhTjv" style="margin: 10px 0; margin-bottom: 10px;"><span style="color:#000000;font-family:Quicksand;font-size:14px;"><b>contact</b></span><span style="color:#55575d;font-family:Quicksand;font-size:14px;"><b> </b></span><a class="link-build-content" style="color:inherit;; text-decoration: none;"
                                                                    href="mailto:exameject@gmail.com"><span style="color:#851E3E;font-family:Quicksand;font-size:14px;"><b><u>exameject@gmail.com</u></b></span></a></p>
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
                <!--[if mso | IE]></td></tr></table><![endif]-->
            </div>
        </body>
        
        </html>`
    })
}

document.getElementById('backlay').addEventListener('click', () => {
    document.getElementById('backlay').classList.add('fade');
    document.getElementById('mail-sender').classList.add('hide');
    setTimeout(() => {
        document.getElementById('backlay').classList.add('hide');
    }, 400);
})

document.getElementById('backlay2').addEventListener('click', () => {
    document.getElementById('backlay2').classList.add('fade');
    document.getElementById('Coder').classList.add('hide');
    setTimeout(() => {
        document.getElementById('backlay2').classList.add('hide');
    }, 400);
})

function openMail() {
    document.getElementById('backlay').classList.remove('fade');
    document.getElementById('mail-sender').classList.remove('hide');
    document.getElementById('backlay').classList.remove('hide');
}

function openExam() {
    document.getElementById('backlay2').classList.remove('fade');
    document.getElementById('Coder').classList.remove('hide');
    document.getElementById('backlay2').classList.remove('hide');
}

function openE() {
    const dbRef = firebase.database().ref();
    dbRef.child("Quiz").child(document.getElementById('code').value).get().then((snapshot) => {
        if (snapshot.exists()) {
            window.localStorage.setItem("Quiz", document.getElementById('code').value);
            window.open('/Exams/Run/', "_self");
            document.getElementById('code').value = "";
        } else {
            toast('codeError');
            document.getElementById('code').value = "";
        }
        document.getElementById('backlay2').classList.add('fade');
        document.getElementById('Coder').classList.add('hide');
        setTimeout(() => {
            document.getElementById('backlay2').classList.add('hide');
        }, 400);
    }).catch((error) => {
        console.error(error);
    });
}

function openCreate() {
    window.open('/Exams/Create/', '_self')
}