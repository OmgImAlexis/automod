import { AppError } from './app-error';

/**
 * Multi-line permission error.
 */
export class MultiLinePermissionError extends AppError {
	constructor() {
		super(`You don't have access to multi-line commands.`);
	}
};
