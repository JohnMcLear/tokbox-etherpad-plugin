//var $ = require('ep_etherpad-lite/static/js/rjquery').$; // use jQuery
var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');
var tokBoxString = "";

//exports.postAceInit = function (hook_name, args, cb) {
exports.eejsBlock_scripts = function (hook_name, args, cb) {
  if(settings.ep_tokbox && settings.ep_tokbox.key){ // Setup testing else poop out
    console.log("YAY");
    var key = settings.ep_tokbox.key;
    var clientSideJS = ' \
    $("#editorcontainer").css({"right":"357px","width":"auto"}); \
    $("#chatbox").prepend("<div id=tokbox><iframe id=\'videoEmbed\' src=\'http://api.opentok.com/hl/embed/'+key+'\' width=\'350\' height=\'265\' style=\'border:none\' frameborder=\'0\'></iframe></div>"); \
    $("#tokbox").css({"z-index":"999999", "position":"absolute", "top":"0px"}); \
    $("#chatbox").attr("style", "width: 350px !important"); \
    $("#chatbox").addClass("stickyChat"); \
    $("#chatbox").show(); \
    $(".authorColors").attr("style", "top: 270px !important"); \
    var optPar = $("#options-stickychat").parent(); \
    optPar.hide(); \
    ';
    var tokBoxString = "<script type='text/javascript'>"+clientSideJS+"</script>";
  }else{
    var tokBoxString = "<script>alert('Tokbox key not set...  Set the key in your settings.json file');</script>";
  }
  args.content = args.content + tokBoxString; // add Google Analytics to the contents
  return cb();
}
