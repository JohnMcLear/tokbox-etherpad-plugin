var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');
var tokBoxString = "";

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  args.content += "<script src='//static.opentok.com/webrtc/v2.2/js/opentok.min.js'></script>";
  return cb();
}

exports.clientVars = function(hook, context, callback){
  if(settings.ep_tokbox && settings.ep_tokbox.key){ // Setup testing else poop out
    var tokBox = {};
    tokBox.key = settings.ep_tokbox.key || false;
    tokBox.onByDefault = settings.ep_tokbox.onByDefault || false;
  }else{
    console.error("ep_tokbox.key not set, set it in settings.json");
  }
  console.log("pushing ClientVars", tokBox);
  return callback({ep_tokbox: tokBox});
}

exports.eejsBlock_editbarMenuRight = function (hook_name, args, cb){
  if(!settings.ep_tokbox.hideByDefault){
    args.content = "<li id='tokboxButton' class='acl-write' data-key='tokbox'><a title='Video Conferencing'><span class='buttonicon tokboxButton' style='background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArNJREFUeNpi9vT0ZOPg4GBlAhI3VFRUvgMEEENoaKjQtGnTGFh+//79dteuXQwAAcTY3NzMcPnyZYZv377dTk9PN2AMDAx8+v//fykGIGBlZX0FEECMLi4ufEJCQixWVlbvXrx4wcAkICDwCSj5ztTUlOH79+8MjAEBAf9ByoHaGBgZGRmYGKCAhYXlyL9//xgAAogRaBXHrFmzHvz584cPKM7IxcU16c2bN/UODg4/Pn36xMAYHBz8CCgpC9MJMoaZmXkXGxubENBpJixAY/6ABJHB379/3cAOAIqzcHJyqgB9JQxyBMwEeXn514aGhiwnTpxgAQggRg8PD3Z+fn4eoEn/gToZLC0tfwAVfQOGCUNHRwcDk7GxsebPnz+fAU15AjTlwfXr17+tWLGCgYkJ4iGmu3fvXgA6iB2IuYAK/ouKijJkZ2fz3b59G+RYBhagY/4j++DGjRv/Hz58aPTly5dzQFP+saD7AMT/8ePHOWBAgbjfmBgIAKwKgKZEgIIZiDlZgA4RBwrA3QEMVYacnJxvz58/Zzx58iQbQIDCyR61YSCIwruSzYIDIT9CpHThEHXp1AR0AalLoUqVyRGUMtdQqVJBVS6iA6Rx2oAQkrATkg3Y+TYgsA2xB4ZlZ2eGmffeyjiOHdd1GwKnVIwNcdvNiLVBEFxQuGShL8dxRBRFIssy0fe9GKVp2pZlOYOXFxRi7U4ibzgXVVXNOC89z1sDumQqPUxl0+UeSJ6UUh2bdzQx3uI9zEzJmeB3qOQVChd1XZ8URfGgtZ4TD4xG38B/Ko7bO67IPd+CfjXa2/mQXQ08HaXhH1saRQ6qHMxGbNeI7Ra0v7lrEnac+I9hDwweYSNC3s9N0yg+36f5zjIMwzECPONhs9/9b0TLkl3XrXlbJUliU2z5vv+R5/nG0PgL4/BAstcTbJwAAAAASUVORK5CYII=\"'></span></a></li><li class='separator'></li>" + args.content;
  }else{
    args.conetnt = "";
  }
  return cb();
}
