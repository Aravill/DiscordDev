console.log("PUBG Tracker Loaded");
const HTTPHandler = require("./httphandler.js");
var http = new HTTPHandler();
var key = null;
class PUBGTracker{
  constructor(APIKey){
    if (!APIKey){
      throw new Error("Null API Key");
    }
    this.key = APIKey;
  }

  getProfileByNickname(nickname){
    let remote = `https://api.pubgtracker.com/v2/profile/pc/${nickname.toLowerCase}`;
    let myHeaders = {
      "TRN-API-KEY": this.key
    };
    let response = http.fetchJSON(remote, "GET", myHeaders);
    response.then(function(result){
      return result;
    })
    /* let player = Fetch(remote, {method: "GET", headers: myHeaders})
    .then(function(res){
      return res.json();
    }).then(function(json){
      console.log(json);
    }); */
}
}

module.exports = PUBGTracker;
