const utils = require('../../utils');
const { MessageEmbed } = require('discord.js');
const { Command } = require('discord-akairo');

class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: [ 'help' ],
			category: 'utility',
			ownerOnly: false,
            channel: '',
            typing: false,
            editable: true,
            cooldown: 10,
            userPermissions: [],
            clientPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS' ],
			args: [
				{
					id: 'key',
					type: 'string',
					match: 'content',
					default: null,
				},
			],
			description: {
				content: [
					'Get a list of modules or commands, or details about a specific command.',
				],
				usage: '[command / category / "categories"]',
				examples: [ '', 'ping', 'utility', 'categories' ]
			}
		});
	}

	// Returns a list of all command categories, and also a list of commands for each category
	getFullList() {
		const embed = new MessageEmbed()
			.setColor(this.client.config.color);
		this.handler.categories.forEach((v, k) => {
			const field = {
				name: utils.capitalize(k),
				value: '',
				inline: true,
			};
			v.forEach((v2) => {
				const p = v2.prefix || this.handler.prefix;
				field.value += `\`${p}${v2.aliases.join(`, ${p}`)}\`\n`;
			});
			field.value = `${field.value}`;
			embed.addField(field.name, field.value, field.inline);
		});
		return embed;
	}

	// Returns an embed listing all the command (and aliases) available for a given category
	getCmdList(msg, cat) {
		const embed = this.client.util.embed()
			.setColor(this.client.config.color);
		cat.forEach((v, k) => {
			const p = v.prefix || this.handler.prefix;
			const field = {
				name: `${p}${k}`,
				value: `\`${p}${v.aliases.join(`, ${p}`)}\`\n`,
				inline: true,
			};
			field.value = `${field.value}`;
			embed.addField(field.name, field.value, field.inline);
		});
		return embed;
	}

	// Returns an embed with a command description, aliases, and examples describing the arguments of a given command
	getCmdInfo(msg, cmd) {
		const prefix = cmd.prefix || this.handler.prefix;
		const description = { content: 'No description available.',
			usage: '',
			examples: [],
			...cmd.description };

		const embed = this.client.util.embed()
			.setColor(this.client.config.color)
			.setTitle(`\`${prefix}${cmd.aliases[0]} ${description.usage}\``)
			.addField('Description', description.content);

		if (description.examples.length) {
			const text = `${prefix}${cmd.aliases[0]}`;
			embed.addField('Examples', `\`${text} ${description.examples.join(`\`\n\`${text} `)}\``, true);
		}

		if (cmd.aliases.length > 1) {
			embed.addField('Aliases', `\`${cmd.aliases.join('` `')}\``, true);
		}
		return embed;
	}

	// Returns a list of all command categories, and also a list of commands for each category
	getCats() {
		const embed = this.client.util.embed()
			.setColor(this.client.config.color);

		this.handler.categories.forEach((v, k) => {
			const field = {
				name: utils.capitalize(k),
				value: '',
				inline: true,
			};
			field.value = `${v.size} commands`;
			embed.addField(field.name, field.value, field.inline);
		});
		return embed;
	}

	exec(message, args) {
		if (args.key) {
			// Find command or category
			const key = args.key.toLowerCase();
			if (this.handler.categories.has(key)) { // Found a category
				const cat = this.handler.categories.get(key);
				return message.util.send(
					`Here is a list of commands in the **${utils.capitalize(key)}** category`,
					{ embed: this.getCmdList(message, cat) }
				);
			} else if (this.handler.modules.has(key)) { // Found a command
				const cmd = this.handler.modules.get(key);
				return message.util.send(
					`Here is some help for the **${key}** command`,
					{ embed: this.getCmdInfo(message, cmd) }
				);
			} else if (key === 'categories' || key === 'category') { // get categories
				return message.util.send(
					`Here is list of categories. Use \`${this.handler.prefix}help [category name]\` for commands.`,
					{ embed: this.getCats() }
				);
			}
			return message.util.send(`Could not find any categories or commands named **${key}**`);

		}
		// List all categories if none was provided
		return message.util.send('Here is a list of all the commands', { embed: this.getFullList() });
	}
}

module.exports = HelpCommand;