/* Supported browsers for cross browser compatibility test.
Google Chrome
Mozilla Firefox
Internet Explorer/Edge
Safari
*/
//Check if the user selected other and the Field isn't empty on blur
var checkJob = function(){
  var $otherJob = $('#other-title');
  //Check if the other job input is added to the DOM
  if($otherJob.length > 0){
    var $this = $otherJob;
        if($this.val() == "" || $this.val().length < 4){
          //Display a red border indicating the field cant be left empty
             $this[0].style.border = "2px solid red";
             //Add an error message to the page indicating the number of allowed values
             if($('#minchar').length == 0){
               $this.after('<p id="minchar" style="color:red;">Please Enter 4 or more characters</p>');
             }
             $this.focus();
          }
           else{
            //Else remove the red border
            $this[0].style.border = "";
            //Else remove the error message
            $('#minchar').remove();
           }
  }
  else{
    //Else remove the error message
    $('#minchar').remove();
  }

}

//Add a text input field
    //Use the id of the "other-title" for the field
    //Add a placeholder text of "Your Title" for the field
    //Add input Field to the DOM
var addInputField = function(){
      //get the drop container location
     var location = $('.dropcontainer');
    //Create an imput box with the id "other-title" and type "text" with placeholder text
    var $input_field =  $('<input>').attr({id:"other-title",name:"other_title", type:"text",
     placeholder:"Other Job Role",onkeyup:"checkJob()", onblur:"checkJob()",minlength: 4});
    //if the Element doesn't exist on the page
     if($('#other-title').length == 0){
      //place it after the drop container location
       location.after($input_field);
       //Autofocus
       $('#other-title').focus();
     }
}


//Hide the colors that aren't selected
var hideColor = function(length){
  var i;
  for(i = 0 ; i < length ; i++){
    //Hide all colors
    $('#color option:eq('+ i +')').attr("disabled", "disabled");
  }
}

//Show the required color
var showColor = function(min, max){
  var i;
  //Display the color options
  $('#colors-js-puns').css("display","block");
  //Set the option val to the min option
  $("#color").val($('#color option:eq('+min+')').val());
  for(i = min ; i < max ; i++){
    //Show only the color related to the option selected
    $('#color option:eq('+i+')').prop('disabled',"");
  }
}



//Hide the color label and the select menu until the user selects a Design Theme
$('#design').on("change keyup", function(){
  var optionValue = this.value;
  var colorOptions = $('#color option');
  //Store the length all available colors
  var length = colorOptions.length;

  switch(optionValue){
    case "Select Theme":
         //Hide the color options if the user select the Select Theme option
         $('#colors-js-puns').css("display","none");
         break;
    case "js puns":
          //If the user selects Theme-JS Puns then the color menu should only display
          //"Corn flower Blue", "Dark Slate Grey" and "Gold". first 3 colors.
          min = 0;
          max = 3;
          hideColor(length);
          showColor(min, max);
          break;
    case "heart js":
          //If the user select "Theme - 1  JS" then the color menu should only display "Tomato",
          //"Steel Blue" and "Dim Grey last 3 colors"
          var min = 3;
          var max = colorOptions.length;
          hideColor(length);
          showColor(min, max);
         break;
    default:
         // if none if the cases is true hide the colors select
         $('#colors-js-puns').css("display","none");
    }
});


//Enable the disabled events if the user uncheck the conflicting event
var enable  =function(event){
  var labels = $('.activities label');
  //Get the index of conflicting events
  switch(event){
    case 1:
        //Remove the disabled classname
        labels[3].className = "";
        //Set the input disabled to false
        labels[3].children[0].disabled = false;
        break;
    case 2:
        labels[4].className = "";
        labels[4].children[0].disabled = false;
        break;
    case 3:
        labels[1].className = "";
        labels[1].children[0].disabled = false;
        break;
    case 4:
        labels[2].className = "";
        labels[2].children[0].disabled = false;
        break;
    default:
        //Do Nothing

  }
}


//Disable any event that conflicts with the selected event
var disableConflict = function(event){

  var labels = $('.activities label');
  //Get the index of conflicting events
  switch(event){
    case 1:
        //Add the class name disabled
        labels[3].className = "disabled";
        //Set the input disabled to true
        labels[3].children[0].disabled = true;
        break;
    case 2:
        labels[4].className = "disabled";
        labels[4].children[0].disabled = true;
        break;
    case 3:
        labels[1].className = "disabled";
        labels[1].children[0].disabled = true;
        break;
    case 4:
        labels[2].className = "disabled";
        labels[2].children[0].disabled = true;
        break;
    default:

  }
}

//When the user chooses any of the activities calculate the total
var fieldCheckbox = $('.activities label input[type="checkbox"]');
fieldCheckbox.each(function() {
/*Register for Activities section of the form.
Some events are at the same time as others.
If the user selects a workshop, don't allow selection of a workshop at the same date and time
-- you should disable the checkbox and visually indicate that the workshop in the competing time slot
isn't available.
When a user unchecks an activity, make sure that competing activities (if there are any)
are no longer disabled.*/
  $(this).change(function(){
      //Store the activity information
      var activityData;
      //Store the final price of the selected Activities
      var price = 0;
      //Store the Event Day and Time
      // var daysAndTime = [] ;

      //Check for all selected events
      for (var i = 0; i < fieldCheckbox.length; i++) {
        var chosen = fieldCheckbox[i];
        //Get the data from the page and add it to an array activityData
        activityData = fieldCheckbox[i].nextSibling.textContent.split(/[\s,$]+/);
        //If any checkbox is checked
        if (chosen.checked){
            //Add the prices together
            price += parseInt(activityData[activityData.length - 1]);
            //If an events conflicts with the selected event disable the second event
            disableConflict(i);
            }
         else{
            //Else enable the event if not checked
          enable(i);
        }
      }
      //Append the Total to the activities fieldset
      var $total = $('<p id="total">Total: $'+ price +'</p>');
      //Check if the element doesn't exist in the DOM before appending
      if(!$('#total').get(0)){
        $('.activities').append($total);
      }
      else{
        //else Update the value
        $('#total')[0].innerText = 'Total: $' + price;
        //Check if the total is 0 remove the paragraph tag
        if(price == 0){
          $('#total').remove();
        }
      }
  })
});


//On change of the payment method
$('#payment').on("change keyup", function(){
  //Get the payment value selected
    var payMethod = this.value;
     $(this).siblings("div").hide();
    //Check if any of the payment methods where chosen
    //Display elements according to the selected method
    switch (payMethod) {
      case "credit card":
            $("#credit-card").show();
        break;
      case "paypal":
          $('#payment').siblings()[3].style.display = "block";
        break;
      case "bitcoin":
         $('#payment').siblings()[4].style.display = "block";
       break;
      default:
          $(this).siblings("div").hide();
    }
});

//Check if the entered email is valid
var emailIsValid =  function(value){
  //Using a Regular expression to determine the validity and return tru or false
    var regex = new RegExp ("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$");
    return regex.test(value);
}

//Display error red bordaer over the element that isn't completed
var error = function(element){
  $(element).css("border","2px solid red");
}
//Remove the border if no errors dettected
var noerror = function(element){
  $(element).css("border","");
}
//Display when the value is valid
var correct = function(element){
  $(element).css("border","1px solid green");
}

//On keyup when the user started typing indicate the validity of the input
$('input#mail').on("keyup focusout", function(){
    var email = $("input#mail").val();
    //if not valid
    if (!emailIsValid(email) && email !== "") {
        error("#mail");
        $("input#mail").focus();
        return false;
    }
    //else if valid
    else if(email !== ""){
       correct("#mail");
    }
    //else if empty
    else{
      noerror("#mail");
    }
});


//Check all the inputs and checkboxs for the validity of the input and if no value was entered
$('#title, .activities label input, #design, #cc-num, #zip, #cvv').bind("focusout keyup change click", function (){
                                                        //Defalut values
  var checked = $('input[type="checkbox"]:checked').length; //0
  var title = $('#title').val(); //"select job title"
  var design = $('#design').val();  //"Select Theme"
  var payment = $('#payment').val(); //"select_method"
  var ccnumber = $('#cc-num').val(); // ""
  var zip = $('#zip').val(); //""
  var cvv = $('#cvv').val(); //""
  //if invalid report error else report accepted
    if(checked == 0 ){
      error(".activities label");
    }
    if(title == "select job title"){
     error(".trigger");
    }
    if (design == "Select Theme"){
    error("#design");
    }
    if(checked != 0 ){
       noerror(".activities label");
    }
    if(title != "select job title"){
       noerror(".trigger");
    }
    if(design != "Select Theme"){
       noerror("#design");
    }

});

//Add Event listener on submit off the form
//Check all inout and values required if not valid
//Alert the user that errors exist in the form
var formElement = document.querySelector("form");
formElement.addEventListener("submit", function(event) {
  var checked = $('input[type="checkbox"]:checked').length; //0
  var title = $('#title').val(); //"select job title"
  var design = $('#design').val();  //"Select Theme"
  var payment = $('#payment').val(); //"select_method"
  var ccnumber = $('#cc-num').val(); // ""
  var zip = $('#zip').val(); //""
  var cvv = $('#cvv').val(); //""
  var month = $('.item')[0].innerText; //"Choose month"
  var year = $('.item')[1].innerText; //"Choose year"
  var submit = false;
  if(month == "Select Month" && year == "Select Year"){
    error('.selectize-input');
  }
  if (ccnumber == ""){
    error('#cc-num');
  }
  if(month != "Select Month" && year != "Select Year" && ccnumber != ""){
    noerror('.selectize-input');
    noerror('#cc-num');
  }
  if(checked == 0 || title == "select job title" || design == "Select Theme"){
     submit = false;
    error(".activities label");
    error("#title");
    error("#design");
  }
  if(payment == "select_method" && ccnumber != "" && zip != "" && cvv != "" &&
   month != "Select Month" && year != "Select Year" && checked != 0 &&
    title != "select job title" && design != "Select Theme"){
    submit = true;
  }
  if (payment == "credit card" && ccnumber != "" && zip != "" && cvv != "" &&
   month != "Select Month" && year != "Select Year" && checked != 0 &&
    title != "select job title" && design != "Select Theme"){
     submit = true;
  }
  if (payment == "paypal"  ||  payment == "bitcoin" && checked != 0 &&
    title != "select job title" && design != "Select Theme"){
     submit = true;
  }
  //If valid allow the user submit the form
  if(submit){
      event.cancelable = false;
      alert("Form Submitted Successfully");
  }
  if(!submit){
    event.preventDefault();
     console.log(event.cancelable);
    // validate the form
    alert("Form Incomplete submission cancelled.");
    }
});

//Apply the seletize plugin the the month and year select boxes
$('#exp-month').selectize();
$('#exp-year').selectize();


//Window on load functions
$(function(){
  $('form').attr("autocomplete","on");
  //Make the name and email fields required
  $('#name, #mail, #design, #title').prop("required",true);
  //Set the min length for the name to be 2 and
  $('#name').attr({minlength: 2, maxlength:20, placeholder:'UserName 2-20 Characters'});
  //Set the pattern of the email
  $('#mail').attr({placeholder:'Email (abc@xyz.com)',pattern:"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"});
  //Set focus to the first Text field on load
  $('#name').focus();
  //Hide the color div onload
  $('#colors-js-puns').css("display","none");
  //Hide all payment methods on load
  $('#payment').siblings("div").hide();
  //Show the credit card payment by default
  $('.credit-card').show();
  //Remove search feature of the selectize
  $('.selectize-input input[type = "text"]').prop("readonly" ,true);
  //Change the cursor to a pointer
  $('.selectize-input input[type = "text"]').css("cursor", "pointer");
  //Add attributes to the cvv input
  $('#cvv').attr({
    minlength:3,
    autocomplete: "off",
    placeholder:"3-4 digits", 
    pattern:'^[0-9]{3,4}$'});
  //Add attributes to the zip input
  $('#zip').attr({
    minlength:5,
    autocomplete:"off", 
    placeholder:"A0A 0A0",
    maxlength: 7, 
    pattern:'[a-zA-Z][0-9][a-zA-Z] [0-9][A-z][0-9]'});
  //Add attributes to the card number input
  $('#cc-num').attr({ 
        placeholder:'Card Number maximum 19 digits ',
        autocomplete:"off",
        maxlength:19, 
        pattern:'^?:4[0-9]{12}(?:[0-9]{3})?|5[12345][0-9]{14}|3[47][0-9]{13}|3(?:0[012345]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35[0-9]{3})[0-9]{11}'
  });
});
