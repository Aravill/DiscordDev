// Check if node is working
console.log("Starting bot");
// Load dependencies
const Discord = require("discord.js");
const auth = require("./auth.json");
const config = require("./config.json");
// Create new instance of the discord client
const client = new Discord.Client();
// Active text channel to listen on
var activeChannel = null;
var textChannel = null;
//------------------------------------------------------------------------------
// List of bot commands
var commands = [{
  name: "ping",
  description: "Basic ping command, responds with pong",
  parameters: ["Original Message"],
  execute: function(message) {
    // TO DO Parameter validation
    message.channel.send("Pong!");
    }
  }];
//------------------------------------------------------------------------------
// Functions
// Find a corresponding command
function searchCommand(message) {
  // Split message content into string array
  let args = message.content.substring(1).split(" ");
  // Isolate name
  let name = args[0];
	for(let i = 0; i < commands.length; i++) {
		if(commands[i].name == name.toLowerCase()) {
      return commands[i];
		}
	}
	return false;
}
// Handle command
function handleCommand(message){
  let command = searchCommand(message);
  // If command exists
  if(command){
    command.execute(message);
  }
  else {
    console.log("Command does not exist");
  }
}
//------------------------------------------------------------------------------
// Event handlers
// When a message is recieved
client.on("message", (message) => {
  // Check if message begins with the defined prefix && check if the message
  // wasn't sent by the bot itself to prevent infinite looping
  if(message.content[0] == config.prefix
    && message.author.id !== client.user.id){
    handleCommand(message);
  }
})
//------------------------------------------------------------------------------
// Bot login using the auth.token
client.login(auth.token);
