const { Listener } = require('discord-akairo');

class MessageDeleteListener extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            event: 'messageDelete'
        });
    }

    async exec(message) {

        if (message.author.bot) {
            return null;
        }
        if (message.content === "" && message.attachments.size === 0) {
            return null;
        }

        console.log(`Message deleted in ${message.guild.name} / ${message.channel.name}`);
        // useful: message.author.tag   message.content   message.attachments.size

        return null;
    }
}

module.exports = MessageDeleteListener;