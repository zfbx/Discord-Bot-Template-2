const { Command } = require('discord-akairo');

class InviteCommand extends Command {
    constructor() {
        super('invite', {
            aliases: [ 'invite' ],
            category: 'owner',
            ownerOnly: true,
            channel: '', // guild or dm
            typing: false,
            editable: false,
            cooldown: 10, // cooldown in milliseconds
            userPermissions: [],
            clientPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS' ],
            description: {
                content: [
                    'Get a invite link for the bot to be invited to a server.',
                    'Note: The bot is normally owner invite only'
                ],
                usage: '',
                examples: [ '' ],
            }
        });
    }

    async fetchInvite() {
        if (this.invite) return this.invite;

        // TODO: Uncomment out permissions bot will need.
		const invite = await this.client.generateInvite([
			//'ADMINISTRATOR', // All permissions / bypasses all channel overwrites
            //'CREATE_INSTANT_INVITE',
            //'KICK_MEMBERS',
            //'BAN_MEMBERS',
            //'MANAGE_CHANNELS', // edit and reorder channels
            //'MANAGE_GUILD', // edit the guild information, region, etc.
            'ADD_REACTIONS',
            'VIEW_AUDIT_LOG',
            //'PRIORITY_SPEAKER',
            //'STREAM',
            'VIEW_CHANNEL',
            'SEND_MESSAGES',
            //'SEND_TTS_MESSAGES',
            //'MANAGE_MESSAGES', // delete messages and reactions
            'EMBED_LINKS',
            'ATTACH_FILES',
            'READ_MESSAGE_HISTORY',
            //'MENTION_EVERYONE',
            'USE_EXTERNAL_EMOJIS',
            'CONNECT',
            'SPEAK',
            //'MUTE_MEMBERS',
            //'DEAFEN_MEMBERS',
            //'MOVE_MEMBERS',
            'USE_VAD', // voice activity detection
            'CHANGE_NICKNAME',
            //'MANAGE_NICKNAMES',
            //'MANAGE_ROLES',
            //'MANAGE_WEBHOOKS',
            //'MANAGE_EMOJIS',
		]);
		this.invite = invite;
		return invite;
    }

    async exec(message) {

        const embed = this.client.util.embed()
			.setColor(this.client.config.color)
			.setDescription(`**[Add me to a new server!](${await this.fetchInvite()})**`);
        return message.util.send({ embed });

    }
}

module.exports = InviteCommand;