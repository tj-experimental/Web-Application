
$( ".b1" )
  .mouseover(function() {
    $('.1').css("display","block");
})
.mouseout(function() {
    $('.1').css("display","none");
});

$( ".b2" )
  .mouseover(function() {
  $('.2').css("display","block");
})
  .mouseout(function() {
$('.2').css("display","none");
});

$( ".b3" )
  .mouseover(function() {
   $('.3').css("display","block");
})
.mouseout(function() {
   $('.3').css("display","none");
});



// Get the modal
var modal = $('.modal');

// When the user clicks the button, open the modal
$('.chat').click(function() {
    modal.css("display","block");
});

// When the user clicks on <span> (x), close the modal
$(".close").click(function() {
    modal.css("display","none");
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function(event) {
	if ( $( event.target ).is(modal)){
    modal.css("display","none");   
	}
});

	
var slideIndex = 1;
$(function(){
	showDivs(slideIndex);
})

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}




