console.log("File Handler Loaded");
const FileSys = require("fs");
class FileHandler{
  // Write into json file
  writeToJSONFile(file, filepath){
    FileSys.writeFile(filepath, JSON.stringify(file), function(err){
      if(err) return console.log("Failed to write into file " + err);
    });
  }
}
// Export this file as module
module.exports = FileHandler;
