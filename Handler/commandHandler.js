const fs = require("fs");
const ascii = require("ascii-table");
const { Client, Collection } = require("discord.js");
const table = new ascii().setHeading("Command", "Status");
let commandCount = 0;
let commandsArray = [];
let devloperArray = [];

/**
 *
 * @param {Client} client
 */

const loadCommands = (client) => {
  const folders = fs.readdirSync("./Commands");
  for (const folder of folders) {
    const files = fs.readdirSync(`./Commands/${folder}`);
    for (const file of files) {
      const command = require(`../Commands/${folder}/${file}`);
      client.commands.set(command.data.name, command);
      if (command.developer) {
        devloperArray.push(command.data.toJSON());
      } else {
        commandsArray.push(command.data.toJSON());
      }
      commandCount++;
      table.addRow(file, "✅");
      continue;
    }
  }
  client.application.commands.set(commandsArray);
  let devGuild = client.guilds.cache.get(process.env.DEV_GUILD);
  devGuild.commands.set(devloperArray);
  return console.log(
    table.toString(),
    `\n\n✅ Loaded ` +
      `${commandCount}` +
      `${(commandCount = 1 ? " Command" : " Commands")}`
  );
};

module.exports = { loadCommands };
