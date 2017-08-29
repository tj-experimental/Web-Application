$(document).ready(function () {
    $(document).foundation();

    $('#log-in-form').on('valid.fndtn.abide', LoginUser);
    $('#login-username').focus();

    //Check for session expired flag
    if (window.location.href.indexOf("SessExp") > -1) {
        SetAlertBox('Your session has expired','alert');
    }

    //Try to pre-authenticate the user
    PreAuth();
});

function SetAlertBox(message,level) {

    var alertStr = '';

    //Create the alert message
    if (message.length > 0) {
        alertStr = '<div data-alert class="alert-box ' + level + '">';
        alertStr += message;
        alertStr += '</div>';
    }

    //Set the alert message
    $('#login-error').html(alertStr);
}

function SetFormSubmitButton(message, enabled) {
    $('#login-submit').val(message);
    if (enabled) {
        $('#login-submit').removeAttr('disabled');
    }
    else {
        $('#login-submit').attr('disabled', 'disabled');
    }
}

function PreAuth() {
    $.ajax({ type: "POST", url: "/AjaxService.svc/LOGIN_CheckPreAuth", contentType: "application/json; charset=utf-8", dataType: "json",
        data: JSON.stringify({}),
        success: function (json) {
            var data = (typeof json.d) === 'string' ? $.parseJSON(json.d) : json.d;

            if (data.valid) {
                //Redirect to main menu
                SetAlertBox('Authenticated... Going to main menu...','success');
                window.location = "/mainmenu.aspx";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });   
}

function LoginUser() {

    //Disable button from multiple requests
    var oldSubmitVal = $('#login-submit').val();
    SetFormSubmitButton('Logging In...', false);

    //Blank out previous errors
    SetAlertBox('', '');

    $.ajax({ type: "POST", url: "/AjaxService.svc/LOGIN_AuthUser", contentType: "application/json; charset=utf-8", dataType: "json",
        data: JSON.stringify({
            username: $('#login-username').val(),
            password: $('#login-password').val(),
            keeplogin: $('#login-keeplogin').is(':checked')
        }),
        success: function (json) {
            var data = (typeof json.d) === 'string' ? $.parseJSON(json.d) : json.d;

            if (data.valid) {

                if (data.session) {
                    Cookies.set('session', data.session, { expires: 7 });
                }

                //Redirect to main menu
                SetAlertBox('Authenticated... Going to main menu...', 'success');
                window.location = "/mainmenu.aspx";
            }
            else {
                SetAlertBox('Invalid Username / Password', 'alert');
                SetFormSubmitButton(oldSubmitVal, true);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            SetAlertBox('Error communicating with server. Please try again later.', 'alert');
            SetFormSubmitButton(oldSubmitVal, true);
        }
    });

    return false;
}