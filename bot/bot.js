// Check if node is working
console.log("Starting bot");
// Load dependencies
const Discord = require("discord.js");
const FileSys = require("fs");
const configPath = "./config.json";
var config = require("./config.json");
// Create new instance of the discord client
const client = new Discord.Client();
// Active text channel to listen on
var activeChannel = null;
var logging = true;
//------------------------------------------------------------------------------
// Load auth token from .env

//------------------------------------------------------------------------------
// List of bot commands
var commands = [
  {
    name: "help",
    description: "Lists all commands",
    parameters: [],
    execute: function(params, output){
      let help = "";
      for (let i = 0; i < commands.length; i++){
        help = help + "Name: " + commands[i].name + "\n" +
                      "Description: " + commands[i].description + "\n" +
                      "Parameters: " + commands[i].parameters + "\n" +
                      "-----------------------------------------------------------\n";
      }
      output.response = help;
    }
  },

  {
    name: "ping",
    description: "Responds with pong",
    parameters: [],
    execute: function(params, output){
      output.response = "Pong!";
    }
  },

  {
    name: "prefix",
    description: "Replaces current prefix",
    parameters: ["New prefix"],
    execute: function(params, output){
      let prefix = params[0];
      config.prefix = prefix;
      config.prefixLenght = prefix.length;
      //writeToJSONFile(config, configPath);
      output.response = "Prefix changed to: " + prefix;
    }
  },

  {
    name: "logging",
    description: "Activates logging (responses to chat)",
    parameters: ["On/Off"],
    execute: function(params, output){
      let state = params[0];
      switch (state.toLowerCase()) {
        case "on":
          logging = true;
          output.response = "Logging state changed to: " + state;
          break;
        case "off":
          logging = false;
          output.response = "Logging state changed to: " + state;
          break;
        default:
          output.response = "Incorrect logging state!";
          break;
      }
    }
  }
  ];
//------------------------------------------------------------------------------
// Functions
// Write into json file
function writeToJSONFile(file, filepath){
  FileSys.writeFile(filepath, JSON.stringify(file), function(err){
    if(err) return console.log("Failed to write into file " + err);
  });
}
// Logging function
function log(channel, content){
  channel.send({embed: {color: 4447003, description: content}});
}
// Check incoming message
function messageHandler(message){
  // Check if message begins with the defined prefix && check if the message
  // wasn't sent by the bot itself to prevent infinite looping
  console.log("Handler called");
  let possiblePrefix = message.content.splice(0, config.prefix.length)[0];
  console.log("Possible prefix: " + possiblePrefix);
  if(possiblePrefix == config.prefix && message.author.id !== client.user.id){
    activeChannel = message.channel;
    // Split message content into string array and remove prefix
    let commandArray = message.content.substring(config.prefixLenght).split(" ");
    console.log(commandArray);
    let paramArray = commandArray;
    // Create a structured object from array
    let command = {
      name: commandArray.splice(0, 1)[0],
      parameters: commandArray
    }
    // Calls commandHandler and relays the structured command
    commandHandler(command);
  }
}
// Find a corresponding command (structured command object)
function findCommand(command) {
	for(let i = 0; i < commands.length; i++) {
		if(commands[i].name == command.name.toLowerCase()) {
      if(commands[i].parameters.length == command.parameters.length){
        // Return the corresponding command
        return commands[i];
      }
		}
	}
  // Not found
	return false;
}
// Handle command (structured command object)
function commandHandler(command){
  let botCommand = findCommand(command);
  executor(botCommand, command.parameters);
}
// Execute command & log
function executor(command, params){
  // If command exists
  if(command){
    let output = {response: ""};
    command.execute(params, output);
    if(logging){
      log(activeChannel, output.response);
    }
  }
  else {
    if(logging){
      log(activeChannel, "Command does not exist | Incorrect parameters");
    }
  }
}
//------------------------------------------------------------------------------
// Event handlers
// When a message is recieved
client.on("message", (message) => {
  messageHandler(message);
});
//------------------------------------------------------------------------------
// Bot login using the auth.token
client.login(process.env.TOKEN);
