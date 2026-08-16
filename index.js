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

client.once("ready", () => {
  console.log(`🌸 logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
