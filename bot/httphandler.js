console.log("HTTP Handler Loaded");
const Fetch = require("node-fetch");
class HTTPHandler{

  fetchJSON(url, method, headers){
    return Fetch(url, {method: method, headers: headers})
    .then(function(res){
      return res.json();
    }).then(function(json){
      return json;
    });
  }

}
// Export this file as module
module.exports = HTTPHandler;
