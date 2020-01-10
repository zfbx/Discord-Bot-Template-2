const { Command } = require('discord-akairo');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: [ 'reload' ],
            category: 'owner',
            ownerOnly: true,
            channel: '',
            typing: false,
            editable: false,
            cooldown: 1000,
            userPermissions: [],
            clientPermissions: [ 'SEND_MESSAGES' ],
            description: {
                content: [
                    'Reload all the current commands. *New commands require restart',
                ],
                usage: '',
                examples: [],
            }
        });
    }

    async exec(message) {
        await message.util.send('Reloading...');
        try {
            this.handler.reloadAll();
            console.log('Commands reloaded.')
            return message.util.edit('Reloaded 👍');
        } catch (err) {
            console.error(`Error occured reloading`);
            console.trace(err)
            return message.util.edit('Failed to Reload ❌ *Check console for details*');
        }
    }
}

module.exports = ReloadCommand;