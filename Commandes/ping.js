const Discord = require('discord.js');

module.exports = {
	name: "ping",
	description: "Indique la latence du bot",
	permission: "Aucune",
	dm: true,

	async run(bot, message, args) {
		await message.reply(`Ping : ${bot.ws.ping}ms`);
	}
}