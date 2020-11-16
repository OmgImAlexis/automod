import fs from 'fs';
import { client } from './client';
import { getStore } from './store';
import type { Command } from './types';

export const getUserFromMention = (mention: string) => {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
};

export const getCommandHelp = (command: Command, prefix?: string) => {
	const store = getStore('default');
	return {
		name: `\`${prefix ?? store.prefix}${command.name}\``,
		value: command.description
	};
};

export const loadJsonFile = (fileLocation: string, object?: object) => {
    try {
        const file = fs.readFileSync(fileLocation).toString();
        return JSON.parse(file);
    } catch (error) {
        // Missing file
        if (error.code === 'ENOENT') {
			if (object) {
				fs.writeFileSync(fileLocation, JSON.stringify(object, null, 2));
				return;
			}
            throw new Error(`Config file missing at ${fileLocation}`);
        }

        // Other error
        throw error;
    }
};