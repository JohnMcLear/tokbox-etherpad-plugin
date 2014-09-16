var postAceInit = function(hook, context){
  if(clientVars.ep_tokbox){
    var tokBox = clientVars.ep_tokbox;
    if(tokBox && tokBox.key){ // Setup testing else poop out
      if(tokBox.onByDefault === true){
        enableTokBox(tokBox.key);
        showTokBox();
      }
    }
    else{
      alert('Tokbox key not set...  Set the key in your settings.json file');
    }
  }
}

function enableTokBox(key){
  $("#chatbox").prepend("<div id=tokbox><iframe id='videoEmbed' src='http://api.opentok.com/hl/embed/"+key+"' width='350' height='265' style='border:none' frameborder='0'></iframe></div>");
}

function showTokBox(){
  enableTokBox(clientVars.ep_tokbox.key);
  $("#editorcontainer").css({"right":"357px","width":"auto"});
  $("#tokbox").css({"z-index":"999999", "position":"absolute", "top":"0px"});
  $("#chatbox").attr("style", "width: 350px !important");
  $("#chatbox").addClass("stickyChat");
  $("#chatbox").show();
  $(".authorColors").attr("style", "top: 270px !important");
  var optPar = $("#options-stickychat").parent();
  optPar.hide();
  $("#videoEmbed").show();
}

function hideTokBox(){
  $("#editorcontainer").css({"right":"0px","width":"auto"});
  $("#videoEmbed").remove();
  $(".authorColors").attr("style", "top: 270px !important");
  $("#chatbox").attr("style", "width: 200px !important");
  $("#chatbox").removeClass("stickyChat");
  $("#chatbox").hide();
}

function toggleTokBox(){
  if($("#videoEmbed").is(":visible")){
    hideTokBox();
  }else{
    showTokBox();
  }
}

$(".tokboxButton").click(function(){ /* On click listener for tokbox button */
  toggleTokBox();
});

exports.postAceInit = postAceInit;
exports.enableTokBox = enableTokBox;
exports.showTokBox = showTokBox;
exports.hideTokBox = hideTokBox;
