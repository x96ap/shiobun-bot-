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

        const botMember = interaction.guild.members.me;

        // Find roles that Sorimi can actually manage.
        const roles = interaction.guild.roles.cache
            .filter(role => {
                // Never include @everyone.
                if (role.id === interaction.guild.id) return false;

                // Never include Discord-managed roles.
                if (role.managed) return false;

                // Sorimi must be higher than the role.
                return botMember.roles.highest.position > role.position;
            })
            .sort((a, b) => b.position - a.position);

        console.log(
            "🌸 manageable roles:",
            roles.map(role => `${role.name} (${role.position})`).join(", ") || "NONE"
        );

        const roleList = roles.first(25);

        if (!roleList || roleList.length === 0) {
            return interaction.reply({
                content:
                    "i couldn't find any roles that i can manage! make sure sorimi's role is above the roles you want her to give.",
                ephemeral: true
            });
        }

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
                        .setDescription(`get the ${role.name}`.slice(0, 100))
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
