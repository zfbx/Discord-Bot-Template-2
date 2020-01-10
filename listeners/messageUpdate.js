const { Listener } = require('discord-akairo');

class MessageUpdateListener extends Listener {
    constructor() {
        super('messageUpdate', {
            emitter: 'client',
            event: 'messageUpdate'
        });
    }

    async exec(oldMessage, newMessage) {

        if (!newMessage.guild) {
            return null;
        }
        if (newMessage.author.bot) {
            return null;
        }
        if (oldMessage.content === newMessage.content) {
            return null;
        }

        console.log(`Message Edited in ${newMessage.guild.name} / ${newMessage.channel.name}`);
        // useful: newMessage.author.tag   oldMessage.content   newMessage.content  newMessage.createdTimestamp

        return null;

    }
}

module.exports = MessageUpdateListener;