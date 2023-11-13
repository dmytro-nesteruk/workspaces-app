import { Body, Controller, Post } from "@nestjs/common";
import { ValidationPipe } from "src/@pipes/validation.pipe";

import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-up")
	signUp(@Body(new ValidationPipe()) dto: SignUpDto) {
		return this.authService.signUp(dto);
	}

	@Post("sign-in")
	signIn(@Body(new ValidationPipe()) dto: SignInDto) {
		return this.authService.signIn(dto);
	}
}
