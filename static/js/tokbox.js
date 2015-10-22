var postAceInit = function(hook, context){

  window.tokbox = {};

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

  $('#tokbox').unbind("click"); // postAceInit might fire multiple times, we should only handle the click event once.
  $('#tokbox').on("click", function(){
    if(!window.tokbox.width || window.tokbox.width == 130){
      // Make tokbox big.
      window.tokbox.width = 260;
      $('#tokbox').attr("title", "Click to half size of Video");
      $('#tokbox').css("width", "260px");
      var right = $('#editorcontainer').css('right');
      right = right == 'auto' ? '0px' : right;
      $('#editorcontainer').css({"left":"260px", "width": "auto", "right": right});
    }else{
      // Makes tokbox smaller
      window.tokbox.width = 130;
      $('#tokbox').attr("title", "Click to double size of Video");
      $('#tokbox').css("width", "130px");
      var right = $('#editorcontainer').css('right');
      right = right == 'auto' ? '0px' : right;
      $('#editorcontainer').css({"left":"130px", "width": "auto", "right": right});
    }
    $('.OT_mini, .OT_root').css({"width":window.tokbox.width +"px", "height": window.tokbox.width+"px"});
  });

  $('<div>').attr({'id':'myPublisherDiv'}).appendTo($('#tokbox'));
  $('<div>').attr({'id':'subscribersDiv'}).appendTo($('#tokbox'));

  if(clientVars.ep_tokbox){
    tokBox = clientVars.ep_tokbox;
    if(tokBox){ // Setup testing else poop out
      if(tokBox.onByDefault === true){
        enableTokBox();
        showTokBox();
      }
    }
    else{
      alert('Tokbox key not set...  Set the key in your settings.json file');
    }
  }

  if(avYesInURL()) showTokBox();
  if(avNoInURL()){
    $('#tokboxButton').hide();
  }

}

function disableTokBox(){
  tokbox.enabled = false;
  tokbox.session.disconnect();
}

function enableTokBox(){
  if(tokbox.enabled) return false;

  tokbox.enabled = true;

  var apiKey = clientVars.ep_tokbox.key;
  var sessionId = clientVars.ep_tokbox.sessionId;

  tokbox.session = OT.initSession(apiKey, sessionId);

  // request room token to join, need to do server logic to handle this

  // Handle events
  tokbox.session.on({
    streamCreated: function(event) { 
      tokbox.session.subscribe(event.stream, 'subscribersDiv', {insertMode: 'append', width: 130, height: 100}); 
    }
  });

  // Join room
  var token = clientVars.ep_tokbox.token;
  if(tokbox.session.connect){
    tokbox.session.connect(token, function(error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('connected to session');
        tokbox.session.publish('myPublisherDiv', {width: 130, height: 100});
      }
    });
  }

}

function showTokBox(){
  enableTokBox();
  $('#tokboxButton > a').css({"border-color":"red"});
  $("#tokbox").show();
  $('<div>').attr({'id':'myPublisherDiv'}).appendTo($('#tokbox'));
  var right = $('#editorcontainer').css('right');
  right = right == 'auto' ? '0px' : right;
  // If the video has been resized we always ensure the contents are displayed
  // properly after
  var videoWidth = $('#tokbox').width() + "px" || "130px"; 
  $('#editorcontainer').css({"left":videoWidth, "width": "auto", "right": right});
}

function hideTokBox(){
  disableTokBox();
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

function avYesInURL(){
  if (window.location.search.indexOf('av=YES') > -1) {
    return true;
  } else {
    return false;
  }
}

function avNoInURL(){
  if (window.location.search.indexOf('av=NO') > -1) {
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
exports.disableTokBox = disableTokBox;
exports.showTokBox = showTokBox;
exports.hideTokBox = hideTokBox;
