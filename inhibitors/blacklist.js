const { Inhibitor } = require('discord-akairo');

class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }

    exec(message) {

        const blacklist = [
            '404365332912930827', // Dyno
        ];
        return blacklist.includes(message.author.id);

        /*
        const whitelist = [
            '142831624868855808', // Tony
        ];
        return !whitelist.includes(message.author.id);
        */
    }
}

module.exports = BlacklistInhibitor;