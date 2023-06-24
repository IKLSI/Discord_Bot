const Discord = require('discord.js');

module.exports = async (bot, message) => {
	let prefix = '!';

	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].slice(prefix.length);
	let args = messageArray.slice(1);

	if (!message.content.startsWith(prefix)) return;

	let command = require(`../Commandes/${cmd}`);

	if (!command) return message.reply("Cette commande n'existe pas");
	if (command) command.run(bot, message, args);
}