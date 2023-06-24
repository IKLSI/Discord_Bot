const Discord = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'Bannir un membre',
	permission: Discord.PermissionFlagsBits.BanMembers,
	dm: false,
	options: [
		{
			type: "user",
			name: "membre",
			description: "Le membre à bannir",
			required: true
		},
		{
			type: "string",
			name: "raison",
			description: "La raison du ban",
			required: false
		}
	],

	async run(bot, message, args) {
		try {
			let user = await bot.users.fetch(args._hoistedOptions[0].value)
			if (!user) return message.reply("L'utilisateur n'existe pas et ne peut donc pas être banni.");

			let member = message.guild.members.cache.get(user.id);
			let reason = args.getString("raison");
			if (!reason) reason = "Aucune raison spécifiée";

			if (message.user.id === user.id) return message.reply("Vous ne pouvez pas vous bannir vous-même.");
			if ((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas bannir le propriétaire du serveur.");

			if (member && !member.bannable) return message.reply("Vous ne pouvez pas bannir cet utilisateur.");
			if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas bannir un membre ayant un rôle supérieur ou égal au vôtre.");

			if ((await message.guild.bans.fetch()).get(user.id)) return message.reply("L'utilisateur est déjà banni.");

			try {
				await member.send(`Vous avez été banni du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
			}
			catch (err) {}

			await message.reply(`${message.user} a banni ${user.tag} pour la raison suivante : **${reason}**`);
			await message.guild.members.ban(user.id, { reason: reason });
		}
		catch (e) {
			return message.reply("Impossible de bannir cet utilisateur ou manque la raison.");
		}
	}
}