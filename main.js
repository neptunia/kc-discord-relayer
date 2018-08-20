/* eslint-disable no-console */

const DiscordRPC = require('discord-rpc');
const fs = require('fs');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 1234 });

const ClientId = "391369077991538698";


var ltext = "Kantai Collection"
var details = "Loading Integration..."
var state = ["Check home port!"]
var lkey = "kc_logo_512x512"
var last_time = 0
var skey = "idle_img"
var stext = "Idle"
var count = 0;


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    var x = JSON.parse(message);
    console.log(x);
    if (x["top"] != "none") {
      details = x["top"];
    }
    if (x["bot"] != "none") {
      state = x["bot"];
    }
    if (x["large"] != "none") {
      ltext = x["large"];
    }
    if (x["small"] != "none") {
      stext = x["small"];
    }
    
    if (process.argv.indexOf("-v") > -1) {
      console.log('received: %s', message);
    }
    
    last_time = Date.now(); //get timestamp
    skey = "active_img";
    //stext = "Currently Playing!";

  });

});




function getDuration() {

}

DiscordRPC.register(ClientId);

const rpc = new DiscordRPC.Client({
  transport: 'ipc'
});

async function setActivity() {
  if (!rpc)
    return;
  var activity = {
    details: details,
    largeImageKey: lkey,
    largeImageText: ltext,
    instance: false
  }

  if (state[count%state.length] != "none") {
    activity.state = state[count%state.length];   
  } else{
    while (state[count%state.length] == "none") {
      count = (count+1)%state.length;
    }
    activity.state = state[count%state.length];
  }
  count = (count+1)%state.length;

  activity.state = activity.state.replace(":military_medal:","First Class Medals: ");

  //check if idle
  //1000 = second
  //60000 = minute
  //300000 = 5 mins
  var elapsed = Date.now() - last_time;
  if (elapsed > 300000) {
    //idle
    skey = "idle_img";
    stext = "Idle for " + Math.floor(elapsed/60000) + " minutes";
  }

  activity.smallImageKey = skey;
  activity.smallImageText = stext;

  //console.log("gey");

  rpc.setActivity(activity);
}

rpc.on('ready', () => {
  setActivity();

  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login(ClientId).catch(console.error);
