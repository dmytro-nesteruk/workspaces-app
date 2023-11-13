import { ValidationOptions } from "class-validator";

type ValidationObj = {
	pattern: RegExp;
	options: ValidationOptions;
};

export const passwordValidationPattern: ValidationObj = {
	pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
	options: {
		message: (args) =>
			`${args.property} must be contain one digit, one uppercase letter, one lowercase letter`,
	},
};
