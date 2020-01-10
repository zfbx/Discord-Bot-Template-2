const { Listener } = require('discord-akairo');
//const utils = require('../utils');

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {

        if (message.author.bot) {
            return;
        }
        if (!message.guild) {
            return;
        }

        if (message.content) {

            // TODO: Filter Bad Words?
            const m = message.content.toLowerCase();
            if (m.includes('badword1') || m.includes('badword2') || m.includes('badword3')) {
                message.reply('Please don\'t use language like that in here.');
                message.delete();
                return;
            }

            // TODO: Block invites from non admins?
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                const invite = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z0-9]/gi;
                if (invite.test(message.content)) {
                    message.reply('Invites are not permitted here.');
                    message.delete();
                }
            }

        }
    }
}

module.exports = MessageListener;