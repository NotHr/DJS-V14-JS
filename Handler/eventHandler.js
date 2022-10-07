const fs = require("fs");
const ascii = require("ascii-table");
const { Client } = require("discord.js");
const table = new ascii().setHeading("Event", "Status");
let eventCount = 0;
/**
 *
 * @param {Client} client
 */
const loadEvents = (client) => {
  const folders = fs.readdirSync("./Events");
  for (const folder of folders) {
    const files = fs
      .readdirSync(`./Events/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of files) {
      const event = require(`../Events/${folder}/${file}`);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
      eventCount++;
      table.addRow(file, "✅");
      continue;
    }
  }
  return console.log(
    table.toString(),
    `\n\n✅ Loaded ` +
      `${eventCount}` +
      ` ${eventCount <= 1 ? "Event" : "Events"}`
  );
};

module.exports = { loadEvents };
