var $ = require('ep_etherpad-lite/static/js/rjquery').$; // use jQuery

exports.postAceInit = function (hook_name, args, cb) {
  $('#editorcontainer').css({"right":"357px","width":"auto"});
  $('#chatbox').prepend('<div id=tokbox><iframe id="videoEmbed" src="http://api.opentok.com/hl/embed/1emb9ab32ae2766a68996b7afff7fe4965672f5b" width="350" height="265" style="border:none" frameborder="0"></iframe></div>');
  $('#tokbox').css({"z-index":"999999", "position":"absolute", "top":"0px"});
  $('#chatbox').attr('style', 'width: 350px !important');
  $('#chatbox').addClass("stickyChat");
  $('#chatbox').show();
  $('.authorColors').attr('style', 'top: 270px !important');
  var optPar = $('#options-stickychat').parent();
  optPar.hide();
}
