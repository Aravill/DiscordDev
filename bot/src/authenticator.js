console.log("Authenticator loaded");
const Channels = require("./auth/channels");
const Roles = require("./auth/roles");
const Users = require("./auth/users");

class Authenticator{
  // Authenticates user against users.json file
  authenticateUser(userID){
    let userIDArray = null;
    let found = false;
    if(Users.whitelist){
      userIDArray = Users.wIDS;
    } else {
      userIDArray = Users.bIDS;
    }
    for(let i = 0; i < userIDArray.length; i++){
      if(userID == userIDArray[i]){
          found = true;
        }
    }
    if (Users.whitelist && found || !Users.whitelist && !found){
      return true;
    }
    return false;
  }
}

// Export this file as module
module.exports = Authenticator;
