const { CommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      interaction.reply({ content: "Invalid Command", ephemeral: true });
    }
    command.execute(interaction, client);
  },
};
