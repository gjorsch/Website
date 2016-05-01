//globals and defaults
var activeSelection = "";

//get the Inner Html-property aka name of the Selectionbox item
//
var getElement = function(input){
    return $(input).html();
};
//get linked data from GLUES Links dataset for specific keyword
//requires the name of the Keyword and the Dataset for GLUES Data
//return the linked data for the keyword
var filterSelection = function(input,data){
  var links =[];
  for (var i = 0; i < data.length; i++) {
    if(input === data[i]["Name"]){
      activeSelection = data[i]["ID"];
      console.log(activeSelection);

      links = data[i]["Links"];
    };
  };
  return links;
};


//add highlight class to selected keyword corresponding in hierachy
var highlightKeyword = function (URI){
  $(document).ready(function() {
    //remove previously assigned highlight classes
    $(".highlight").removeClass("highlight");
    //use to refer by ID not as by name as above
    $(document.getElementById(URI)).addClass("highlight");
    console.log("highlight");
  });
};
//Transform Input from Keyword form
var transformToGLI = function(URI,title,Subjects){
  var object = {};
  object["ID"] = URI;
  object["title"] = title;
  object["subjects"] = Subjects.split(",");

  return object;
}
