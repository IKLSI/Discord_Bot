const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'Explusion temporaire d\'un membre',
	permission: Discord.PermissionFlagsBits.KickMembers,
	dm: false,
	options: [
		{
			type: "user",
			name: "membre",
			description: "Le membre à exclure",
			required: true
		},
		{
			type: "string",
			name: "raison",
			description: "La raison de cette expulsion",
			required: false
		}
	],

	async run(bot, message, args) {
		let user = args.getUser("membre");
		if (!user) return message.reply("L'utilisateur n'existe pas et ne peut donc pas être exclu.");

		let member = message.guild.members.cache.get(user.id);
		if (!member) return message.reply("L'utilisateur n'est pas sur le serveur.");

		let reason = args.getString("raison");
		if (!reason) reason = "Aucune raison spécifiée";

		if (message.user.id === user.id) return message.reply("Vous ne pouvez pas vous exclure vous-même.");
		if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas exclure le propriétaire du serveur.");

		if (member && !member.bannable) return message.reply("Vous ne pouvez pas exclure cet utilisateur.");
		if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas exclure un membre ayant un rôle supérieur ou égal au vôtre.");

		try {
			await member.send(`Vous avez été exclu du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
		}
		catch (err) {}

		await message.reply(`${message.user} a exclu ${user.tag} pour la raison suivante : **${reason}**`);
		await member.kick(reason);
	}
}