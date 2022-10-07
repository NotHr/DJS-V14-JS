const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const { loadEvents } = require("./Handler/eventHandler");
const { loadCommands } = require("./Handler/commandHandler");
config();

const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent"],
});
client.commands = new Collection();

client
  .login(process.env.TOKEN)
  .then(() => {
    loadEvents(client);
    loadCommands(client);
  })
  .catch((err) => console.log(err));
