console.log("PUBG Tracker Loaded");
const HTTPHandler = require("./httphandler.js");
var http = new HTTPHandler();
const PUBGProfile = require("../structures/profile.js")
var key = null;
class PUBGTracker {
  constructor(APIKey) {
    if (!APIKey) {
      throw new Error("Null API Key");
    }
    this.key = APIKey;
  }

  async getProfileByNickname(nickname) {
    nickname = nickname.toLowerCase();
    let remote = `https://api.pubgtracker.com/v2/profile/pc/${nickname}`;
    let myHeaders = {
      "TRN-API-KEY": this.key
    };
    let x = async(remote, myHeaders) => {
      const response = await http.fetchJSON(remote, "GET", myHeaders);
      console.log(response);
      return response;
    };
    console.log(x(remote, myHeaders));
    const resp = await x(remote, myHeaders);
    console.log(resp);
    return new PUBGProfile(resp);
  }
}

module.exports = PUBGTracker;
