const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const commandHandler = require("./handlers/commandHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Tiny web server for Render
app.get("/", (req, res) => {
  res.send("🐇 Shiobun is awake!");
});

app.listen(PORT, () => {
  console.log(`🌸 Web server listening on port ${PORT}`);
});

// Discord bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

commandHandler(client);

client.once("ready", async () => {
  console.log(`🌸 logged in as ${client.user.tag}!`);

  try {
    const commands = Array.from(client.commands.values()).map(
      command => command.data.toJSON()
    );

    await client.application.commands.set(
      commands,
      process.env.GUILD_ID
    );

    console.log(`🌸 registered ${commands.length} command(s)!`);
  } catch (error) {
    console.error("❌ failed to register commands:", error);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "something went a little wonky... try again!",
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: "something went a little wonky... try again!",
        ephemeral: true
      });
    }
  }
});

client.login(process.env.TOKEN);
