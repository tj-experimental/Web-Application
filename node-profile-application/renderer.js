var fs = require("fs");

function mergeValues(values, content){
  //Cylcle over the keys 
  for(var key in values){
  //Rep;ace all {{key}} with the value from the values object
  content = content.replace("{{"+ key +"}}", values[key]);
  }
  
//return  the merged content
 return content;
}

function view(templateName, values, response){
   //read from the template files
 var fileContents = fs.readFileSync('./views/'+ templateName +'.html', 'utf8');
     //Insert values into the content
  fileContents = mergeValues(values, fileContents);
    //Wirte out the content to the response
     response.write(fileContents);            
}


module.exports.view =view;