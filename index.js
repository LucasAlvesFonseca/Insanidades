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

(async () => {
  try {
    console.log("Start refreshing application (/) commands.");

    // Para registrar comandos de guilda (instantâneo no servidor específico)
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    // Para registrar comandos globais (pode demorar até 1 hora para aparecer)
    // await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error reloading application (/) commands:", error);
  }
})();

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
      await interaction.reply(`${ins}`);
    } catch (error) {
      console.error(err)
      await interaction.reply("Ocorreu algum erro ao obter a Insanidade")
    }

  }
});

// Login do bot
client.login(TOKEN);
