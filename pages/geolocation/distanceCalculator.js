//Calculates distance as the crow flies
function calculateDistance(lat1, lon1, lat2, lon2){
    //calculation from http://www.movable-type.co.uk/scripts/latlong.html
    var R = 3958.76; // miles

    //Setting
    var latRads1 = toRadians(lat1);
    var latRads2 = toRadians(lat2);
    var latDeltaRads = toRadians(lat2-lat1);
    var lonDeltaRads = toRadians(lon2-lon1);

    var a = Math.sin(latDeltaRads/2) * Math.sin(latDeltaRads/2) +
        Math.cos(latRads1) * Math.cos(latRads2) *
        Math.sin(lonDeltaRads/2) * Math.sin(lonDeltaRads/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
}

function toRadians(value) {
    return value * Math.PI / 180;
}


