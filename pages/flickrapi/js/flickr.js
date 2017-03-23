$(document).ready(function(){
    if(window.location.protocol != "http:"){
        window.location.href = "http:" + window.location.href.substring(window.location.protocol.length);
    }
    $('button').click(function(){
        $("button").removeClass('selected');
        $(this).addClass("selected");
        var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var animal = $(this).text();
        var flickerOpts = {
            tags: animal,
            format: "json"
        };
        function displayPhotos(data){
            var photoHTML = '<ul>';
            $.each(data.items, function(index, photo){
                photoHTML += '<li class="grid-25 tablet-grid-50">'+
                    '<a href="'+ photo.link +'" class="image">'+'<img src="'+ photo.media.m + '" >' + '</a></l1>';
            });
            photoHTML += '</ul>';
            $('#photos').html(photoHTML);

        }

       // $.getJSON(flickerAPI, flickerOpts);
     $.getJSON(flickerAPI, flickerOpts, displayPhotos);
    });
});