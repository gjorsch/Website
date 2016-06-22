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
// writeJSON Data to file
var createDownloadLink = function(anchorSelector, str){
	if(window.navigator.msSaveOrOpenBlob) {
		var fileData = [str];
		blobObject = new Blob(fileData);
    console.log(fileData);
			window.navigator.msSaveOrOpenBlob(blobObject, "GLUESDataSet.json");
	} else {
		var url = "data:text/plain;charset=utf-8," + encodeURIComponent(str);
		$(anchorSelector).attr("href", url);
	};
};

//scroll to Keyword in hierarchy
//TODO does not work
var scrolltokeyword = function (ID){
  console.log(ID);
  $('html, body, subjectlist').animate({
       scrollTop: $(ID).offset().top
   }, 2000);
};
//check weather to hide the "select keyword" button or not
var checkToHide = function (ID, keywordarray){
  $(document).ready(function() {
    //console.log(keywordarray);
    //console.log("ID: "+ID);
    for (var i = 0; i < keywordarray.length; i++){
      var result = true;
      //console.log("keyword: "+keywordarray[i].ID);

      if (ID == keywordarray[i].ID){
        result = true;
      } else {
        result = false;
      };
    };
    //sconsole.log(result);
    return result;
  });
};
