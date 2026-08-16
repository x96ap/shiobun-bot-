const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roles")
        .setDescription("opens sorimi's adorable role garden!"),

    async execute(interaction) {

        // Get all roles that Sorimi is allowed to manage.
        // @everyone and roles above/beside Sorimi are excluded.
        const roles = interaction.guild.roles.cache
            .filter(role =>
                role.id !== interaction.guild.id &&
                role.editable &&
                !role.managed
            )
            .sort((a, b) => b.position - a.position);

        // Discord dropdowns can contain a maximum of 25 options.
        const roleList = roles.first(25);

        if (!roleList.length) {
            return interaction.reply({
                content:
                    "i couldn't find any roles that i can manage! make sure sorimi's role is above the roles you want her to give.",
                ephemeral: true
            });
        }

        // Cute role garden embed.
        const embed = new EmbedBuilder()
            .setTitle("role garden")
            .setDescription(
                "choose a role from the little garden below!\n\n" +
                "selecting a role will give it to you.\n" +
                "selecting it again will remove it."
            )
            .setColor(0xffc6e5)
            .setFooter({
                text: "sorimi's role garden"
            });

        // Create the dropdown.
        const menu = new StringSelectMenuBuilder()
            .setCustomId("role-garden")
            .setPlaceholder("choose a role...")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(
                roleList.map(role =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(role.name.slice(0, 100))
                        .setValue(role.id)
                        .setDescription(`get the ${role.name} role`)
                )
            );

        const row = new ActionRowBuilder()
            .addComponents(menu);

        await interaction.reply({
            embeds: [embed],
            components: [row]
        });
    }
};
