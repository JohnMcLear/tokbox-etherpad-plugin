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

  $('<div>').attr({'id':'myPublisherDiv'}).appendTo($('#tokbox'));
  $('<div>').attr({'id':'subscribersDiv'}).appendTo($('#tokbox'));

  if(clientVars.ep_tokbox){
    tokBox = clientVars.ep_tokbox;
    if(tokBox && tokBox.key){ // Setup testing else poop out
      if(tokBox.onByDefault === true){
        enableTokBox();
        showTokBox();
      }
    }
    else{
      alert('Tokbox key not set...  Set the key in your settings.json file');
    }
  }

  if(avInURL()) showTokBox();

}

function disableTokBox(){
  tokbox.session.disconnect();
}

function enableTokBox(){

  var apiKey = 21903532;
  var sessionId = '1_MX4yMTkwMzUzMn5-VHVlIFNlcCAxNiAxMDo1NDoxNyBQRFQgMjAxNH4wLjgyMDc4MzJ-fg';
  tokbox.session = OT.initSession(apiKey, sessionId);
  // request room token to join

  // Handle events
  tokbox.session.on({
    streamCreated: function(event) { 
      tokbox.session.subscribe(event.stream, 'subscribersDiv', {insertMode: 'append'}); 
    }
  });

  // Join room
  var token = 'T1==cGFydG5lcl9pZD0yMTkwMzUzMiZzaWc9NTk1YzBjOTk0NTY4N2UzZWQxOWNlNWMyNjJjMWE3YmI4ZDJjMWFiYjpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0eU1Ua3dNelV6TW41LVZIVmxJRk5sY0NBeE5pQXhNRG8xTkRveE55QlFSRlFnTWpBeE5INHdMamd5TURjNE16Si1mZyZjcmVhdGVfdGltZT0xNDEwOTA4NjE1Jm5vbmNlPTAuNjUyNDAzOTg2NjAwMDQ4OA==';
  tokbox.session.connect(token, function(error) {
    if (error) {
      console.log(error.message);
    } else {
      console.log('connected to session');
      tokbox.session.publish('myPublisherDiv', {width: 130, height: 100});
    }
  });

}

function showTokBox(){
  enableTokBox();
  $('#tokboxButton > a').css({"border-color":"red"});
  $("#tokbox").show();
  var right = $('#editorcontainer').css('right');
  right = right == 'auto' ? '0px' : right;
  $('#editorcontainer').css({"left":"130px", "width": "auto", "right": right});
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
exports.disableTokBox = disableTokBox;
exports.showTokBox = showTokBox;
exports.hideTokBox = hideTokBox;
