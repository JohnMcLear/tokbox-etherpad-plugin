var postAceInit = function(hook, context){
  var top = $('div#editbar').offset().top + $('div#editbar').height() + 5;
  $('<div>').attr({'id': 'tokbox'}).css({
    'position': 'absolute',
    'bottom': '0',
    'left': '0',
    'top': top + 'px',
    'width': '130px',
    'z-index': '1',
    'border-right': '1px solid #999',
    'border-top': '1px solid #999',
    'padding': '3px',
    'padding-bottom': '10px',
    'background-color': '#f1f1f1',
    'height': 'auto',
    'border': 'none',
    'border-right': '1px solid #ccc',
    'display': 'none',
  }).appendTo($('body'));

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

  if(avInURL()) showTokBox();

}

function enableTokBox(key){

}

function showTokBox(){
  $('#tokboxButton > a').css({"border-color":"red"});
  enableTokBox(clientVars.ep_tokbox.key);
  $("#tokbox").show();
  var right = $('#editorcontainer').css('right');
  right = right == 'auto' ? '0px' : right;
  $('#editorcontainer').css({"left":"130px", "width": "auto", "right": right});
}

function hideTokBox(){
  $("#tokbox").hide();
  $('#tokboxButton > a').css({"border-color":"#CCC"});
  $('#editorcontainer').css({"left":"0"});
}

function toggleTokBox(){
  if($("#tokbox").is(":visible")){
    console.log("hiding tokbox");
    hideTokBox();
  }else{
    showTokBox();
  }
}

function avInURL(){
  if (window.location.search.indexOf('av=YES') > -1) {
    return true;
  } else {
    return false;
  }
}

$(".tokboxButton").click(function(){ /* On click listener for tokbox button */
  toggleTokBox();
});

exports.postAceInit = postAceInit;
exports.enableTokBox = enableTokBox;
exports.showTokBox = showTokBox;
exports.hideTokBox = hideTokBox;
