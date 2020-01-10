const { Listener } = require('discord-akairo');
const utils = require('../utils');
const wait = require('util').promisify(setTimeout);

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        console.log(`I'm now online as ${this.client.user.tag}!`);
        this.client.users.get(this.client.config.ownerid).send(`I'm online`);
        if (!this.cron) {
            console.log('Starting timed events..');
            eventTimer(this);
            setInterval(eventTimer, 1000*30, this);
            this.cron = true;
        }
    }
}

/**
 * Starts event loop
 * @param {client} bot main bot client
 * @returns {void}
 */
async function eventTimer(bot) {
    setRandomActivity(bot);
    // TODO: Add more here to go every 30 seconds (good for twitch alerts)
}


/**
 * Sets random bot activity
 * @param {client} bot main bot client
 * @returns {void}
 */
async function setRandomActivity(bot) {
    await wait(1000);
    const status = bot.client.statusMessages[Math.floor(Math.random()*bot.client.statusMessages.length)];
    status.message = utils.aliasReplacer(status.message, bot.client, null, null);
    bot.client.user.setActivity(status.message, { type: status.type });
}


module.exports = ReadyListener;