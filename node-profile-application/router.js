var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");

var  contentHeaders = {'Content-Type': 'text/html'};

// Handle the HTTP route GET / and POST i.e HOME
function home(request, response){
    // if url == "/" && GET
  if (request.url === "/"){
    if(request.method.toLowerCase() === "get"){
       //Show the search field
      response.writeHead('200',contentHeaders);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    }else{
         //if the url == "/" && POST
      
       //get the POST data from body
      request.on("data", function(postBody){
         //Extract the username
         var query = querystring.parse(postBody.toString());
        //redirect to /:username
         response.writeHead(303, {"location": "/"+ query.username});
         
         response.end();
      });
    }
 }
}
    

// Handle the HTTP route for GET/:username i.e /jacktonye
function user(request, response){
  //if url == "/-----"
  var username =  request.url.replace("/","");
  if (username.length > 0){
    response.writeHead('200', contentHeaders);
 renderer.view('header', {}, response);
    
  //get json from treehouse
var studentProfile = new Profile(username);  
    //on "end"
  studentProfile.on("end", function(profileJSON){
     //show profile
    
      //Store the values which we need 
    var values = {
      avatarUrl: profileJSON.gravatar_url,
      username: profileJSON.profile_name,
      badges: profileJSON.badges.length,
      javascriptPoints: profileJSON.points.JavaScript
    }
    //Simple response
    renderer.view('profile', values, response);
    renderer.view('footer', {}, response);
    response.end();
    });
       
    //on "error"
  studentProfile.on("error", function(error){
    //show-error
    renderer.view('error', {errorMessage: error.message}, response);
    renderer.view('search', {}, response);
    renderer.view('footer', {}, response);
    response.end();
  });
        
  }
}

module.exports.home = home;
module.exports.user = user;