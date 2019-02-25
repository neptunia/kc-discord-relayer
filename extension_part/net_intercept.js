const node_data = {};
const ship_ids = {}; 

var xmlhttpship = new XMLHttpRequest();
xmlhttpship.onreadystatechange = function() {
    if (xmlhttpship.readyState === 4 ) {
        if (xmlhttpship.status === 200) {
            ship_ids = JSON.parse(xmlhttpship.responseText);
        }
	}
};
xmlhttpship.open("GET", "https://raw.githubusercontent.com/Jebzou/ship-id-to-EN-names/master/SHIPINFO.json", true);
xmlhttpship.send();

var xmlhttpnodes = new XMLHttpRequest();
xmlhttpnodes.onreadystatechange = function() {
    if (xmlhttpnodes.readyState === 4 ) {
        if (xmlhttpnodes.status === 200) {
            node_data = JSON.parse(xmlhttpnodes.responseText);
        }
    }
};
xmlhttpnodes.open("GET", "https://raw.githubusercontent.com/KC3Kai/KC3Kai/master/src/data/edges.json", true);
xmlhttpnodes.send();

const rank_data = ["geydog", "Marshal Admiral", "Admiral", "Vice-Admiral", "Rear-Admiral", "Captain", "Commander", "Commander (Novice)", "Lieutenant-Commander", "Vice Lieutenant-Commander", "Lieutenant-Commander (Novice)"];
const servers = {
	"203.104.209.71": {
		"num": 1,
		"name": "Yokosuka Naval District",
		"jp": "横須賀鎮守府",
		"ip": "203.104.209.71"
	},
	"203.104.209.87": {
		"num": 2,
		"name": "Kure Naval District",
		"jp": "呉鎮守府",
		"ip": "203.104.209.87"
	},
	"125.6.184.215": {
		"num": 3,
		"name": "Sasebo Naval District",
		"jp": "佐世保鎮守府",
		"ip": "125.6.184.215"
	},
	"203.104.209.183": {
		"num": 4,
		"name": "Maizuru Naval District",
		"jp": "舞鶴鎮守府",
		"ip": "203.104.209.183"
	},
	"203.104.209.150": {
		"num": 5,
		"name": "Ominato Guard District",
		"jp": "大湊警備府",
		"ip": "203.104.209.150"
	},
	"203.104.209.134": {
		"num": 6,
		"name": "Truk Anchorage",
		"jp": "トラック泊地",
		"ip": "203.104.209.134"
	},
	"203.104.209.167": {
		"num": 7,
		"name": "Lingga Anchorage",
		"jp": "リンガ泊地",
		"ip": "203.104.209.167"
	},
	"203.104.209.199": {
		"num": 8,
		"name": "Rabaul Naval Base",
		"jp": "ラバウル基地",
		"ip": "203.104.209.199"
	},
	"125.6.189.7": {
		"num": 9,
		"name": "Shortland Anchorage",
		"jp": "ショートランド泊地",
		"ip": "125.6.189.7"
	},
	"125.6.189.39": {
		"num": 10,
		"name": "Buin Naval Base",
		"jp": "ブイン基地",
		"ip": "125.6.189.39"
	},
	"125.6.189.71": {
		"num": 11,
		"name": "Tawi-Tawi Anchorage",
		"jp": "タウイタウイ泊地",
		"ip": "125.6.189.71"
	},
	"125.6.189.103": {
		"num": 12,
		"name": "Palau Anchorage",
		"jp": "パラオ泊地",
		"ip": "125.6.189.103"
	},
	"125.6.189.135": {
		"num": 13,
		"name": "Brunei Anchorage",
		"jp": "ブルネイ泊地",
		"ip": "125.6.189.135"
	},
	"125.6.189.167": {
		"num": 14,
		"name": "Hitokappu Bay Anchorage",
		"jp": "単冠湾泊地",
		"ip": "125.6.189.167"
	},
	"125.6.189.215": {
		"num": 15,
		"name": "Paramushir Anchorage",
		"jp": "幌筵泊地",
		"ip": "125.6.189.215"
	},
	"125.6.189.247": {
		"num": 16,
		"name": "Sukumo Bay Anchorage",
		"jp": "宿毛湾泊地",
		"ip": "125.6.189.247"
	},
	"203.104.209.23": {
		"num": 17,
		"name": "Kanoya Airfield",
		"jp": "鹿屋基地",
		"ip": "203.104.209.23"
	},
	"203.104.209.39": {
		"num": 18,
		"name": "Iwagawa Airfield",
		"jp": "岩川基地",
		"ip": "203.104.209.39"
	},
	"203.104.209.55": {
		"num": 19,
		"name": "Saiki Bay Anchorage",
		"jp": "佐伯湾泊地",
		"ip": "203.104.209.55"
	},
	"203.104.209.102": {
		"num": 20,
		"name": "Hashirajima Anchorage",
		"jp": "柱島泊地",
		"ip": "203.104.209.102"
	}
}

var username = "undefined";
var server = "undefined server";
var level = 0;
var medals = 0;
var rank = "none";
var this_month_api_username = false;
var this_month_api_rank = false;
var show_username;
var show_epeen;
var headpatForAkashi;
var show_time_elapsed;
var rank_str = "none";
var home_str_template = "Headpatting <secretary>";
var home_str = "Headpatting <secretary>";

function get_storage_uname() {
	try {
		chrome.storage.local.get(['show_username'], function(items) {
			show_username = items['show_username'];
		});
	} catch (e) {
		console.log(e);
		show_username = true;
	}
	return show_username;
}

function get_storage_akashi() {
	try {
		chrome.storage.local.get(['headpat_akashi'], function(items) {
			headpatForAkashi = items['headpat_akashi'];
		});
	} catch (e) {
		console.log(e);
		headpatForAkashi = true;
	}
	return headpatForAkashi;
}

function get_storage_elapsed() {
	try {
		chrome.storage.local.get(['show_time_elapsed'], function(items) {
			show_time_elapsed = items['show_time_elapsed'];
		});
	} catch (e) {
		console.log(e);
		show_time_elapsed = true;
	}
	return show_time_elapsed;
}


function get_storage_show_medals() {
	try {
		chrome.storage.local.get(['show_FCmedals'], function(items) {
			show_epeen = items['show_FCmedals'];
		});
	} catch (e) {
		console.log(e);
		show_epeen = true;
	}
	return show_epeen;
}



function get_storage_api() {
	try {
		chrome.storage.local.get(['api_username', 'api_rank'], function(items) {
			this_month_api_username = items['api_username'];
			this_month_api_rank = items['api_rank'];
		});
	} catch (e) {
		console.log("api stuff not stored yet");
	}
	
}

function get_home_template() {
	try {
		chrome.storage.local.get(['home_template'], function(items) {
			home_str_template = items['home_template'];
		});
	} catch (e) {
		real_log(e);
		console.log("template not stored yet");
	}
	
}

get_storage_uname();
get_storage_api();

function real_log(x) {
	chrome.devtools.inspectedWindow.eval('console.log(' + x + ');');
}

//real_log("test");
function send_battle_data(x) {
	try {
		// battle: send start timestamp
		var data = JSON.parse(/svdata=(.+)$/.exec(x)[1]);
		var world = data.api_data.api_maparea_id;
		var map = data.api_data.api_mapinfo_no;
		var node = data.api_data.api_no;
		var nodename = node_data["World "+world+"-"+map][""+node][1];
		// send
		if (parseInt(world) > 7) {
			world = "E";
		}
		if (get_storage_elapsed()) {
			ws_send("Node "+world+"-"+map+" "+nodename,"none","none","none",Date.now());
		} else {
			ws_send("Node "+world+"-"+map+" "+nodename,"none","none","none","none");
		}
		
	} catch (e) {
		real_log(e);
	}
}

function parse_rank(x) {
	// part 1: use regex
	// part 2: hex encode everything then regex??? i dunno
}

function get_rank_data(x) {
	try {
		//console.log(x);
		// if username and server variables are already stored
		// another way to get keys: 
		get_storage_api();
		if (this_month_api_username !== false && this_month_api_rank !== false) {
			try {
				// best case: stored value for api keys works
				for (var i of data.api_data.api_list) {
					if (i[this_month_api_username] == username) {
						var server_rank = i[this_month_api_rank];
                        rank_str = "Rank "+server_rank+" on "+server.split(" ")[0];
                        if(!get_storage_show_medals()) ws_send("none",[rank_str],"none","none","none");
                        else ws_send("none",[":military_medal: "+medals, rank_str],"none","none","none");
						return;
					}
				}
			} catch (a) {
				// if it doesn't work (outdated api keys)
				real_log("hei");
				var pattern = '"api_.{12}":[0-9]*,"api_.{12}":"'+username+'"';
				var re = new RegExp(pattern);
				//real_log(x.match(re));
				var server_rank = x.match(re)[0];
				this_month_api_rank = server_rank.split(",")[0].split(":")[0].replace('"','');
				this_month_api_username = server_rank.split(",")[1].split(":")[0].replace('"','');
				chrome.storage.local.set({"api_username":this_month_api_username, "api_rank":this_month_api_rank});
				server_rank = server_rank.split(",")[0].split(":")[1];
                rank_str = "Rank "+server_rank+" on "+server.split(" ")[0];
                if(!get_storage_show_medals()) ws_send("none",[rank_str],"none","none","none");
                else ws_send("none",[":military_medal: "+medals, rank_str],"none","none","none");
				return;
				
			}
			var data = JSON.parse(/svdata=(.+)$/.exec(x)[1]);
		} else {
			// not stored
			try {
				// try retrieving it
				var pattern = '"api_.{12}":[0-9]*,"api_.{12}":"'+username+'"';
				var re = new RegExp(pattern);
				//real_log(x.match(re));
				var server_rank = x.match(re)[0];
				this_month_api_rank = server_rank.split(",")[0].split(":")[0].replace('"','');
				this_month_api_username = server_rank.split(",")[1].split(":")[0].replace('"','');
				chrome.storage.local.set({"api_username":this_month_api_username, "api_rank":this_month_api_rank});
				server_rank = server_rank.split(",")[0].split(":")[1];
                rank_str = "Rank "+server_rank+" on "+server.split(" ")[0];
                if(!get_storage_show_medals()) ws_send("none",[rank_str],"none","none","none");
                else ws_send("none",[":military_medal: "+medals, rank_str],"none","none","none");
				return;
			} catch (b) {
				real_log("an error occurred!");
				real_log(b);
			}
			
		}
		

	} catch (e) {
		//ws_send("none",server,"none","none");
		real_log(e);
	}
}

function send_home_data(x) {
	//svdata.api_data.api_basic.api_level level
	//svdata.api_data.api_basic.api_nickname username
	//svdata.api_data.api_basic.api_rank rank
	//svdata.api_data.api_deck_port[0].api_ship[0] flagship user's id
	//svdata.api_data.api_basic.api_medals medals

	try {
		var data = JSON.parse(/svdata=(.+)$/.exec(x)[1]);
		level = data.api_data.api_basic.api_level;
		username = data.api_data.api_basic.api_nickname;
		rank = rank_data[data.api_data.api_basic.api_rank];
		medals = data.api_data.api_basic.api_medals;
		//var home_str = "Home Port";
		try {
			var sec_user_id = data.api_data.api_deck_port[0].api_ship[0];
			//real_log(sec_user_id);
			for (var i of data.api_data.api_ship) {
				//real_log(i);
				if (i.api_id == sec_user_id) {
					//home_str = "Headpatting "+ship_ids[i.api_ship_id];
					get_home_template();
                    if ((i.api_ship_id == 182 || i.api_ship_id == 187) && !get_storage_akashi()) home_str = "Akashi is repairing ships";
                    else home_str = home_str_template.replace("<secretary>", ship_ids[i.api_ship_id]);
					real_log(home_str);
					break;
				}
			}
		} catch (f) {
			real_log("an error occurred!");
			real_log(f);
		}


		// send
		var part3;
		if (get_storage_uname()) {
			part3 = username+" (HQ Level "+level+")";
		} else {
			part3 = "HQ Level "+level;
		}
        if(!get_storage_show_medals()) ws_send(home_str, [rank_str], part3, rank,"-1");
        else ws_send(home_str, [":military_medal: "+medals, rank_str], part3, rank,"-1");
		
	} catch (e) {
		real_log("an error occurred!");
		real_log(e);
	}

}

function send_pvp_data() {
	//svdata.api_data.api_basic.api_level level
	try {
		// battle: send start timestamp
		if (get_storage_elapsed()) {
			ws_send("Doing PVP","none","none","none",Date.now());
		}
		ws_send("Doing PVP","none","none","none","none");
	} catch (e) {
		real_log("an error occurred!");
		real_log(e);
	}

}

function other_action() {
	try {
		ws_send("none","none","none","none","none");
	} catch (e) {
		real_log("an error occurred!");
		real_log(e);
	}

}

function ws_send(info1, info2, largeicon, smallicon, timestamp) {
	//real_log(JSON.stringify({"top":info1+"", "bot":info2, "large":largeicon+"", "small":smallicon+""}));
	var conn = new WebSocket("ws://127.0.0.1:1234");
	conn.onopen = function(e) {
	    conn.send(JSON.stringify({"top":info1+"", "bot":info2, "large":largeicon+"", "small":smallicon+"", "timestamp":timestamp+""}));
	    conn.close();
	};
}
chrome.devtools.network.onRequestFinished.addListener(
	function(request) {

		if(request.request.url.indexOf("/kcsapi/") > -1){
			try {
				server = servers[request.request.url.split("/")[2]]["name"];
			} catch (e) {
				real_log(e);
				server = "unknown server";
			}
			if(request.request.url.indexOf("/kcsapi/api_port/port") > -1) {
				//send "home port" and HQ level to nodejs 
				request.getContent(send_home_data);
			} else if (request.request.url.indexOf("/kcsapi/api_req_map/start") > -1 || request.request.url.indexOf("/kcsapi/api_req_map/next") > -1) {
				// starting sortie
				//in battle
				request.getContent(send_battle_data);
			} else if (request.request.url.indexOf("/kcsapi/api_req_practice/battle") > -1) {
				// pvp
				send_pvp_data();

			} else if (request.request.url.indexOf("/kcsapi/api_req_ranking") > -1) {

				request.getContent(get_rank_data);
			} else {
				// send that im not idle
				other_action();
			}

		}

	}
);
