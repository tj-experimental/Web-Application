var slideIndex = 1;

function plusDivs(n) {
    showDivs(slideIndex += n);
}


function showDivs(n) {
    if (document.getElementsByClassName("slide").length > 1) {
        var i;
        var x = document.getElementsByClassName("slide");
        if (n > x.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = x.length
        }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex - 1].style.display = "block";
    }
}


//Get the overlay with class modal
var $overlay = $('<div class="modal"></div>');
// Get the content on the modal
var $content = $('<div class="modal-content"></div>');
// Modal content
var $close = $('<span class="close"></span>');
$close.append('<img src="images/close.png">');
var $form = $('<form></form>').attr({
    method: "POST",
    action: ""
});
var formData = '<fieldset class="account-info">';
formData += '<label for="username"class= "name">Username:</label><input type="text" id="username" name="username"><br>';
formData += '<label for="password" class= "pwd">Password:</label><input type="password" name="password" id="password"><br>';
formData +='<label for="mail" class= "mail">Email:</label><input type="email" name="email" id ="email"><br></fieldset>';
formData += '<fieldset class="account-action"><input class="btn" type="submit" name="submit" value="Login">';
formData +='<a href="pages/signUp/index.html" class="btn" id="create_new">Create New Account</a>';
formData +='<label for="signin"><input type="checkbox" name="remember" id="signin"> Stay signed in </label></fieldset>';

$form.append(formData);

//append the object to the content  div
$content.append($close);
$content.append($form);
//append the content div to the overlay
$overlay.append($content);
//$("body").append($overlay);

$(".join button").click(function(){
    //append the overlay to the body
    $overlay.appendTo("body");
    var $userEmail =  $('.useremail');
    if($userEmail.val() == ""){
        $userEmail.css("border", "1px solid red");
    }else{
        $('#email').val($userEmail.val());
        //show the ovelay and the the content
        $overlay.show();
    }
});

$overlay.click(function(event){
    var modal = $('.modal');
    var close = $('img');
    var checkbox =  $('input#signin')[0];
    var name = $('#username')[0];
    var password = $('#password')[0];
    var email = $('#email')[0];

    //Check if the user cliked close or clicked outside the modal content
    if($(event.target).is(modal) || $(event.target).is(close)){
        name.value = "";
        password.value = "";
        email.value = "";

        if (checkbox.checked){
            checkbox.checked = false;
        }
        //hide the modal and contents upon closing it
        $(this).hide();
    }
});

// $close.click(function() {
//      $overlay.hide();
//    });


function buynow(){
    // Get the modal
    var modal = $('.buymodal');
    //Get the Close
    var close = $(".buyclose");

    displayModal(modal, close);
}

function displayModal(modal, close){
    // When the user clicks the button, open the modal
    modal.css("display","block");
    // When the user clicks on <span> (x), close the modal
    close.click(function() {
        modal.css("display","none");
    });

    //When the user clicks anywhere outside of the modal, close it
    $(window).click(function(event) {
        if ($( event.target ).is(modal)){
            modal.css("display","none");
        }
    });
}


function buyButton(id){
    var div;

    var divObj = [
        {
            divid:"p1",
            location: "pers"
        },
        {
            divid:"p2",
            location: "agn"
        },
        {
            divid:"p3",
            location: "unl"
        }
    ];

    for(var i = 0 ; i < divObj.length; ++i){
        div = divObj[i];
        if(id === div.divid){
            $('#'+div.location).css("display","block");
        }
        else{
            $('#'+div.location).css("display","none");
        }

    }
    // Get the modal
    var modal = $('.planmodal');
    //Get the Close
    var close = $(".planclose");

    displayModal(modal, close);

}


function chosenplan(id){
    var plans = ["Personal Plan","Agency Plan","Unlimited Plan"];
    var selected = plans[id];
    var tag;
    var message;
    var currentplan;

    var availablePlans = [
        {
            plan:"Personal Plan",
            data: "Our personal plan consist of free initial usage and billed $250 anually",
            tag:'personal_plan'
        },
        {
            plan:"Agency Plan",
            data: "Our Agency plan consist of $123 initial usage and billed $250 anually",
            tag: 'agency_plan'
        },
        {
            plan: "Unlimited Plan",
            data: "Our Unlimited plan consist of $232 initial usage and billed $250 anually",
            tag: 'unlimited_plan'
        }

    ];

    for (var i= 0; i< availablePlans.length; ++i){
        currentplan = availablePlans[i];
        if(selected == currentplan.plan){
            message = currentplan.data;
            tag =  currentplan.tag;
        }
    }

    print(message, tag);
}

function print(message,tag){
    var output = document.getElementById(tag);
    output.innerHTML =  message;
}


$('.buymodal').css("display","none");
// Add smooth scrolling to all links
$("a").on('click', function(event) {
    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 2000, function(){
            //window.location.hash = hash;
        });
    } // End if
});

$(function(){
    var isIE = function () {
        var userAgent = navigator.userAgent;
        return userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
    };
    $( ".box" ).mouseover(function() {
        if(isIE()){
            $(this).css({border: "3px solid #cce6ff",'border-offset': '1px'}).find("img").css("display","flex");
        }else{
            $(this).find("img").css("display","flex");
        }
    }).mouseout(function() {
        if(isIE()){
            $(this).css("border", "none").find("img").css("display","none");
        }else {
            $(this).find("img").css("display", "none");
        }
    });


    $(".imgInfo__1").click(function(){
        chosenplan(0);
    });
    $(".imgInfo__2").click(function(){
        chosenplan(1);
    });
    $('.imgInfo__3').click(function(){
        chosenplan(2);
    });
    // if($('.users .ng-scope').length > 1){
    //   showDivs(slideIndex);
    // }
});
