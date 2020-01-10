const { Listener } = require('discord-akairo');

class GuildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {

        console.log(`Joined ${guild.name} (${guild.id})`);

    }
}

module.exports = GuildCreateListener;