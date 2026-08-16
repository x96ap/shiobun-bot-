const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const commands = [];

const commandsPath = path.join(__dirname, "..", "commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (command.data) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
)
    .then(() => {
        console.log(`registered ${commands.length} command(s)!`);
    })
    .catch(console.error);
