//get name-property for specific URI
var getName = function(uri, data){
  var dispname;
  for (var i = 0; i < data.length; i++) {
    if(uri === data[i]["@id"]){
      if(data[i]["skosxl:literalForm"] != undefined){
        dispname = data[i]["skosxl:literalForm"]["@value"];
      }
    }
  }
  return dispname;
};

//get label for specific URI
var getlabel = function(uri, data){
  var dispname;
  for (var i = 0; i < data.length; i++) {
    if(uri === data[i]["@id"]){
      if(data[i]["prefLabel"] != undefined){
        for (var l =0; l<data[i]["prefLabel"].length;l++){
          if(data[i]["prefLabel"][l].slice(35,37)==="en"){
            dispname = data[i]["prefLabel"][l];
          }
        }
      }
    }
  }
  return dispname;
};

// get html for specific element
var getElement = function(input){
    return $(input).html();
};
//get links from dataset
var filterSelection = function(input,data){
  var links =[];
  for (var i = 0; i < data.length; i++) {
    if(input === data[i]["Name"]){
      links = data[i]["Links"];
    };
  };
  return links;
};
