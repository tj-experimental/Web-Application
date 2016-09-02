$("#error").hide();
$("#hud").show();


if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(gotLocation, getError);
}else{
    displayError("Your browser doesn't support geolocation");
}

function gotLocation(currentPosition) {

    var $restaurants = $("span");

    $restaurants.each(function(){
        var restaurantLatitude = $(this).data("lat");
        var restaurantLongitude = $(this).data("lon");

        var distanceInMiles = calculateDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, restaurantLatitude, restaurantLongitude);

        $(this).text(distanceInMiles + " miles");
    });
    $("#hud").hide();
}

function getError(error){
    var message;
    switch(error.code){
        case 1:
            message= "PERMISSION_DENIED: You need to give permission to get  your current location";
            break;
        case 2:
            message="POSITION_UNAVAILABLE: Error calculating position Please Refresh the page";
            break;
        case 3:
            message= "TIMEOUT: Sorry a timeout while getting location";
            break;
        default:
            message = "Unknown Error occurred please refresh page";
            console.log("Error : " + error.message + ", Code :" + error.code );
            break;
    }
    displayError(message);
}

function displayError(message) {
    $("#hud").hide();
    $("#error").text(message).slideDown("slow");
}