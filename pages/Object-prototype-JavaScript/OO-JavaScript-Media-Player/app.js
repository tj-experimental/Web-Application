var playlist =  new Playlist;

var twofaceIdibia = new Song("African queen","2face","4:20");
var chrisbrown = new Song("Without you","Chris breezy", "4:00");
var fastAndFurious = new Movie("Fast and Furious", 2015 ,"2:00:00")

playlist.add(twofaceIdibia);
playlist.add(chrisbrown);
playlist.add(fastAndFurious);

var playlistElement = document.getElementById("playlist");

playlist.renderInElement(playlistElement);

var playButton = document.getElementById("play");
playButton.onclick =function(){
  playlist.play();
  playlist.renderInElement(playlistElement);
}

var nextButton = document.getElementById("next");
next.onclick =function(){
  playlist.next(); 
  playlist.renderInElement(playlistElement);
}
var stopButton = document.getElementById("stop");
stopButton.onclick =function(){
  playlist.stop();
  playlist.renderInElement(playlistElement); 
}

