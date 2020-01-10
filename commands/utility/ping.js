const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: [ 'ping', 'latency' ],
            category: 'utility',
            ownerOnly: false,
            channel: '',
            typing: true,
            editable: false,
            cooldown: 100, // cooldown in milliseconds
            userPermissions: [],
            clientPermissions: [ 'SEND_MESSAGES' ],
            description: {
                content: [
                    'Get a responce from the bot with round-trip delay and server heartbeat',
                ],
                usage: '',
                examples: [ '' ],
            }
        });
    }

    async exec(message) {
        const sent = await message.util.send('Pong!');
        const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
        return message.util.edit([
            'Pong!',
            `🔂 **RTT**: ${timeDiff} ms`,
            `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`
        ]);
    }
}

module.exports = PingCommand;