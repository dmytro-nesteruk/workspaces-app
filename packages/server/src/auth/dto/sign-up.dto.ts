import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { passwordValidationPattern } from "src/@share/utils/validation";

export class SignUpDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@Matches(passwordValidationPattern.pattern, passwordValidationPattern.options)
	password: string;
}
