const { SlashCommandBuilder, CommandInteraction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("data")
    .setDescription("Returns bot data"),
  developer: true,
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    interaction.reply("Hello");
  },
};
