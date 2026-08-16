const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("check if sorimi is awake!"),

    async execute(interaction) {
        await interaction.reply("૮꒰ ˶• ༝ •˶꒱ა ♡ i'm awake!!");
    }
};
