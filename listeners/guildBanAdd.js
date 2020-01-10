const { Listener } = require('discord-akairo');

class GuildBanAddListener extends Listener {
    constructor() {
        super('guildBanAdd', {
            emitter: 'client',
            event: 'guildBanAdd'
        });
    }

    async exec(guild, user) {

        console.log(`Banned from ${guild.name} => ${user.tag} (${user.id})`);

    }
}

module.exports = GuildBanAddListener;