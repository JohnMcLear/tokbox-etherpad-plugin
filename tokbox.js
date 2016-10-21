var eejs = require('ep_etherpad-lite/node/eejs/'),
settings = require('ep_etherpad-lite/node/utils/Settings'),
 OpenTok = require('opentok');

var tokBoxKVS = {};

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  args.content += "<script src='//static.opentok.com/webrtc/v2.2/js/opentok.min.js'></script>";
  return cb();
}

exports.clientVars = function(hook, context, callback){

  // Make sure settings are setup
  if(settings.ep_tokbox && settings.ep_tokbox.key && settings.ep_tokbox.secret){
    // Settings all appear to be in place.  Continue :)
  }else{
    console.error("ep_tokbox.key or secreto not set, set it in settings.json");
    return callback(null);
  }

  // Setup tokbox object we will pass to client
  var tokBox = {};
  tokBox.key = settings.ep_tokbox.key || false;
  tokBox.onByDefault = settings.ep_tokbox.onByDefault || false;

  var padId = context.clientVars.padId;

  // Does session already exist for room?
  if(tokBoxKVS[padId]){
    tokBox.sessionId = tokBoxKVS[padId].sessionId;
    tokBox.token = tokBoxKVS[padId].token;
    return callback({ep_tokbox: tokBox});
  }

  // Session does not exist, creating one.
  var opentok = new OpenTok(settings.ep_tokbox.key, settings.ep_tokbox.secret);
  opentok.createSession(function(err, session) {
    if (err){
      console.warn("Tokbox error", err);
      return callback(null);
    }
    tokBox.token = opentok.generateToken(session.sessionId);
    // We should map sessionId to padId
    tokBox.sessionId = session.sessionId;
    tokBoxKVS[padId] = {};
    tokBoxKVS[padId].token = tokBox.token; // Store to KVS
    tokBoxKVS[padId].sessionId = session.sessionId; // Store to KVS
    return callback({ep_tokbox: tokBox});
  });
}

exports.eejsBlock_editbarMenuRight = function (hook_name, args, cb){
  if(!settings.ep_tokbox.hideByDefault){
    args.content = eejs.require("ep_tokbox/templates/button.ejs") + args.content;
  }
  return cb();
}
