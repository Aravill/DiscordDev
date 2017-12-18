console.log("PUBG Tracker Loaded");
const fetch = require('node-fetch');
class PUBGTracker{
  constructor(APIKey){
    if (!APIKey){
      throw new Error("Null API Key");
    }
  }

  getProfileByNickname(nickname){

}

}
module.exports = PUBGTracker;
