import config from '../../config';
const {
	branches,
	jsonBranch,
	repository,
	token
} = config;
import Documentation from './structures/Documentation';
import { Client } from 'klasa';

Client.defaultPermissionLevels
	.add(8, (client, msg) => client.configs.staff.includes(msg.author.id));

export default class extends Client {

	constructor() {
		super({
			commandEditing: true,
			commandLogging: true,
			console: { useColor: true },
			disableEveryone: true,
			disabledEvents: ['TYPING_START'],
			pieceDefaults: {
				commands: {
					deletable: true
				}
			},
			presence: {
				status: 'invisible'
			},
			regexPrefix: /^((?:klasa )?docs(?:,|!|\w)?)/i,
			prefix: 'docs, ',
			restTimeOffset: 0
		});

		this.documentation = new Documentation(this, repository, jsonBranch, branches);

		this.login(token);
	}

}
