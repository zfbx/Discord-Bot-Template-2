const { Command } = require('discord-akairo');

class SayCommand extends Command {
    constructor() {
        super('say', {
            aliases: [ 'say' ],
            category: 'owner',
            ownerOnly: true,
            channel: '',
            typing: false,
            editable: true,
            cooldown: 0,
            userPermissions: [],
            clientPermissions: [ 'SEND_MESSAGES' ],
            args: [
                {
                    id: 'msg',
                    type: 'string',
					match: 'content',
					default: null,
                }
            ],
            description: {
                content: [
                    'Type something for me to say.',
                ],
                usage: '[message]',
                examples: [ 'How are you?' ],
            }
        });
    }

    async exec(message, args) {

        if (!args.msg) return message.util.send('Say what?');

        return message.util.send(args.msg);

    }
}

module.exports = SayCommand;