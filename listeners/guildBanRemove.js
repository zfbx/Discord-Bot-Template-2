const { Listener } = require('discord-akairo');

class GuildBanRemoveListener extends Listener {
    constructor() {
        super('guildBanRemove', {
            emitter: 'client',
            event: 'guildBanRemove'
        });
    }

    async exec(guild, user) {

        console.log(`Unbanned from ${guild.name} => ${user.tag} (${user.id})`);

    }
}

module.exports = GuildBanRemoveListener;