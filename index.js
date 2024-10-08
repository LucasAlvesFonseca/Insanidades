const insanidades = require("./bot/actions.insanidades.js");

const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
require("dotenv").config(); // Para carregar o token de um arquivo .env

// Use variáveis de ambiente para seu TOKEN, CLIENT_ID e GUILD_ID
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const commands = [
  {
    name: "ping",
    description: "Toma esse ping papai",
  },
  {
    name: "insanidade",
    description: "Rola uma insanidade aleatória.",
  },
];

// Função para registrar os comandos de guilda
const rest = new REST({ version: "10" }).setToken(TOKEN);

const GUILD_IDS = [process.env.GUILD_ID1, process.env.GUILD_ID2];

(async () => {
  try {
    console.log("Start refreshing application (/) commands.");
    
    for (const guildId of GUILD_IDS) {
      if (!guildId) throw new Error("GUILD_ID não está definido.");
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guildId), {
        body: commands,
      });
    }

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error reloading application (/) commands:", error);
  }
})();


console.log("GUILD_IDS:", GUILD_IDS); // Para múltiplos GUILD_IDs

// Criação do client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});


client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "insanidade") {
    try {
      let ins = await insanidades();
      await interaction.reply(`Insanidade: ${ins}`);
    } catch (error) {
      console.error(err)
      await interaction.reply("Ocorreu algum erro ao obter a Insanidade")
    }

  }
});

// Login do bot
client.login(TOKEN);
