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
//highlight selected keyword in hierachy
var highlightKeyword = function (input){
  input = input.slice(0,input.length-3);

  $(document).ready(function() {
    $(".highlight").removeClass("highlight");
    $("a:contains("+input+")").addClass("highlight");
  });
};
//scroll to highlight
var scrollToHighlight = function(){
  $('.subjectlist').scrollTo('highlight'); 
  console.log("Scroll!");
};
//retrieve Name for datasets from GLUES Database
var getRemoteName = function(url){
  $.get(url, null, function(text){
    alert($(text).find('.literal'));
  });
};
