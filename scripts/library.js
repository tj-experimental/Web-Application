

// function area(modal, btn, span, er) {
// 	btn.onclick = function() {
// 		modal.style.display = "block";
// 	}
// 	// When the user clicks on <span> (x), close the modal
// 	span.onclick = function() {
// 		er.value = "";
// 		br.value = "";
// 		alert_hide();
// 		modal.style.display = "none";
// 	}
// 	// When the user clicks anywhere outside of the modal, close it
// 	window.onclick = function(event) {
// 		if (event.target == modal) {
// 			er.value = "";
// 			br.value = "";
// 			alert_hide();
// 			modal.style.display = "none";
// 		}
// 	}
// }

// function chat() {
// 	var modal = document.getElementById('test1');
// 	var btn = document.getElementById("upload1");
// 	var span = document.getElementsByClassName("close1");
// 	var er = document.getElementById("createfile");
// 	area(modal, btn, span, er);
// }

// $(function() {
// 	var modal = $('#test1');
//     $( ".buy1" ).click(function() {
// 			modal.style.display = "block";
// 	})  
// 	$( ".close1" ).click(function() {
// 		modal.style.display = "none";
// 	})
// 	$( ".close1" ).click(function() {
// 		window.onclick = function(event) {
// 			if (event.target == modal) {
// 				modal.style.display = "none";
// 			}
// 		}
// 	})
// });

// Get the modal
var modal = $('.modal');

// Get the button that opens the modal


// Get the <span> element that closes the modal


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
showDivs(slideIndex);

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




