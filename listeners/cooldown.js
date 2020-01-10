const { Listener } = require('discord-akairo');

class cooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    async exec(message, command, reason) {

        console.log(`${message.author.username} triggered a cooldown from using ${command.id} because of ${reason}`);

    }
}

module.exports = cooldownListener;