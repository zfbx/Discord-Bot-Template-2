const { Listener } = require('discord-akairo');

class GuildDeleteListener extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild) {

        console.log(`Removed from ${guild.name} (${guild.id})`);

    }
}

module.exports = GuildDeleteListener;