console.log("HTTP Handler Loaded");
const Fetch = require("node-fetch");
class HTTPHandler{

  fetchJSON(url, method, headers){
    return Fetch(url, {method: method, headers: headers})
      .then(res => res.json())
      .catch(err => reject(err));
    }
}

// Export this file as module
module.exports = HTTPHandler;
