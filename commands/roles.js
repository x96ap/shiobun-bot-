const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roles")
        .setDescription("🌸 Opens Shiobun's adorable Role Garden!"),

    async execute(interaction) {

    }
};
