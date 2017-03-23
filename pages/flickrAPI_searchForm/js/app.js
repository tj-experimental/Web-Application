$(document).ready(function() {
    if(window.location.protocol != "http:"){
        window.location.href = "http:" + window.location.href.substring(window.location.protocol.length);
    }
    $('form').submit(function (event) {
        event.preventDefault();
        var $searchField = $('#search');
        var $submitBtn = $('#submit');
        $searchField.prop("disabled", true);
        $submitBtn.prop("disabled", true).val("Searching....");
        var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var searchValue =  $searchField.val();
        var flickrOptions = {
            tags: searchValue,
            format: "json"
        };
        function displayPhotos(data) {
            var photoHTML = '<ul>';
            if(data.items.length == 0){
                photoHTML += '<li class="grid-25 tablet-grid-50">';
                photoHTML += '<span style="color: red"> Sorry No image Found With Tag "'+ searchValue + '" </span></l1>';
            }
            else{
                $.each(data.items,function(i,photo) {
                    photoHTML += '<li class="grid-25 tablet-grid-50">';
                    photoHTML += '<a href="' + photo.link + '" class="image">';
                    photoHTML += '<img src="' + photo.media.m + '"></a></li>';
                }); // end each
            }
            photoHTML += '</ul>';
            $searchField.prop("disabled", false);
            $submitBtn.prop("disabled", false).val("Search");
            $('#photos').html(photoHTML);
        }
        $.getJSON(flickerAPI, flickrOptions, displayPhotos);

    });

}); // end ready