const { Listener } = require('discord-akairo');

class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {

        console.log(`User Left ${member.guild.name} => ${member.user.tag} (${member.user.id})`);

    }
}

module.exports = GuildMemberRemoveListener;