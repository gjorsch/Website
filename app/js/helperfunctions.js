//globals and defaults
var activeSelection = "";


//find parent Node
var getParent = function(data){
  var dispData = {};
  for (var i=0; i<data.length; i++){
    if (!data[i]["broader"] && data[i]["narrower"]){
      if (data[i]["prefLabel"] != undefined){
        for (var j =0; j < data[i]["prefLabel"].length;j++){
          //if possible use REGEX here for URI language selection
          if(data[i]["prefLabel"][j].slice(35,37)=== lang){
            dispData.parent = ({id:data[i]["@id"], label:data[i]["prefLabel"][j], narrower: [], name: getName(data[i]["prefLabel"][j],data)});
            for (var k=0; k<data[i]["narrower"].length;k++){
              dispData["parent"]["narrower"].push({id: data[i]["narrower"][k]});
            };
          };
        };
      };
    };
  };
  return dispData;
};
//define 2nd level hierachy nodes
var define2ndLevel = function(data,rawData){
  var narrowerItms = data["parent"]["narrower"];
  for (var i=0; i<narrowerItms.length; i++){
    narrowerItms[i]["label"] = getlabel(narrowerItms[i]["id"],rawData);
    narrowerItms[i]["name"] = getName(narrowerItms[i]["label"],rawData);
    if(checkNarrower(narrowerItms[i]["id"],rawData)){
      narrowerItms[i]["narrower"] = getNarrowerItms(narrowerItms[i]["id"],rawData);
    };
  };
  return data;
};
//define 3rd level hierachy nodes
var define3rdLevel = function(data,rawData){
  if(data["parent"]["narrower"]){
    for (var i = 0; i < data["parent"]["narrower"].length; i++) {
      if(data["parent"]["narrower"][i]["narrower"]){
        var narrowerItms = data["parent"]["narrower"][i]["narrower"];
        for (var j = 0; j < narrowerItms.length; j++) {
          narrowerItms[j]["narrower"]= getNarrowerItms(narrowerItms[j]["id"],rawData);
        }
      }
    }
  }
  return data;
};
//define 4th level hierachy nodes
var define4thLevel = function(data,rawData){
  if(data["parent"]["narrower"]){
    for (var i = 0; i < data["parent"]["narrower"].length; i++) {
      if(data["parent"]["narrower"][i]["narrower"]){
        for (var j = 0; j < data["parent"]["narrower"][i]["narrower"].length; j++) {
          if(data["parent"]["narrower"][i]["narrower"][j]["narrower"]){
              var narrowerItms = data["parent"]["narrower"][i]["narrower"][j]["narrower"];
              for (var k = 0; k < narrowerItms.length; k++) {
                narrowerItms[k]["narrower"]= getNarrowerItms(narrowerItms[k]["id"],rawData);
              }
            }
        }
      }
    }
  }
  return data;
};

//check for narrower Items
var checkNarrower = function(uri,rawData){
  var narrow = false;
  for (var i=0; i<rawData.length; i++){
    if(rawData[i]["@id"]===uri){
      if(rawData[i]["narrower"]){
        narrow = true;
      };
    };
  };
  return narrow;
};
//get narrower Items
var getNarrowerItms = function (uri, rawData) {
  var narrowerItms = [];
  for (var i=0; i<rawData.length; i++){
    if(rawData[i]["@id"]===uri){
      if(rawData[i]["narrower"]){
        for(var j=0; j<rawData[i]["narrower"].length;j++){
          var tempObj = {id:rawData[i]["narrower"][j],label:getlabel(rawData[i]["narrower"][j],rawData),name:getName(getlabel(rawData[i]["narrower"][j],rawData),rawData)};
          narrowerItms.push(tempObj);
        };
      };
    };
  };
  return narrowerItms;
};
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
          if(data[i]["prefLabel"][l].slice(35,37)=== lang){
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
      activeSelection = data[i]["ID"];
      console.log(activeSelection);
      links = data[i]["Links"];
    };
  };
  return links;
};
//find AgroVoc links
var getAgroLink = function(input,data){
  var link = null;
  for (var i = 0; i < data.length; i++) {
    if(input === data[i]["Name"]){
      link = data[i]["ID"];
    };
  };
  return link;
};
// return selected language
var getlanguage = function(){
  return lang;
}
//highlight selected keyword in hierachy
var highlightKeyword = function (input){
  input = input.slice(0,input.length-3);

  $(document).ready(function() {
    $(".highlight").removeClass("highlight");
    //$("a:contains("+input+")").parent().parent().addClass("highlight");

    //use to refer by ID not as by name as above
    //corresponding ID is missing in keywordlist-json
    $("#"+activeSelection).parent().addClass("highlight");
  });
};
//retrieve Name for datasets from GLUES Database
var getRemoteName = function(url){
  $.get(url, null, function(text){
    alert($(text).find('.literal'));
  });
};
