const { Listener } = require('discord-akairo');

class GuildMemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    async exec(oldMember, newMember) {

        if (newMember.user.bot) {
            return null;
        }


        if (oldMember.nickname !== newMember.nickname) {
            const oldNick = oldMember.nickname || oldMember.user.tag;
            const newNick = newMember.nickname || newMember.user.tag;
            console.log(`User nickname changed in ${newMember.guild.name} => ${oldNick} is now ${newNick}`);
        }


        if (oldMember.roles !== newMember.roles) {
            let role, action;
            if (oldMember.roles.size > newMember.roles.size) {
                role = oldMember.roles.filter((r) => !newMember.roles.get(r.id));
                action = 'Role Removed';
            } else {
                role = newMember.roles.filter((r) => !oldMember.roles.get(r.id));
                action = 'Role Added';
            }
            console.log(`${action} in ${newMember.guild.name} for ${newMember.user.tag} => ${role.first().name} (${role.first().id})`);
        }

        return null;
    }
}

module.exports = GuildMemberUpdateListener;