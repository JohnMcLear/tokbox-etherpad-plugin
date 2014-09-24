# Etherpad TokBox / OpenTok V2 implementation

![screen shot](http://i.imgur.com/ZbjzuwD.png)

This plugin puts cross browser WebRTC and Video chat into your Etherpad.

# Installation
1. Visit tokbox.com, create an account and get your Key and Secret
2. Open your Etherpad settings.json file and paste the below in.
```
  "ep_tokbox":{
    "key":"YOUR KEY HERE",
    "secret":"YOUR SECRET HERE",
    "onByDefault":true
  }
```
3. Restart Etherpad and visit a pad, you will be prompted to share your camera.

# Settings
1. Disable onByDefault in settings.json to disable automatic sharing of video
2. Append ?av=YES to the URL to automatically share video on first visit (only works if onByDefault is false.

# Further development
Create issues, contact me, usually I work as a contractor for hire.
